"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type PageKey = "dashboard" | "arizalar" | "tashrif" | "chat" | "sozlamalar";
type ApplicationStatus = "Yangi" | "Ko'rildi" | "Bajarildi";

type Application = {
  id: number;
  name: string;
  phone: string;
  message: string;
  time: string;
  status: ApplicationStatus;
};

type Visitor = {
  id: number;
  time: string;
  ip: string;
  page: string;
  browser: string;
  duration: string;
};

type ChatContact = {
  id: number;
  name: string;
  preview: string;
  time: string;
  online: boolean;
};

type ChatMessage = {
  id: number;
  contactId: number;
  text: string;
  sender: "admin" | "client";
  time: string;
};

const navigationItems: Array<{ icon: string; label: string; key: PageKey }> = [
  { icon: "📊", label: "Dashboard", key: "dashboard" },
  { icon: "📋", label: "Arizalar", key: "arizalar" },
  { icon: "👁️", label: "Tashrif", key: "tashrif" },
  { icon: "💬", label: "Chat", key: "chat" },
  { icon: "⚙️", label: "Sozlamalar", key: "sozlamalar" },
];

const initialApplications: Application[] = [
  { id: 1, name: "Alisher Karimov", phone: "+998901234567", message: "Sayt yaratish kerak", time: "14:23", status: "Yangi" },
  { id: 2, name: "Bobur Toshmatov", phone: "+998931234567", message: "Bot yaratish", time: "13:45", status: "Ko'rildi" },
  { id: 3, name: "Malika Yusupova", phone: "+998901111111", message: "Dizayn kerak", time: "12:30", status: "Bajarildi" },
  { id: 4, name: "Jasur Nazarov", phone: "+998909999999", message: "Mobile ilova", time: "11:15", status: "Yangi" },
  { id: 5, name: "Nilufar Rashidova", phone: "+998901234000", message: "Konsultatsiya", time: "10:00", status: "Ko'rildi" },
  { id: 6, name: "Shahnoza Ergasheva", phone: "+998935551122", message: "CRM tizim kerak", time: "09:22", status: "Yangi" },
  { id: 7, name: "Bekzod Rustamov", phone: "+998907774411", message: "Telegram bot audit", time: "08:40", status: "Bajarildi" },
];

const recentVisitors: Visitor[] = [
  { id: 1, time: "14:25", ip: "192.168.0.21", page: "/", browser: "Chrome", duration: "3 daqiqa" },
  { id: 2, time: "13:58", ip: "10.0.0.56", page: "/admin", browser: "Safari", duration: "1 daqiqa" },
  { id: 3, time: "12:44", ip: "172.16.4.10", page: "/#services", browser: "Firefox", duration: "5 daqiqa" },
  { id: 4, time: "11:37", ip: "185.34.12.98", page: "/#contact", browser: "Edge", duration: "2 daqiqa" },
  { id: 5, time: "10:19", ip: "91.204.77.11", page: "/projects", browser: "Chrome", duration: "4 daqiqa" },
];

const hourlyVisits = [8, 12, 10, 16, 22, 18, 26, 30, 24, 19, 14, 11];

const chatContacts: ChatContact[] = [
  { id: 1, name: "Alisher Karimov", preview: "Sayt narxini yozib yuboring", time: "14:20", online: true },
  { id: 2, name: "Malika Yusupova", preview: "Dizayn bo'yicha fikr kutyapman", time: "13:02", online: true },
  { id: 3, name: "Bobur Toshmatov", preview: "Bot uchun texnik topshiriq tayyor", time: "12:11", online: false },
  { id: 4, name: "Nilufar Rashidova", preview: "Qachon bog'lansak bo'ladi?", time: "10:42", online: false },
];

