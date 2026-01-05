import { streamText } from "ai";
import "dotenv/config";
import { WWURL } from "@/url/axios";

/* ================= HELPERS ================= */

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

/* ================= LEVENSHTEIN ================= */

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

/* ================= PROJECT FUZZY MATCH ================= */

function detectProjectIntent(message, projects) {
  const msgNorm = normalize(message);

  let best = null;
  let score = Infinity;

  for (const p of projects) {
    const nameNorm = normalize(p.projectname || "");

    // 1️⃣ Check if the project name is anywhere inside the message
    if (msgNorm.includes(nameNorm)) return p;

    // 2️⃣ Check Levenshtein distance
    const d = levenshtein(msgNorm, nameNorm);
    if (d < score) {
      score = d;
      best = p;
    }
  }

  return score <= 7 ? best : null; // higher threshold for extra words
}

/* ================= INTENT HELPERS ================= */
  function isShowMoreIntent(message = "") {
    const msg = message.toLowerCase();
    return (
      msg.includes("more") ||
      msg.includes("next") ||
      msg.includes("show more") ||
      msg.includes("other options")
    );
  }

/* ================= MARKET / GENERAL INTENT ================= */

function isMarketQuestion(message = "") {
  const msg = message.toLowerCase();
  const keywords = [
    "market",
    "price",
    "prices",
    "investment",
    "worth buying",
    "good time",
    "real estate",
    "property market",
    "future",
    "trend",
    "how is dubai",
    "going now"
  ];
  return keywords.some(k => msg.includes(k));
}


/* ================= LOCATIONS ================= */

const locations = [
  "business bay",
  "downtown dubai",
  "difc",
  "city walk",
  "zabeel",
  "meydan",
  "dubai marina",
  "jumeirah beach residence",
  "jbr",
  "bluewaters island",
  "palm jumeirah",
  "jumeirah",
  "la mer",
  "dubai hills estate",
  "dubai creek harbour",
  "mohammed bin rashid city",
  "mbc",
  "dubai south",
  "expo city dubai",
  "tilal al ghaf",
  "jumeirah village circle",
  "jvc",
  "jumeirah village triangle",
  "jvt",
  "arabian ranches",
  "arabian ranches 2",
  "arabian ranches 3",
  "town square",
  "mudon",
  "the valley",
  "emirates hills",
  "al barari",
  "damac hills",
  "damac hills 2",
  "the oasis",
  "district one",
  "dubai land",
  "liwan",
  "international city",
  "silicon oasis",
  "dubai production city",
  "dubai sports city",
  "dubai investment park",
  "dubai internet city",
  "dubai media city",
  "dubai healthcare city",
  "jebel ali",
  "al quoz",
  "deira",
  "bur dubai",
  "karama",
  "satwa",
  "al furjan",
  "discovery gardens",
  "motor city",
  "academic city",
  "ras al khor"
];

const locationAliases = {
  jvc: "jumeirah village circle",
  jvt: "jumeirah village triangle",
  jbr: "jumeirah beach residence",
  marina: "dubai marina",
  downtown: "downtown dubai",
  business: "business bay",
  mbc: "mohammed bin rashid city"
};

function matchLocationFuzzy(message) {
  const msg = normalize(message);

  if (locationAliases[msg]) return locationAliases[msg];

  let best = null;
  let score = Infinity;

  for (const loc of locations) {
    const nLoc = normalize(loc);

    if (nLoc.includes(msg) || msg.includes(nLoc)) return loc;

    const d = levenshtein(msg, nLoc);
    if (d < score) {
      score = d;
      best = loc;
    }
  }

  return score <= 3 ? best : null;
}

function isLocationInfoQuestion(message = "") {
  const msg = message.toLowerCase();

  const questionWords = [
    "advantage",
    "advantages",
    "good",
    "about",
    "why",
    "benefits",
    "living",
    "area",
    "location",
    "investment"
  ];

  const hasQuestionWord = questionWords.some(w => msg.includes(w));
  const hasLocation = matchLocationFuzzy(msg);

  return hasQuestionWord && hasLocation;
}

function isDeveloperIntent(message = "") {
  const msg = message.toLowerCase();

  const keywords = [
    "quality",
    "developer",
    "good developer",
    "best developer",
    "top developer",
    "quality project",
    "reputed developer",
    "trusted developer",
    "brand project",
    "premium developer"
  ];

  return keywords.some(k => msg.includes(k));
}



