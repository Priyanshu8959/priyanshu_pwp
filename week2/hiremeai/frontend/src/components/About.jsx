import { useEffect, useRef } from 'react'
import { Code2, Brain, Rocket } from 'lucide-react'

const highlights = [
  { icon: Code2, label: 'DSA Focused', desc: 'Solving 800+ algorithmic problems across competitive platforms' },
  { icon: Brain, label: 'AI Engineering', desc: 'Building intelligent, AI-driven applications with modern LLM APIs' },
  { icon: Rocket, label: 'Fast Learner', desc: 'Exploring computer networking, systems & new tech at pace' },
]

function useInView(ref) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1
          entry.target.style.transform = 'translateY(0)'
        }
      },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])
}

export default function About() {
  const sectionRef = useRef(null)
  useInView(sectionRef)

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        padding: '100px 24px',
        maxWidth: 1100,
        margin: '0 auto',
        opacity: 0,
        transform: 'translateY(32px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 60, alignItems: 'center' }}>
        {/* Text block */}
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent-indigo)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
            About Me
          </p>
          <h2 className="section-heading" style={{ marginBottom: 20 }}>
            Turning ideas into{' '}
            <span className="text-gradient">reality</span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 16 }}>
              I'm <strong style={{ color: 'var(--text-primary)' }}>Priyanshu Pawar</strong>, a CSBS student and software developer focused on{' '}
              <strong style={{ color: 'var(--text-primary)' }}>DSA, C++, AI, and scalable software systems</strong>.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 16 }}>
              I've solved <strong style={{ color: 'var(--text-primary)' }}>750+ DSA problems</strong> and achieved{' '}
              <strong style={{ color: 'var(--text-primary)' }}>Specialist on Codeforces</strong>, while building practical projects that turn complex ideas into efficient solutions.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 16 }}>
              Currently focused on becoming a strong <strong style={{ color: 'var(--text-primary)' }}>Software Engineer</strong> and building products that scale.
            </p>
          </div>
        </div>

        {/* Highlight cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {highlights.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.label}
                className="glass-card"
                style={{ padding: '20px 24px', display: 'flex', alignItems: 'flex-start', gap: 16 }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2))',
                    border: '1px solid rgba(99,102,241,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={20} color="var(--accent-indigo)" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: 'var(--text-primary)' }}>{item.label}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
