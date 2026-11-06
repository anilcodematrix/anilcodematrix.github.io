/* AnilBot - local engine. No API key, no server.
 * 1. Answers questions about Anil from a built-in knowledge base
 *    (keyword + typo-tolerant matching, follows up on context).
 * 2. Does maths, tells the time/date.
 * 3. For general questions, looks the topic up on Wikipedia (free, keyless).
 */

// ------------------------------------------------------------ profile ----
const ANIL = {
  name: "Anil Kumar Sutihar Sharma",
  email: "anil.codematrix@gmail.com",
  website: "https://anilkumarsutiharsharma.com.np",
  github: "https://github.com/anilcodematrix",
  linkedin: "https://linkedin.com/in/anil-kumar-sutihar-sharma-275122316",
  instagram: "https://instagram.com/anilsharma.io_10",
  facebook: "https://facebook.com/anil.sharma.440897",
  skills: {
    "Languages": ["Python", "JavaScript", "TypeScript", "PHP", "SQL"],
    "Frontend": ["React", "Next.js", "Tailwind CSS", "HTML", "CSS"],
    "Backend": ["Node.js", "Express", "FastAPI", "Django"],
    "AI / ML": ["TensorFlow", "PyTorch", "scikit-learn", "LangChain", "RAG", "Jupyter"],
    "Databases": ["PostgreSQL", "MongoDB", "MySQL", "Supabase", "Firebase"],
    "DevOps & Cloud": ["Docker", "Git", "Linux", "GitHub Actions", "Vercel", "AWS (learning)"],
  },
  projects: [
    { name: "Portfolio website", url: "https://anilkumarsutiharsharma.com.np", desc: "Anil's personal site with his work and contact details.", keys: ["portfolio", "website", "site"] },
    { name: "AnilBot", url: "https://anilcodematrix.github.io", desc: "This chat assistant. It runs fully in your browser with no API key.", keys: ["anilbot", "chatbot"] },
    { name: "Daily AI Agent", url: "https://github.com/anilcodematrix/anil-sharma-daily", desc: "A Python agent on GitHub Actions that commits a daily log with quotes and tech tips.", keys: ["agent", "daily"] },
    { name: "Full-Stack Development", url: "https://github.com/anilcodematrix/Full-Stack-Development-Assignment", desc: "Full-stack web apps with HTML, CSS, JavaScript, PHP and MySQL CRUD.", keys: ["fullstack", "crud", "assignment", "php"] },
    { name: "Concepts of AI", url: "https://github.com/anilcodematrix/Concept-of-AI-and-Technologies", desc: "Jupyter notebooks on classification, regression and deep learning.", keys: ["notebook", "notebooks", "jupyter", "concepts"] },
  ],
};

const link = (url, text) => `<a href="${url}" target="_blank" rel="noopener">${text || url.replace(/^https?:\/\//, "")}</a>`;
const allSkills = Object.values(ANIL.skills).flat();

