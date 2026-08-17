import { useState, useCallback, useRef } from 'react'

/**
 * MacWindow — Draggable, closable macOS-style retro window.
 *
 * Props:
 *   title        string   — window title in titlebar center
 *   width        number   — initial width in px
 *   height       number   — max content area height in px
 *   initialX     number   — initial left position
 *   initialY     number   — initial top position
 *   onClose      fn|null  — called when red dot clicked; pass null to hide close btn
 *   onFocus      fn       — called when window is clicked (bring to front)
 *   zIndex       number
 *   children     ReactNode
 *   permanent    bool     — if true, red button is disabled (chat window)
 */
export default function MacWindow({
  title,
  width = 580,
  height = 440,
  initialX = 80,
  initialY = 60,
  onClose,
  onFocus,
  zIndex = 10,
  children,
  permanent = false,
}) {
  const [pos, setPos] = useState({ x: initialX, y: initialY })
  const [dragging, setDragging] = useState(false)
  const dragStart = useRef(null)

  const handleTitlebarMouseDown = useCallback(
    (e) => {
      // Ignore clicks on stoplight buttons
      if (e.target.closest('.stoplight-dot')) return
      e.preventDefault()
      onFocus?.()

      const startMouseX = e.clientX
      const startMouseY = e.clientY
      const startWinX = pos.x
      const startWinY = pos.y

      setDragging(true)
      dragStart.current = { startMouseX, startMouseY, startWinX, startWinY }

      const handleMouseMove = (me) => {
        const dx = me.clientX - startMouseX
        const dy = me.clientY - startMouseY
        setPos({
          x: Math.max(0, startWinX + dx),
          y: Math.max(0, startWinY + dy),
        })
      }

      const handleMouseUp = () => {
        setDragging(false)
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }

      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    },
    [pos, onFocus]
  )

  return (
    <div
      className="mac-window"
      style={{
        left: pos.x,
        top: pos.y,
        width,
        zIndex,
        cursor: dragging ? 'grabbing' : 'default',
      }}
      onMouseDown={() => onFocus?.()}
    >
      {/* ── Title Bar ─────────────────────────────────────── */}
      <div
        className="mac-window-titlebar"
        onMouseDown={handleTitlebarMouseDown}
        style={{ cursor: dragging ? 'grabbing' : 'grab' }}
      >
        {/* Stoplight dots — larger hit area */}
        <div className="mac-stoplight">
          {/* Red — close */}
          <button
            className="stoplight-dot stoplight-close"
            onClick={(e) => {
              e.stopPropagation()
              if (!permanent) onClose?.()
            }}
            title={permanent ? 'Main window (always visible)' : 'Close window'}
            style={{
              opacity: permanent ? 0.4 : 1,
              cursor: permanent ? 'not-allowed' : 'pointer',
            }}
          >
            ✕
          </button>

          {/* Yellow — minimize (decorative) */}
          <button
            className="stoplight-dot stoplight-min"
            title="Minimize"
            onClick={(e) => e.stopPropagation()}
          >
            −
          </button>

          {/* Green — zoom (decorative) */}
          <button
            className="stoplight-dot stoplight-max"
            title="Zoom"
            onClick={(e) => e.stopPropagation()}
          >
            +
          </button>
        </div>

        <span className="mac-window-title">{title}</span>
      </div>

      {/* ── Body ──────────────────────────────────────────── */}
      <div className="mac-window-body" style={{ maxHeight: height }}>
        {children}
      </div>
    </div>
  )
}
