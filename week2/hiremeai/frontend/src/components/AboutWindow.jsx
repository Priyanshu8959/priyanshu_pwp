import MacWindow from './MacWindow'

const HIGHLIGHTS = [
  {
    icon: '💻',
    label: 'DSA Focused',
    desc: 'Solved 800+ problems in algorithms and data structures across competitive programming platforms.',
  },
  {
    icon: '🤖',
    label: 'AI Engineering',
    desc: 'Building intelligent, AI-powered applications using modern LLM APIs, RAG pipelines, and agentic workflows.',
  },
  {
    icon: '🌐',
    label: 'Computer Networking',
    desc: 'Exploring networking fundamentals, protocols, and systems as part of my core engineering focus.',
  },
]

export default function AboutWindow({ onClose, onFocus, zIndex, initialX, initialY }) {
  return (
    <MacWindow
      title="About — Priyanshu Pawar"
      width={520}
      height={600}
      initialX={initialX ?? 120}
      initialY={initialY ?? 70}
      onClose={onClose}
      onFocus={onFocus}
      zIndex={zIndex}
    >
      <div className="win-section">
        <p className="win-label">About Me</p>
        <h2 className="win-heading">Priyanshu Pawar</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          <p className="win-body-text">
            I'm a passionate developer focused on building full-stack applications with a strong emphasis on AI and machine learning integration.
          </p>
          <p className="win-body-text">
            I thrive at the intersection of clean software engineering and intelligent systems — creating applications that are not just functional, but genuinely impactful.
          </p>
          <p className="win-body-text">
            When not coding, I explore new technologies, contribute to open source, and continuously expand my knowledge across the ever-evolving tech landscape.
          </p>
        </div>

        {/* Contact Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
          <div className="retro-card" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>📧</span>
            <div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, fontSize: 11, color: 'var(--ink-mid)', marginBottom: 2 }}>EMAIL</div>
              <a href="mailto:pawarpriyanshu198@gmail.com" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, color: 'var(--ink)', textDecoration: 'none', borderBottom: '1px dotted var(--ink-mid)' }}>
                pawarpriyanshu198@gmail.com
              </a>
            </div>
          </div>
          <div className="retro-card" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>📞</span>
            <div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, fontSize: 11, color: 'var(--ink-mid)', marginBottom: 2 }}>PHONE</div>
              <a href="tel:+918109987611" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, color: 'var(--ink)', textDecoration: 'none', borderBottom: '1px dotted var(--ink-mid)' }}>
                +91 8109987611
              </a>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {HIGHLIGHTS.map((h) => (
            <div key={h.label} className="retro-card" style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>{h.icon}</span>
              <div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, fontSize: 13, color: 'var(--ink)', marginBottom: 3 }}>
                  {h.label}
                </div>
                <div style={{ fontFamily: "'Crimson Text', serif", fontSize: 15, color: 'var(--ink-mid)', lineHeight: 1.5 }}>
                  {h.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MacWindow>
  )
}
