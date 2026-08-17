import { useState } from 'react'

/* ── Official brand SVG icons ─────────────────────────────── */

// GitHub Mark (official Octocat silhouette)
function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="30" height="30" fill="#ffffff" aria-label="GitHub">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

// LinkedIn "in" logo (official)
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="30" height="30" fill="#ffffff" aria-label="LinkedIn">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

// Codolio — Owl + graduation cap (matches real Codolio brand logo)
function CodolioIcon() {
  return (
    <svg viewBox="0 0 64 64" width="30" height="30" aria-label="Codolio" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Graduation cap board */}
      <rect x="18" y="12" width="28" height="5" rx="2" fill="#ffffff" />
      {/* Cap top tassel line */}
      <line x1="32" y1="12" x2="32" y2="8" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      <circle cx="32" cy="7" r="2" fill="#ffffff" />
      {/* Cap sides hanging */}
      <line x1="20" y1="17" x2="20" y2="22" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      <line x1="44" y1="17" x2="44" y2="22" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      {/* Owl body */}
      <ellipse cx="32" cy="40" rx="13" ry="14" fill="#ffffff" opacity="0.92" />
      {/* Owl left eye */}
      <circle cx="27" cy="37" r="4" fill="#4a6741" />
      <circle cx="27" cy="37" r="2.2" fill="#1a1a1a" />
      <circle cx="28" cy="36" r="0.7" fill="#ffffff" />
      {/* Owl right eye */}
      <circle cx="37" cy="37" r="4" fill="#4a6741" />
      <circle cx="37" cy="37" r="2.2" fill="#1a1a1a" />
      <circle cx="38" cy="36" r="0.7" fill="#ffffff" />
      {/* Owl glasses bridge */}
      <line x1="31" y1="37" x2="33" y2="37" stroke="#888" strokeWidth="1" />
      {/* Owl glasses left frame */}
      <circle cx="27" cy="37" r="4.5" stroke="#888" strokeWidth="1" fill="none" />
      {/* Owl glasses right frame */}
      <circle cx="37" cy="37" r="4.5" stroke="#888" strokeWidth="1" fill="none" />
      {/* Owl beak */}
      <polygon points="32,41 29.5,44 34.5,44" fill="#e8a040" />
      {/* Owl wings */}
      <ellipse cx="20" cy="43" rx="7" ry="5" fill="#e0d8c8" opacity="0.8" transform="rotate(-15 20 43)" />
      <ellipse cx="44" cy="43" rx="7" ry="5" fill="#e0d8c8" opacity="0.8" transform="rotate(15 44 43)" />
      {/* Owl feet */}
      <line x1="28" y1="53" x2="26" y2="58" stroke="#e8a040" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="54" x2="32" y2="59" stroke="#e8a040" strokeWidth="2" strokeLinecap="round" />
      <line x1="36" y1="53" x2="38" y2="58" stroke="#e8a040" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/* ── Icon config — window apps ────────────────────────────── */
const DOCK_ICONS = [
  {
    id: 'chat',
    icon: () => <span style={{ fontSize: 28 }}>💬</span>,
    label: 'AI Chat',
    bg: 'linear-gradient(145deg, #c8836a, #8b3e2a)',
    type: 'window',
  },
  {
    id: 'about',
    icon: () => <span style={{ fontSize: 28 }}>👤</span>,
    label: 'About Me',
    bg: 'linear-gradient(145deg, #8eaa94, #4a7a52)',
    type: 'window',
  },

  {
    id: 'achievements',
    icon: () => <span style={{ fontSize: 28 }}>🏆</span>,
    label: 'Achievements',
    bg: 'linear-gradient(145deg, #b8922a, #7a5810)',
    type: 'window',
  },
  {
    id: 'resume',
    icon: () => <span style={{ fontSize: 28 }}>📄</span>,
    label: 'Resume',
    bg: 'linear-gradient(145deg, #c0a888, #7a6040)',
    type: 'window',
  },
]

/* ── Icon config — external links with brand SVGs ─────────── */
const EXTERNAL_ICONS = [
  {
    id: 'github',
    icon: GitHubIcon,
    label: 'GitHub',
    // Official GitHub brand color: near-black #24292e on lighter bg for dock aesthetic
    bg: 'linear-gradient(145deg, #3a3a3a, #1a1a1a)',
    href: 'https://github.com/Priyanshu8959',
  },
  {
    id: 'linkedin',
    icon: LinkedInIcon,
    label: 'LinkedIn',
    // Official LinkedIn brand blue #0A66C2
    bg: 'linear-gradient(145deg, #0e80d8, #0a56a0)',
    href: 'https://www.linkedin.com/in/priyanshupawar/',
  },
  {
    id: 'codolio',
    icon: CodolioIcon,
    label: 'Codolio',
    bg: 'linear-gradient(145deg, #4a7a6a, #2a5a4a)',
    href: 'https://codolio.com/profile/_pawar',
  },
]

/* ── DockIcon component ───────────────────────────────────── */
function DockIcon({ icon, isOpen, isBouncing, onClick }) {
  const [hovered, setHovered] = useState(false)
  const IconComponent = icon.icon

  return (
    <div
      className={`dock-icon-wrap${isBouncing ? ' bouncing' : ''}`}
      onClick={onClick}
      role="button"
      aria-label={icon.label}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative' }}
    >
      {/* Tooltip above icon */}
      {hovered && (
        <div
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 10px)',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(44, 31, 15, 0.92)',
            color: '#f0ebe0',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            fontWeight: 600,
            padding: '4px 10px',
            borderRadius: 4,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            zIndex: 9999,
            border: '1px solid rgba(240,235,224,0.2)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.35)',
            letterSpacing: '0.04em',
          }}
        >
          {icon.label}
          <span
            style={{
              position: 'absolute',
              bottom: -5,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: '5px solid rgba(44, 31, 15, 0.92)',
              display: 'block',
            }}
          />
        </div>
      )}

      {/* Icon box */}
      <div
        className="dock-icon"
        style={{
          background: icon.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconComponent />
      </div>

      {/* Open-window indicator dot */}
      {isOpen && <div className="dock-dot" />}
    </div>
  )
}

/* ── Dock ─────────────────────────────────────────────────── */
export default function Dock({ openWindows, onOpen }) {
  const [bouncing, setBouncing] = useState(null)

  const handleClick = (icon) => {
    setBouncing(icon.id)
    setTimeout(() => setBouncing(null), 500)

    if (icon.type === 'window') {
      onOpen(icon.id)
    } else if (icon.href) {
      window.open(icon.href, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="dock-bar" role="navigation" aria-label="Application Dock">
      {DOCK_ICONS.map((icon) => (
        <DockIcon
          key={icon.id}
          icon={icon}
          isOpen={openWindows.includes(icon.id)}
          isBouncing={bouncing === icon.id}
          onClick={() => handleClick(icon)}
        />
      ))}

      <div className="dock-separator" />

      {EXTERNAL_ICONS.map((icon) => (
        <DockIcon
          key={icon.id}
          icon={icon}
          isOpen={false}
          isBouncing={bouncing === icon.id}
          onClick={() => handleClick(icon)}
        />
      ))}
    </div>
  )
}