/* ================= REQUIREMENT EXTRACTION ================= */

function extractRequirement(message = "", prev = {}) {
  const msg = message.toLowerCase();
  const req = { ...prev };

  // bedrooms
  const bed = msg.match(/(\d+)\s*(bed|br|bedroom)/);
  if (bed) req.bedrooms = Number(bed[1]);

  // budget
  const budget = msg.match(/(\d+(\.\d+)?)(m|k)/);
  if (budget) {
    const val = Number(budget[1]);
    req.budget = budget[3] === "m" ? val * 1_000_000 : val * 1_000;
  }

  // location
  const detectedLocation = matchLocationFuzzy(msg);
  if (detectedLocation) req.location = detectedLocation;

  // status
  if (msg.includes("ready")) req.status = "ready";
  if (msg.includes("off")) req.status = "off-plan";

  // property type
  if (msg.includes("apartment")) req.propertyType = "apartment";
  if (msg.includes("villa")) req.propertyType = "villa";

  return req;
}

/* ================= FILTER PROJECTS ================= */

function filterProjects(projects, req) {
  return projects.filter((p) => {
    if (req.bedrooms && !p.bedrooms?.includes(req.bedrooms)) return false;
    if (req.budget && p.startingprice > req.budget) return false;
    if (req.location && !p.locationname?.toLowerCase().includes(req.location))
      return false;
    if (req.status && p.status?.toLowerCase() !== req.status) return false;
    if (req.propertyType && p.propertytype?.toLowerCase() !== req.propertyType)
      return false;
    return true;
  });
}

/* ================= API ================= */

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

    /* ---- NAME ---- */
    if (!hasName && /^[a-zA-Z\s]{2,30}$/.test(message)) {
      return Response.json({
        saveName: message,
        reply: `Nice to meet you, ${message} 😊<br/>May I have your Contact number?`
      });
    }

    if (!hasName) return Response.json({ reply: "👋 May I know your name?" });

/* ---- PHONE ---- */
const phone = message.match(/(\+?\d{9,15})/);

