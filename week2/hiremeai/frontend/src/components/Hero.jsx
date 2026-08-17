import { useEffect, useRef, useState } from 'react'
import { GitBranch, Link2, ExternalLink, Download, ChevronDown } from 'lucide-react'

const socialLinks = [
  {
    label: 'GitHub',
    icon: GitBranch,
    href: 'https://github.com/Priyanshu8959',
    color: '#f0f6fc',
  },
  {
    label: 'LinkedIn',
    icon: Link2,
    href: 'https://www.linkedin.com/in/priyanshupawar/',
    color: '#0a66c2',
  },
  {
    label: 'Codolio',
    icon: ExternalLink,
    href: 'https://codolio.com/profile/_pawar',
    color: '#06b6d4',
  },
]

const typingStrings = [
  'Full Stack Developer',
  'AI Engineer',
  'DSA Enthusiast',
  'Problem Solver',
  'Python Developer',
]

function useTypingEffect(strings, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('')
  const [strIdx, setStrIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = strings[strIdx]
    let timeout

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed)
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2)
    } else if (deleting && charIdx === 0) {
      setDeleting(false)
      setStrIdx((s) => (s + 1) % strings.length)
    }

    setDisplay(current.slice(0, charIdx))
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, strIdx, strings, speed, pause])

  return display
}

export default function Hero() {
  const heroRef = useRef(null)
  const typedText = useTypingEffect(typingStrings)

  useEffect(() => {
    const el = heroRef.current
    if (el) {
      el.style.opacity = 0
      requestAnimationFrame(() => {
        el.style.transition = 'opacity 0.8s ease'
        el.style.opacity = 1
      })
    }
  }, [])

  return (
    <section
      id="hero"
      ref={heroRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '100px 24px 60px',
        position: 'relative',
      }}
    >
      {/* Availability badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 16px',
          borderRadius: 100,
          background: 'rgba(34,197,94,0.08)',
          border: '1px solid rgba(34,197,94,0.25)',
          marginBottom: 32,
          fontSize: 13,
          fontWeight: 500,
          color: '#4ade80',
          letterSpacing: '0.02em',
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: '#4ade80',
            boxShadow: '0 0 8px #4ade80',
            animation: 'pulse 2s infinite',
          }}
        />
        Open to opportunities
        <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
      </div>

      {/* Name */}
      <h1
        style={{
          fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          lineHeight: 1.05,
          marginBottom: 16,
          color: 'var(--text-primary)',
        }}
      >
        Priyanshu{' '}
        <span className="text-gradient">Pawar</span>
      </h1>

      {/* Animated typing role */}
      <div
        style={{
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 24,
        }}
      >
        <span
          style={{
            fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
            fontWeight: 500,
            color: 'var(--text-secondary)',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {typedText}
          <span
            style={{
              display: 'inline-block',
              width: 2,
              height: '1.2em',
              background: 'var(--accent-indigo)',
              marginLeft: 3,
              verticalAlign: 'text-bottom',
              animation: 'blink 1s step-end infinite',
            }}
          />
        </span>
      </div>

      {/* Short tagline */}
      <p
        style={{
          maxWidth: 560,
          fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
          color: 'var(--text-secondary)',
          lineHeight: 1.75,
          marginBottom: 48,
        }}
      >
        Passionate about building intelligent applications and solving real-world problems
        through clean code and modern technology.
      </p>

      {/* CTA Buttons */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 56 }}>
        <a
          href="#chat"
          id="hero-ask-ai-btn"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '13px 28px',
            borderRadius: 12,
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            color: 'white',
            fontWeight: 600,
            fontSize: 15,
            textDecoration: 'none',
            boxShadow: '0 8px 24px rgba(99,102,241,0.35)',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(99,102,241,0.5)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(99,102,241,0.35)'
          }}
        >
          ✦ Ask AI About Me
        </a>

        <a
          href="#resume"
          id="hero-view-resume-btn"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '13px 28px',
            borderRadius: 12,
            background: 'transparent',
            color: 'var(--text-primary)',
            fontWeight: 600,
            fontSize: 15,
            textDecoration: 'none',
            border: '1px solid rgba(99,102,241,0.35)',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(99,102,241,0.7)'
            e.currentTarget.style.background = 'rgba(99,102,241,0.08)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(99,102,241,0.35)'
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          <Download size={16} />
          Resume
        </a>
      </div>

      {/* Social links */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 72 }}>
        {socialLinks.map((s) => {
          const Icon = s.icon
          return (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              id={`hero-social-${s.label.toLowerCase()}`}
              title={s.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                padding: '9px 16px',
                borderRadius: 10,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: 13,
                fontWeight: 500,
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = s.color
                e.currentTarget.style.borderColor = s.color + '44'
                e.currentTarget.style.background = s.color + '12'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <Icon size={15} />
              {s.label}
            </a>
          )
        })}
      </div>

      {/* Scroll cue */}
      <div
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          color: 'var(--text-muted)',
          fontSize: 12,
          animation: 'float 2.5s ease-in-out infinite',
        }}
      >
        <span>Scroll</span>
        <ChevronDown size={16} />
      </div>
    </section>
  )
}
