"use client";

import { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";

const services = [
  {
    icon: "🌐",
    title: "Veb-sayt",
    desc: "Tez, zamonaviy va SEO uchun tayyor korporativ hamda landing sahifalar.",
  },
  {
    icon: "📱",
    title: "Mobil ilova",
    desc: "Android va iOS uchun qulay mahsulotlar va ichki tizimlar.",
  },
  {
    icon: "🤖",
    title: "Bot va avtomatlashtirish",
    desc: "Telegram bot, CRM integratsiya va jarayonlarni soddalashtirish.",
  },
  {
    icon: "🎨",
    title: "UI/UX dizayn",
    desc: "Sodda, tushunarli va foydalanuvchiga mos interfeyslar.",
  },
];

const stats = [
  { value: "15+", label: "Loyiha" },
  { value: "10+", label: "Mijoz" },
  { value: "2+", label: "Yil tajriba" },
  { value: "100%", label: "Mas'uliyat" },
];

const projects = [
  "Korporativ saytlar",
  "Ichki boshqaruv panellari",
  "Mobil xizmat ilovalari",
  "Telegram bot loyihalari",
];

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [showClientCabinet, setShowClientCabinet] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showTeam, setShowTeam] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const sidebarWidth = isMobile ? "0" : sidebarExpanded ? "240px" : "70px";
  const sidebarOverlayWidth = sidebarExpanded ? "240px" : "0";

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);

    return () => {
      window.removeEventListener("resize", check);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      setSidebarExpanded(false);
    }
  }, [isMobile]);

  useEffect(() => {
    const updateScrollState = () => {
      setScrolled(window.scrollY > 16);

      const sections = ["home", "services", "about", "projects", "contact"];
      let nextSection = "home";

      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (!element) {
          return;
        }

        const rect = element.getBoundingClientRect();
        if (rect.top <= 160) {
          nextSection = id;
        }
      });

      setActiveSection(nextSection);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollState);
    };
  }, []);

  useEffect(() => {
    let animationFrameId = 0;

    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%dasturlash";
        const fontSize = 13;
        let drops: number[] = [];
        const particles: { x: number; y: number; vx: number; vy: number; size: number; color: string }[] = [];

        const initializeParticles = (width: number, height: number) => {
          particles.length = 0;

          for (let index = 0; index < 70; index += 1) {
            particles.push({
              x: Math.random() * width,
              y: Math.random() * height,
              vx: (Math.random() - 0.5) * 0.7,
              vy: (Math.random() - 0.5) * 0.7,
              size: Math.random() * 2 + 0.5,
              color: Math.random() > 0.5 ? "#00d4ff" : "#7c3aed",
            });
          }
        };

        const resizeCanvas = () => {
          const dpr = window.devicePixelRatio || 1;
          const width = window.innerWidth;
          const height = window.innerHeight;

          canvas.width = Math.floor(width * dpr);
          canvas.height = Math.floor(height * dpr);
          canvas.style.width = `${width}px`;
          canvas.style.height = `${height}px`;

          context.setTransform(1, 0, 0, 1, 0, 0);
          context.scale(dpr, dpr);

          drops = Array(Math.max(1, Math.floor(width / fontSize))).fill(1);
          initializeParticles(width, height);
        };

        const draw = () => {
          const width = window.innerWidth;
          const height = window.innerHeight;

          context.fillStyle = "rgba(2,4,8,0.06)";
          context.fillRect(0, 0, width, height);
          context.font = `${fontSize}px monospace`;

          for (let index = 0; index < drops.length; index += 1) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            context.fillStyle = `rgba(0,212,255,${Math.random() * 0.12 + 0.02})`;
            context.fillText(char, index * fontSize, drops[index] * fontSize);

            if (drops[index] * fontSize > height && Math.random() > 0.975) {
              drops[index] = 0;
            }

            drops[index] += 1;
          }

          particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0 || particle.x > width) {
              particle.vx *= -1;
            }

            if (particle.y < 0 || particle.y > height) {
              particle.vy *= -1;
            }

            context.beginPath();
            context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            context.fillStyle = particle.color;
            context.fill();

            particles.slice(index + 1).forEach((nextParticle) => {
              const distance = Math.hypot(particle.x - nextParticle.x, particle.y - nextParticle.y);

              if (distance < 110) {
                context.beginPath();
                context.moveTo(particle.x, particle.y);
                context.lineTo(nextParticle.x, nextParticle.y);
                context.strokeStyle = `rgba(0,212,255,${0.12 * (1 - distance / 110)})`;
                context.lineWidth = 0.5;
                context.stroke();
              }
            });
          });

          animationFrameId = window.requestAnimationFrame(draw);
        };

        resizeCanvas();
        draw();
        window.addEventListener("resize", resizeCanvas);

        return () => {
          window.cancelAnimationFrame(animationFrameId);
          window.removeEventListener("resize", resizeCanvas);
          context.clearRect(0, 0, canvas.width, canvas.height);
        };
      }
    }

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    if (isMobile) {
      setSidebarExpanded(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarExpanded((current) => !current);
  };

  const openClientCabinet = () => {
    setShowClientCabinet(true);
  };

  const closeClientCabinet = () => {
    setShowClientCabinet(false);
  };

  const openSettings = () => {
    setShowSettings(true);
  };

  const closeSettings = () => {
    setShowSettings(false);
  };

  const openTeam = () => {
    setShowTeam(true);
  };

  const closeTeam = () => {
    setShowTeam(false);
  };

  const goToAdmin = () => {
    window.location.href = "/admin";
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020408",
        color: "#f0f4f8",
        overflowX: "hidden",
        fontFamily: "var(--font-geist-sans), sans-serif",
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .sidebar {
            width: 0 !important;
            overflow: hidden !important;
          }
          .main-content {
            margin-left: 0 !important;
          }
          .navbar-links {
            display: none !important;
          }
          .hero-title {
            font-size: 2rem !important;
          }
          .hero-card {
            display: none !important;
          }
          .hero-buttons {
            flex-direction: column !important;
            width: 100% !important;
          }
          .stats-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .services-grid {
            grid-template-columns: 1fr !important;
          }
          .about-grid {
            grid-template-columns: 1fr !important;
          }
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
          .modal-box {
            width: 95vw !important;
            padding: 1.5rem !important;
          }
          .hamburger-btn {
            display: block !important;
            position: fixed;
            top: 1rem;
            left: 1rem;
            z-index: 999;
            background: rgba(0, 212, 255, 0.2);
            border: none;
            color: white;
            font-size: 1.5rem;
            padding: 0.5rem;
            border-radius: 8px;
            cursor: pointer;
          }
        }
        @media (min-width: 769px) {
          .hamburger-btn {
            display: none !important;
          }
        }
      `}</style>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #020408;
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
          opacity: 0.75,
          pointerEvents: "none",
        }}
      />

      <Sidebar
        className="sidebar"
        isMobile={isMobile}
        sidebarWidth={isMobile ? sidebarOverlayWidth : sidebarWidth}
        sidebarExpanded={sidebarExpanded}
        activeSection={activeSection}
        showClientCabinet={showClientCabinet}
        showSettings={showSettings}
        showTeam={showTeam}
        onToggleSidebar={toggleSidebar}
        onScrollTo={scrollToSection}
        onOpenClientCabinet={openClientCabinet}
        onOpenSettings={openSettings}
        onOpenTeam={openTeam}
        onOpenAdmin={goToAdmin}
      />

      {isMobile ? (
        <button
          onClick={toggleSidebar}
          className="hamburger-btn"
          style={{
            position: "fixed",
            top: "1rem",
            left: "1rem",
            zIndex: 130,
            width: "46px",
            height: "46px",
            borderRadius: "14px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(8, 15, 25, 0.95)",
            color: "#fff",
            cursor: "pointer",
          }}
          aria-label={sidebarExpanded ? "Menyuni yopish" : "Menyuni ochish"}
        >
          {sidebarExpanded ? "✕" : "☰"}
        </button>
      ) : null}

      <div
        className="main-content"
        style={{
          position: "relative",
          zIndex: 1,
          marginLeft: isMobile ? "0" : sidebarWidth,
          transition: "margin-left 0.2s ease",
        }}
      >
        <nav
          style={{
            position: "fixed",
            top: 0,
            left: isMobile ? 0 : sidebarWidth,
            right: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: isMobile ? "flex-start" : "space-between",
            padding: isMobile ? "1rem 1rem 1rem 4.5rem" : "1rem 2rem",
            background: scrolled ? "rgba(8, 15, 25, 0.92)" : "rgba(8, 15, 25, 0.72)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(8px)",
            transition: "left 0.2s ease",
          }}
        >
          <div style={{ fontSize: "1.1rem", fontWeight: 800 }}>
            <span style={{ color: "#00d4ff" }}>Dasturlash</span>
            <span> departamenti</span>
          </div>

          {!isMobile ? (
            <div className="navbar-links" style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
              {[
                { label: "Xizmatlar", id: "services" },
                { label: "Haqimizda", id: "about" },
                { label: "Bog'lanish", id: "contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  style={{
                    border: "none",
                    background: "transparent",
                    color: activeSection === item.id ? "#00d4ff" : "#f0f4f8",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontSize: "0.95rem",
                  }}
                >
                  {item.label}
                </button>
              ))}

              <button
                onClick={() => scrollToSection("contact")}
                style={{
                  padding: "0.8rem 1.2rem",
                  borderRadius: "999px",
                  border: "none",
                  background: "#00d4ff",
                  color: "#021018",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontWeight: 700,
                }}
              >
                Murojaat
              </button>
            </div>
          ) : null}
        </nav>

        <section
          id="home"
          style={{
            padding: isMobile ? "5rem 1rem" : "8rem 2rem 4rem",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ maxWidth: "1120px", width: "100%", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.2fr 0.8fr", gap: "2rem" }}>
              <div>
                <div
                  style={{
                    display: "inline-block",
                    padding: "0.5rem 0.85rem",
                    borderRadius: "999px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    marginBottom: "1rem",
                    color: "#00d4ff",
                    fontSize: "0.85rem",
                  }}
                >
                  Tezkor va ishlaydigan yechimlar
                </div>

                <h1 className="hero-title" style={{ fontSize: isMobile ? "2rem" : "clamp(2.8rem, 5vw, 4rem)", lineHeight: 1.05, margin: "0 0 1rem" }}>
                  Muzlamaydigan, sodda va ishlaydigan web yechimlar.
                </h1>

                <p style={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.8, maxWidth: "640px", marginBottom: "1.5rem" }}>
                  Sahifa yengillashtirildi: asosiy tugmalar saqlandi, sidebar ishlaydi, modallar oddiylashtirildi va ortiqcha animatsiyalar vaqtincha olib tashlandi.
                </p>

                <div className="hero-buttons" style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: "1rem" }}>
                  <button
                    onClick={() => scrollToSection("services")}
                    style={{
                      padding: "1rem 1.2rem",
                      width: isMobile ? "100%" : undefined,
                      borderRadius: "14px",
                      border: "none",
                      background: "#00d4ff",
                      color: "#021018",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      fontWeight: 700,
                    }}
                  >
                    Xizmatlarni ko'rish
                  </button>
                  <button
                    onClick={() => scrollToSection("contact")}
                    style={{
                      padding: "1rem 1.2rem",
                      width: isMobile ? "100%" : undefined,
                      borderRadius: "14px",
                      border: "1px solid rgba(255,255,255,0.14)",
                      background: "rgba(255,255,255,0.04)",
                      color: "#f0f4f8",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      fontWeight: 700,
                    }}
                  >
                    Bepul maslahat
                  </button>
                </div>
              </div>

              {!isMobile ? (
                <div
                  className="hero-card"
                  style={{
                    padding: "1.5rem",
                    borderRadius: "24px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <h2 style={{ marginTop: 0, marginBottom: "1rem", fontSize: "1.25rem" }}>Hozirgi ustuvorlik</h2>
                  <div style={{ display: "grid", gap: "0.75rem" }}>
                    <div style={{ padding: "0.9rem", borderRadius: "14px", background: "rgba(0,212,255,0.08)" }}>Tugmalar to'liq ishlaydi</div>
                    <div style={{ padding: "0.9rem", borderRadius: "14px", background: "rgba(255,255,255,0.04)" }}>Sidebar sodda va barqaror</div>
                    <div style={{ padding: "0.9rem", borderRadius: "14px", background: "rgba(255,255,255,0.04)" }}>Sahifa yengilroq render qiladi</div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section style={{ padding: isMobile ? "2rem 1rem" : "2rem", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="stats-grid" style={{ maxWidth: "1120px", margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: "1rem" }}>
            {stats.map((item) => (
              <div key={item.label} style={{ padding: "1rem", textAlign: "center", background: "rgba(255,255,255,0.03)", borderRadius: "18px" }}>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "#00d4ff" }}>{item.value}</div>
                <div style={{ color: "rgba(255,255,255,0.72)" }}>{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="services" style={{ padding: isMobile ? "4rem 1rem" : "5rem 2rem" }}>
          <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
            <h2 style={{ fontSize: isMobile ? "1.8rem" : "2.6rem", marginBottom: "1.5rem" }}>Xizmatlar</h2>
            <div className="services-grid" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
              {services.map((service) => (
                <div key={service.title} style={{ padding: "1.25rem", borderRadius: "20px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ fontSize: "1.6rem", marginBottom: "0.75rem" }}>{service.icon}</div>
                  <h3 style={{ marginTop: 0, marginBottom: "0.6rem" }}>{service.title}</h3>
                  <p style={{ margin: 0, color: "rgba(255,255,255,0.72)", lineHeight: 1.7 }}>{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" style={{ padding: isMobile ? "4rem 1rem" : "5rem 2rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="about-grid" style={{ maxWidth: "1120px", margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1.5rem" }}>
            <div>
              <h2 style={{ fontSize: isMobile ? "1.8rem" : "2.6rem", marginTop: 0 }}>Biz haqimizda</h2>
              <p style={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.8 }}>
                Biznes uchun tez ishga tushadigan va keyin kengaytirish oson bo'lgan web mahsulotlar yaratamiz. Bu versiyada barqarorlik birinchi o'ringa qo'yildi.
              </p>
            </div>
            <div style={{ padding: "1.25rem", borderRadius: "20px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ marginBottom: "0.8rem", fontWeight: 700 }}>Asosiy yondashuv</div>
              <div style={{ display: "grid", gap: "0.75rem" }}>
                <div>Sodda UI</div>
                <div>Ishlaydigan navigatsiya</div>
                <div>Yengil render</div>
                <div>Minimal state</div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" style={{ padding: isMobile ? "4rem 1rem" : "5rem 2rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
            <h2 style={{ fontSize: isMobile ? "1.8rem" : "2.6rem", marginBottom: "1.5rem" }}>Loyihalar</h2>
            <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "1rem" }}>
              {projects.map((project) => (
                <div key={project} style={{ padding: "1.25rem", borderRadius: "20px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  {project}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" style={{ padding: isMobile ? "3rem 1rem" : "6rem 2rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            <h2 style={{ fontSize: isMobile ? "1.8rem" : "2.6rem", marginBottom: "1rem" }}>Bog'lanish</h2>
            <p style={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
              Tugmalar va navigatsiya ishlashi ustuvor. Aloqa uchun bizga yozing yoki sidebar orqali kerakli bo'limga o'ting.
            </p>
            <div style={{ display: "grid", gap: "0.9rem" }}>
              <input placeholder="Ismingiz" style={{ padding: "1rem", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "#fff", fontFamily: "inherit" }} />
              <input placeholder="Telefon" style={{ padding: "1rem", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "#fff", fontFamily: "inherit" }} />
              <textarea placeholder="Qisqacha yozing" rows={4} style={{ padding: "1rem", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "#fff", resize: "vertical", fontFamily: "inherit" }} />
              <button
                onClick={() => scrollToSection("contact")}
                style={{
                  padding: "1rem 1.2rem",
                  borderRadius: "14px",
                  border: "none",
                  background: "#00d4ff",
                  color: "#021018",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontWeight: 700,
                }}
              >
                Murojaat yuborish
              </button>
            </div>
          </div>
        </section>

        <footer style={{ padding: "2rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ maxWidth: "1120px", margin: "0 auto", color: "rgba(255,255,255,0.6)" }}>
            © 2026 Dasturlash departamenti. Soddalashtirilgan, barqaror versiya.
          </div>
        </footer>
      </div>

      {showSettings ? (
        <div
          onClick={closeSettings}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="modal-box"
            style={{ width: isMobile ? "95vw" : "600px", maxWidth: isMobile ? "95vw" : "600px", padding: isMobile ? "1.5rem" : "2.5rem", borderRadius: "20px", background: "#0b1622", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ margin: 0 }}>Sozlamalar</h3>
              <button onClick={closeSettings} style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer", fontSize: "1.2rem" }}>✕</button>
            </div>
            <p style={{ margin: 0, color: "rgba(255,255,255,0.72)", lineHeight: 1.7 }}>Murakkab sozlamalar vaqtincha olib tashlandi. Hozir sahifa yengil va barqaror rejimda ishlaydi.</p>
          </div>
        </div>
      ) : null}

      {showTeam ? (
        <div
          onClick={closeTeam}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="modal-box"
            style={{ width: isMobile ? "95vw" : "600px", maxWidth: isMobile ? "95vw" : "600px", padding: isMobile ? "1.5rem" : "2.5rem", borderRadius: "20px", background: "#0b1622", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ margin: 0 }}>Jamoa</h3>
              <button onClick={closeTeam} style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer", fontSize: "1.2rem" }}>✕</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(3,1fr)", gap: "1rem" }}>
              {[
                { name: "Tursunbekov Sardorbek", role: "Boshliq", img: "/boshliq.jpg.jpg" },
                { name: "Muxtorov Farrux", role: "O'rinbosar", img: "/o'rinbosar.jpg" },
                { name: "Yuldashev Islom", role: "PM Menejer", img: "/xodin 1.jpg" },
                { name: "Raximov Ulug'bek", role: "Dasturchi", img: "/1-xodim.jpg" },
                { name: "Bobur", role: "Dasturchi", img: "/2-xodim.jpg" },
                { name: "Abdiyev Fayoz", role: "Dasturchi", img: "/3-xodim2.jpg" },
              ].map((m) => (
                <div key={m.name} style={{ textAlign: "center", padding: "1.25rem", background: "rgba(255,255,255,0.04)", borderRadius: "14px" }}>
                  <img src={m.img} alt={m.name} style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover", objectPosition: "center top", border: "2px solid #00d4ff", marginBottom: "0.75rem" }} />
                  <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{m.name}</div>
                  <div style={{ color: "#00d4ff", fontSize: "0.8rem", marginTop: "0.25rem" }}>{m.role}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {showClientCabinet ? (
        <div
          onClick={closeClientCabinet}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 210,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="modal-box"
            style={{ width: isMobile ? "95vw" : "600px", maxWidth: isMobile ? "95vw" : "600px", padding: isMobile ? "1.5rem" : "2.5rem", borderRadius: "20px", background: "#0b1622", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ margin: 0 }}>Shaxsiy kabinet</h3>
              <button onClick={closeClientCabinet} style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer", fontSize: "1.2rem" }}>✕</button>
            </div>
            <p style={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.7, marginTop: 0 }}>Kabinet soddalashtirildi. Hozircha aloqa va ariza uchun pastdagi bo'limdan foydalaning.</p>
            <button
              onClick={() => {
                closeClientCabinet();
                scrollToSection("contact");
              }}
              style={{
                padding: "0.95rem 1rem",
                borderRadius: "14px",
                border: "none",
                background: "#00d4ff",
                color: "#021018",
                cursor: "pointer",
                fontFamily: "inherit",
                fontWeight: 700,
              }}
            >
              Bog'lanish bo'limiga o'tish
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
}