const initialMessages: ChatMessage[] = [
  { id: 1, contactId: 1, text: "Assalomu alaykum, sayt yaratish bo'yicha maslahat kerak edi.", sender: "client", time: "14:03" },
  { id: 2, contactId: 1, text: "Va alaykum assalom. Albatta, qanday turdagi sayt kerak?", sender: "admin", time: "14:05" },
  { id: 3, contactId: 1, text: "Korporativ landing page va admin panel kerak.", sender: "client", time: "14:08" },
  { id: 4, contactId: 1, text: "Texnik topshiriqni yuborsangiz, narx va muddatni hisoblaymiz.", sender: "admin", time: "14:10" },
  { id: 5, contactId: 2, text: "Dizayn uchun minimalist uslub xohlayman.", sender: "client", time: "12:48" },
  { id: 6, contactId: 2, text: "Namunalarni yuboring, mos referens tanlab chiqamiz.", sender: "admin", time: "12:52" },
  { id: 7, contactId: 3, text: "Telegram botga to'lov integratsiyasi kerak.", sender: "client", time: "11:57" },
  { id: 8, contactId: 4, text: "Bugun 16:00 da qo'ng'iroq qilaylikmi?", sender: "admin", time: "10:18" },
];

function getStatusStyles(status: ApplicationStatus) {
  if (status === "Yangi") {
    return {
      color: "#8ef7c7",
      background: "rgba(16, 185, 129, 0.15)",
      border: "1px solid rgba(16, 185, 129, 0.32)",
    };
  }

  if (status === "Ko'rildi") {
    return {
      color: "#ffd98a",
      background: "rgba(245, 158, 11, 0.15)",
      border: "1px solid rgba(245, 158, 11, 0.32)",
    };
  }

  return {
    color: "#97c6ff",
    background: "rgba(59, 130, 246, 0.15)",
    border: "1px solid rgba(59, 130, 246, 0.32)",
  };
}

function getPageTitle(activePage: PageKey) {
  if (activePage === "arizalar") {
    return "Arizalar";
  }

  if (activePage === "tashrif") {
    return "Tashrif";
  }

  if (activePage === "chat") {
    return "Chat";
  }

  if (activePage === "sozlamalar") {
    return "Sozlamalar";
  }

  return "Bosh sahifa";
}

function getPageDescription(activePage: PageKey) {
  if (activePage === "arizalar") {
    return "Kelgan murojaatlar bilan ishlash oynasi";
  }

  if (activePage === "tashrif") {
    return "Saytga kirgan foydalanuvchilar statistikasi";
  }

  if (activePage === "chat") {
    return "Mijozlar bilan real vaqtga yaqin yozishmalar";
  }

  if (activePage === "sozlamalar") {
    return "Admin profil va sayt sozlamalarini boshqarish";
  }

  return "Admin boshqaruv paneli";
}

