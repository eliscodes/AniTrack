import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#0a0a0a" }}>
      <div style={{ textAlign: "center", color: "white" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>AniTrack</h1>
        <p style={{ fontSize: "1.2rem", color: "#999", marginBottom: "2rem" }}>Track your anime watching progress</p>
        <Link href="/dashboard" style={{
          display: "inline-block",
          backgroundColor: "#2563eb",
          color: "white",
          padding: "12px 24px",
          borderRadius: "8px",
          textDecoration: "none",
          fontSize: "1rem",
          fontWeight: "bold"
        }}>
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}
