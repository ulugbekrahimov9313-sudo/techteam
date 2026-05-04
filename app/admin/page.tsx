"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    const particles: { x: number; y: number; vx: number; vy: number; size: number; color: string }[] = [];

    for (let i = 0; i < 60; i += 1) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? "#00d4ff" : "#7c3aed",
      });
    }

    let animationId = 0;

    const draw = () => {
      ctx.fillStyle = "rgba(2, 4, 8, 0.08)";
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

        particles.slice(index + 1).forEach((nextParticle) => {
          const distance = Math.hypot(particle.x - nextParticle.x, particle.y - nextParticle.y);
          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(nextParticle.x, nextParticle.y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.12 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (username === "admin" && password === "dasturlash2025") {
      localStorage.setItem("isAdmin", "true");
      window.location.href = "/admin/dashboard";
      return;
    }

    setError("Login yoki parol noto'g'ri!");
    setIsSubmitting(false);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020408",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
        fontFamily: "var(--font-geist-sans), sans-serif",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          opacity: 0.55,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "420px",
          padding: "3rem",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(18px)",
          boxShadow: "0 30px 70px rgba(0,0,0,0.28)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>🔐</div>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.65rem" }}>Admin Panel</h1>
          <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>
            Dasturlash departamenti boshqaruv paneli
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
          <input
            type="text"
            placeholder="Admin login"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
              if (error) {
                setError("");
              }
            }}
            style={{
              width: "100%",
              padding: "0.95rem 1rem",
              borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.04)",
              color: "#fff",
              fontSize: "1rem",
              outline: "none",
            }}
            onFocus={(event) => {
              event.currentTarget.style.borderColor = "rgba(0,212,255,0.55)";
              event.currentTarget.style.boxShadow = "0 0 0 4px rgba(0,212,255,0.12)";
            }}
            onBlur={(event) => {
              event.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              event.currentTarget.style.boxShadow = "none";
            }}
          />

          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Parol"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                if (error) {
                  setError("");
                }
              }}
              style={{
                width: "100%",
                padding: "0.95rem 3.3rem 0.95rem 1rem",
                borderRadius: "14px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.04)",
                color: "#fff",
                fontSize: "1rem",
                outline: "none",
              }}
              onFocus={(event) => {
                event.currentTarget.style.borderColor = "rgba(0,212,255,0.55)";
                event.currentTarget.style.boxShadow = "0 0 0 4px rgba(0,212,255,0.12)";
              }}
              onBlur={(event) => {
                event.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                event.currentTarget.style.boxShadow = "none";
              }}
            />

            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              style={{
                position: "absolute",
                top: "50%",
                right: "0.8rem",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                color: "rgba(255,255,255,0.65)",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              {showPassword ? "Yashir" : "Ko'rsat"}
            </button>
          </div>

          {error ? (
            <div style={{ color: "#f87171", fontSize: "0.92rem", textAlign: "center" }}>{error}</div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: "100%",
              padding: "1rem 1.2rem",
              borderRadius: "14px",
              border: "none",
              background: "linear-gradient(135deg, #00d4ff, #2563eb)",
              color: "#fff",
              fontSize: "1rem",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 18px 34px rgba(0,212,255,0.16)",
            }}
          >
            {isSubmitting ? "Tekshirilmoqda..." : "Kirish"}
          </button>
        </form>
      </div>
    </main>
  );
}