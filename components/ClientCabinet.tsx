"use client";

import { useState } from "react";

type ClientMessage = {
  id: number;
  sender: "department" | "client";
  text: string;
};

type ClientCabinetProps = {
  isMobile: boolean;
  open: boolean;
  onClose: () => void;
  onScrollToContact: () => void;
};

export default function ClientCabinet({ isMobile, open, onClose, onScrollToContact }: ClientCabinetProps) {
  const [clientLoggedIn, setClientLoggedIn] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientCabinetTab, setClientCabinetTab] = useState("applications");
  const [clientMessageInput, setClientMessageInput] = useState("");
  const [clientMessages, setClientMessages] = useState<ClientMessage[]>([
    { id: 1, sender: "department", text: "Salom! Arizangiz qabul qilindi" },
    { id: 2, sender: "department", text: "Loyihangiz ustida ishlanmoqda" },
  ]);

  if (!open) {
    return null;
  }

  const handleClientLogin = () => {
    if (!clientName.trim() || !clientPhone.trim()) {
      return;
    }

    setClientLoggedIn(true);
  };

  const handleClientLogout = () => {
    setClientLoggedIn(false);
    setClientName("");
    setClientPhone("");
    setClientCabinetTab("applications");
  };

  const handleClientSendMessage = () => {
    if (!clientMessageInput.trim()) {
      return;
    }

    setClientMessages((current) => [
      ...current,
      { id: current.length + 1, sender: "client", text: clientMessageInput.trim() },
    ]);
    setClientMessageInput("");
  };

  if (!clientLoggedIn) {
    return (
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(2,4,8,0.95)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
          zIndex: 210,
        }}
      >
        <div
          onClick={(event) => event.stopPropagation()}
          style={{
            width: isMobile ? "95vw" : "100%",
            maxWidth: isMobile ? "95vw" : "400px",
            background: "rgba(10,15,26,0.92)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "24px",
            padding: "1.5rem",
            boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
            backdropFilter: "blur(18px)",
            margin: isMobile ? "1rem" : undefined,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
            <div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "0.35rem" }}>👤 Shaxsiy Kabinet</h3>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.92rem" }}>Hisobingizga kiring</p>
            </div>
            <button onClick={onClose} style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer", fontSize: "1.2rem" }}>✕</button>
          </div>

          <div style={{ display: "grid", gap: "0.9rem" }}>
            <input
              value={clientName}
              onChange={(event) => setClientName(event.target.value)}
              placeholder="Ismingiz"
              style={{
                width: "100%",
                padding: "0.95rem 1rem",
                borderRadius: "14px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.04)",
                color: "#fff",
                outline: "none",
                fontFamily: "inherit",
              }}
            />
            <input
              value={clientPhone}
              onChange={(event) => setClientPhone(event.target.value)}
              placeholder="+998 XX XXX XX XX"
              style={{
                width: "100%",
                padding: "0.95rem 1rem",
                borderRadius: "14px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.04)",
                color: "#fff",
                outline: "none",
                fontFamily: "inherit",
              }}
            />
            <button
              onClick={handleClientLogin}
              style={{
                width: "100%",
                padding: "1rem 1.1rem",
                borderRadius: "14px",
                border: "none",
                background: "linear-gradient(135deg, #00d4ff, #2563eb)",
                color: "#fff",
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Kirish
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(2,4,8,0.95)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        zIndex: 210,
      }}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        style={{
          width: isMobile ? "95vw" : "100%",
          maxWidth: isMobile ? "95vw" : "700px",
          background: "rgba(10,15,26,0.94)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "24px",
          padding: "1.5rem",
          boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
          backdropFilter: "blur(18px)",
          maxHeight: "90vh",
          overflowY: "auto",
          margin: isMobile ? "1rem" : undefined,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap" }}>
          <h3 style={{ fontSize: "1.4rem", fontWeight: 800 }}>Salom, {clientName}! 👋</h3>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <button
              onClick={handleClientLogout}
              style={{
                padding: "0.7rem 0.95rem",
                borderRadius: "10px",
                border: "1px solid rgba(248,113,113,0.25)",
                background: "rgba(248,113,113,0.1)",
                color: "#fecaca",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Chiqish
            </button>
            <button onClick={onClose} style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer", fontSize: "1.2rem" }}>✕</button>
          </div>
        </div>

        <div style={{ display: "flex", gap: "1rem", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: "1.25rem", overflowX: "auto" }}>
          {[
            { key: "applications", label: "📋 Arizalarim" },
            { key: "messages", label: "💬 Xabarlar" },
            { key: "contact", label: "📞 Bog'lanish" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setClientCabinetTab(tab.key)}
              style={{
                padding: "0.85rem 0.25rem",
                border: "none",
                borderBottom: clientCabinetTab === tab.key ? "2px solid #00d4ff" : "2px solid transparent",
                background: "transparent",
                color: clientCabinetTab === tab.key ? "#00d4ff" : "rgba(255,255,255,0.72)",
                cursor: "pointer",
                fontFamily: "inherit",
                whiteSpace: "nowrap",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {clientCabinetTab === "applications" ? (
          <div style={{ display: "grid", gap: "1rem" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "460px" }}>
                <tbody>
                  {[
                    { title: "Sayt yaratish", date: "04.05.2026", status: "🟡 Ko'rilmoqda" },
                    { title: "Dizayn", date: "03.05.2026", status: "✅ Bajarildi" },
                  ].map((item) => (
                    <tr key={`${item.title}-${item.date}`} style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                      <td style={{ padding: "1rem 0.5rem 1rem 0", fontWeight: 600 }}>{item.title}</td>
                      <td style={{ padding: "1rem 0.5rem", color: "rgba(255,255,255,0.65)" }}>📅 {item.date}</td>
                      <td style={{ padding: "1rem 0", color: "#fff" }}>{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={() => {
                onClose();
                onScrollToContact();
              }}
              style={{
                alignSelf: "flex-start",
                padding: "0.9rem 1rem",
                borderRadius: "12px",
                border: "none",
                background: "linear-gradient(135deg, #00d4ff, #2563eb)",
                color: "#fff",
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Yangi ariza
            </button>
          </div>
        ) : null}

        {clientCabinetTab === "messages" ? (
          <div style={{ display: "grid", gap: "1rem" }}>
            <div style={{ display: "grid", gap: "0.85rem", minHeight: "260px" }}>
              {clientMessages.map((message) => (
                <div
                  key={message.id}
                  style={{
                    display: "flex",
                    justifyContent: message.sender === "department" ? "flex-start" : "flex-end",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "75%",
                      padding: "0.9rem 1rem",
                      borderRadius: message.sender === "department" ? "18px 18px 18px 4px" : "18px 18px 4px 18px",
                      background: message.sender === "department" ? "rgba(255,255,255,0.06)" : "linear-gradient(135deg, #00d4ff, #2563eb)",
                      color: "#fff",
                    }}
                  >
                    {message.sender === "department" ? (
                      <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.58)", marginBottom: "0.35rem" }}>Dasturlash departamenti</div>
                    ) : null}
                    <div style={{ lineHeight: 1.6 }}>{message.text}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <input
                value={clientMessageInput}
                onChange={(event) => setClientMessageInput(event.target.value)}
                placeholder="Xabaringizni yozing"
                style={{
                  flex: "1 1 280px",
                  padding: "0.95rem 1rem",
                  borderRadius: "14px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.04)",
                  color: "#fff",
                  outline: "none",
                  fontFamily: "inherit",
                }}
              />
              <button
                onClick={handleClientSendMessage}
                style={{
                  padding: "0.95rem 1rem",
                  borderRadius: "14px",
                  border: "none",
                  background: "linear-gradient(135deg, #00d4ff, #2563eb)",
                  color: "#fff",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                Yuborish
              </button>
            </div>
          </div>
        ) : null}

        {clientCabinetTab === "contact" ? (
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
            {[
              { icon: "📱", label: "Telegram", value: "+998 93 822 93 13" },
              { icon: "📧", label: "Email", value: "ulugbekrakximov4@gmail.com" },
              { icon: "🕐", label: "Ish vaqti", value: "9:00 - 18:00" },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  padding: "1rem",
                  borderRadius: "18px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div style={{ fontSize: "1.4rem", marginBottom: "0.55rem" }}>{item.icon}</div>
                <div style={{ fontWeight: 700, marginBottom: "0.35rem" }}>{item.label}</div>
                <div style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.6, wordBreak: "break-word" }}>{item.value}</div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}