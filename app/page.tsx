"use client";
import { useEffect, useState } from "react";

const services = [
  {
    icon: "🌐",
    title: "Veb-Sayt",
    desc: "Zamonaviy, tez va SEO-optimallashtirilgan veb-saytlar. Next.js, React va boshqa texnologiyalar bilan.",
    color: "#00d4ff",
  },
  {
    icon: "📱",
    title: "Mobil Ilova",
    desc: "iOS va Android uchun native va cross-platform mobil ilovalar. React Native bilan.",
    color: "#a78bfa",
  },
  {
    icon: "🤖",
    title: "Bot Yaratish",
    desc: "Telegram, WhatsApp va boshqa platformalar uchun aqlli botlar. Biznesingizni avtomatlashtiring.",
    color: "#34d399",
  },
  {
    icon: "🎨",
    title: "UI/UX Dizayn",
    desc: "Foydalanuvchi uchun qulay va chiroyli interfeys dizaynlari. Figma va zamonaviy usullar bilan.",
    color: "#fb923c",
  },
];

const stats = [
  { number: "15+", label: "Loyiha" },
  { number: "10+", label: "Mijoz" },
  { number: "2+", label: "Yil tajriba" },
  { number: "100%", label: "Sifat" },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
  };

  return (
    <main style={{ background: "#050a10", color: "#e8edf2", fontFamily: "var(--font-geist-sans), sans-serif", overflowX: "hidden" }}>

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "1rem 2rem",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: scrolled ? "rgba(5,10,16,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.3s ease",
      }}>
        <img
          src="/logo.png"
          alt="Dasturlash departamenti"
          style={{ height: "55px", width: "auto" }}
        />
        <div style={{ display: "flex", gap: "2rem" }}>
          {["Xizmatlar", "Haqimizda", "Bog'lanish"].map((item, i) => {
            const ids = ["services", "about", "contact"];
            return (
              <button key={item} onClick={() => scrollTo(ids[i])} style={{
                background: "none", border: "none",
                color: activeSection === ids[i] ? "#00d4ff" : "rgba(255,255,255,0.6)",
                fontSize: "0.9rem", cursor: "pointer", transition: "color 0.2s",
                fontFamily: "inherit",
              }}>
                {item}
              </button>
            );
          })}
        </div>
        <button onClick={() => scrollTo("contact")} style={{
          background: "linear-gradient(135deg, #00d4ff, #0077ee)",
          border: "none", color: "#fff", padding: "0.5rem 1.25rem",
          borderRadius: "6px", fontSize: "0.9rem", cursor: "pointer",
          fontFamily: "inherit", fontWeight: 600,
        }}>
          Murojaat →
        </button>
      </nav>

      {/* HERO */}
      <section id="home" style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
        textAlign: "center", padding: "6rem 2rem 4rem", position: "relative",
      }}>
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(0,212,255,0.06) 0%, transparent 60%),
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "100% 100%, 60px 60px, 60px 60px",
        }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "800px" }}>
          <div style={{
            display: "inline-block", padding: "0.35rem 1rem",
            background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)",
            borderRadius: "100px", fontSize: "0.8rem", color: "#00d4ff",
            marginBottom: "1.5rem", letterSpacing: "1px", textTransform: "uppercase",
          }}>
            🏙️ Toshkent · Uzbekiston
          </div>
          <h1 style={{
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
            fontWeight: 800, lineHeight: 1.1, letterSpacing: "-2px", marginBottom: "1.5rem",
          }}>
            Raqamli dunyoda{" "}
            <span style={{
              background: "linear-gradient(135deg, #00d4ff, #a78bfa)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              mukammal
            </span>{" "}
            yechimlar
          </h1>
          <p style={{
            fontSize: "1.15rem", color: "rgba(255,255,255,0.55)",
            lineHeight: 1.7, maxWidth: "580px", margin: "0 auto 2.5rem",
          }}>
            Veb-sayt, mobil ilova, bot va dizayn xizmatlarini professional darajada taqdim etamiz.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("services")} style={{
              padding: "0.8rem 2rem", borderRadius: "8px",
              background: "linear-gradient(135deg, #00d4ff, #0077ee)",
              border: "none", color: "#fff", fontSize: "1rem",
              cursor: "pointer", fontWeight: 600, fontFamily: "inherit",
            }}>
              Xizmatlarni ko&apos;rish →
            </button>
            <button onClick={() => scrollTo("contact")} style={{
              padding: "0.8rem 2rem", borderRadius: "8px",
              background: "transparent", border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff", fontSize: "1rem", cursor: "pointer", fontFamily: "inherit",
            }}>
              Bepul maslahat
            </button>
          </div>
        </div>
        <div style={{
          position: "absolute", bottom: "2rem",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
          color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", animation: "bounce 2s infinite",
        }}>
          <span>Pastga aylantiring</span><span>↓</span>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: "3rem 2rem", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "2rem", textAlign: "center" }}>
          {stats.map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "#00d4ff", letterSpacing: "-1px" }}>{s.number}</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem", marginTop: "0.25rem" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p style={{ color: "#00d4ff", fontSize: "0.85rem", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "0.75rem" }}>Xizmatlar</p>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-1px" }}>Nima qila olamiz?</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
            {services.map((s) => (
              <div key={s.title}
                style={{ padding: "2rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", transition: "all 0.3s ease", cursor: "default" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = s.color + "50"; (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.06)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)"; }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{s.icon}</div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: "0.75rem", color: s.color }}>{s.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7, fontSize: "0.9rem" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "6rem 2rem", background: "rgba(0,212,255,0.03)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div>
            <p style={{ color: "#00d4ff", fontSize: "0.85rem", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "0.75rem" }}>Biz haqimizda</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.5px", marginBottom: "1.25rem" }}>Dasturlash departamenti haqida</h2>
            <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: "1rem" }}>Dasturlash departamenti — Toshkentda joylashgan, 15 dan ortiq muvaffaqiyatli loyihalarni amalga oshirgan tajribali va ishtiyoqli jamoa. Har bir loyihaga yurak va aql bilan yondoshamiz.</p>
            <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>Mijozlarimizning biznesini rivojlantirish bizning asosiy maqsadimiz.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {[
              { icon: "⚡", text: "Tez yetkazib berish" },
              { icon: "🔒", text: "Sifat kafolati" },
              { icon: "💬", text: "24/7 Qo'llab-quvvatlash" },
              { icon: "📈", text: "SEO optimizatsiya" },
            ].map((item) => (
              <div key={item.text} style={{ padding: "1.25rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", textAlign: "center" }}>
                <div style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>{item.icon}</div>
                <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#00d4ff", fontSize: "0.85rem", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "0.75rem" }}>Bog&apos;lanish</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-1px", marginBottom: "1rem" }}>Loyihangizni boshlaylik!</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "3rem", lineHeight: 1.7 }}>Bepul maslahat uchun bizga yozing.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <input type="text" placeholder="Ismingiz" style={{ padding: "0.9rem 1.25rem", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontSize: "1rem", fontFamily: "inherit", outline: "none" }} />
            <input type="tel" placeholder="Telefon raqamingiz" style={{ padding: "0.9rem 1.25rem", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontSize: "1rem", fontFamily: "inherit", outline: "none" }} />
            <textarea placeholder="Loyihangiz haqida qisqacha yozing..." rows={4} style={{ padding: "0.9rem 1.25rem", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontSize: "1rem", fontFamily: "inherit", resize: "none", outline: "none" }} />
            <button style={{ padding: "1rem", background: "linear-gradient(135deg, #00d4ff, #0077ee)", border: "none", color: "#fff", fontSize: "1rem", borderRadius: "10px", cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>
              Murojaat yuborish →
            </button>
          </div>
          <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap" }}>
            <a href="https://t.me/+998938229313" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "0.9rem" }}>📱 +998 93 822 93 13 (Telegram)</a>
            <a href="mailto:ulugbekrakximov4@gmail.com" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "0.9rem" }}>📧 ulugbekrakximov4@gmail.com</a>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>📍 Toshkent, Uzbekiston</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "2rem", textAlign: "center", color: "rgba(255,255,255,0.25)", fontSize: "0.85rem" }}>
        © 2025 Dasturlash departamenti. Barcha huquqlar himoyalangan. · Toshkent, Uzbekiston
      </footer>
    </main>
  );
}