export default function Dashboard() {
  const [activePage, setActivePage] = useState<PageKey>("dashboard");
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [applicationFilter, setApplicationFilter] = useState<"Hammasi" | ApplicationStatus>("Hammasi");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContactId, setSelectedContactId] = useState(1);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [messageInput, setMessageInput] = useState("");
  const [adminUsername, setAdminUsername] = useState("admin");
  const [adminPassword, setAdminPassword] = useState("dasturlash2025");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [telegramNotifications, setTelegramNotifications] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      window.location.href = "/admin";
    }
  }, []);

  useEffect(() => {
    setCurrentTime(new Date());

    const intervalId = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const formattedTime = useMemo(() => {
    if (!currentTime) {
      return "Yuklanmoqda...";
    }

    return new Intl.DateTimeFormat("uz-UZ", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(currentTime);
  }, [currentTime]);

  const dashboardStats = useMemo(
    () => [
      { icon: "👁️", value: "24", label: "Bugungi tashrif", accent: "#00d4ff" },
      { icon: "📋", value: String(applications.length), label: "Jami arizalar", accent: "#10b981" },
      { icon: "✨", value: String(applications.filter((item) => item.status === "Yangi").length), label: "Yangi arizalar", accent: "#f59e0b" },
      { icon: "🟢", value: "2", label: "Online hozir", accent: "#3b82f6" },
    ],
    [applications],
  );

  const filteredApplications = useMemo(() => {
    return applications.filter((item) => {
      const matchesFilter = applicationFilter === "Hammasi" ? true : item.status === applicationFilter;
      const normalizedSearch = searchTerm.trim().toLowerCase();
      const matchesSearch =
        normalizedSearch.length === 0 ||
        item.name.toLowerCase().includes(normalizedSearch) ||
        item.phone.toLowerCase().includes(normalizedSearch);

      return matchesFilter && matchesSearch;
    });
  }, [applicationFilter, applications, searchTerm]);

  const selectedContact = useMemo(() => {
    return chatContacts.find((contact) => contact.id === selectedContactId) ?? chatContacts[0];
  }, [selectedContactId]);

  const selectedMessages = useMemo(() => {
    return messages.filter((message) => message.contactId === selectedContactId);
  }, [messages, selectedContactId]);

  const visitorStats = useMemo(
    () => [
      { label: "Bugun", value: 24, accent: "#00d4ff" },
      { label: "Kecha", value: 19, accent: "#10b981" },
      { label: "Jami", value: 317, accent: "#f59e0b" },
    ],
    [],
  );

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    window.location.href = "/admin";
  };

  const updateApplicationStatus = (id: number, status: ApplicationStatus) => {
    setApplications((current) => current.map((item) => (item.id === id ? { ...item, status } : item)));
  };

  const deleteApplication = (id: number) => {
    setApplications((current) => current.filter((item) => item.id !== id));
  };

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = messageInput.trim();
    if (!trimmed) {
      return;
    }

    setMessages((current) => [
      ...current,
      {
        id: current.length + 1,
        contactId: selectedContactId,
        text: trimmed,
        sender: "admin",
        time: new Intl.DateTimeFormat("uz-UZ", { hour: "2-digit", minute: "2-digit" }).format(new Date()),
      },
    ]);
    setMessageInput("");
  };

  const handleSaveSettings = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaveMessage("Sozlamalar saqlandi.");
  };

  const renderDashboardContent = () => {
    return (
      <>
        <section className="stats-grid">
          {dashboardStats.map((item) => (
            <article
              key={item.label}
              className="glass-card"
              style={{
                borderRadius: "22px",
                padding: "1.25rem",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "3px",
                  background: item.accent,
                }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.75rem" }}>
                <div>
                  <div style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.35rem" }}>{item.value}</div>
                  <div style={{ color: "rgba(255,255,255,0.62)", fontSize: "0.95rem" }}>{item.label}</div>
                </div>
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "16px",
                    display: "grid",
                    placeItems: "center",
                    background: `${item.accent}22`,
                    border: `1px solid ${item.accent}55`,
                    fontSize: "1.35rem",
                  }}
                >
                  {item.icon}
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="tables-grid">
          <article className="glass-card" style={{ borderRadius: "24px", padding: "1.1rem", overflowX: "auto" }}>
            <div style={{ marginBottom: "1rem" }}>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "0.35rem" }}>So'nggi arizalar</h2>
              <p style={{ color: "rgba(255,255,255,0.52)", fontSize: "0.92rem" }}>Oxirgi kelgan murojaatlar ro'yxati</p>
            </div>

            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Ism</th>
                  <th>Telefon</th>
                  <th>Xabar</th>
                  <th>Vaqt</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {applications.slice(0, 5).map((item) => {
                  const badgeStyles = getStatusStyles(item.status);

                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td style={{ fontWeight: 600 }}>{item.name}</td>
                      <td>{item.phone}</td>
                      <td>{item.message}</td>
                      <td>{item.time}</td>
                      <td>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            padding: "0.42rem 0.72rem",
                            borderRadius: "999px",
                            fontSize: "0.82rem",
                            fontWeight: 700,
                            ...badgeStyles,
                          }}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </article>

          <article className="glass-card" style={{ borderRadius: "24px", padding: "1.1rem", overflowX: "auto" }}>
            <div style={{ marginBottom: "1rem" }}>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "0.35rem" }}>So'nggi tashrif</h2>
              <p style={{ color: "rgba(255,255,255,0.52)", fontSize: "0.92rem" }}>Oxirgi tashrif buyurgan foydalanuvchilar</p>
            </div>

            <table className="data-table" style={{ minWidth: "560px" }}>
              <thead>
                <tr>
                  <th>Vaqt</th>
                  <th>IP</th>
                  <th>Sahifa</th>
                  <th>Brauzer</th>
                  <th>Davomiyligi</th>
                </tr>
              </thead>
              <tbody>
                {recentVisitors.map((item) => (
                  <tr key={item.id}>
                    <td>{item.time}</td>
                    <td>{item.ip}</td>
                    <td>{item.page}</td>
                    <td>{item.browser}</td>
                    <td>{item.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
        </section>
      </>
    );
  };

  const renderApplicationsContent = () => {
    return (
      <section className="glass-card" style={{ borderRadius: "24px", padding: "1.2rem", marginTop: "24px", overflowX: "auto" }}>
        <div className="toolbar-row" style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
            {(["Hammasi", "Yangi", "Ko'rildi", "Bajarildi"] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setApplicationFilter(filter)}
                style={{
                  padding: "0.7rem 0.95rem",
                  borderRadius: "12px",
                  border: filter === applicationFilter ? "1px solid rgba(0,212,255,0.4)" : "1px solid rgba(255,255,255,0.08)",
                  background: filter === applicationFilter ? "rgba(0,212,255,0.12)" : "rgba(255,255,255,0.03)",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                {filter}
              </button>
            ))}
          </div>

          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Ism yoki telefon bo'yicha qidirish"
            style={{
              minWidth: "280px",
              flex: "1 1 280px",
              maxWidth: "360px",
              padding: "0.85rem 1rem",
              borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.04)",
              color: "#fff",
              outline: "none",
            }}
          />
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Ism</th>
              <th>Telefon</th>
              <th>Xabar</th>
              <th>Vaqt</th>
              <th>Status</th>
              <th>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((item) => {
              const badgeStyles = getStatusStyles(item.status);

              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td style={{ fontWeight: 600 }}>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.message}</td>
                  <td>{item.time}</td>
                  <td>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "0.42rem 0.72rem",
                        borderRadius: "999px",
                        fontSize: "0.82rem",
                        fontWeight: 700,
                        ...badgeStyles,
                      }}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap" }}>
                      <button
                        type="button"
                        onClick={() => updateApplicationStatus(item.id, "Ko'rildi")}
                        style={actionButtonStyle}
                      >
                        Ko'rildi
                      </button>
                      <button
                        type="button"
                        onClick={() => updateApplicationStatus(item.id, "Bajarildi")}
                        style={actionButtonStyle}
                      >
                        Bajarildi
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteApplication(item.id)}
                        style={{ ...actionButtonStyle, color: "#fecaca", borderColor: "rgba(248,113,113,0.25)", background: "rgba(248,113,113,0.08)" }}
                      >
                        O'chirish
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    );
  };

  const renderVisitorsContent = () => {
    const maxVisits = Math.max(...hourlyVisits);

    return (
      <section style={{ marginTop: "24px", display: "grid", gap: "20px" }}>
        <div className="stats-grid stats-grid-three">
          {visitorStats.map((item) => (
            <article key={item.label} className="glass-card" style={{ borderRadius: "22px", padding: "1.25rem" }}>
              <div style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.58)", marginBottom: "0.45rem" }}>{item.label}</div>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: item.accent }}>{item.value}</div>
            </article>
          ))}
        </div>

        <article className="glass-card" style={{ borderRadius: "24px", padding: "1.2rem" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "1rem" }}>Soatlik tashrif grafigi</h2>
          <div className="chart-row">
            {hourlyVisits.map((value, index) => (
              <div key={`${index + 1}-${value}`} className="chart-item">
                <div
                  className="chart-bar"
                  style={{
                    height: `${(value / maxVisits) * 180}px`,
                  }}
                />
                <span>{String(index + 8).padStart(2, "0")}:00</span>
              </div>
            ))}
          </div>
        </article>

        <article className="glass-card" style={{ borderRadius: "24px", padding: "1.2rem", overflowX: "auto" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "1rem" }}>Tashriflar jadvali</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Vaqt</th>
                <th>IP</th>
                <th>Sahifa</th>
                <th>Brauzer</th>
                <th>Davomiyligi</th>
              </tr>
            </thead>
            <tbody>
              {recentVisitors.map((item) => (
                <tr key={item.id}>
                  <td>{item.time}</td>
                  <td>{item.ip}</td>
                  <td>{item.page}</td>
                  <td>{item.browser}</td>
                  <td>{item.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      </section>
    );
  };

  const renderChatContent = () => {
    return (
      <section className="chat-layout" style={{ marginTop: "24px" }}>
        <aside className="glass-card" style={{ borderRadius: "24px", padding: "1rem" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 800, marginBottom: "0.9rem" }}>Mijozlar</h2>
          <div style={{ display: "grid", gap: "0.65rem" }}>
            {chatContacts.map((contact) => (
              <button
                key={contact.id}
                type="button"
                onClick={() => setSelectedContactId(contact.id)}
                style={{
                  width: "100%",
                  padding: "0.95rem",
                  borderRadius: "16px",
                  border: contact.id === selectedContactId ? "1px solid rgba(0,212,255,0.35)" : "1px solid rgba(255,255,255,0.08)",
                  background: contact.id === selectedContactId ? "rgba(0,212,255,0.08)" : "rgba(255,255,255,0.03)",
                  color: "#fff",
                  textAlign: "left",
                  cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: "0.75rem", marginBottom: "0.35rem" }}>
                  <span style={{ fontWeight: 700 }}>{contact.name}</span>
                  <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>{contact.time}</span>
                </div>
                <div style={{ color: "rgba(255,255,255,0.62)", fontSize: "0.9rem", marginBottom: "0.35rem" }}>{contact.preview}</div>
                <div style={{ fontSize: "0.8rem", color: contact.online ? "#8ef7c7" : "rgba(255,255,255,0.4)" }}>
                  {contact.online ? "Online" : "Offline"}
                </div>
              </button>
            ))}
          </div>
        </aside>

        <article className="glass-card" style={{ borderRadius: "24px", padding: "1rem", display: "flex", flexDirection: "column", minHeight: "560px" }}>
          <div style={{ paddingBottom: "1rem", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: "1rem" }}>
            <div style={{ fontWeight: 800, fontSize: "1.15rem" }}>{selectedContact.name}</div>
            <div style={{ color: selectedContact.online ? "#8ef7c7" : "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>
              {selectedContact.online ? "Hozir online" : "Hozir offline"}
            </div>
          </div>

          <div className="chat-messages">
            {selectedMessages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: "flex",
                  justifyContent: message.sender === "admin" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "70%",
                    padding: "0.85rem 1rem",
                    borderRadius: message.sender === "admin" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    background: message.sender === "admin" ? "linear-gradient(135deg, #00d4ff, #2563eb)" : "rgba(255,255,255,0.06)",
                    color: "#fff",
                  }}
                >
                  <div style={{ lineHeight: 1.6 }}>{message.text}</div>
                  <div style={{ marginTop: "0.4rem", fontSize: "0.78rem", opacity: 0.75 }}>{message.time}</div>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} style={{ display: "flex", gap: "0.75rem", marginTop: "1rem", flexWrap: "wrap" }}>
            <input
              type="text"
              value={messageInput}
              onChange={(event) => setMessageInput(event.target.value)}
              placeholder="Xabar yozing..."
              style={{
                flex: "1 1 280px",
                padding: "0.95rem 1rem",
                borderRadius: "14px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.04)",
                color: "#fff",
                outline: "none",
              }}
            />
            <button type="submit" style={primaryButtonStyle}>
              Yuborish
            </button>
          </form>
        </article>
      </section>
    );
  };

  const renderSettingsContent = () => {
    return (
      <section className="settings-grid" style={{ marginTop: "24px" }}>
        <form onSubmit={handleSaveSettings} className="glass-card" style={{ borderRadius: "24px", padding: "1.2rem", display: "grid", gap: "1rem" }}>
          <div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "0.35rem" }}>Admin profili</h2>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.92rem" }}>Login ma'lumotlarini yangilang</p>
          </div>

          <label style={fieldLabelStyle}>
            <span>Username</span>
            <input value={adminUsername} onChange={(event) => setAdminUsername(event.target.value)} style={inputStyle} />
          </label>

          <label style={fieldLabelStyle}>
            <span>Parol</span>
            <input value={adminPassword} onChange={(event) => setAdminPassword(event.target.value)} style={inputStyle} />
          </label>

          <div>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.75rem" }}>Sayt sozlamalari</h3>
            <div style={{ display: "grid", gap: "0.8rem" }}>
              <label style={toggleRowStyle}>
                <span>Maintenance mode</span>
                <button type="button" onClick={() => setMaintenanceMode((value) => !value)} style={getToggleStyle(maintenanceMode)}>
                  <span style={getToggleKnobStyle(maintenanceMode)} />
                </button>
              </label>

              <label style={toggleRowStyle}>
                <span>Email bildirishnomalar</span>
                <button type="button" onClick={() => setEmailNotifications((value) => !value)} style={getToggleStyle(emailNotifications)}>
                  <span style={getToggleKnobStyle(emailNotifications)} />
                </button>
              </label>

              <label style={toggleRowStyle}>
                <span>Telegram bildirishnomalar</span>
                <button type="button" onClick={() => setTelegramNotifications((value) => !value)} style={getToggleStyle(telegramNotifications)}>
                  <span style={getToggleKnobStyle(telegramNotifications)} />
                </button>
              </label>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <button type="submit" style={primaryButtonStyle}>
              Saqlash
            </button>
            {saveMessage ? <span style={{ color: "#8ef7c7" }}>{saveMessage}</span> : null}
          </div>
        </form>

        <article className="glass-card" style={{ borderRadius: "24px", padding: "1.2rem" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "0.35rem" }}>Joriy holat</h2>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.92rem", marginBottom: "1rem" }}>Saqlanadigan sozlamalar preview ko'rinishi</p>

          <div style={{ display: "grid", gap: "0.9rem" }}>
            <div style={summaryRowStyle}>
              <span>Admin username</span>
              <strong>{adminUsername}</strong>
            </div>
            <div style={summaryRowStyle}>
              <span>Maintenance</span>
              <strong>{maintenanceMode ? "Yoqilgan" : "O'chirilgan"}</strong>
            </div>
            <div style={summaryRowStyle}>
              <span>Email bildirishnoma</span>
              <strong>{emailNotifications ? "Faol" : "Nofaol"}</strong>
            </div>
            <div style={summaryRowStyle}>
              <span>Telegram bildirishnoma</span>
              <strong>{telegramNotifications ? "Faol" : "Nofaol"}</strong>
            </div>
          </div>
        </article>
      </section>
    );
  };

  const renderActiveContent = () => {
    if (activePage === "arizalar") {
      return renderApplicationsContent();
    }

    if (activePage === "tashrif") {
      return renderVisitorsContent();
    }

    if (activePage === "chat") {
      return renderChatContent();
    }

    if (activePage === "sozlamalar") {
      return renderSettingsContent();
    }

    return renderDashboardContent();
  };

  return (
    <>
      <style jsx>{`
        .dashboard-shell {
          min-height: 100vh;
          background: #020408;
          color: #f8fbff;
        }

        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 250px;
          background: #0a0f1a;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          padding: 24px 18px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          z-index: 10;
        }

        .content {
          margin-left: 250px;
          min-height: 100vh;
          padding: 28px;
          overflow-x: auto;
        }

        .glass-card {
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
          backdrop-filter: blur(16px);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
          margin-top: 24px;
        }

        .stats-grid-three {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .tables-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 20px;
          margin-top: 24px;
          align-items: start;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 720px;
        }

        .data-table th {
          text-align: left;
          padding: 14px 16px;
          color: rgba(255, 255, 255, 0.55);
          font-size: 0.85rem;
          font-weight: 600;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .data-table td {
          padding: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          color: rgba(248, 251, 255, 0.9);
          vertical-align: top;
        }

        .data-table tbody tr {
          transition: background 0.2s ease;
        }

        .data-table tbody tr:hover {
          background: rgba(255, 255, 255, 0.04);
        }

        .chart-row {
          height: 220px;
          display: grid;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          align-items: end;
          gap: 12px;
        }

        .chart-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
          height: 100%;
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.78rem;
        }

        .chart-bar {
          width: 100%;
          border-radius: 14px 14px 4px 4px;
          background: linear-gradient(180deg, #00d4ff 0%, #2563eb 100%);
          box-shadow: 0 18px 40px rgba(37, 99, 235, 0.25);
          min-height: 22px;
        }

        .chat-layout {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 20px;
        }

        .chat-messages {
          display: grid;
          gap: 0.9rem;
          flex: 1;
          overflow-y: auto;
          padding-right: 4px;
        }

        .settings-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 20px;
        }

        @media (max-width: 1280px) {
          .stats-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .stats-grid-three {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .tables-grid,
          .chat-layout,
          .settings-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 860px) {
          .sidebar {
            position: static;
            width: 100%;
            min-height: auto;
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            gap: 20px;
          }

          .content {
            margin-left: 0;
            padding: 20px;
          }
        }

        @media (max-width: 640px) {
          .stats-grid,
          .stats-grid-three {
            grid-template-columns: 1fr;
          }

          .content {
            padding: 16px;
          }

          .header-row,
          .toolbar-row {
            flex-direction: column;
            align-items: flex-start;
          }

          .chart-row {
            gap: 8px;
          }
        }
      `}</style>

      <div className="dashboard-shell">
        <aside className="sidebar">
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
                fontSize: "1.2rem",
                fontWeight: 800,
                marginBottom: "1.5rem",
              }}
            >
              <span style={{ fontSize: "1.45rem" }}>🔐</span>
              <span>Admin Panel</span>
            </div>

            <nav style={{ display: "grid", gap: "0.55rem" }}>
              {navigationItems.map((item) => {
                const isActive = activePage === item.key;

                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setActivePage(item.key)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.8rem",
                      width: "100%",
                      padding: "0.95rem 1rem",
                      borderRadius: "14px",
                      border: "1px solid transparent",
                      borderLeft: isActive ? "4px solid #00d4ff" : "4px solid transparent",
                      background: isActive ? "rgba(0, 212, 255, 0.12)" : "transparent",
                      color: isActive ? "#ffffff" : "rgba(255,255,255,0.72)",
                      textAlign: "left",
                      fontSize: "0.98rem",
                      cursor: "pointer",
                    }}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "0.95rem 1rem",
              borderRadius: "14px",
              border: "1px solid rgba(248, 113, 113, 0.25)",
              background: "rgba(248, 113, 113, 0.1)",
              color: "#fecaca",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            Chiqish
          </button>
        </aside>

        <main className="content">
          <div
            className="header-row"
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
              alignItems: "center",
              marginBottom: "0.5rem",
            }}
          >
            <div>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", marginBottom: "0.4rem" }}>
                {getPageDescription(activePage)}
              </p>
              <h1 style={{ fontSize: "2rem", fontWeight: 800 }}>{getPageTitle(activePage)}</h1>
            </div>

            <div
              className="glass-card"
              style={{
                borderRadius: "18px",
                padding: "0.95rem 1.15rem",
                minWidth: "260px",
              }}
            >
              <div style={{ color: "rgba(255,255,255,0.56)", fontSize: "0.85rem", marginBottom: "0.35rem" }}>
                Joriy sana va vaqt
              </div>
              <div style={{ fontWeight: 700, lineHeight: 1.5 }}>{formattedTime}</div>
            </div>
          </div>

          {renderActiveContent()}
        </main>
      </div>
    </>
  );
}