// ------------------------------------------------------------ intents ----
// Each intent: keywords (weighted), and an answer (string or function).
const INTENTS = [
  { id: "greet", keys: ["hi", "hello", "hey", "hii", "namaste", "namaskar", "yo", "sup", "morning", "evening", "kasto", "k cha", "khabar"],
    answer: () => pick([
      "Hello! 👋 I'm AnilBot. Ask me about Anil's skills, projects or how to hire him. You can also ask me general questions.",
      "Namaste! 🙏 What would you like to know about Anil?",
      "Hey there! I can tell you about Anil, his work, or look up anything you're curious about.",
    ]) },
  { id: "thanks", keys: ["thanks", "thank", "thx", "dhanyabad", "dhanyabaad", "appreciate", "great", "awesome", "nice", "cool"],
    answer: () => pick(["You're welcome! 😊 Anything else?", "Happy to help! Ask me anything else.", "Glad that helped!"]) },
  { id: "bye", keys: ["bye", "goodbye", "later", "cya", "see you"],
    answer: `Bye! 👋 If you'd like to work with Anil, email him at ${link("mailto:" + ANIL.email, ANIL.email)}.` },
  { id: "botself", keys: ["who are you", "what are you", "your name", "are you ai", "are you real", "anilbot", "how do you work"],
    answer: "I'm <b>AnilBot</b>, Anil's personal assistant. I run entirely in your browser, so there's no API key and nothing to set up. I know Anil's profile, I can do maths, and for general questions I look things up on Wikipedia." },
  { id: "about", keys: ["who is anil", "about anil", "who is he", "introduce", "background", "himself", "story", "bio"],
    answer: `<b>${ANIL.name}</b> is a full-stack developer and AI engineer from Kathmandu, Nepal 🇳🇵.<br/><br/>
• Builds web apps end to end, from database to UI<br/>
• Works with React, Next.js, Node.js, FastAPI, Django and Python<br/>
• Into AI/ML: TensorFlow, PyTorch, RAG and LangChain<br/>
• Currently building AI-powered SaaS and learning MLOps<br/>
• Open to freelance work and collaboration<br/><br/>
Website: ${link(ANIL.website)}` },
  { id: "skills", keys: ["skill", "skills", "stack", "tech", "technologies", "tools", "languages", "know", "expertise", "good at", "framework", "programming"],
    answer: () => "Here's Anil's tech stack:<br/><br/>" +
      Object.entries(ANIL.skills).map(([k, v]) => `<b>${k}:</b> ${v.join(", ")}`).join("<br/>") },
  { id: "projects", keys: ["project", "projects", "built", "build", "made", "portfolio", "work", "github", "repo", "repos", "repositories"],
    answer: () => "Some of Anil's projects:<br/><br/>" +
      ANIL.projects.map(p => `• <b>${link(p.url, p.name)}</b>: ${p.desc}`).join("<br/>") },
  { id: "hire", keys: ["hire", "hiring", "available", "availability", "freelance", "job", "work with", "collaborate", "collab", "rate", "price", "cost", "charge", "service", "services", "client"],
    answer: `Yes, Anil is <b>open to freelance work, collaboration and job opportunities</b> ✅<br/><br/>
He can help with:<br/>
• Full-stack web apps and websites<br/>
• AI features, chatbots and RAG systems<br/>
• Automation with Python and GitHub Actions<br/><br/>
For rates and timelines, email ${link("mailto:" + ANIL.email, ANIL.email)} or visit ${link(ANIL.website)}.` },
  { id: "contact", keys: ["contact", "email", "mail", "reach", "connect", "message", "linkedin", "instagram", "facebook", "social", "phone", "talk"],
    answer: `You can reach Anil here:<br/><br/>
📧 Email: ${link("mailto:" + ANIL.email, ANIL.email)}<br/>
🌐 Website: ${link(ANIL.website)}<br/>
💼 LinkedIn: ${link(ANIL.linkedin, "Anil Kumar Sutihar Sharma")}<br/>
🐙 GitHub: ${link(ANIL.github)}<br/>
📸 Instagram: ${link(ANIL.instagram, "@anilsharma.io_10")}<br/>
👍 Facebook: ${link(ANIL.facebook, "anil.sharma.440897")}` },
  { id: "website", keys: ["website", "site", "domain", "url", "web page", "homepage"],
    answer: `Anil's website is ${link(ANIL.website)}. It has his work and contact details.` },
  { id: "location", keys: ["where", "location", "live", "based", "country", "city", "nepal", "kathmandu", "from", "timezone"],
    answer: () => `Anil is based in <b>Kathmandu, Nepal</b> 🇳🇵 (UTC+5:45). It's ${nepalTime()} there right now.` },
  { id: "learning", keys: ["learning", "learn", "studying", "focus", "goal", "goals", "future", "next", "plan", "currently", "now"],
    answer: `Right now Anil is focused on:<br/><br/>
• Building full-stack, AI-powered SaaS<br/>
• Learning MLOps, deep learning and RAG<br/>
• Open-source and AI collaborations` },
  { id: "ai", keys: ["ai", "ml", "machine learning", "deep learning", "tensorflow", "pytorch", "rag", "langchain", "llm", "model"],
    answer: "Anil works with <b>TensorFlow, PyTorch, scikit-learn and LangChain</b>, and is building with <b>RAG</b> (retrieval-augmented generation). His AI notebooks cover classification, regression and deep learning: " +
      link("https://github.com/anilcodematrix/Concept-of-AI-and-Technologies", "Concepts of AI") + "." },
  { id: "education", keys: ["education", "study", "college", "university", "degree", "student", "school"],
    answer: `Anil is a student and developer who keeps building real projects alongside his studies. For his full education details, check ${link(ANIL.website)} or ${link(ANIL.linkedin, "LinkedIn")}.` },
  { id: "resume", keys: ["resume", "cv", "experience", "years"],
    answer: `Anil's experience is best seen in his projects and on ${link(ANIL.linkedin, "LinkedIn")}. For a CV, email ${link("mailto:" + ANIL.email, ANIL.email)}.` },
];

