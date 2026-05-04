"use client";

type TeamModalProps = {
  open: boolean;
  onClose: () => void;
};

const teamMembers = [
  { name: "Tursunbekov Sardorbek", role: "Boshliq", img: "/boshliq.jpg.jpg" },
  { name: "Muxtorov Farrux", role: "O'rinbosar", img: "/o'rinbosar.jpg" },
  { name: "Yuldashev Islom", role: "PM Menejer", img: "/xodin 1.jpg" },
  { name: "Raximov Ulug'bek", role: "Dasturchi", img: "/1-xodim.jpg" },
  { name: "Bobur", role: "Dasturchi", img: "/2-xodim.jpg" },
  { name: "Abdiyev Fayoz", role: "Dasturchi", img: "/3-xodim2.jpg" },
];

export default function TeamModal({ open, onClose }: TeamModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.72)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        zIndex: 200,
        animation: "fadeInUp 0.24s ease both",
      }}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "980px",
          background: "rgba(10,15,26,0.98)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "24px",
          padding: "1.5rem",
          boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.35rem" }}>Jamoa a&apos;zolari</h3>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>Asosiy jamoa va keyin qo&apos;shiladigan a&apos;zolar uchun bo&apos;lim.</p>
          </div>
          <button onClick={onClose} style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer", fontSize: "1.2rem" }}>✕</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "1rem" }}>
          {teamMembers.map((member, index) => (
            <div
              key={`${member.name}-${index}`}
              style={{
                padding: "1.5rem",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px",
                textAlign: "center",
              }}
            >
              <img
                src={member.img}
                alt={member.name}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  border: "2px solid #00d4ff",
                  margin: "0 auto 1rem",
                }}
              />
              <div style={{ fontWeight: 600, color: "#fff", marginBottom: "0.35rem" }}>{member.name}</div>
              <div style={{ color: "#00d4ff", fontSize: "0.85rem" }}>{member.role}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}