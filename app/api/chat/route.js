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
   HUMAN SMALL TALK (VERY IMPORTANT)
===================================================== */

function handleSmallTalk(message = "") {
  const msg = message.toLowerCase().trim();

  const greetings = [
    "hi","hello","hai","hey",
    "good morning","good afternoon","good evening"
  ];

  if (greetings.some(g => msg === g || msg.startsWith(g))) {
    return `👋 Hi! Hope you're having a great day 😊<br/><br/>
How can I help you today?<br/>
• Best projects in Dubai<br/>
• Investment opportunities<br/>
• Top developers<br/>
• Best areas to live`;
  }

  if (msg.includes("thank"))
    return "You're welcome 😊 Would you like me to suggest some projects?";

  if (msg.includes("how are you"))
    return "I'm doing great! Ready to help you find the best property in Dubai.";

  return null;
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

/* =====================================================
   MAIN API
===================================================== */

export async function POST(req) {
  try {
    const {
      message,
      hasName,
      hasPhone,
      name,
      page,
      requirement: prevRequirement = {}
    } = await req.json();

    if (!message)
      return Response.json({ reply: "Message required" }, { status: 400 });

    /* 1️⃣ SMALL TALK FIRST (STOP HERE) */
    const smallTalk = handleSmallTalk(message);
    if (smallTalk) return Response.json({ reply: smallTalk });

    /* 2️⃣ NAME CAPTURE */
    if (!hasName && /^[a-zA-Z\s]{2,30}$/.test(message)) {
      return Response.json({
        saveName: message,
        reply: `Nice to meet you, ${message} 😊<br/>May I have your contact number?`
      });
    }

    if (!hasName)
      return Response.json({ reply: "👋 May I know your name?" });

    /* 3️⃣ PHONE CAPTURE */
    const phoneMatch = message.match(/(\+?\d{9,15})/);
    if (phoneMatch && !hasPhone) {
      await fetch(`${WWURL}api/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone: phoneMatch[0],
          page,
          source: "AI Chatbot",
          chatHistory: prevRequirement?.chatHistory || []
        })
      });

      return Response.json({
        savePhone: phoneMatch[0],
        reply:
          "Thank you 😊 Our property expert will contact you shortly on WhatsApp.<br/><br/>Meanwhile, you can ask about investment opportunities or top projects."
      });
    }

    /* 4️⃣ LOAD PROJECTS */
    const res = await fetch(`${WWURL}task/get-task-public`);
    const json = await res.json();
    const projects = json?.data || [];

    /* 5️⃣ DIRECT PROJECT DETECTION */
    const project = detectProjectIntent(message, projects);

    if (project) {
      const prompt = `
Project Details:
Name: ${project.projectname}
Developer: ${project.developer}
Location: ${project.locationname}
Starting Price: ${project.startingprice}
Payment Plan: ${project.paymentplan}
      `;

      const result = await streamText({
        model: openai("gpt-4.1-mini"),
        system: `
You are a friendly Dubai Real Estate Consultant from DNK.
Speak like a human advisor, not a brochure.
Keep response short, clear, and warm.
End with a helpful next step.
        `,
        prompt
      });

      let text = "";
      for await (const chunk of result.textStream) text += chunk;

      return Response.json({
        reply:
          text +
          `<br/><br/><a href="https://www.dnkre.com/projects/${generateSlug(
            project.projectname
          )}" target="_blank" class="underline text-green-600">View Project</a>`
      });
    }

    /* 6️⃣ GENERAL AI RESPONSE */
    const result = await streamText({
      model: openai("gpt-4.1-mini"),
      system: `
You are a professional and friendly Dubai Real Estate Consultant from DNK.
Speak naturally.
Guide the user toward next steps.
Keep it conversational.
      `,
      prompt: message
    });

    let finalText = "";
    for await (const chunk of result.textStream) finalText += chunk;

    return Response.json({
      reply: finalText + "<br/><br/>Would you like project suggestions?"
    });

  } catch (err) {
    console.error("Chatbot Error:", err);
    return Response.json({
      reply:
        '⚠️ Our consultant is unavailable. <a href="https://wa.me/971555769195" target="_blank" class="underline text-green-600">WhatsApp us</a>'
    });
  }
}