// ----------------------------------------------------------- matching ----
const norm = s => s.toLowerCase().replace(/[^a-z0-9.+#\s]/g, " ").replace(/\s+/g, " ").trim();

function lev(a, b) {
  if (Math.abs(a.length - b.length) > 2) return 9;
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}

function wordHit(word, key) {
  if (word === key) return 1;
  if (key.length >= 5 && word.length >= 4 && lev(word, key) <= 1) return 0.8; // typo tolerance
  if (key.length >= 5 && word.startsWith(key.slice(0, 5))) return 0.7;
  return 0;
}

function scoreIntent(text, words, intent) {
  let score = 0;
  for (const k of intent.keys) {
    if (k.includes(" ")) { if (text.includes(k)) score += 2; continue; }
    let best = 0;
    for (const w of words) best = Math.max(best, wordHit(w, k));
    score += best;
  }
  return score;
}

// ------------------------------------------------------------- extras ----
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const esc = s => s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const nepalTime = () => new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Kathmandu", hour: "numeric", minute: "2-digit" });

function skillCheck(text) {
  // "does he know react?" / "can he use docker?"
  if (!/\b(know|knows|use|uses|work with|experience|familiar|can he|does he|do you)\b/.test(text)) return null;
  const found = allSkills.filter(s => text.includes(s.toLowerCase().replace(" (learning)", "")));
  if (found.length) return `Yes! Anil works with <b>${found.join(", ")}</b>. ✅<br/><br/>Full stack: ${allSkills.slice(0, 12).join(", ")} and more.`;
  const m = text.match(/(?:know|use|with|in)\s+([a-z0-9.+#]+)\s*\??$/);
  if (m && m[1].length > 1 && !["he", "him", "it", "this", "anil", "you"].includes(m[1]))
    return `${esc(m[1])} isn't on Anil's main list, but he picks up new tools quickly. His core stack is ${allSkills.slice(0, 10).join(", ")}. Ask him directly at ${link("mailto:" + ANIL.email, ANIL.email)}.`;
  return null;
}

function projectDetail(words) {
  for (const p of ANIL.projects)
    if (p.keys.some(k => words.includes(k)) && words.some(w => ["tell", "about", "what", "explain", "more", "detail"].includes(w)))
      return `<b>${link(p.url, p.name)}</b><br/>${p.desc}`;
  return null;
}

function maths(raw) {
  const expr = raw.toLowerCase().replace(/what is|what's|calculate|solve|=|\?/g, "").replace(/x/g, "*").replace(/\^/g, "**").trim();
  if (!/^[\d\s+\-*/().%*]+$/.test(expr) || !/\d/.test(expr) || !/[+\-*/%]/.test(expr)) return null;
  try {
    const v = Function(`"use strict";return (${expr})`)();
    if (typeof v === "number" && isFinite(v)) return `🧮 ${esc(expr)} = <b>${+v.toFixed(10)}</b>`;
  } catch (e) {}
  return null;
}

function timeDate(text) {
  if (/\b(time|clock)\b/.test(text)) return `🕒 It's <b>${new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</b> for you, and ${nepalTime()} in Nepal.`;
  if (/\b(date|today|day is it)\b/.test(text)) return `📅 Today is <b>${new Date().toLocaleDateString([], { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</b>.`;
  return null;
}

async function wikipedia(question) {
  let q = question.replace(/^(what|who|where|when|why|how)('s| is| are| was| were| does| do| did)?\s+(a |an |the )?/i, "")
    .replace(/^(tell me about|explain|define|search|meaning of)\s+/i, "").replace(/[?!.]+$/, "").trim();
  if (q.length < 2) return null;
  const alias = { rag: "Retrieval-augmented generation", ml: "Machine learning", ai: "Artificial intelligence", llm: "Large language model", llms: "Large language model", api: "API", ui: "User interface", ux: "User experience design" };
  q = alias[q.toLowerCase()] || q;
  const search = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q)}&srlimit=1&format=json&origin=*`).then(r => r.json());
  const hit = search?.query?.search?.[0];
  if (!hit) return null;
  const sum = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(hit.title.replace(/ /g, "_"))}`).then(r => r.json());
  if (!sum?.extract) return null;
  let text = sum.extract;
  if (text.length > 650) text = text.slice(0, text.lastIndexOf(". ", 650) + 1) || text.slice(0, 650) + "...";
  const url = sum.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(hit.title)}`;
  return `<b>${esc(sum.title)}</b><br/>${esc(text)}<br/><br/><span style="opacity:.7;font-size:.78rem">Source: ${link(url, "Wikipedia")}</span>`;
}

// --------------------------------------------------------------- brain ----
let lastIntent = null;

async function think(raw) {
  const text = norm(raw);
  const words = text.split(" ");

  const quick = maths(raw) || timeDate(text) || skillCheck(text) || projectDetail(words);
  if (quick) return quick;

  // follow-ups like "more", "and?", "tell me more"
  if (/^(more|and|tell me more|go on|continue|details?)\b/.test(text) && lastIntent === "projects")
    return INTENTS.find(i => i.id === "ai").answer;

  const ranked = INTENTS.map(i => ({ i, s: scoreIntent(text, words, i) })).sort((a, b) => b.s - a.s);
  const best = ranked[0];
  const aboutAnil = /\b(anil|he|him|his|you|your)\b/.test(text);
  const threshold = aboutAnil ? 0.7 : 1;

  const generalQ = !aboutAnil && /^(what|whats|define|explain|meaning|tell me about)\b/.test(text) &&
    ["ai", "skills", "location", "education", "learning", "projects", "website"].includes(best.i.id);
  if (generalQ) {
    try { const w = await wikipedia(raw); if (w) { lastIntent = "wiki"; return w; } } catch (e) {}
  }
  if (best.s >= threshold) {
    lastIntent = best.i.id;
    let out = typeof best.i.answer === "function" ? best.i.answer() : best.i.answer;
    // combine a strong second intent ("skills and contact")
    const second = ranked[1];
    if (second.s >= 1 && second.s >= best.s * 0.8 && !["greet", "thanks", "bye"].includes(second.i.id) && !["greet", "thanks", "bye"].includes(best.i.id))
      out += "<br/><br/>" + (typeof second.i.answer === "function" ? second.i.answer() : second.i.answer);
    return out;
  }

  // general knowledge
  try {
    const w = await wikipedia(raw);
    if (w) { lastIntent = "wiki"; return w; }
  } catch (e) { console.warn(e); }

  return `I'm not sure about that one 🤔<br/><br/>Try asking:<br/>• "Who is Anil?"<br/>• "Does he know React?"<br/>• "What projects has he built?"<br/>• "What is machine learning?"<br/><br/>Or ask Anil directly: ${link("mailto:" + ANIL.email, ANIL.email)}`;
}

// ----------------------------------------------------------------- UI ----
const msgsEl = document.getElementById("messages");
const inputEl = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

(function particles() {
  const c = document.getElementById("particles");
  for (let i = 0; i < 18; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    const size = Math.random() * 6 + 3;
    p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random() * 100}%;animation-duration:${Math.random() * 20 + 12}s;animation-delay:${Math.random() * 10}s;`;
    c.appendChild(p);
  }
})();

const timeStr = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

function appendMsg(role, html) {
  const div = document.createElement("div");
  div.className = "msg " + role;
  div.innerHTML = `<div class="msg-avatar">${role === "bot" ? "A" : "Y"}</div>
    <div><div class="msg-bubble">${html}</div><div class="msg-time">${timeStr()}</div></div>`;
  msgsEl.appendChild(div);
  msgsEl.scrollTop = msgsEl.scrollHeight;
}

function showTyping() {
  const div = document.createElement("div");
  div.className = "msg bot";
  div.id = "typing-indicator";
  div.innerHTML = `<div class="msg-avatar">A</div><div><div class="msg-bubble"><div class="typing"><span></span><span></span><span></span></div></div></div>`;
  msgsEl.appendChild(div);
  msgsEl.scrollTop = msgsEl.scrollHeight;
}

function send(text) { inputEl.value = text; sendMsg(); }

async function sendMsg() {
  const text = inputEl.value.trim();
  if (!text || sendBtn.disabled) return;
  inputEl.value = "";
  inputEl.style.height = "auto";
  sendBtn.disabled = true;
  appendMsg("user", esc(text).replace(/\n/g, "<br/>"));
  showTyping();
  const started = Date.now();
  let reply;
  try { reply = await think(text); } catch (e) { reply = "Something went wrong. Please try again."; console.error(e); }
  await new Promise(r => setTimeout(r, Math.max(0, 450 - (Date.now() - started))));
  document.getElementById("typing-indicator")?.remove();
  appendMsg("bot", reply);
  sendBtn.disabled = false;
  inputEl.focus();
}

window.send = send;
window.sendMsg = sendMsg;
