import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import "dotenv/config";
import { WWURL } from "@/url/axios";

/* =====================================================
   HELPERS
===================================================== */

function generateSlug(text = "") {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function normalize(text = "") {
  return text.toLowerCase().replace(/[^a-z0-9]/g, "");
}

/* =====================================================
   LEVENSHTEIN
===================================================== */

function levenshtein(a = "", b = "") {
  const dp = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[a.length][b.length];
}

/* =====================================================
   HUMAN SMALL TALK — only used before a name has been
   captured (the opening greeting), so it never derails the
   lead-qualification sequence once it's started.
===================================================== */

function handleSmallTalk(message = "") {
  const msg = message.toLowerCase().trim();

  const greetings = [
    "hi", "hello", "hai", "hey",
    "good morning", "good afternoon", "good evening",
  ];

  if (greetings.some((g) => msg === g || msg.startsWith(g))) {
    return `👋 Hi! I'm DNK Agent, your Dubai property guide. Hope you're having a great day 😊<br/><br/>May I know your name?`;
  }

  return null;
}

// Common short replies that aren't names — stops "ok", "yes", "thanks" etc.
// from being wrongly captured as the visitor's name.
const NON_NAME_WORDS = new Set([
  "ok", "okay", "yes", "no", "sure", "thanks", "thank you", "thankyou",
  "yeah", "yep", "nope", "cool", "great", "nice", "fine",
]);

function looksLikeName(message = "") {
  const trimmed = message.trim();
  if (!/^[a-zA-Z\s.'-]{2,40}$/.test(trimmed)) return false;
  return !NON_NAME_WORDS.has(trimmed.toLowerCase());
}

/* =====================================================
   PROJECT MATCHING
===================================================== */

function detectProjectIntent(message, projects) {
  const msgNorm = normalize(message);

  let best = null;
  let score = Infinity;

  for (const p of projects) {
    const nameNorm = normalize(p.projectname || "");
    if (msgNorm.includes(nameNorm)) return p;

    const d = levenshtein(msgNorm, nameNorm);
    if (d < score) {
      score = d;
      best = p;
    }
  }
  return score <= 6 ? best : null;
}

// Picks the real projects that best match what the visitor said they want,
// so the AI recommends from actual listings instead of generic knowledge.
function findMatchingProjects(projects, req) {
  const wantedBedroom = (req.bedroom || "").match(/\d+(\.\d+)?|studio/i)?.[0]?.toLowerCase();
  const wantedLocation = (req.location || "").toLowerCase().trim();
  const wantedDeveloper = (req.developer || "").toLowerCase().trim();

  const scored = projects.map((p) => {
    let score = 0;
    if (wantedBedroom && (p.bedroom || "").toLowerCase().includes(wantedBedroom)) score += 3;
    if (wantedLocation && (p.locationname || "").toLowerCase().includes(wantedLocation)) score += 3;
    if (
      wantedDeveloper &&
      !/no preference|any|doesn'?t matter/i.test(wantedDeveloper) &&
      (p.developer || "").toLowerCase().includes(wantedDeveloper)
    ) {
      score += 2;
    }
    return { p, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const withMatches = scored.filter((s) => s.score > 0);
  const pool = withMatches.length >= 5 ? withMatches : scored;
  return pool.slice(0, 12).map((s) => s.p);
}

function summarizeProjectsForPrompt(list) {
  return list
    .map(
      (p) =>
        `- ${p.projectname} by ${(p.developer || "").replace(/-/g, " ")} | ${p.locationname || "Dubai"} | ${
          p.startingprice || "Price on request"
        } | ${p.bedroom || "N/A"} | Handover: ${p.handover || "N/A"}`
    )
    .join("\n");
}

/* =====================================================
   MAIN API
===================================================== */

const QUALIFICATION_QUESTIONS = {
  bedroom: "How many bedrooms are you looking for? (e.g. Studio, 1, 2, 3+)",
  location: "Do you have a preferred location or area in Dubai?",
  developer: "Any developer you prefer, or are you open to suggestions?",
  budget: "Lastly, what budget range are you working with?",
};
const QUALIFICATION_ORDER = ["bedroom", "location", "developer", "budget"];

const AI_UNAVAILABLE_REPLY =
  '⚠️ Our consultant is unavailable right now. <a href="https://wa.me/971555769195" target="_blank" class="underline text-green-600">WhatsApp us</a> and we\'ll help directly.';

// The AI SDK doesn't always throw on a failed generation (e.g. an
// insufficient-quota error from the model provider surfaces as an "error"
// part in the stream, not a thrown exception) — so textStream can complete
// having yielded nothing at all. Treat empty output as a failure instead of
// sending a broken-looking near-empty reply.
async function streamReplyText({ model, system, prompt }) {
  try {
    const result = await streamText({ model, system, prompt });
    let text = "";
    for await (const chunk of result.textStream) text += chunk;
    return text.trim() || null;
  } catch (err) {
    console.error("AI generation failed:", err);
    return null;
  }
}

async function syncLeadHistory(leadId, history) {
  if (!leadId) return;
  try {
    await fetch(`${WWURL}api/lead/${leadId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatHistory: history }),
    });
  } catch (err) {
    console.error("Chat history sync failed:", err);
  }
}

export async function POST(req) {
  try {
    const {
      message,
      hasName,
      hasPhone,
      name,
      page,
      history = [],
      requirement: prevRequirement = {},
    } = await req.json();

    if (!message)
      return Response.json({ reply: "Message required" }, { status: 400 });

    const requirement = { ...prevRequirement };
    const nextHistory = [...history, { role: "user", content: message }];

    /* 1️⃣ SMALL TALK — opening greeting only, before a name exists */
    if (!hasName) {
      const smallTalk = handleSmallTalk(message);
      if (smallTalk) return Response.json({ reply: smallTalk, requirement });
    }

    /* 2️⃣ NAME CAPTURE */
    if (!hasName) {
      if (looksLikeName(message)) {
        return Response.json({
          saveName: message,
          reply: `Nice to meet you, ${message} 😊<br/>May I have your contact number so our team can follow up if needed?`,
          requirement,
        });
      }
      return Response.json({ reply: "👋 May I know your name?", requirement });
    }

    /* 3️⃣ PHONE CAPTURE — creates the lead (DB + Bitrix + email) right away,
       before any real conversation happens. */
    const phoneMatch = message.match(/(\+?\d{9,15})/);
    if (phoneMatch && !hasPhone) {
      let leadId = null;
      try {
        const leadRes = await fetch(`${WWURL}api/lead`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            phone: phoneMatch[0],
            page,
            source: "AI Chatbot",
            type: "chatbot",
            chatHistory: nextHistory,
          }),
        });
        const leadJson = await leadRes.json();
        leadId = leadJson?.leadId || null;
      } catch (err) {
        console.error("Lead creation failed:", err);
      }

      const reply = `Thank you, ${name} 😊 Our team has your details.<br/><br/>${QUALIFICATION_QUESTIONS.bedroom}`;

      return Response.json({
        savePhone: phoneMatch[0],
        reply,
        requirement: { ...requirement, leadId, stage: "bedroom" },
      });
    }

    if (!hasPhone) {
      return Response.json({ reply: "Could you share your contact number? 📱", requirement });
    }

    /* 4️⃣ PROGRESSIVE QUALIFICATION — bedroom -> location -> developer -> budget */
    const stage = requirement.stage;
    if (stage && QUALIFICATION_ORDER.includes(stage)) {
      requirement[stage] = message;

      const currentIndex = QUALIFICATION_ORDER.indexOf(stage);
      const nextStage = QUALIFICATION_ORDER[currentIndex + 1];

      await syncLeadHistory(requirement.leadId, nextHistory);
      try {
        await fetch(`${WWURL}api/lead/${requirement.leadId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ [stage]: message }),
        });
      } catch (err) {
        console.error("Qualification update failed:", err);
      }

      if (nextStage) {
        return Response.json({
          reply: QUALIFICATION_QUESTIONS[nextStage],
          requirement: { ...requirement, stage: nextStage },
        });
      }

      // Qualification complete — move to open chat and give an immediate,
      // real-project recommendation based on everything they just told us.
      requirement.stage = "chat";

      let matchReply = "Perfect, thank you for sharing all that! Let me find some great options for you...";
      try {
        const res = await fetch(`${WWURL}task/get-task-public`);
        const json = await res.json();
        const projects = json?.data || [];
        const matches = findMatchingProjects(projects, requirement).slice(0, 3);

        if (matches.length > 0) {
          const list = matches
            .map(
              (p) =>
                `• <b>${p.projectname}</b> by ${(p.developer || "").replace(/-/g, " ")} — ${p.locationname || "Dubai"}, starting ${
                  p.startingprice || "on request"
                }`
            )
            .join("<br/>");
          matchReply = `Great, thank you! 😊 Based on what you're looking for, here are a few options I'd suggest:<br/><br/>${list}<br/><br/>Want more details on any of these, or should I look at other areas too?`;
        }
      } catch (err) {
        console.error("Failed to load projects for recommendation:", err);
      }

      const historyWithReply = [...nextHistory, { role: "bot", content: matchReply }];
      await syncLeadHistory(requirement.leadId, historyWithReply);

      return Response.json({ reply: matchReply, requirement });
    }

    /* 5️⃣ LOAD PROJECTS (for direct-mention detection and general recs) */
    const res = await fetch(`${WWURL}task/get-task-public`);
    const json = await res.json();
    const projects = json?.data || [];

    /* 6️⃣ DIRECT PROJECT DETECTION */
    const project = detectProjectIntent(message, projects);

    const DNK_AGENT_PERSONA = `
You are DNK Agent, a warm, knowledgeable, and friendly Dubai real estate consultant from DNK Real Estate.
Speak like a helpful human advisor and friend — never like a brochure or a generic assistant.
Always prefer recommending from the real DNK project list you're given over generic/hallucinated advice.
You can also explain general Dubai property questions simply and kindly — buying process for off-plan
properties, foreign ownership rules (freehold areas), the Golden Visa via property investment, typical
payment plans (e.g. 1% monthly, 60/40, 70/30), escrow accounts and RERA regulation, and service charges.
Keep responses short, warm, and conversational — a few sentences, not an essay. End with a helpful next
step when it makes sense (e.g. suggest a call, WhatsApp, or ask a clarifying question).
The visitor's name is ${name || "the visitor"}. What they've told us they want: ${
      requirement.bedroom ? `${requirement.bedroom} bedroom(s)` : "bedroom count not specified"
    }, in ${requirement.location || "no specific area"}, developer preference: ${
      requirement.developer || "open to suggestions"
    }, budget: ${requirement.budget || "not specified"}.
    `;

    if (project) {
      const prompt = `
Project Details:
Name: ${project.projectname}
Developer: ${project.developer}
Location: ${project.locationname}
Starting Price: ${project.startingprice}
Payment Plan: ${project.paymentplan}
      `;

      const text = await streamReplyText({ model: openai("gpt-4.1-mini"), system: DNK_AGENT_PERSONA, prompt });

      const reply = text
        ? text +
          `<br/><br/><a href="https://www.dnkre.com/projects/${generateSlug(
            project.projectname
          )}" target="_blank" class="underline text-green-600">View Project</a>`
        : AI_UNAVAILABLE_REPLY;

      await syncLeadHistory(requirement.leadId, [...nextHistory, { role: "bot", content: reply }]);
      return Response.json({ reply, requirement });
    }

    /* 7️⃣ GENERAL AI RESPONSE — push real matching projects into context so
       the AI prefers recommending from the actual list. */
    const matches = findMatchingProjects(projects, requirement);
    const prompt = `
Here are real DNK Real Estate projects you can recommend when relevant (prefer these over generic advice):
${summarizeProjectsForPrompt(matches)}

Visitor's message: ${message}
    `;

    const finalText = await streamReplyText({ model: openai("gpt-4.1-mini"), system: DNK_AGENT_PERSONA, prompt });

    const reply = finalText
      ? finalText + "<br/><br/>Would you like project suggestions or more details on any of these?"
      : AI_UNAVAILABLE_REPLY;
    await syncLeadHistory(requirement.leadId, [...nextHistory, { role: "bot", content: reply }]);

    return Response.json({ reply, requirement });
  } catch (err) {
    console.error("Chatbot Error:", err);
    return Response.json({
      reply:
        '⚠️ Our consultant is unavailable. <a href="https://wa.me/971555769195" target="_blank" class="underline text-green-600">WhatsApp us</a>',
    });
  }
}
