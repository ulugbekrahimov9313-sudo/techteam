"use client";

type ProjectsSectionProps = {
  isMobile: boolean;
};

const projects = [
  {
    name: "Judo Monitoring",
    desc: "Judo federatsiyasi uchun sportchilarni kuzatish va monitoring tizimi",
    tech: ["React", "Node.js", "MongoDB"],
    color: "#00d4ff",
    icon: "🥋",
  },
  {
    name: "DLP System",
    desc: "Ma'lumotlar sizib chiqishini oldini olish va nazorat qilish tizimi",
    tech: ["Python", "AI", "Security"],
    color: "#7c3aed",
    icon: "🔒",
  },
  {
    name: "SM & WM",
    desc: "Savdo va ombor menejment tizimi — biznesni avtomatlashtirish",
    tech: ["Next.js", "PostgreSQL"],
    color: "#34d399",
    icon: "📊",
  },
  {
    name: "Paynet Integration",
    desc: "To'lov tizimi integratsiyasi va moliyaviy operatsiyalar platformasi",
    tech: ["API", "Node.js", "React"],
    color: "#fb923c",
    icon: "💳",
  },
  {
    name: "Qo'shimcha loyihalar",
    desc: "Yana bir nechta loyihalarimiz ustida ishlamoqdamiz...",
    tech: ["Tez kunda"],
    color: "#f43f5e",
    icon: "🚀",
  },
];

export default function ProjectsSection({ isMobile }: ProjectsSectionProps) {
  return (
    <section id="projects" style={{ padding: isMobile ? "4rem 1rem" : "6.5rem 2rem", borderTop: "1px solid rgba(255,255,255,0.06)", animation: "fadeInUp 0.95s ease both", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p style={{ color: "#00d4ff", fontSize: "0.9rem", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "0.85rem" }}>Portfolio</p>
          <h2 style={{ fontSize: "clamp(2.1rem, 4vw, 3.3rem)", letterSpacing: "-0.04em", marginBottom: "1rem" }}>Loyihalarimiz</h2>
          <div style={{ width: "120px", height: "4px", margin: "0 auto", borderRadius: "999px", background: "#00d4ff" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
          {projects.map((project) => (
            <div
              key={project.name}
              style={{
                position: "relative",
                padding: "1.5rem",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px",
                transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                boxShadow: "0 18px 40px rgba(0,0,0,0.12)",
                overflow: "hidden",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.transform = "translateY(-6px)";
                event.currentTarget.style.borderColor = `${project.color}55`;
                event.currentTarget.style.boxShadow = `0 20px 44px ${project.color}22`;
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.transform = "translateY(0)";
                event.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                event.currentTarget.style.boxShadow = "0 18px 40px rgba(0,0,0,0.12)";
              }}
            >
              <div style={{ position: "absolute", top: "1rem", left: 0, width: "4px", height: "56px", borderRadius: "0 6px 6px 0", background: project.color }} />
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{project.icon}</div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#fff", marginBottom: "0.7rem" }}>{project.name}</h3>
              <p style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: "1rem" }}>{project.desc}</p>
              <div style={{ display: "flex", gap: "0.55rem", flexWrap: "wrap" }}>
                {project.tech.map((tech) => (
                  <span
                    key={`${project.name}-${tech}`}
                    style={{
                      padding: "0.4rem 0.7rem",
                      borderRadius: "999px",
                      background: `${project.color}1f`,
                      color: project.color,
                      fontSize: "0.8rem",
                      border: `1px solid ${project.color}33`,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}