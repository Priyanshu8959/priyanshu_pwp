import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, RotateCcw, Sparkles, AlertCircle } from 'lucide-react'
import { sendChatMessage } from '../api/chat'

const SUGGESTED_QUESTIONS = [
  'Tell me about Priyanshu',
  'What are his technical skills?',
  'Tell me about his projects',
  'What is his educational background?',
  'Is he available for work?',
]

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: 5, alignItems: 'center', padding: '4px 2px' }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: 'var(--accent-indigo)',
            animation: `typingBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes typingBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-8px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

function ChatMessage({ message }) {
  const isUser = message.role === 'user'

  return (
    <div
      style={{
        display: 'flex',
        gap: 12,
        alignItems: 'flex-start',
        flexDirection: isUser ? 'row-reverse' : 'row',
        animation: 'fadeInUp 0.4s ease forwards',
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: isUser
            ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)'
            : 'linear-gradient(135deg, rgba(6,182,212,0.2), rgba(99,102,241,0.2))',
          border: isUser ? 'none' : '1px solid rgba(99,102,241,0.25)',
        }}
      >
        {isUser ? (
          <User size={18} color="white" />
        ) : (
          <Bot size={18} color="var(--accent-cyan)" />
        )}
      </div>

      {/* Bubble */}
      <div
        style={{
          maxWidth: '75%',
          padding: '12px 16px',
          borderRadius: isUser ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
          background: isUser
            ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)'
            : 'rgba(17,24,39,0.9)',
          border: isUser ? 'none' : '1px solid rgba(99,102,241,0.15)',
          color: 'var(--text-primary)',
          fontSize: 14,
          lineHeight: 1.7,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {message.content}
        {message.error && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, color: '#f87171', fontSize: 13 }}>
            <AlertCircle size={14} />
            {message.error}
          </div>
        )}
      </div>
    </div>
  )
}

export default function ChatBot() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! 👋 I'm Priyanshu's AI assistant. Ask me anything about his skills, experience, projects, or background — I'm happy to help!",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const handleSend = async (question) => {
    const q = (question || input).trim()
    if (!q || loading) return

    setInput('')
    setError(null)

    const userMsg = { role: 'user', content: q }
    setMessages((prev) => [...prev, userMsg])
    setLoading(true)

    try {
      const answer = await sendChatMessage(q)
      setMessages((prev) => [...prev, { role: 'assistant', content: answer }])
    } catch (err) {
      const errMsg =
        err.response?.data?.detail ||
        err.message ||
        'Could not reach the server. Make sure the backend is running.'
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I ran into an issue.', error: errMsg },
      ])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const resetChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Hi! 👋 I'm Priyanshu's AI assistant. Ask me anything about his skills, experience, projects, or background — I'm happy to help!",
      },
    ])
    setError(null)
    setInput('')
  }

  return (
    <section
      id="chat"
      style={{
        padding: '100px 24px',
        background: 'rgba(15,22,41,0.5)',
        borderTop: '1px solid rgba(99,102,241,0.08)',
        borderBottom: '1px solid rgba(99,102,241,0.08)',
      }}
    >
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent-indigo)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
            AI Assistant
          </p>
          <h2 className="section-heading">
            Chat with <span className="text-gradient">HireMeAI</span>
          </h2>
          <p className="section-subheading">
            Ask anything about Priyanshu — skills, experience, projects, or background.
          </p>
        </div>

        {/* Chat card */}
        <div
          style={{
            background: 'rgba(10,14,26,0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(99,102,241,0.15)',
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
          }}
        >
          {/* Chat header bar */}
          <div
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid rgba(99,102,241,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(17,24,39,0.6)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, rgba(59,130,246,0.3), rgba(139,92,246,0.3))',
                  border: '1px solid rgba(99,102,241,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Sparkles size={18} color="var(--accent-indigo)" />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>HireMeAI</div>
                <div style={{ fontSize: 12, color: '#4ade80', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
                  Powered by Groq
                </div>
              </div>
            </div>

            <button
              onClick={resetChat}
              title="Reset conversation"
              style={{
                background: 'none',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
                padding: '6px 10px',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                fontSize: 12,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--text-primary)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-muted)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
              }}
            >
              <RotateCcw size={13} />
              Reset
            </button>
          </div>

          {/* Messages area */}
          <div
            id="chat-messages"
            style={{
              height: 420,
              overflowY: 'auto',
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}
          >
            {messages.map((msg, i) => (
              <ChatMessage key={i} message={msg} />
            ))}

            {/* Typing indicator */}
            {loading && (
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, rgba(6,182,212,0.2), rgba(99,102,241,0.2))',
                    border: '1px solid rgba(99,102,241,0.25)',
                  }}
                >
                  <Bot size={18} color="var(--accent-cyan)" />
                </div>
                <div
                  style={{
                    padding: '12px 16px',
                    borderRadius: '4px 16px 16px 16px',
                    background: 'rgba(17,24,39,0.9)',
                    border: '1px solid rgba(99,102,241,0.15)',
                  }}
                >
                  <TypingIndicator />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested questions */}
          <div
            style={{
              padding: '12px 20px',
              borderTop: '1px solid rgba(99,102,241,0.08)',
              display: 'flex',
              gap: 8,
              flexWrap: 'wrap',
              background: 'rgba(10,14,26,0.5)',
            }}
          >
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                disabled={loading}
                style={{
                  padding: '5px 12px',
                  borderRadius: 100,
                  fontSize: 12,
                  fontWeight: 500,
                  background: 'rgba(99,102,241,0.08)',
                  border: '1px solid rgba(99,102,241,0.2)',
                  color: 'var(--text-secondary)',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  opacity: loading ? 0.5 : 1,
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.background = 'rgba(99,102,241,0.18)'
                    e.currentTarget.style.color = 'var(--accent-indigo)'
                    e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(99,102,241,0.08)'
                  e.currentTarget.style.color = 'var(--text-secondary)'
                  e.currentTarget.style.borderColor = 'rgba(99,102,241,0.2)'
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input area */}
          <div
            style={{
              padding: '16px 20px',
              borderTop: '1px solid rgba(99,102,241,0.12)',
              display: 'flex',
              gap: 12,
              alignItems: 'flex-end',
              background: 'rgba(17,24,39,0.5)',
            }}
          >
            <textarea
              ref={inputRef}
              id="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about Priyanshu..."
              rows={1}
              disabled={loading}
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(99,102,241,0.2)',
                borderRadius: 12,
                padding: '12px 16px',
                color: 'var(--text-primary)',
                fontSize: 14,
                fontFamily: "'Inter', sans-serif",
                resize: 'none',
                outline: 'none',
                lineHeight: 1.5,
                transition: 'border-color 0.2s ease',
                minHeight: 46,
                maxHeight: 120,
              }}
              onFocus={(e) => { e.target.style.borderColor = 'rgba(99,102,241,0.5)' }}
              onBlur={(e) => { e.target.style.borderColor = 'rgba(99,102,241,0.2)' }}
            />

            <button
              id="chat-send-btn"
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              style={{
                width: 46,
                height: 46,
                borderRadius: 12,
                background: loading || !input.trim()
                  ? 'rgba(99,102,241,0.2)'
                  : 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                border: 'none',
                cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                flexShrink: 0,
                boxShadow: loading || !input.trim() ? 'none' : '0 4px 12px rgba(99,102,241,0.35)',
              }}
              onMouseEnter={(e) => {
                if (!loading && input.trim()) {
                  e.currentTarget.style.transform = 'scale(1.05)'
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              <Send size={18} color={loading || !input.trim() ? 'var(--text-muted)' : 'white'} />
            </button>
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: 'var(--text-muted)' }}>
          Press <kbd style={{ background: 'rgba(255,255,255,0.07)', padding: '2px 7px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.12)' }}>Enter</kbd> to send · <kbd style={{ background: 'rgba(255,255,255,0.07)', padding: '2px 7px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.12)' }}>Shift+Enter</kbd> for new line
        </p>
      </div>
    </section>
  )
}
