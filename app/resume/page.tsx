import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aditya Prakash — Resume",
  description: "Resume of Aditya Prakash, Software Engineering Student at Manipal University Jaipur",
};

export default function ResumePage() {
  return (
    <main style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: "#0f0f0f", minHeight: "100vh", padding: "40px 20px", color: "#e0e0e0" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", background: "#1a1a1a", borderRadius: 16, padding: "48px 52px", boxShadow: "0 8px 40px rgba(0,0,0,0.5)" }}>

        {/* Header */}
        <div style={{ borderBottom: "1px solid #333", paddingBottom: 28, marginBottom: 32 }}>
          <h1 style={{ fontSize: 36, fontWeight: 700, margin: 0, color: "#fff", letterSpacing: "-0.5px" }}>Aditya Prakash</h1>
          <p style={{ margin: "8px 0 0", fontSize: 15, color: "#888" }}>Software Engineering Student · AI & Security Systems</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginTop: 16, fontSize: 13 }}>
            <a href="mailto:ap2230749@gmail.com" style={{ color: "#58a6ff", textDecoration: "none" }}>ap2230749@gmail.com</a>
            <span style={{ color: "#555" }}>|</span>
            <span style={{ color: "#aaa" }}>+91 8102307008</span>
            <span style={{ color: "#555" }}>|</span>
            <a href="https://github.com/AdityaPrakash12441" target="_blank" rel="noreferrer" style={{ color: "#58a6ff", textDecoration: "none" }}>GitHub</a>
            <span style={{ color: "#555" }}>|</span>
            <a href="https://www.linkedin.com/in/aditya-prakash-124029330" target="_blank" rel="noreferrer" style={{ color: "#58a6ff", textDecoration: "none" }}>LinkedIn</a>
            <span style={{ color: "#555" }}>|</span>
            <a href="https://leetcode.com/u/Aditya_prakash_1/" target="_blank" rel="noreferrer" style={{ color: "#58a6ff", textDecoration: "none" }}>LeetCode</a>
          </div>
        </div>

        {/* Summary */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={sectionTitle}>Summary</h2>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "#bbb", margin: 0 }}>
            Software engineering student building AI-native and security-focused systems.
            Experienced with C++, Python, TypeScript, Git/GitHub, and Linux.
            Hands-on with multithreaded systems, networking, LLM-based applications, and vector search.
            Interested in AI-native product engineering and reliable, performant software.
          </p>
        </section>

        {/* Education */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={sectionTitle}>Education</h2>
          <div style={card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h3 style={itemTitle}>Manipal University Jaipur</h3>
                <p style={itemSub}>B.Tech — Computer Science Engineering</p>
              </div>
              <span style={badge}>July 2024 – July 2028</span>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={sectionTitle}>Projects</h2>

          <div style={{ ...card, marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <h3 style={itemTitle}>Deep Packet Inspection (DPI) Engine</h3>
              <a href="https://github.com/AdityaPrakash12441/Packet_analyzer" target="_blank" rel="noreferrer" style={linkStyle}>GitHub ↗</a>
            </div>
            <p style={techStack}>C++17 · Wireshark · Multithreading · TCP/IP · PCAP</p>
            <ul style={list}>
              <li>C++17 DPI engine parsing Ethernet, IPv4, TCP/UDP packets from PCAP captures with protocol-level analysis.</li>
              <li>Stateful flow tracking using five-tuples (src/dst IP, ports, protocol) for connection correlation.</li>
              <li>TLS SNI and HTTP Host inspection to identify application/domain traffic without decrypting HTTPS.</li>
              <li>Security policies for IP, application, and domain-based traffic blocking, marking, and filtering.</li>
              <li>Multithreaded packet-processing pipeline with load balancers and thread-safe producer-consumer queues.</li>
            </ul>
          </div>

          <div style={card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <h3 style={itemTitle}>RECALL DSA — RAG Pipeline for Educational Video</h3>
              <a href="https://github.com/AdityaPrakash12441/RAGPLAYLIST" target="_blank" rel="noreferrer" style={linkStyle}>GitHub ↗</a>
            </div>
            <p style={techStack}>Python · MLX-Whisper · Qdrant · LangChain · BGE-M3 · Grok API</p>
            <ul style={list}>
              <li>Timestamp-aware RAG system indexing 50+ hours of DSA video lectures for semantic search.</li>
              <li>Local speech-to-text using Apple MLX framework (Metal GPU), bypassing CPU bottlenecks.</li>
              <li>NLP data-cleaning pipeline using LLM prompting to fix Hinglish phonetic hallucinations.</li>
              <li>Multilingual embeddings (BGE-M3) in Qdrant DB with URL metadata linking to exact video timestamps.</li>
            </ul>
          </div>
        </section>

        {/* Skills */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={sectionTitle}>Skills</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
            {[
              { label: "Programming", value: "C++, Python, TypeScript, SQL" },
              { label: "CS Fundamentals", value: "DSA, OOP, DBMS" },
              { label: "AI / ML", value: "LLM apps, RAG, Qdrant, LangChain, ML, EDA" },
              { label: "Networking", value: "TCP/IP, DNS, HTTP/HTTPS, Flow Tracking" },
              { label: "Dev Tools", value: "Git, GitHub, Linux, Wireshark, VS Code" },
              { label: "Languages", value: "Hindi, English" },
            ].map((s) => (
              <div key={s.label} style={{ background: "#111", borderRadius: 8, padding: "12px 14px", border: "1px solid #2a2a2a" }}>
                <p style={{ margin: 0, fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{s.label}</p>
                <p style={{ margin: 0, fontSize: 13, color: "#ccc" }}>{s.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section>
          <h2 style={sectionTitle}>Certifications</h2>
          {[
            { name: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate", issuer: "Oracle · 2025" },
            { name: "Introduction to Data Engineering and Big Data", issuer: "GUVI & HCL" },
            { name: "Data Analytics Job Simulation", issuer: "Deloitte Australia" },
          ].map((c) => (
            <div key={c.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #222" }}>
              <p style={{ margin: 0, fontSize: 14, color: "#ddd" }}>{c.name}</p>
              <span style={{ fontSize: 12, color: "#666", whiteSpace: "nowrap", marginLeft: 16 }}>{c.issuer}</span>
            </div>
          ))}
        </section>

      </div>
    </main>
  );
}

const sectionTitle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: "#555",
  marginBottom: 16,
  marginTop: 0,
};
const card: React.CSSProperties = {
  background: "#111",
  border: "1px solid #2a2a2a",
  borderRadius: 10,
  padding: "18px 20px",
};
const itemTitle: React.CSSProperties = { margin: 0, fontSize: 15, fontWeight: 600, color: "#fff" };
const itemSub: React.CSSProperties = { margin: "4px 0 0", fontSize: 13, color: "#888" };
const badge: React.CSSProperties = { fontSize: 12, color: "#666", whiteSpace: "nowrap", marginLeft: 12 };
const techStack: React.CSSProperties = { margin: "0 0 10px", fontSize: 12, color: "#58a6ff" };
const list: React.CSSProperties = { margin: 0, paddingLeft: 18, fontSize: 13, color: "#bbb", lineHeight: 1.75 };
const linkStyle: React.CSSProperties = { fontSize: 12, color: "#58a6ff", textDecoration: "none", whiteSpace: "nowrap", marginLeft: 12 };
