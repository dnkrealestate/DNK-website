import { WWURL } from "@/url/axios";

// Helper: Detect project intent in user message
function detectProjectIntent(message, projects) {
 const lowerMsg = message.toLowerCase();

  return projects.find((p) => {
    if (!p?.name) return false; // <-- skip if no name

    const projectName = p.name.toLowerCase();
    const keywords = [
      projectName,
      projectName.split(" ")[0], // first word
      "price",
      "cost",
      "payment",
      "floor plan",
      "location",
      "amenities",
    ];

    return keywords.some((k) => lowerMsg.includes(k));
  });
}

export async function POST(req) {
  try {
    const { message, page, hasName, hasPhone, name } = await req.json();

    if (!message) {
      return Response.json({ reply: "Message required." }, { status: 400 });
    }

    /* ---------- NAME DETECTION ---------- */
    const looksLikeName =
      message.length <= 30 &&
      /^[a-zA-Z\s]+$/.test(message) &&
      !message.match(/\d/);

    if (!hasName && looksLikeName) {
      return Response.json({
        saveName: message.trim(),
        reply: `Nice to meet you, ${message.trim()} 😊<br/>Please share your contact number.`,
      });
    }

     /* ---------- ASK NAME ONLY IF NOT STORED ---------- */
    if (!hasName) {
      return Response.json({
        reply: "👋 May I know your name?",
      });
    }

    /* ---------- PHONE DETECTION ---------- */
    const phoneMatch = message.match(/(\+?\d{9,15})/);

    let thankYouMessage = "";

    if (phoneMatch && !hasPhone) {
      await fetch(`${WWURL}api/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || "Chat User",
          phone: phoneMatch[0],
          page,
          source: "AI Chatbot",
        }),
      });
       thankYouMessage = `
        ✅ Thank you! Our property consultant will contact you shortly.<br/><br/>`;
    }

     /* ---------- INTENT DETECTION (ASK PHONE ONLY WHEN NEEDED) ---------- */
    const intentKeywords = [
      "price",
      "cost",
      "payment",
      "availability",
      "book",
      "buy",
      "visit",
    ];

    const needsPhone = intentKeywords.some((k) =>
      message.toLowerCase().includes(k)
    );

    if (needsPhone && !hasPhone && !phoneMatch) {
      return Response.json({
        reply:
          "To share exact pricing and availability, may I have your WhatsApp number?",
      });
    }

    // 2️⃣ Fetch all projects
    const projectsRes = await fetch(`${WWURL}task/get-task-public`);
    const projectsData = await projectsRes.json();
    const projects = Array.isArray(projectsData?.data) ? projectsData.data : [];

    /* ---------- PROJECT DETECTION ---------- */
    const project = detectProjectIntent(message, projects);

    if (project) {
      return Response.json({
        savePhone: phoneMatch ? phoneMatch[0] : undefined,
        reply: `
          ${thankYouMessage}
          🏡 <b>${project.name}</b><br/>
          Starting price: <b>${project.startingPrice || "Available on request"}</b><br/><br/>
          <a href="${WWURL}projects/${project.slug}" target="_blank" class="underline text-green-600">
          View full project details
          </a>
          `,
            });
      }

     /* ---------- 5️⃣ THANK YOU ONLY (NO QUESTION ASKED) ---------- */
    if (thankYouMessage) {
            return Response.json({
              savePhone: phoneMatch[0],
              reply: `
                ${thankYouMessage}
                You can ask me about:
                <ul>
                  <li>🏙️ Project details</li>
                  <li>💰 Prices & payment plans</li>
                  <li>📍 Locations</li>
                  <li>📐 Floor plans</li>
                </ul>
                `,
            });
    }


       /* ---------- AI FALLBACK ---------- */
    let aiReply = ""; // start empty

if (!hasPhone) {
  aiReply = "Please share your Contact number so we can assist you better.";
} else {
  aiReply = '⚠️ Guide unavailable. <a href="https://wa.me/971555769195" target="_blank" class="underline text-green-600">WhatsApp us</a>';
}

    try {
      const aiRes = await fetch(
        "https://ai-gateway.vercel.com/v1/openai/responses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer vck_1k8lcgp50ClIMMQZwFtmUkc3haHzwcRFdUB4vUDEFxmbCLDTzV0afpkE`,
          },
          body: JSON.stringify({
            model: "openai/gpt-4.1-mini",
            input: [
              {
                role: "system",
                content: `
You are DNK Real Estate AI assistant.
Answer Dubai property questions. User: ${message}
Provide property details, prices, and payment plans.
Ask for WhatsApp number if user wants to buy.
Never mention AI or OpenAI.
Answer in a friendly, professional tone.
                `,
              },
              { role: "user", content: message },
            ],
          }),
        }
      );

      if (aiRes.ok) {
        const data = await aiRes.json();
        aiReply = data.output_text || aiReply;
      } else {
        console.error("AI API error:", aiRes.status, await aiRes.text());
      }
    } catch (err) {
      console.error("AI fetch failed:", err);
    }

    return Response.json({ reply: aiReply });
  } catch (err) {
    console.error(err);
    return Response.json({
      reply:
        '⚠️ AI temporarily unavailable. <a href="https://wa.me/971555769195" target="_blank" class="underline text-green-600">WhatsApp us</a>',
    });
  }
}
