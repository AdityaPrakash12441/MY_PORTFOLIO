import genAI from "@/utils/geminiClient";

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    if (!query || typeof query !== "string") {
      return Response.json({ results: getDefaultResults() });
    }

    const prompt = `
You are the search index engine for Aditya Prakash's portfolio browser simulation.
Generate 3 to 4 realistic search engine results for the search query: "${query}".

Information about Aditya Prakash:
- Name: Aditya Prakash
- Role: Software Engineering Student at Manipal University Jaipur (B.Tech CSE, July 2024 - July 2028)
- Focus: AI-native & security-focused systems
- Key Projects:
  1. Deep Packet Inspection (DPI) Engine in C++17: PCAP parsing (Ethernet, IPv4, TCP/UDP), stateful flow tracking with five-tuples, TLS SNI / HTTP Host inspection, security policies, multithreaded pipeline with load balancers and thread-safe queues. Repo: https://github.com/AdityaPrakash12441/Packet_analyzer
  2. RECALL DSA - RAG Pipeline for Educational Video in Python: Indexes 50+ hours of DSA lectures, local speech-to-text via Apple MLX (Metal GPU), Hinglish data-cleaning pipeline, BGE-M3 multilingual embeddings in Qdrant DB with timestamp URL metadata. Repo: https://github.com/AdityaPrakash12441/RAGPLAYLIST
- Skills: C++, Python, TypeScript, SQL, DSA, OOP, DBMS, LLM apps, RAG, Qdrant, LangChain, TCP/IP, DNS, HTTP/HTTPS, Stateful Flow Tracking, Linux, Wireshark, VS Code, Git/GitHub.
- Certifications: Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate, Introduction to Data Engineering & Big Data (GUVI & HCL), Deloitte Australia Data Analytics Simulation.
- Profiles:
  - GitHub: https://github.com/AdityaPrakash12441
  - LinkedIn: https://www.linkedin.com/in/aditya-prakash-124029330
  - LeetCode: https://leetcode.com/u/Aditya_prakash_1/
  - Portfolio: https://aditya.dev
  - Resume: /files/resume.pdf
  - Email: ap2230749@gmail.com

Instructions:
- Tailor the 3 to 4 results specifically to the query "${query}".
- If the query is related to Aditya, his projects, skills, or tech, highlight relevant pages, repos, or portfolio sections with accurate links.
- If the query is a general tech topic, generate informative results that connect to his implementations where applicable.
- Return ONLY a valid JSON array of objects with the following schema, with no markdown formatting:
[
  {
    "title": "Page Title",
    "displayUrl": "aditya.dev › path",
    "url": "https://actual-destination-url",
    "snippet": "2-3 sentence realistic search snippet highlighting key details relevant to the query."
  }
]
`;

    const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // Clean potential markdown fences
    const cleaned = text.replace(/^```json\s*/, "").replace(/^```\s*/, "").replace(/```\s*$/, "").trim();
    const results = JSON.parse(cleaned);

    return Response.json({ results });
  } catch (error) {
    console.error("Search API Error:", error);
    return Response.json({ results: getDefaultResults() });
  }
}

function getDefaultResults() {
  return [
    {
      title: "Aditya Prakash | AI & Security Systems · Student Portfolio",
      displayUrl: "aditya.dev",
      url: "https://aditya.dev",
      snippet: "Software engineering student at Manipal University Jaipur building AI-native and security-focused systems. Explore projects, terminal, and resume."
    },
    {
      title: "AdityaPrakash12441 (Aditya Prakash) · GitHub",
      displayUrl: "github.com › AdityaPrakash12441",
      url: "https://github.com/AdityaPrakash12441",
      snippet: "Explore repositories including Deep Packet Inspection (DPI) Engine in C++17 and RECALL DSA (timestamp-aware RAG pipeline with Qdrant)."
    },
    {
      title: "Aditya Prakash - Software Engineering Student - LinkedIn",
      displayUrl: "linkedin.com › in › aditya-prakash-124029330",
      url: "https://www.linkedin.com/in/aditya-prakash-124029330",
      snippet: "Connect with Aditya Prakash on LinkedIn. B.Tech Computer Science Engineering student focused on multithreaded systems, networking, and LLM applications."
    }
  ];
}
