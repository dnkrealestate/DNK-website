import { streamText } from 'ai';
import 'dotenv/config';
import { WWURL } from '@/url/axios';


function generateSlug(text = '') {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // remove special chars
    .replace(/\s+/g, '-')     // spaces → hyphen
    .replace(/-+/g, '-');     // clean double hyphens
}


function normalize(text = "") {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
}

function detectProjectIntent(message, projects) {
  const msg = normalize(message);

  // 1️⃣ Exact / full-name match (BEST)
  const exactMatch = projects.find(p => {
    if (!p?.projectname) return false;
    return msg.includes(normalize(p.projectname));
  });
  if (exactMatch) return exactMatch;

  // 2️⃣ Partial match (all words must match)
  const partialMatch = projects.find(p => {
    if (!p?.projectname) return false;
    const words = normalize(p.projectname).split(" ");
    return words.every(w => msg.includes(w));
  });
  if (partialMatch) return partialMatch;

  // 3️⃣ No project detected
  return null;
}

/* -------- HISTORY PROJECT FINDER -------- */

function getLastMentionedProject(history = [], projects = []) {
  if (!Array.isArray(history)) return null;

  for (let i = history.length - 1; i >= 0; i--) {
    const msg = history[i];
    if (msg.role === "user") {
      const found = detectProjectIntent(msg.content, projects);
      if (found) return found;
    }
  }
  return null;
}


export async function POST(req) {
  try {
    const { message, page, hasName, hasPhone, name, history = [] } = await req.json();
    if (!message) return Response.json({ reply: 'Message required.' }, { status: 400 });

    // ----- NAME DETECTION -----
    const looksLikeName = message.length <= 30 && /^[a-zA-Z\s]+$/.test(message) && !/\d/.test(message);
    if (!hasName && looksLikeName) {
      return Response.json({
        saveName: message.trim(),
        reply: `Nice to meet you, ${message.trim()} 😊<br/>Please share your WhatsApp number.`,
      });
    }
    if (!hasName) {
      return Response.json({ reply: '👋 May I know your name?' });
    }

    // ----- PHONE DETECTION -----
    const phoneMatch = message.match(/(\+?\d{9,15})/);
    let thankYouMessage = '';
    if (phoneMatch && !hasPhone) {
      await fetch(`${WWURL}api/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name || 'Chat User', phone: phoneMatch[0], page, source: 'AI Chatbot' }),
      });
      thankYouMessage = '✅ Thank you! Our property consultant will contact you shortly.<br/><br/>';
    }

    const intentKeywords = ['price', 'cost', 'payment', 'availability', 'book', 'buy', 'visit'];
    const needsPhone = intentKeywords.some((k) => message.toLowerCase().includes(k));
    if (needsPhone && !hasPhone && !phoneMatch) {
      return Response.json({
        reply: 'To share exact pricing and availability, may I have your WhatsApp number?',
      });
    }

    // ----- FETCH PROJECTS FIRST -----
    const projectsRes = await fetch(`${WWURL}task/get-task-public`);
    const projectsData = await projectsRes.json();
    const projects = Array.isArray(projectsData?.data) ? projectsData.data : [];

    // ----- PROJECT DETECTION (MESSAGE + HISTORY) -----
    let project = detectProjectIntent(message, projects); // <-- use let, not const

    if (!project && history.length) {
      project = getLastMentionedProject(history, projects);
    }

      // ----- AI PROMPT -----
    let prompt = `You are DNK Real Estate AI assistant.
Answer Dubai property questions in friendly, professional tone.
Rules:
- Only reference dnkre.com
- Only answer about Dubai real estate
- If unsure, suggest browsing https://www.dnkre.com/projects
- User hasPhone: ${hasPhone}
- User message: ${message}`;

    if (project) {
      prompt += `
      Context: User is asking about project "${project.projectname}".
      Project details:
      - Developer: ${project.developer}
      - Location: ${project.locationname || project.location}
      - Starting price: ${project.startingprice || 'Available on request'}
      - Payment plan: ${project.paymentplan || 'Available on request'}
      - Project link: <a href="https://www.dnkre.com/projects/${generateSlug(project.projectname)}" target="_blank" class="underline text-green-600">View Project</a>
      `;
    }

     // ----- CALL AI -----
    let aiReply = hasPhone
      ? '⚠️ Guide unavailable. <a href="https://wa.me/971555769195" target="_blank" class="underline text-green-600">WhatsApp us</a>'
      : 'Please share your WhatsApp number so we can assist you better.';

    if (hasPhone || project) {
      const result = streamText({
        model: 'openai/gpt-4.1-mini',
        prompt,
      });

      let aiText = '';
      for await (const part of result.textStream) {
        aiText += part;
      }
      if (aiText) aiReply = aiText;
    }

    return Response.json({ reply: thankYouMessage + aiReply, savePhone: phoneMatch ? phoneMatch[0] : undefined })

  } catch (err) {
    console.error(err);
    return Response.json({
      reply: '⚠️ Service temporarily unavailable. <a href="https://wa.me/971555769195" target="_blank" class="underline text-green-600">WhatsApp us</a>',
    });
  }
}
