import MacWindow from './MacWindow'

const PROJECTS = [
  {
    name: 'HireMeAI',
    description:
      'An AI-powered personal portfolio website where recruiters can chat with an AI assistant to learn about my skills, experience, and projects. Built with FastAPI backend and React frontend.',
    tech: ['Python', 'FastAPI', 'Groq API', 'React', 'Vite', 'Tailwind CSS'],
    github: 'https://github.com/Priyanshu8959',
    featured: true,
  },
]

const SKILL_CATEGORIES = [
  { name: 'Languages',              color: 'terra',  skills: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'HTML', 'CSS'] },
  { name: 'Frameworks & Libraries', color: 'sage',   skills: ['FastAPI', 'React', 'Node.js', 'Express.js'] },
  { name: 'AI Engineering',              color: 'gold',   skills: ['LangChain', 'OpenAI API', 'Groq', 'RAG Pipelines', 'Pandas'] },
  { name: 'Tools',                  color: 'terra',  skills: ['Git', 'GitHub', 'Docker', 'Linux', 'Postman'] },
  { name: 'Databases',              color: 'sage',   skills: ['PostgreSQL', 'MongoDB', 'SQLite', 'Redis'] },
]

export default function ProjectsWindow({ onClose, onFocus, zIndex, initialX, initialY }) {
  return (
    <MacWindow
      title="Projects & Skills — Priyanshu Pawar"
      width={580}
      height={480}
      initialX={initialX ?? 160}
      initialY={initialY ?? 60}
      onClose={onClose}
      onFocus={onFocus}
      zIndex={zIndex}
    >
      <div className="win-section">
        {/* Projects */}
        <p className="win-label">Featured Projects</p>
        <h2 className="win-heading">Things I've Built</h2>

        {PROJECTS.map((p) => (
          <div key={p.name} className="retro-card" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, fontSize: 15, color: 'var(--ink)' }}>
                {p.name}
              </span>
              {p.featured && (
                <span style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 10,
                  padding: '2px 8px',
                  borderRadius: 2,
                  background: 'rgba(181,99,74,0.12)',
                  border: '1px solid rgba(181,99,74,0.3)',
                  color: 'var(--terra)',
                  fontWeight: 700,
                }}>
                  ★ FEATURED
                </span>
              )}
            </div>
            <p style={{ fontFamily: "'Crimson Text', serif", fontSize: 15, color: 'var(--ink-mid)', lineHeight: 1.6, marginBottom: 12 }}>
              {p.description}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: 12 }}>
              {p.tech.map((t) => (
                <span key={t} className="retro-tag terra">{t}</span>
              ))}
            </div>
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              className="retro-btn"
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12 }}
            >
              ⌗ View on GitHub
            </a>
          </div>
        ))}

        {/* Divider */}
        <div style={{ borderTop: '1px solid var(--paper-deep)', margin: '20px 0 16px' }} />

        {/* Skills */}
        <p className="win-label">Tech Stack</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat.name} className="retro-card" style={{ padding: '12px 14px' }}>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, fontWeight: 700, color: 'var(--terra)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                {cat.name}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {cat.skills.map((s) => (
                  <span key={s} className={`retro-tag ${cat.color}`}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MacWindow>
  )
}
