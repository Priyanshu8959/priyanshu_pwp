import MacWindow from './MacWindow'

const RESUME_URL = '/resume.pdf'

export default function ResumeWindow({ onClose, onFocus, zIndex, initialX, initialY }) {
  return (
    <MacWindow
      title="Resume — Priyanshu Pawar"
      width={460}
      height={380}
      initialX={initialX ?? 180}
      initialY={initialY ?? 100}
      onClose={onClose}
      onFocus={onFocus}
      zIndex={zIndex}
    >
      <div className="win-section" style={{ textAlign: 'center' }}>
        {/* Doc icon */}
        <div style={{
          width: 72,
          height: 72,
          margin: '0 auto 20px',
          background: 'linear-gradient(145deg, #e8e0cc, #d0c4a8)',
          border: '2px solid var(--win-border)',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 36,
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), 2px 2px 0 rgba(0,0,0,0.12)',
        }}>
          📄
        </div>

        <p className="win-label" style={{ textAlign: 'center' }}>Document</p>
        <h2 className="win-heading" style={{ textAlign: 'center', marginBottom: 8 }}>
          Priyanshu Pawar — Resume
        </h2>

        <p style={{ fontFamily: "'Crimson Text', serif", fontSize: 16, color: 'var(--ink-mid)', lineHeight: 1.6, marginBottom: 28, maxWidth: 340, margin: '0 auto 28px' }}>
          Full Stack Developer with a focus on AI Engineering, DSA, and building impactful intelligent applications.
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href={RESUME_URL}
            download="Priyanshu_Pawar_Resume.pdf"
            id="resume-download-btn"
            className="retro-btn retro-btn-primary"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            ↓ Download PDF
          </a>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="resume-view-btn"
            className="retro-btn"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            ◎ View Online
          </a>
        </div>

        {/* Decorative footer */}
        <div style={{
          marginTop: 32,
          padding: '12px 16px',
          background: 'var(--paper-dark)',
          border: '1px solid var(--paper-deep)',
          borderRadius: 4,
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 11,
          color: 'var(--ink-light)',
          lineHeight: 1.8,
        }}>
          <div>[ PDF ] Priyanshu_Pawar_Resume.pdf</div>
          <div style={{ color: 'var(--sage)' }}>► Skills: Python · FastAPI · React · AI Engineering · DSA</div>
          <div style={{ color: 'var(--terra)' }}>► Status: Open to Opportunities</div>
        </div>
      </div>
    </MacWindow>
  )
}
