import { useRef } from 'react'
import { Download, Eye, FileText } from 'lucide-react'

// Place my_resume.pdf in frontend/public/resume.pdf for serving
const RESUME_URL = '/resume.pdf'

export default function Resume() {
  const sectionRef = useRef(null)

  return (
    <section id="resume" style={{ padding: '100px 24px' }}>
      <div
        ref={sectionRef}
        style={{ maxWidth: 1100, margin: '0 auto' }}
      >
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent-indigo)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
            Resume
          </p>
          <h2 className="section-heading">
            My <span className="text-gradient">Resume</span>
          </h2>
          <p className="section-subheading">Download or view my full resume</p>
        </div>

        <div
          className="glass-card"
          style={{
            maxWidth: 680,
            margin: '0 auto',
            padding: '48px 40px',
            textAlign: 'center',
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2))',
              border: '1px solid rgba(99,102,241,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              animation: 'float 3s ease-in-out infinite',
            }}
          >
            <FileText size={36} color="var(--accent-indigo)" />
          </div>

          <h3 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10, letterSpacing: '-0.02em' }}>
            Priyanshu Pawar — Resume
          </h3>

          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 36, maxWidth: 400, margin: '0 auto 36px' }}>
            Full Stack Developer with a focus on AI/ML integration and building impactful applications.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            {/* Download button */}
            <a
              href={RESUME_URL}
              download="Priyanshu_Pawar_Resume.pdf"
              id="resume-download-btn"
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
              <Download size={16} />
              Download PDF
            </a>

            {/* View button */}
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              id="resume-view-btn"
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
              <Eye size={16} />
              View Online
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
