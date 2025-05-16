// SectionWrapper.jsx

import "./SectionWrapper.css";

export default function SectionWrapper({
  children,
  background = "#f8f8f8",
  id,
  className = "",
  onReload,
  ctaText = "Replay",
}) {
  return (
    <div
      id={id}
      className={`section-wrapper ${className}`.trim()}
      style={{
        background,
        padding: "2rem 0",
        borderTop: "1px solid white",
      }}
    >
      <div
        style={{
          /*maxWidth: "1280px",*/
          margin: "0 auto",
          /*padding: "0 2rem",*/
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {onReload && (
          <button className="cta-button" onClick={onReload}>
            <div className="cta-icon cta-icon-left">
              <img src="/images/replay.svg" alt="Replay icon" />
            </div>
            <div className="cta-text">{ctaText}</div>
            <div className="cta-icon cta-icon-right">
              <img src="/images/replay.svg" alt="Replay icon" />
            </div>
          </button>
        )}

        {children}
      </div>
    </div>
  );
}
