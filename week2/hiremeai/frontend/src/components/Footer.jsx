import { GitBranch, Link2, ExternalLink, Heart, Cpu } from 'lucide-react'

const socialLinks = [
  { label: 'GitHub', icon: GitBranch, href: 'https://github.com/Priyanshu8959' },
  { label: 'LinkedIn', icon: Link2, href: 'https://www.linkedin.com/in/priyanshupawar/' },
  { label: 'Codolio', icon: ExternalLink, href: 'https://codolio.com/profile/_pawar' },
]

export default function Footer() {
  return (
    <footer
      style={{
        padding: '48px 24px 32px',
        borderTop: '1px solid rgba(99,102,241,0.1)',
        background: 'rgba(10,14,26,0.9)',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 24 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Cpu size={16} color="white" />
          </div>
          <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Priyanshu<span style={{ color: 'var(--accent-indigo)' }}>.dev</span>
          </span>
        </div>

        {/* Social links */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 32 }}>
          {socialLinks.map((s) => {
            const Icon = s.icon
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                id={`footer-${s.label.toLowerCase()}`}
                title={s.label}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--accent-indigo)'
                  e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'
                  e.currentTarget.style.background = 'rgba(99,102,241,0.1)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-muted)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <Icon size={17} />
              </a>
            )
          })}
        </div>

        {/* Nav links */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap', marginBottom: 28 }}>
          {['About', 'Skills', 'Experience', 'Resume', 'Chat'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              style={{
                fontSize: 13,
                color: 'var(--text-muted)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--text-secondary)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(99,102,241,0.08)', marginBottom: 24 }} />

        {/* Copyright */}
        <p style={{ fontSize: 13, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
          © {new Date().getFullYear()} Priyanshu Pawar · Built with
          <Heart size={13} color="#ef4444" fill="#ef4444" />
          using React & FastAPI
        </p>
      </div>
    </footer>
  )
}
