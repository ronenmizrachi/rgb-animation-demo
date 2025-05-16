// SectionBackground.jsx
export default function SectionBackground({ children, background = "#fff", id, className = "" }) {
    return (
      <div id={id} className={className} style={{ width: "100vw", background }}>
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          {children}
        </div>
      </div>
    );
  }
  