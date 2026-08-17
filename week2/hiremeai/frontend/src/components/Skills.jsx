import { useEffect, useRef } from 'react'

const skillCategories = [
  {
    name: 'Languages',
    color: '#3b82f6',
    skills: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'HTML', 'CSS'],
  },
  {
    name: 'Frameworks & Libraries',
    color: '#8b5cf6',
    skills: ['FastAPI', 'React', 'Node.js', 'Express.js', 'Tailwind CSS'],
  },
  {
    name: 'AI Engineering',
    color: '#06b6d4',
    skills: ['LangChain', 'OpenAI API', 'Groq', 'RAG Pipelines', 'Pandas', 'NumPy'],
  },
  {
    name: 'Networking & Systems',
    color: '#f59e0b',
    skills: ['TCP/IP', 'HTTP/HTTPS', 'DNS', 'REST APIs', 'WebSockets', 'Linux'],
  },
  {
    name: 'Tools & DevOps',
    color: '#10b981',
    skills: ['Git', 'GitHub', 'Docker', 'Linux', 'VS Code', 'Postman'],
  },
]

function SkillBadge({ label, color }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '6px 14px',
        borderRadius: 100,
        fontSize: 13,
        fontWeight: 500,
        background: color + '14',
        border: `1px solid ${color}30`,
        color: color,
        transition: 'all 0.2s ease',
        cursor: 'default',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = color + '28'
        e.currentTarget.style.borderColor = color + '70'
        e.currentTarget.style.transform = 'scale(1.04)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = color + '14'
        e.currentTarget.style.borderColor = color + '30'
        e.currentTarget.style.transform = 'scale(1)'
      }}
    >
      {label}
    </span>
  )
}

export default function Skills() {
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
    <section
      id="skills"
      style={{
        padding: '100px 24px',
        background: 'rgba(15,22,41,0.5)',
        borderTop: '1px solid rgba(99,102,241,0.08)',
        borderBottom: '1px solid rgba(99,102,241,0.08)',
      }}
    >
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
            Technical Skills
          </p>
          <h2 className="section-heading">
            My <span className="text-gradient">Tech Stack</span>
          </h2>
          <p className="section-subheading">Technologies I work with to build modern, scalable applications</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {skillCategories.map((cat) => (
            <div key={cat.name} className="glass-card" style={{ padding: '24px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: cat.color,
                    boxShadow: `0 0 8px ${cat.color}`,
                  }}
                />
                <span style={{ fontSize: 13, fontWeight: 600, color: cat.color, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  {cat.name}
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {cat.skills.map((skill) => (
                  <SkillBadge key={skill} label={skill} color={cat.color} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
