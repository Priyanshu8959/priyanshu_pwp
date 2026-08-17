import { useEffect, useRef } from 'react'
import { GitBranch, ExternalLink } from 'lucide-react'

const projects = [
  {
    name: 'HireMeAI',
    description:
      'An AI-powered personal portfolio website where recruiters can chat with an AI assistant to learn about my skills, experience, and projects. Built with FastAPI backend and React frontend.',
    tech: ['Python', 'FastAPI', 'Groq API', 'React', 'Vite', 'Tailwind CSS'],
    github: 'https://github.com/Priyanshu8959',
    featured: true,
  },
]

const accentColors = [
  { from: '#3b82f6', to: '#8b5cf6' },
  { from: '#8b5cf6', to: '#06b6d4' },
  { from: '#06b6d4', to: '#10b981' },
  { from: '#f59e0b', to: '#ef4444' },
]

export default function Projects() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1
          entry.target.style.transform = 'translateY(0)'
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" style={{ padding: '100px 24px' }}>
      <div
        ref={sectionRef}
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          opacity: 0,
          transform: 'translateY(32px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent-indigo)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
            Portfolio
          </p>
          <h2 className="section-heading">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="section-subheading">Things I've built and shipped</p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 24,
          }}
        >
          {projects.map((project, idx) => {
            const accent = accentColors[idx % accentColors.length]
            return (
              <div
                key={project.name}
                className="glass-card"
                style={{
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Top gradient bar */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
                    borderRadius: '16px 16px 0 0',
                  }}
                />

                {/* Featured badge */}
                {project.featured && (
                  <span
                    style={{
                      alignSelf: 'flex-start',
                      padding: '3px 10px',
                      borderRadius: 100,
                      fontSize: 11,
                      fontWeight: 600,
                      background: `linear-gradient(135deg, ${accent.from}22, ${accent.to}22)`,
                      border: `1px solid ${accent.from}44`,
                      color: accent.from,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}
                  >
                    ✦ Featured
                  </span>
                )}

                <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                  {project.name}
                </h3>

                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75, flex: 1 }}>
                  {project.description}
                </p>

                {/* Tech stack */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        padding: '4px 10px',
                        borderRadius: 6,
                        fontSize: 12,
                        fontWeight: 500,
                        background: 'rgba(99,102,241,0.1)',
                        border: '1px solid rgba(99,102,241,0.2)',
                        color: 'var(--accent-indigo)',
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div style={{ display: 'flex', gap: 12, paddingTop: 4 }}>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '8px 16px',
                        borderRadius: 8,
                        fontSize: 13,
                        fontWeight: 500,
                        color: 'var(--text-secondary)',
                        textDecoration: 'none',
                        border: '1px solid rgba(255,255,255,0.1)',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--text-primary)'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--text-secondary)'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                        e.currentTarget.style.background = 'transparent'
                      }}
                    >
                      <GitBranch size={14} /> GitHub
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '8px 16px',
                        borderRadius: 8,
                        fontSize: 13,
                        fontWeight: 500,
                        color: accent.from,
                        textDecoration: 'none',
                        border: `1px solid ${accent.from}40`,
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = accent.from + '14'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent'
                      }}
                    >
                      <ExternalLink size={14} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* More on GitHub note */}
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <a
            href="https://github.com/Priyanshu8959"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 500,
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-indigo)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
          >
            <GitBranch size={16} />
            View more projects on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