const actionButtonStyle = {
  padding: "0.55rem 0.7rem",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.04)",
  color: "#fff",
  cursor: "pointer",
} as const;

const primaryButtonStyle = {
  padding: "0.9rem 1.1rem",
  borderRadius: "14px",
  border: "none",
  background: "linear-gradient(135deg, #00d4ff, #2563eb)",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer",
  boxShadow: "0 18px 34px rgba(0,212,255,0.16)",
} as const;

const inputStyle = {
  width: "100%",
  padding: "0.9rem 1rem",
  borderRadius: "14px",
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.04)",
  color: "#fff",
  outline: "none",
} as const;

const fieldLabelStyle = {
  display: "grid",
  gap: "0.45rem",
  color: "rgba(255,255,255,0.82)",
} as const;

const toggleRowStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1rem",
  padding: "0.85rem 0",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
} as const;

const summaryRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: "1rem",
  padding: "0.85rem 0",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
  color: "rgba(255,255,255,0.82)",
} as const;

function getToggleStyle(enabled: boolean) {
  return {
    width: "54px",
    height: "30px",
    borderRadius: "999px",
    border: "none",
    background: enabled ? "linear-gradient(135deg, #00d4ff, #2563eb)" : "rgba(255,255,255,0.14)",
    padding: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: enabled ? "flex-end" : "flex-start",
    cursor: "pointer",
  } as const;
}

function getToggleKnobStyle(enabled: boolean) {
  return {
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    background: enabled ? "#ffffff" : "rgba(255,255,255,0.7)",
  } as const;
}