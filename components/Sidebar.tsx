"use client";

type SidebarProps = {
  sidebarWidth: string;
  sidebarExpanded: boolean;
  activeSection: string;
  showClientCabinet: boolean;
  showSettings: boolean;
  showTeam: boolean;
  onToggleSidebar: () => void;
  onScrollTo: (id: string) => void;
  onOpenClientCabinet: () => void;
  onOpenSettings: () => void;
  onOpenTeam: () => void;
};

const navigationItems = [
  { icon: "🏠", label: "Bosh sahifa", id: "home" },
  { icon: "🛠️", label: "Xizmatlar", id: "services" },
  { icon: "👥", label: "Haqimizda", id: "about" },
  { icon: "📬", label: "Bog'lanish", id: "contact" },
];

const sidebarLabelStyle = (expanded: boolean) => ({
  fontSize: "0.9rem",
  color: "inherit",
  opacity: expanded ? 1 : 0,
  width: expanded ? "auto" : 0,
  overflow: "hidden",
  whiteSpace: "nowrap" as const,
  transition: "opacity 0.2s ease, width 0.3s ease",
});

const sidebarButtonBase = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px 16px",
  border: "none",
  cursor: "pointer",
  transition: "background 0.2s ease, color 0.2s ease",
};

export default function Sidebar({
  sidebarWidth,
  sidebarExpanded,
  activeSection,
  showClientCabinet,
  showSettings,
  showTeam,
  onToggleSidebar,
  onScrollTo,
  onOpenClientCabinet,
  onOpenSettings,
  onOpenTeam,
}: SidebarProps) {
  return (
    <aside
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        width: sidebarWidth,
        background: "rgba(5,10,16,0.95)",
        borderRight: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.3s ease",
        zIndex: 110,
        overflow: "hidden",
        backdropFilter: "blur(12px)",
      }}
    >
      <button
        onClick={onToggleSidebar}
        style={{
          ...sidebarButtonBase,
          background: "transparent",
          color: "#fff",
          borderLeft: "3px solid transparent",
          marginTop: "1rem",
        }}
        title={sidebarExpanded ? "Yopish" : "Ochish"}
      >
        <span style={{ fontSize: "20px", minWidth: "20px", textAlign: "center" }}>{sidebarExpanded ? "✕" : "☰"}</span>
        <span style={sidebarLabelStyle(sidebarExpanded)}>Menyu</span>
      </button>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", marginTop: "1rem" }}>
        {navigationItems.map((item) => (
          <button
            key={item.id}
            title={item.label}
            onClick={() => onScrollTo(item.id)}
            style={{
              ...sidebarButtonBase,
              background: activeSection === item.id ? "rgba(0,212,255,0.1)" : "transparent",
              borderLeft: activeSection === item.id ? "3px solid #00d4ff" : "3px solid transparent",
              color: activeSection === item.id ? "#00d4ff" : "rgba(255,255,255,0.7)",
            }}
            onMouseEnter={(event) => {
              if (activeSection !== item.id) {
                event.currentTarget.style.background = "rgba(0,212,255,0.1)";
                event.currentTarget.style.color = "#00d4ff";
              }
            }}
            onMouseLeave={(event) => {
              if (activeSection !== item.id) {
                event.currentTarget.style.background = "transparent";
                event.currentTarget.style.color = "rgba(255,255,255,0.7)";
              }
            }}
          >
            <span style={{ fontSize: "20px", minWidth: "20px", textAlign: "center" }}>{item.icon}</span>
            <span style={sidebarLabelStyle(sidebarExpanded)}>{item.label}</span>
          </button>
        ))}

        <button
          title="Shaxsiy kabinet"
          onClick={onOpenClientCabinet}
          style={{
            ...sidebarButtonBase,
            background: showClientCabinet ? "rgba(0,212,255,0.1)" : "transparent",
            borderLeft: showClientCabinet ? "3px solid #00d4ff" : "3px solid transparent",
            color: showClientCabinet ? "#00d4ff" : "rgba(255,255,255,0.7)",
          }}
          onMouseEnter={(event) => {
            if (!showClientCabinet) {
              event.currentTarget.style.background = "rgba(0,212,255,0.1)";
              event.currentTarget.style.color = "#00d4ff";
            }
          }}
          onMouseLeave={(event) => {
            if (!showClientCabinet) {
              event.currentTarget.style.background = "transparent";
              event.currentTarget.style.color = "rgba(255,255,255,0.7)";
            }
          }}
        >
          <span style={{ fontSize: "20px", minWidth: "20px", textAlign: "center" }}>👤</span>
          <span style={sidebarLabelStyle(sidebarExpanded)}>Shaxsiy kabinet</span>
        </button>

        <button
          title="Sozlamalar"
          onClick={onOpenSettings}
          style={{
            ...sidebarButtonBase,
            background: showSettings ? "rgba(0,212,255,0.1)" : "transparent",
            borderLeft: showSettings ? "3px solid #00d4ff" : "3px solid transparent",
            color: showSettings ? "#00d4ff" : "rgba(255,255,255,0.7)",
          }}
          onMouseEnter={(event) => {
            if (!showSettings) {
              event.currentTarget.style.background = "rgba(0,212,255,0.1)";
              event.currentTarget.style.color = "#00d4ff";
            }
          }}
          onMouseLeave={(event) => {
            if (!showSettings) {
              event.currentTarget.style.background = "transparent";
              event.currentTarget.style.color = "rgba(255,255,255,0.7)";
            }
          }}
        >
          <span style={{ fontSize: "20px", minWidth: "20px", textAlign: "center" }}>⚙️</span>
          <span style={sidebarLabelStyle(sidebarExpanded)}>Sozlamalar</span>
        </button>

        <button
          title="Jamoa a'zolari"
          onClick={onOpenTeam}
          style={{
            ...sidebarButtonBase,
            background: showTeam ? "rgba(0,212,255,0.1)" : "transparent",
            borderLeft: showTeam ? "3px solid #00d4ff" : "3px solid transparent",
            color: showTeam ? "#00d4ff" : "rgba(255,255,255,0.7)",
          }}
          onMouseEnter={(event) => {
            if (!showTeam) {
              event.currentTarget.style.background = "rgba(0,212,255,0.1)";
              event.currentTarget.style.color = "#00d4ff";
            }
          }}
          onMouseLeave={(event) => {
            if (!showTeam) {
              event.currentTarget.style.background = "transparent";
              event.currentTarget.style.color = "rgba(255,255,255,0.7)";
            }
          }}
        >
          <span style={{ fontSize: "20px", minWidth: "20px", textAlign: "center" }}>👨‍💻</span>
          <span style={sidebarLabelStyle(sidebarExpanded)}>Jamoa a&apos;zolari</span>
        </button>

        <button
          title="Loyihalar"
          onClick={() => onScrollTo("projects")}
          style={{
            ...sidebarButtonBase,
            background: activeSection === "projects" ? "rgba(0,212,255,0.1)" : "transparent",
            borderLeft: activeSection === "projects" ? "3px solid #00d4ff" : "3px solid transparent",
            color: activeSection === "projects" ? "#00d4ff" : "rgba(255,255,255,0.7)",
          }}
          onMouseEnter={(event) => {
            if (activeSection !== "projects") {
              event.currentTarget.style.background = "rgba(0,212,255,0.1)";
              event.currentTarget.style.color = "#00d4ff";
            }
          }}
          onMouseLeave={(event) => {
            if (activeSection !== "projects") {
              event.currentTarget.style.background = "transparent";
              event.currentTarget.style.color = "rgba(255,255,255,0.7)";
            }
          }}
        >
          <span style={{ fontSize: "20px", minWidth: "20px", textAlign: "center" }}>🚀</span>
          <span style={sidebarLabelStyle(sidebarExpanded)}>Loyihalar</span>
        </button>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", margin: "1rem 0" }} />

        <button
          title="Admin Panel"
          onClick={() => {
            window.location.href = "/admin";
          }}
          style={{
            ...sidebarButtonBase,
            background: "rgba(0,212,255,0.08)",
            border: "1px solid rgba(0,212,255,0.2)",
            borderRadius: "8px",
            color: "#00d4ff",
          }}
          onMouseEnter={(event) => {
            event.currentTarget.style.background = "rgba(0,212,255,0.15)";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.background = "rgba(0,212,255,0.08)";
          }}
        >
          <span style={{ fontSize: "20px", minWidth: "20px", textAlign: "center" }}>🔐</span>
          <span style={sidebarLabelStyle(sidebarExpanded)}>Admin Panel</span>
        </button>
      </div>
    </aside>
  );
}