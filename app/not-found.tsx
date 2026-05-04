export default function NotFound() {
  return (
    <main style={{ background: "#050a10", color: "#e8edf2", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", fontFamily: "sans-serif" }}>
      <div style={{ fontSize: "8rem", fontWeight: 800, color: "#00d4ff", lineHeight: 1 }}>404</div>
      <h2 style={{ fontSize: "2rem", fontWeight: 700, margin: "1rem 0" }}>Sahifa topilmadi!</h2>
      <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "2rem" }}>Siz qidirgan sahifa mavjud emas.</p>
      <a href="/" style={{ padding: "0.8rem 2rem", background: "linear-gradient(135deg, #00d4ff, #0077ee)", color: "#fff", borderRadius: "8px", textDecoration: "none", fontWeight: 600 }}>
        Bosh sahifaga qaytish →
      </a>
    </main>
  )
}