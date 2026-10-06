export const metadata = {
  title: "Offline · 37 Practices",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#F7F3EB",
          color: "#2C2A26",
          fontFamily: "Georgia, serif",
          padding: "1.5rem",
          textAlign: "center",
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.75rem", marginBottom: "0.75rem" }}>
            You are offline
          </h1>
          <p style={{ opacity: 0.75, maxWidth: "28rem", margin: "0 auto" }}>
            This page is not in the cache yet. Open the app online once, then
            practices will be available offline.
          </p>
        </div>
      </body>
    </html>
  );
}
