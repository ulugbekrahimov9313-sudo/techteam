"use client";

import { useEffect, useRef, useState } from "react";
import ClientCabinet from "../components/ClientCabinet";
import ProjectsSection from "../components/ProjectsSection";
import Sidebar from "../components/Sidebar";
import TeamModal from "../components/TeamModal";

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
    color: "#7c3aed",
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
  { number: 15, suffix: "+", label: "Loyiha" },
  { number: 10, suffix: "+", label: "Mijoz" },
  { number: 2, suffix: "+", label: "Yil tajriba" },
  { number: 100, suffix: "%", label: "Sifat" },
];

const achievementItems = [
  "15 dan ortiq muvaffaqiyatli loyiha ishga tushirilgan.",
  "Startaplar va bizneslar uchun tezkor MVP ishlab chiqish.",
  "Analitika, dizayn va development bir jamoada jamlangan.",
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [showClientCabinet, setShowClientCabinet] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showTeam, setShowTeam] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState("O'zbek");
  const [countValues, setCountValues] = useState(stats.map(() => 0));
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const sidebarWidth = sidebarExpanded ? "240px" : "70px";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["home", "services", "about", "projects", "contact"];
      let currentSection = "home";

      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (!element) {
          return;
        }

        const rect = element.getBoundingClientRect();
        if (rect.top <= 140) {
          currentSection = id;
        }
      });

      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const duration = 1600;
    const steps = 48;
    let currentStep = 0;

    const interval = window.setInterval(() => {
      currentStep += 1;
      const progress = Math.min(currentStep / steps, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCountValues(stats.map((item) => Math.round(item.number * eased)));

      if (progress === 1) {
        window.clearInterval(interval);
      }
    }, duration / steps);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = Array(Math.floor(columns)).fill(1);

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      connections: boolean;
    }[] = [];

    for (let i = 0; i < 80; i += 1) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? "#00d4ff" : "#7c3aed",
        connections: true,
      });
    }

    let animationId = 0;

    const draw = () => {
      ctx.fillStyle = "rgba(2, 4, 8, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i += 1) {
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        const opacity = Math.random() * 0.15 + 0.03;
        ctx.fillStyle = `rgba(0, 212, 255, ${opacity})`;
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 1;
      }

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -1;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        if (particle.connections) {
          particles.slice(index + 1).forEach((nextParticle) => {
            const dist = Math.hypot(particle.x - nextParticle.x, particle.y - nextParticle.y);
            if (dist < 120) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(nextParticle.x, nextParticle.y);
              ctx.strokeStyle = `rgba(0, 212, 255, ${0.15 * (1 - dist / 120)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          });
        }
      });

      animationId = window.requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
  };

  return (
    <main
      style={{
        background: "#020408",
        color: "#f0f4f8",
        fontFamily: "var(--font-geist-sans), sans-serif",
        overflowX: "hidden",
        minHeight: "100vh",
      }}
    >
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        * {
          scrollbar-width: thin;
          scrollbar-color: #00d4ff #020408;
        }

        *::-webkit-scrollbar {
          width: 8px;
        }

        *::-webkit-scrollbar-track {
          background: #020408;
        }

        *::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #00d4ff, #7c3aed);
          border-radius: 999px;
        }

        ::selection {
          background: rgba(0, 212, 255, 0.35);
          color: #f0f4f8;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(0, 212, 255, 0.45);
          }
          50% {
            transform: scale(1.15);
            box-shadow: 0 0 0 10px rgba(0, 212, 255, 0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-140%);
          }
          100% {
            transform: translateX(140%);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-14px);
          }
        }

        @keyframes float1 {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(30px, -30px);
          }
        }

        @keyframes float2 {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-20px, 20px);
          }
        }

        @keyframes float3 {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(20px, -20px);
          }
        }

        @keyframes meshMove {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(2%, -3%, 0) scale(1.08);
          }
          100% {
            transform: translate3d(-2%, 2%, 0) scale(1);
          }
        }

        @keyframes typewriter {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        @keyframes blink {
          0%, 100% {
            border-color: transparent;
          }
          50% {
            border-color: rgba(0, 212, 255, 0.8);
          }
        }

        @keyframes bounceArrow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(8px);
          }
        }
      `}</style>

      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          opacity: 0.6,
          pointerEvents: "none",
        }}
      />

      <Sidebar
        sidebarWidth={sidebarWidth}
        sidebarExpanded={sidebarExpanded}
        activeSection={activeSection}
        showClientCabinet={showClientCabinet}
        showSettings={showSettings}
        showTeam={showTeam}
        onToggleSidebar={() => setSidebarExpanded((value) => !value)}
        onScrollTo={scrollTo}
        onOpenClientCabinet={() => setShowClientCabinet(true)}
        onOpenSettings={() => setShowSettings(true)}
        onOpenTeam={() => setShowTeam(true)}
      />

      <div style={{ marginLeft: sidebarWidth, transition: "margin-left 0.3s ease", position: "relative", zIndex: 1 }}>
        <nav
          style={{
            position: "fixed",
            top: 0,
            left: sidebarWidth,
            right: 0,
            zIndex: 100,
            padding: "1rem 2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: scrolled ? "rgba(10,15,26,0.72)" : "transparent",
            backdropFilter: scrolled ? "blur(20px)" : "none",
            borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
            boxShadow: scrolled ? "0 12px 40px rgba(0,0,0,0.24)" : "none",
            transition: "all 0.3s ease, left 0.3s ease",
          }}
        >
          <div style={{ fontSize: "1.18rem", fontWeight: 800, letterSpacing: "-0.03em" }}>
            <span style={{ color: "#00d4ff" }}>Dasturlash</span>
            <span style={{ color: "#f0f4f8" }}> departamenti</span>
          </div>

          <div style={{ display: "flex", gap: "1.7rem", alignItems: "center" }}>
            {[
              { label: "Xizmatlar", id: "services" },
              { label: "Haqimizda", id: "about" },
              { label: "Loyihalar", id: "projects" },
              { label: "Bog'lanish", id: "contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{
                  background: "none",
                  border: "none",
                  color: activeSection === item.id ? "#f0f4f8" : "rgba(255,255,255,0.65)",
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  position: "relative",
                  paddingBottom: "0.25rem",
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.color = "#f0f4f8";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.color = activeSection === item.id ? "#f0f4f8" : "rgba(255,255,255,0.65)";
                }}
              >
                {item.label}
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    height: "2px",
                    width: activeSection === item.id ? "100%" : "0%",
                    background: "linear-gradient(90deg, #00d4ff, #7c3aed)",
                    transition: "width 0.25s ease",
                  }}
                />
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollTo("contact")}
            style={{
              padding: "0.8rem 1.4rem",
              borderRadius: "999px",
              background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
              cursor: "pointer",
              fontFamily: "inherit",
              fontWeight: 700,
              boxShadow: "0 0 0 rgba(0,212,255,0)",
              transition: "transform 0.2s ease, box-shadow 0.3s ease",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.transform = "translateY(-2px)";
              event.currentTarget.style.boxShadow = "0 12px 30px rgba(0,212,255,0.25)";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.transform = "translateY(0)";
              event.currentTarget.style.boxShadow = "0 0 0 rgba(0,212,255,0)";
            }}
          >
            <span
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                animation: "shimmer 2.6s linear infinite",
              }}
            />
            <span style={{ position: "relative" }}>Murojaat →</span>
          </button>
        </nav>

        <section
          id="home"
          style={{
            minHeight: "100vh",
            position: "relative",
            zIndex: 1,
            overflow: "hidden",
            padding: "8.5rem 2rem 5rem",
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <div style={{ maxWidth: "1220px", margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(320px, 0.8fr)", gap: "2rem", alignItems: "start" }}>
              <div style={{ animation: "fadeInUp 0.8s ease both", paddingTop: "4rem" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.7rem",
                    padding: "0.55rem 1rem",
                    borderRadius: "999px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.04)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
                    marginBottom: "1.4rem",
                  }}
                >
                  <span
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: "#00d4ff",
                      animation: "pulse 1.8s ease-in-out infinite",
                    }}
                  />
                  <span style={{ color: "#f0f4f8", fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    Online | Toshkent, Uzbekiston
                  </span>
                </div>

                <h1
                  style={{
                    fontSize: "clamp(2.8rem, 5vw, 4rem)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.05em",
                    marginBottom: "1.4rem",
                    maxWidth: "560px",
                  }}
                >
                  <span style={{ display: "block", color: "#f0f4f8" }}>Premium darajadagi</span>
                  <span style={{ display: "block", background: "linear-gradient(135deg, #00d4ff, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    raqamli yechimlar
                  </span>
                </h1>

                <div style={{ maxWidth: "640px", marginBottom: "2rem" }}>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.45)",
                      fontSize: "1.08rem",
                      lineHeight: 1.8,
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      borderRight: "2px solid rgba(0,212,255,0.8)",
                      animation: "typewriter 3s steps(60, end) 0.3s both, blink 0.8s step-end infinite",
                    }}
                  >
                    Veb-sayt, mobil ilova, telegram bot va UI/UX dizayn xizmatlarini yuqori darajada taqdim etamiz.
                  </p>
                </div>

                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
                  <button
                    onClick={() => scrollTo("services")}
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      padding: "1rem 1.6rem",
                      borderRadius: "14px",
                      border: "1px solid rgba(255,255,255,0.08)",
                      background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
                      color: "#fff",
                      fontSize: "1rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      boxShadow: "0 18px 40px rgba(0,212,255,0.18)",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    }}
                    onMouseEnter={(event) => {
                      event.currentTarget.style.transform = "translateY(-2px)";
                      event.currentTarget.style.boxShadow = "0 22px 48px rgba(0,212,255,0.28)";
                    }}
                    onMouseLeave={(event) => {
                      event.currentTarget.style.transform = "translateY(0)";
                      event.currentTarget.style.boxShadow = "0 18px 40px rgba(0,212,255,0.18)";
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
                        animation: "shimmer 2.8s linear infinite",
                      }}
                    />
                    <span style={{ position: "relative" }}>Xizmatlarni ko&apos;rish →</span>
                  </button>

                  <button
                    onClick={() => scrollTo("contact")}
                    style={{
                      padding: "1rem 1.6rem",
                      borderRadius: "14px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      background: "rgba(255,255,255,0.03)",
                      color: "#f0f4f8",
                      fontSize: "1rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      backdropFilter: "blur(10px)",
                      transition: "background 0.2s ease, border-color 0.2s ease, transform 0.2s ease",
                    }}
                    onMouseEnter={(event) => {
                      event.currentTarget.style.background = "rgba(255,255,255,0.06)";
                      event.currentTarget.style.borderColor = "rgba(0,212,255,0.45)";
                      event.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(event) => {
                      event.currentTarget.style.background = "rgba(255,255,255,0.03)";
                      event.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                      event.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    Bepul maslahat
                  </button>
                </div>

                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  {[
                    "Strategiya + Dizayn + Development",
                    "Next.js, React, React Native",
                    "Tezkor ishga tushirish va qo'llab-quvvatlash",
                  ].map((tag) => (
                    <div
                      key={tag}
                      style={{
                        padding: "0.7rem 1rem",
                        borderRadius: "999px",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        color: "rgba(255,255,255,0.62)",
                        fontSize: "0.88rem",
                      }}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ position: "relative", minHeight: "540px", animation: "fadeInUp 0.95s ease both" }}>
                <div
                  style={{
                    position: "absolute",
                    inset: "8% 0 10% 8%",
                    borderRadius: "32px",
                    background: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                    border: "1px solid rgba(255,255,255,0.06)",
                    backdropFilter: "blur(16px)",
                    boxShadow: "0 30px 60px rgba(0,0,0,0.28)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "radial-gradient(circle at top left, rgba(0,212,255,0.2), transparent 40%), radial-gradient(circle at bottom right, rgba(124,58,237,0.22), transparent 42%)",
                    }}
                  />
                  <div style={{ position: "relative", padding: "1.5rem", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                        <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f56" }} />
                        <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ffbd2e" }} />
                        <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#27c93f" }} />
                      </div>
                      <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.88rem", marginBottom: "1rem" }}>Dasturlash departamenti / dashboard</div>
                      <div style={{ display: "grid", gap: "0.9rem" }}>
                        {[
                          { label: "Konversiya", value: "+38%" },
                          { label: "Yuklanish tezligi", value: "0.9s" },
                          { label: "Foydalanuvchi faolligi", value: "+62%" },
                        ].map((item) => (
                          <div
                            key={item.label}
                            style={{
                              padding: "1rem 1.1rem",
                              borderRadius: "18px",
                              background: "rgba(255,255,255,0.04)",
                              border: "1px solid rgba(255,255,255,0.06)",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <span style={{ color: "rgba(255,255,255,0.55)" }}>{item.label}</span>
                            <strong style={{ color: "#f0f4f8", fontSize: "1rem" }}>{item.value}</strong>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "1rem" }}>
                      {stats.slice(0, 2).map((item, index) => (
                        <div
                          key={item.label}
                          style={{
                            padding: "1rem",
                            borderRadius: "20px",
                            background: "rgba(10,15,26,0.75)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
                            animation: `float ${4 + index}s ease-in-out infinite`,
                          }}
                        >
                          <div style={{ fontSize: "2rem", fontWeight: 800, color: index === 0 ? "#00d4ff" : "#7c3aed" }}>
                            {countValues[index]}
                            {item.suffix}
                          </div>
                          <div style={{ color: "rgba(255,255,255,0.45)" }}>{item.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    position: "absolute",
                    top: "2rem",
                    right: 0,
                    width: "190px",
                    padding: "1rem",
                    borderRadius: "20px",
                    background: "rgba(10,15,26,0.85)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    boxShadow: "0 18px 40px rgba(0,0,0,0.22)",
                    backdropFilter: "blur(14px)",
                    animation: "float 5s ease-in-out infinite",
                  }}
                >
                  <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", marginBottom: "0.4rem" }}>Live status</div>
                  <div style={{ color: "#f0f4f8", fontWeight: 700, marginBottom: "0.35rem" }}>Loyihalar real vaqt rejimida nazoratda</div>
                  <div style={{ color: "#00d4ff", fontSize: "0.9rem" }}>Deployment • Design • QA</div>
                </div>

                <div
                  style={{
                    position: "absolute",
                    bottom: "1rem",
                    left: 0,
                    width: "210px",
                    padding: "1rem 1.1rem",
                    borderRadius: "20px",
                    background: "rgba(10,15,26,0.85)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    boxShadow: "0 18px 40px rgba(0,0,0,0.22)",
                    backdropFilter: "blur(14px)",
                    animation: "float 6s ease-in-out infinite reverse",
                  }}
                >
                  <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", marginBottom: "0.4rem" }}>Agency score</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <strong style={{ fontSize: "2rem", color: "#f0f4f8" }}>9.8</strong>
                    <span style={{ color: "#00d4ff", fontWeight: 700 }}>Excellent</span>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                position: "absolute",
                bottom: "1.5rem",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.45rem",
                color: "rgba(255,255,255,0.35)",
                fontSize: "0.78rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              <span>Pastga aylantiring</span>
              <span style={{ animation: "bounceArrow 1.8s ease-in-out infinite" }}>↓</span>
            </div>
          </div>
        </section>

        <section
          style={{
            padding: "2.5rem 2rem",
            position: "relative",
            zIndex: 1,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "1rem" }}>
            {stats.map((item, index) => (
              <div
                key={item.label}
                style={{
                  textAlign: "center",
                  padding: "1.4rem 1rem",
                  borderRight: index !== stats.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}
              >
                <div style={{ fontSize: "clamp(2rem, 3.4vw, 3.2rem)", fontWeight: 800, color: index % 2 === 0 ? "#00d4ff" : "#f0f4f8" }}>
                  {countValues[index]}
                  {item.suffix}
                </div>
                <div style={{ color: "rgba(255,255,255,0.45)", marginTop: "0.35rem" }}>{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="services" style={{ padding: "7rem 2rem 6rem", animation: "fadeInUp 0.8s ease both", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <p style={{ color: "#00d4ff", fontSize: "0.9rem", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "0.9rem" }}>Xizmatlar</p>
              <h2 style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", letterSpacing: "-0.04em", marginBottom: "1rem" }}>Raqamli mahsulotni boshidan oxirigacha yaratamiz</h2>
              <div style={{ width: "120px", height: "4px", margin: "0 auto", borderRadius: "999px", background: "linear-gradient(90deg, #00d4ff, #7c3aed)" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
              {services.map((service) => (
                <div
                  key={service.title}
                  style={{
                    position: "relative",
                    padding: "2rem",
                    borderRadius: "22px",
                    background: "rgba(255,255,255,0.03)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    overflow: "hidden",
                    transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                    boxShadow: "0 18px 40px rgba(0,0,0,0.16)",
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.transform = "translateY(-8px)";
                    event.currentTarget.style.borderColor = `${service.color}66`;
                    event.currentTarget.style.boxShadow = `0 22px 50px ${service.color}22`;
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.transform = "translateY(0)";
                    event.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                    event.currentTarget.style.boxShadow = "0 18px 40px rgba(0,0,0,0.16)";
                  }}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: service.color }} />
                  <div
                    style={{
                      width: "58px",
                      height: "58px",
                      borderRadius: "18px",
                      display: "grid",
                      placeItems: "center",
                      background: `${service.color}1f`,
                      color: service.color,
                      fontSize: "1.75rem",
                      marginBottom: "1.35rem",
                    }}
                  >
                    {service.icon}
                  </div>
                  <h3 style={{ fontSize: "1.28rem", marginBottom: "0.85rem" }}>{service.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.75 }}>{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" style={{ padding: "6.5rem 2rem", borderTop: "1px solid rgba(255,255,255,0.06)", animation: "fadeInUp 0.9s ease both", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "1140px", margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0, 1.05fr) minmax(320px, 0.95fr)", gap: "2rem", alignItems: "start" }}>
            <div>
              <p style={{ color: "#00d4ff", fontSize: "0.9rem", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "0.85rem" }}>Biz haqimizda</p>
              <h2 style={{ fontSize: "clamp(2.1rem, 4vw, 3.4rem)", lineHeight: 1.08, letterSpacing: "-0.04em", marginBottom: "1.2rem" }}>Dasturlash departamenti biznesingiz uchun yuqori klass mahsulotlar yaratadi</h2>
              <p style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.85, marginBottom: "1rem", fontSize: "1.02rem" }}>
                Biz Toshkentdagi premium dasturlash jamoasimiz. 15 dan ortiq muvaffaqiyatli loyihalar orqali mahsulot strategiyasi, dizayn va developmentni yagona tizimga aylantirdik.
              </p>
              <p style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.85, marginBottom: "1.7rem", fontSize: "1.02rem" }}>
                Har bir loyiha foydalanuvchi tajribasi, tezlik, konversiya va texnik sifat mezonlari asosida ishlab chiqiladi.
              </p>

              <div style={{ display: "grid", gap: "1rem" }}>
                {achievementItems.map((item, index) => (
                  <div key={item} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: index === 1 ? "rgba(124,58,237,0.22)" : "rgba(0,212,255,0.18)", color: index === 1 ? "#c4b5fd" : "#00d4ff", display: "grid", placeItems: "center", flexShrink: 0 }}>
                      {index + 1}
                    </div>
                    <div style={{ color: "rgba(255,255,255,0.62)", lineHeight: 1.7 }}>{item}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "1rem" }}>
              {[
                { icon: "⚡", title: "Tez yetkazish", desc: "Samarali sprint va shaffof jarayonlar" },
                { icon: "🧠", title: "Strategik yondashuv", desc: "Biznes maqsadiga mos product thinking" },
                { icon: "🛡️", title: "Sifat nazorati", desc: "Kod review, test va monitoring jarayoni" },
                { icon: "📈", title: "O'sish fokus", desc: "SEO, analytics va conversion optimizatsiyasi" },
              ].map((feature, index) => (
                <div
                  key={feature.title}
                  style={{
                    padding: "1.35rem",
                    borderRadius: "20px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
                  }}
                >
                  <div style={{ width: "48px", height: "48px", borderRadius: "14px", display: "grid", placeItems: "center", fontSize: "1.35rem", marginBottom: "1rem", background: index % 2 === 0 ? "linear-gradient(135deg, rgba(0,212,255,0.24), rgba(0,212,255,0.06))" : "linear-gradient(135deg, rgba(124,58,237,0.24), rgba(124,58,237,0.06))" }}>
                    {feature.icon}
                  </div>
                  <div style={{ fontWeight: 700, marginBottom: "0.45rem" }}>{feature.title}</div>
                  <div style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.7, fontSize: "0.92rem" }}>{feature.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ProjectsSection />

        <section id="contact" style={{ padding: "6.5rem 2rem 5.5rem", animation: "fadeInUp 1s ease both", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "580px", margin: "0 auto", textAlign: "center" }}>
            <p style={{ color: "#00d4ff", fontSize: "0.9rem", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "0.85rem" }}>Bog&apos;lanish</p>
            <h2 style={{ fontSize: "clamp(2.1rem, 4vw, 3.2rem)", letterSpacing: "-0.04em", marginBottom: "1rem" }}>Loyihangizni premium darajada boshlaylik</h2>
            <p style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: "2.25rem" }}>Bepul maslahat uchun yozing. Biz sizning g&apos;oyangizni aniq product reja, dizayn va development jarayoniga aylantiramiz.</p>

            <div style={{ display: "grid", gap: "1rem" }}>
              {["Ismingiz", "Telefon raqamingiz", "Loyihangiz haqida qisqacha yozing..."].map((placeholder, index) => {
                const sharedStyle = {
                  width: "100%",
                  padding: "1rem 1.15rem",
                  borderRadius: "16px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#f0f4f8",
                  fontSize: "1rem",
                  fontFamily: "inherit",
                  outline: "none",
                  backdropFilter: "blur(10px)",
                  transition: "border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",
                };

                if (index === 2) {
                  return (
                    <textarea
                      key={placeholder}
                      placeholder={placeholder}
                      rows={5}
                      style={{ ...sharedStyle, resize: "none" }}
                      onFocus={(event) => {
                        event.currentTarget.style.borderColor = "rgba(0,212,255,0.55)";
                        event.currentTarget.style.boxShadow = "0 0 0 4px rgba(0,212,255,0.12)";
                        event.currentTarget.style.background = "rgba(255,255,255,0.06)";
                      }}
                      onBlur={(event) => {
                        event.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                        event.currentTarget.style.boxShadow = "none";
                        event.currentTarget.style.background = "rgba(255,255,255,0.04)";
                      }}
                    />
                  );
                }

                return (
                  <input
                    key={placeholder}
                    type={index === 1 ? "tel" : "text"}
                    placeholder={placeholder}
                    style={sharedStyle}
                    onFocus={(event) => {
                      event.currentTarget.style.borderColor = "rgba(0,212,255,0.55)";
                      event.currentTarget.style.boxShadow = "0 0 0 4px rgba(0,212,255,0.12)";
                      event.currentTarget.style.background = "rgba(255,255,255,0.06)";
                    }}
                    onBlur={(event) => {
                      event.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                      event.currentTarget.style.boxShadow = "none";
                      event.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    }}
                  />
                );
              })}

              <button
                style={{
                  position: "relative",
                  overflow: "hidden",
                  width: "100%",
                  padding: "1rem 1.25rem",
                  background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
                  border: "none",
                  color: "#fff",
                  fontSize: "1rem",
                  borderRadius: "16px",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontWeight: 700,
                  boxShadow: "0 18px 34px rgba(0,212,255,0.16)",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.26), transparent)",
                    animation: "shimmer 2.6s linear infinite",
                  }}
                />
                <span style={{ position: "relative" }}>Murojaat yuborish →</span>
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem", marginTop: "2rem" }}>
              {[
                { icon: "📱", title: "Telegram", value: "+998 93 822 93 13", href: "https://t.me/+998938229313" },
                { icon: "📧", title: "Email", value: "ulugbekrakximov4@gmail.com", href: "mailto:ulugbekrakximov4@gmail.com" },
                { icon: "📍", title: "Lokatsiya", value: "Toshkent, Uzbekiston", href: undefined },
              ].map((card) => {
                const content = (
                  <div
                    style={{
                      padding: "1.15rem",
                      borderRadius: "18px",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      textAlign: "left",
                      minHeight: "130px",
                    }}
                  >
                    <div style={{ fontSize: "1.4rem", marginBottom: "0.8rem" }}>{card.icon}</div>
                    <div style={{ color: "#f0f4f8", fontWeight: 700, marginBottom: "0.35rem" }}>{card.title}</div>
                    <div style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.65 }}>{card.value}</div>
                  </div>
                );

                return card.href ? (
                  <a key={card.title} href={card.href} style={{ textDecoration: "none" }}>
                    {content}
                  </a>
                ) : (
                  <div key={card.title}>{content}</div>
                );
              })}
            </div>
          </div>
        </section>

        <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "2rem", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "1140px", margin: "0 auto", display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ color: "rgba(255,255,255,0.32)", fontSize: "0.9rem" }}>
              © 2025 Dasturlash departamenti. Barcha huquqlar himoyalangan. · Toshkent, Uzbekiston
            </div>
            <div style={{ display: "flex", gap: "0.8rem", alignItems: "center" }}>
              {[
                { label: "Telegram", href: "https://t.me/+998938229313" },
                { label: "Email", href: "mailto:ulugbekrakximov4@gmail.com" },
                { label: "GitHub", href: "https://github.com/ulugbekrahimov9313-sudo" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    color: "rgba(255,255,255,0.45)",
                    textDecoration: "none",
                    padding: "0.55rem 0.9rem",
                    borderRadius: "999px",
                    border: "1px solid rgba(255,255,255,0.06)",
                    background: "rgba(255,255,255,0.02)",
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.color = "#00d4ff";
                    event.currentTarget.style.borderColor = "rgba(0,212,255,0.35)";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.color = "rgba(255,255,255,0.45)";
                    event.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>

      <ClientCabinet open={showClientCabinet} onClose={() => setShowClientCabinet(false)} onScrollToContact={() => scrollTo("contact")} />

      {showSettings ? (
        <div
          onClick={() => setShowSettings(false)}
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
              maxWidth: "520px",
              background: "rgba(10,15,26,0.98)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "24px",
              padding: "1.5rem",
              boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>Sozlamalar</h3>
              <button onClick={() => setShowSettings(false)} style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer", fontSize: "1.2rem" }}>✕</button>
            </div>
            <div style={{ display: "grid", gap: "1.25rem" }}>
              <div style={{ padding: "1rem", background: "rgba(255,255,255,0.03)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontSize: "0.95rem", fontWeight: 600, marginBottom: "0.75rem" }}>Mavzu</div>
                <button
                  onClick={() => setDarkMode((value) => !value)}
                  style={{
                    padding: "0.8rem 1rem",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: darkMode ? "rgba(0,212,255,0.12)" : "rgba(124,58,237,0.16)",
                    color: "#fff",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  {darkMode ? "Dark mode" : "Light mode"}
                </button>
              </div>
              <div style={{ padding: "1rem", background: "rgba(255,255,255,0.03)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontSize: "0.95rem", fontWeight: 600, marginBottom: "0.75rem" }}>Til</div>
                <select
                  value={language}
                  onChange={(event) => setLanguage(event.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.9rem 1rem",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.05)",
                    color: "#fff",
                    fontFamily: "inherit",
                    outline: "none",
                  }}
                >
                  <option value="O'zbek">O&apos;zbek</option>
                  <option value="Русский">Русский</option>
                  <option value="English">English</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <TeamModal open={showTeam} onClose={() => setShowTeam(false)} />
    </main>
  );
}
