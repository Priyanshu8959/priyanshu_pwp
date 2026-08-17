import MacWindow from './MacWindow'

const EDUCATION = [
  {
    icon: '🎓',
    title: 'B.E. in Computer Engineering',
    org: 'Currently Pursuing',
    period: 'Present',
    desc: 'Studying core CS subjects including algorithms, data structures, computer networking, operating systems, and software engineering.',
    tags: ['DSA', 'Computer Networking', 'AI Engineering', 'Algorithms'],
  },
]

const ACHIEVEMENTS = [
  {
    icon: '🥇',
    title: '1st Place — NavKalpana Hackathon 2026',
    desc: 'Won the hackathon and secured a ₹20,000 prize for building an innovative solution under competitive conditions.',
  },
  {
    icon: '🏅',
    title: 'Codeforces Specialist',
    desc: 'Achieved Specialist rating on Codeforces through consistent competitive programming and algorithmic problem solving.',
  },
  {
    icon: '💻',
    title: '800+ DSA Problems Solved',
    desc: 'Solved 800+ data structures and algorithm problems across platforms like LeetCode, Codeforces, and CodeChef.',
  },
  {
    icon: '⭐',
    title: 'CodeChef 3★ Rated',
    desc: 'Earned a 3-Star rating on CodeChef, reflecting strong competitive programming skills.',
  },
  {
    icon: '⭐',
    title: 'HackerRank 4★ Rated',
    desc: 'Achieved a 4-Star rating on HackerRank across problem-solving domains.',
  },
  {
    icon: '🎓',
    title: 'Tuition Fee Waiver (TFW)',
    desc: 'Awarded Tuition Fee Waiver for undergraduate studies — recognition of academic merit.',
  },
  {
    icon: '🎤',
    title: 'IEEE SCEECS\'25 — MANIT Bhopal',
    desc: 'Presented a technical paper at IEEE SCEECS\'25, a prestigious research conference hosted at MANIT Bhopal.',
  },
  {
    icon: '👑',
    title: 'School President',
    desc: 'Elected as School President, leading student governance and representing the student body in key decisions.',
  },
  {
    icon: '🥉',
    title: '3rd Rank — Model School Selection',
    desc: 'Secured 3rd rank in the competitive Model School selection process.',
  },
  {
    icon: '🌐',
    title: 'Campus Ambassador',
    desc: 'Represented organisations and initiatives on campus, bridging the gap between students and opportunities.',
  },
]

export default function AchievementsWindow({ onClose, onFocus, zIndex, initialX, initialY }) {
  return (
    <MacWindow
      title="Achievements — Priyanshu Pawar"
      width={540}
      height={520}
      initialX={initialX ?? 200}
      initialY={initialY ?? 80}
      onClose={onClose}
      onFocus={onFocus}
      zIndex={zIndex}
    >
      <div className="win-section">
        {/* Education */}
        <p className="win-label">Education</p>
        <h2 className="win-heading" style={{ marginBottom: 12 }}>Academic Journey</h2>

        {EDUCATION.map((e) => (
          <div key={e.title} className="retro-card" style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 20 }}>
            <span style={{ fontSize: 24, flexShrink: 0 }}>{e.icon}</span>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, fontSize: 13, color: 'var(--ink)' }}>
                  {e.title}
                </span>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: 'var(--terra)' }}>
                  {e.period}
                </span>
              </div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: 'var(--sage)', marginBottom: 8, fontWeight: 600 }}>
                {e.org}
              </div>
              <p style={{ fontFamily: "'Crimson Text', serif", fontSize: 15, color: 'var(--ink-mid)', lineHeight: 1.6, marginBottom: 10 }}>
                {e.desc}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {e.tags.map((t) => <span key={t} className="retro-tag sage">{t}</span>)}
              </div>
            </div>
          </div>
        ))}

        {/* Divider */}
        <div style={{ borderTop: '1px solid var(--paper-deep)', margin: '4px 0 16px' }} />

        {/* Achievements */}
        <p className="win-label">Highlights &amp; Achievements</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {ACHIEVEMENTS.map((a) => (
            <div key={a.title} className="retro-card" style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>{a.icon}</span>
              <div>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, fontSize: 12, color: 'var(--ink)', marginBottom: 4 }}>
                  {a.title}
                </div>
                <p style={{ fontFamily: "'Crimson Text', serif", fontSize: 14, color: 'var(--ink-mid)', lineHeight: 1.5 }}>
                  {a.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MacWindow>
  )
}