if (phone && !hasPhone) {
  // Save lead + chat history
  await fetch(`${WWURL}api/lead`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      phone: phone[0],
      page,
      source: "AI Chatbot",
      chatHistory: prevRequirement?.chatHistory || [],
    }),
  });

  // ⛔ STOP FLOW HERE
  return Response.json({
    savePhone: phone[0],
    reply: `Thank you 😊  
Our property expert will contact you shortly on WhatsApp.

Meanwhile, you can ask me about:
• **Investment opportunities**
• Any **project details**
• **Best areas** in Dubai
• Your **requirements**
`

  });
}

    /* ---- PROJECT DATA ---- */
    const res = await fetch(`${WWURL}task/get-task-public`);
    const json = await res.json();
    const projects = json?.data || [];

    /* ---- DIRECT PROJECT QUERY ---- */
    const project = detectProjectIntent(message, projects);

    // Extract requirements anyway for flexible flow
    const requirement = extractRequirement(message, prevRequirement);

    if (project) {
      const prompt = `
      You are DNK Real Estate consultant.
      Explain project professionally.

      Project:
      Name: ${project.projectname}
      Developer: ${project.developer}
      Location: ${project.locationname}
      Price: ${project.startingprice}
      Payment plan: ${project.paymentplan}
      Link: <a href="https://www.dnkre.com/projects/${generateSlug(project.projectname)}" target="_blank" class="underline text-green-600">Project Link</a>
      `;

      const result = streamText({
        model: "openai/gpt-4.1-mini",
        prompt
      });

      let text = "";
      for await (const p of result.textStream) text += p;
      return Response.json({ reply: text+
          `<br/><br/><a href="https://www.dnkre.com/projects/${generateSlug(
            project.projectname
          )}" target="_blank" class="underline text-green-600">View Project</a>` });
    }

    /* ---- MARKET INTENT ---- */
    if (isMarketQuestion(message)) {
      const prompt = `
      You are a senior Dubai real estate consultant.
      Answer professionally and confidently.

      Question: "${message}"
      `;

            const result = streamText({
              model: "openai/gpt-4.1-mini",
              prompt
            });

            let text = "";
            for await (const p of result.textStream) text += p;

            return Response.json({
              reply:
                text +
                `<br/><br/>If you’d like, I can suggest **good projects** based on your budget and preferred area 😊`
            });
    }

    /* ---- LOCATION INFORMATION INTENT ---- */
    if (isLocationInfoQuestion(message)) {
      const location = matchLocationFuzzy(message);

      const prompt = `
        You are a Dubai real estate expert at DNK Real Estate.
        Explain the advantages of living or investing in ${location}.
        Keep it professional, positive, and easy to understand.
        End by offering help politely, without asking bedrooms directly.
        `;

      const result = streamText({
        model: "openai/gpt-4.1-mini",
        prompt
      });

      let text = "";
      for await (const p of result.textStream) text += p;

      return Response.json({
        reply:
          text +
          `<br/><br/>If you'd like, I can also suggest **projects in ${location}** based on your budget 😊`
      });
    }

    const TOP_DEVELOPERS = [
      "Emaar Properties",
      "Nakheel",
      "Damac",
      "Meraas",
      "Sobha Realty",
      "Ellington",
      "Binghatti",
      "Aldar",
      "Azizi",
      "Select Group",
      "MAG Property Development",
      "Danube Properties",
      "Tiger Properties",
      "Omniyat",
      "Seven Tides",
      "Dubai Properties",
      "Arada Developments"
    ];

    /* ---- DEVELOPER / QUALITY INTENT ---- */
  if (isDeveloperIntent(message)) {
    const topProjects = projects.filter(p =>
      TOP_DEVELOPERS.some(dev =>
        p.developer?.toLowerCase().includes(dev)
      )
    ).slice(0, 5);

    if (!topProjects.length) {
      return Response.json({
        reply: `We work with some of Dubai’s most reputed developers like **Emaar, Sobha, Ellington, DAMAC, and Nakheel** 😊  
      Would you like me to suggest projects by a **specific developer** or in a **preferred area**?`
          });
        }

        const list = topProjects
          .map(
            p =>
              `• <a href="https://www.dnkre.com/projects/${generateSlug(
                p.projectname
              )}" target="_blank" class="underline text-green-600">${
                p.projectname
              }</a> by ${p.developer}`
          )
          .join("<br/>");

        return Response.json({
          reply: `Great choice 😊 Here are some **quality projects by reputed developers**:<br/><br/>
      ${list}<br/><br/>
      Would you like options based on **budget**, **location**, or a **specific developer**?`
        });
  }



    /* ---- SMART REQUIREMENT FLOW ---- */
    const requiredFields = [
      { key: "bedrooms", label: "Number of bedrooms" },
      { key: "location", label: "Preferred location" },
      { key: "budget", label: "Budget range" }
    ];

    const firstMissing = requiredFields.find(
      (item) => !requirement[item.key]
    );

    if (firstMissing) {
      return Response.json({
        saveRequirement: requirement,
        reply: `Sure 😊 I can help with that. Could you tell me your **${firstMissing.label}**?`
      });
    }

    /* ---- SUGGEST PROJECTS ---- */
    const matches = filterProjects(projects, requirement);

    if (!matches.length) {
      return Response.json({
        saveRequirement: requirement,
        reply: `Thanks 😊 I checked for a ${requirement.bedrooms}-bedroom ${
          requirement.propertyType || "property"
        } in ${requirement.location} within your budget, but there are no exact matches currently. Would you like nearby areas instead?`
      });
    }

    const list = matches
      .slice(0, 5)
      .map(
        (p) =>
          `• <a href="https://www.dnkre.com/projects/${generateSlug(
            p.projectname
          )}" target="_blank" class="underline text-green-600">${
            p.projectname
          }</a> – from AED ${p.startingprice.toLocaleString()}`
      )
      .join("<br/>");

    return Response.json({
      saveRequirement: requirement,
      reply: `Great news 😊 Based on your requirement, here are some excellent options:<br/><br/>
${list}<br/><br/>
Would you like **payment plans**, **floor plans**, or a **site visit** arranged?`
    });
  } catch (err) {
    console.error(err);
    return Response.json({
      reply:
        '⚠️ Our consultant is unavailable. <a href="https://wa.me/971555769195" target="_blank" class="underline text-green-600">WhatsApp us</a>'
    });
  }
}
