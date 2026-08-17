import { useEffect, useRef } from 'react'
import { Briefcase, Award, GraduationCap } from 'lucide-react'

const experiences = [
  {
    type: 'education',
    icon: GraduationCap,
    title: 'B.E. in Computer Engineering',
    organization: 'Currently Pursuing',
    period: 'Present',
    description: 'Studying core computer science subjects including algorithms, data structures, operating systems, and software engineering.',
    tags: ['Computer Engineering', 'Data Structures', 'Algorithms'],
    color: '#8b5cf6',
  },
]

const achievements = [
  {
    icon: Award,
    title: 'HireMeAI — AI Portfolio Project',
    description: 'Built a full-stack AI-powered portfolio where recruiters can interact with an AI assistant trained on resume data using Groq API.',
    color: '#3b82f6',
  },
  {
    icon: Award,
    title: 'Active Open Source Contributor',
    description: 'Regularly contributes to personal and open source projects on GitHub, maintaining a consistent development practice.',
    color: '#06b6d4',
  },
]

export default function Experience() {
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
      id="experience"
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
            Journey
          </p>
          <h2 className="section-heading">
            Experience & <span className="text-gradient">Achievements</span>
          </h2>
          <p className="section-subheading">My academic and professional journey</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
          {/* Education & Experience column */}
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20 }}>
              Education
            </h3>
            <div style={{ position: 'relative' }}>
              {/* Timeline line */}
              <div
                style={{
                  position: 'absolute',
                  left: 20,
                  top: 44,
                  bottom: 0,
                  width: 1,
                  background: 'linear-gradient(to bottom, rgba(99,102,241,0.4), transparent)',
                }}
              />

              {experiences.map((exp) => {
                const Icon = exp.icon
                return (
                  <div
                    key={exp.title}
                    style={{ display: 'flex', gap: 20, marginBottom: 28, position: 'relative' }}
                  >
                    {/* Icon node */}
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: '50%',
                        background: exp.color + '18',
                        border: `2px solid ${exp.color}40`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        zIndex: 1,
                      }}
                    >
                      <Icon size={18} color={exp.color} />
                    </div>

                    {/* Content */}
                    <div className="glass-card" style={{ flex: 1, padding: '18px 20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                        <h4 style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)' }}>{exp.title}</h4>
                        <span style={{ fontSize: 12, color: exp.color, fontWeight: 500 }}>{exp.period}</span>
                      </div>
                      <p style={{ fontSize: 13, color: exp.color, fontWeight: 600, marginBottom: 8 }}>{exp.organization}</p>
                      <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 12 }}>{exp.description}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              padding: '3px 10px',
                              borderRadius: 100,
                              fontSize: 11,
                              fontWeight: 500,
                              background: exp.color + '12',
                              border: `1px solid ${exp.color}25`,
                              color: exp.color,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Achievements column */}
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20 }}>
              Highlights & Achievements
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {achievements.map((a) => {
                const Icon = a.icon
                return (
                  <div key={a.title} className="glass-card" style={{ padding: '20px 22px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: a.color + '16',
                        border: `1px solid ${a.color}30`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={18} color={a.color} />
                    </div>
                    <div>
                      <h4 style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', marginBottom: 6 }}>{a.title}</h4>
                      <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{a.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
