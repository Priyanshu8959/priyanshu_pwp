import { useState, useRef, useEffect } from 'react'
import { sendChatMessage } from '../api/chat'
import MacWindow from './MacWindow'

const SUGGESTED = [
  'Tell me about Priyanshu',
  'What are his skills?',
  'Tell me about his projects',
  'Is he available for work?',
  'What is his education?',
]

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: 5, alignItems: 'center', padding: '4px 2px' }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="typing-dot"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  )
}

export default function ChatWindow({ onClose, onFocus, zIndex, initialX, initialY }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm Priyanshu's AI assistant.\nAsk me anything about his skills, projects, experience, or background.",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const handleSend = async (question) => {
    const q = (question ?? input).trim()
    if (!q || loading) return
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: q }])
    setLoading(true)
    try {
      const answer = await sendChatMessage(q)
      setMessages((prev) => [...prev, { role: 'assistant', content: answer }])
    } catch (err) {
      const msg = err.response?.data?.detail || err.message || 'Server unreachable.'
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `⚠ Error: ${msg}` },
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
    setMessages([{
      role: 'assistant',
      content: "Hello! I'm Priyanshu's AI assistant.\nAsk me anything about his skills, projects, experience, or background.",
    }])
    setInput('')
  }

  return (
    <MacWindow
      title="HireMeAI — AI Chat Assistant"
      width={560}
      height={460}
      initialX={initialX ?? 60}
      initialY={initialY ?? 40}
      permanent={true}
      onFocus={onFocus}
      zIndex={zIndex}
    >
      {/* Chat header */}
      <div style={{
        padding: '10px 16px',
        borderBottom: '1px solid var(--paper-deep)',
        background: 'var(--paper)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 22 }}>🤖</span>
          <div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, fontSize: 13, color: 'var(--ink)' }}>
              HireMeAI
            </div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: 'var(--sage)', display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--sage)', display: 'inline-block' }} />
              Powered by Groq
            </div>
          </div>
        </div>
        <button
          onClick={resetChat}
          className="retro-btn"
          style={{ fontSize: 11, padding: '4px 10px' }}
          title="Reset conversation"
        >
          ↺ Reset
        </button>
      </div>

      {/* Messages */}
      <div className="chat-messages" style={{ overflowY: 'auto', flex: 1, maxHeight: 300 }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}
            style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
          >
            {msg.role === 'assistant' && (
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: 'var(--terra)', fontWeight: 700, display: 'block', marginBottom: 4 }}>
                ▶ HireMeAI
              </span>
            )}
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="chat-bubble-ai">
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: 'var(--terra)', fontWeight: 700, display: 'block', marginBottom: 4 }}>
              ▶ HireMeAI
            </span>
            <TypingIndicator />
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Suggested pills */}
      <div className="suggest-pills">
        {SUGGESTED.map((q) => (
          <button
            key={q}
            className="suggest-pill"
            onClick={() => handleSend(q)}
            disabled={loading}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="chat-input-area">
        <textarea
          ref={inputRef}
          id="chat-input"
          className="chat-textarea"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about Priyanshu..."
          rows={1}
          disabled={loading}
        />
        <button
          id="chat-send-btn"
          className="retro-btn retro-btn-primary"
          onClick={() => handleSend()}
          disabled={loading || !input.trim()}
          style={{ height: 36 }}
        >
          Send ▶
        </button>
      </div>

      {/* Hint */}
      <div style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 10,
        color: 'var(--ink-light)',
        textAlign: 'center',
        padding: '6px',
        borderTop: '1px solid var(--paper-mid)',
        background: 'var(--paper)',
        flexShrink: 0,
      }}>
        [ Enter ] send · [ Shift+Enter ] new line
      </div>
    </MacWindow>
  )
}
