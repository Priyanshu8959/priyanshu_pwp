import { useState, useCallback } from 'react'
import MenuBar from './MenuBar'
import Dock from './Dock'
import ChatWindow from './ChatWindow'
import AboutWindow from './AboutWindow'
import ProjectsWindow from './ProjectsWindow'
import AchievementsWindow from './AchievementsWindow'
import ResumeWindow from './ResumeWindow'

/**
 * Chat window is ALWAYS rendered (permanent = true, never closable).
 * Other windows can open/close independently via the Dock.
 */
const SECONDARY_WINDOWS = {
  about:        { open: false, zIndex: 10 },
  projects:     { open: false, zIndex: 10 },
  achievements: { open: false, zIndex: 10 },
  resume:       { open: false, zIndex: 10 },
}

// Chat window always sits at this fixed z-index base
const CHAT_BASE_Z = 20
let zCounter = 30

export default function Desktop() {
  const [secondary, setSecondary] = useState(SECONDARY_WINDOWS)
  const [chatZ, setChatZ] = useState(CHAT_BASE_Z)

  const openWindow = useCallback((id) => {
    if (id === 'chat') {
      // Bring chat to front
      zCounter += 1
      setChatZ(zCounter)
      return
    }
    zCounter += 1
    setSecondary((prev) => ({
      ...prev,
      [id]: { open: true, zIndex: zCounter },
    }))
  }, [])

  const closeWindow = useCallback((id) => {
    setSecondary((prev) => ({
      ...prev,
      [id]: { ...prev[id], open: false },
    }))
  }, [])

  const focusWindow = useCallback((id) => {
    if (id === 'chat') {
      zCounter += 1
      setChatZ(zCounter)
      return
    }
    zCounter += 1
    setSecondary((prev) => ({
      ...prev,
      [id]: { ...prev[id], zIndex: zCounter },
    }))
  }, [])

  // Open window IDs for dock dot indicator (chat always open)
  const openWindowIds = [
    'chat',
    ...Object.entries(secondary)
      .filter(([, w]) => w.open)
      .map(([id]) => id),
  ]

  // Compute positions — chat centered, others offset to the right
  const vpW = typeof window !== 'undefined' ? window.innerWidth : 1280
  const vpH = typeof window !== 'undefined' ? window.innerHeight : 800
  const menuH = 24
  const dockH = 90
  const chatW = 560
  const chatH = 490 // approx total window height incl titlebar

  // Chat: center of available desktop area
  const chatX = Math.max(20, Math.round((vpW - chatW) / 2))
  const chatY = Math.max(menuH + 10, Math.round((vpH - menuH - dockH - chatH) / 2 + menuH))

  // Secondary windows open offset to the right of chat, cascading down
  const secBaseX = Math.min(chatX + chatW + 20, vpW - 540)
  const positions = {
    about:        { x: secBaseX,      y: menuH + 30 },
    projects:     { x: secBaseX + 20, y: menuH + 50 },
    achievements: { x: secBaseX + 40, y: menuH + 70 },
    resume:       { x: secBaseX + 60, y: menuH + 60 },
  }

  return (
    <div className="desktop" id="desktop">
      {/* CRT + paper grain overlays */}
      <div className="crt-overlay" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />

      {/* Top menu bar */}
      <MenuBar />

      {/* Desktop canvas */}
      <div className="desktop-canvas">
        {/* Watermark branding */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 90,
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontFamily: "'VT323', monospace",
              fontSize: 'clamp(28px, 5vw, 48px)',
              color: 'rgba(44, 31, 15, 0.18)',
              letterSpacing: '0.15em',
              lineHeight: 1,
            }}
          >
            PRIYANSHU PAWAR
          </div>
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 'clamp(10px, 1.5vw, 14px)',
              color: 'rgba(44, 31, 15, 0.12)',
              letterSpacing: '0.3em',
              marginTop: 4,
            }}
          >
            AI ENGINEERING · DSA · OPEN TO WORK
          </div>
        </div>

        {/* ── AI Chat window — ALWAYS rendered, permanent ───── */}
        <ChatWindow
          onFocus={() => focusWindow('chat')}
          zIndex={chatZ}
          initialX={chatX}
          initialY={chatY}
        />

        {/* ── Secondary windows ─────────────────────────────── */}
        {secondary.about.open && (
          <AboutWindow
            onClose={() => closeWindow('about')}
            onFocus={() => focusWindow('about')}
            zIndex={secondary.about.zIndex}
            initialX={positions.about.x}
            initialY={positions.about.y}
          />
        )}

        {secondary.projects.open && (
          <ProjectsWindow
            onClose={() => closeWindow('projects')}
            onFocus={() => focusWindow('projects')}
            zIndex={secondary.projects.zIndex}
            initialX={positions.projects.x}
            initialY={positions.projects.y}
          />
        )}

        {secondary.achievements.open && (
          <AchievementsWindow
            onClose={() => closeWindow('achievements')}
            onFocus={() => focusWindow('achievements')}
            zIndex={secondary.achievements.zIndex}
            initialX={positions.achievements.x}
            initialY={positions.achievements.y}
          />
        )}

        {secondary.resume.open && (
          <ResumeWindow
            onClose={() => closeWindow('resume')}
            onFocus={() => focusWindow('resume')}
            zIndex={secondary.resume.zIndex}
            initialX={positions.resume.x}
            initialY={positions.resume.y}
          />
        )}
      </div>

      {/* Bottom Dock */}
      <Dock openWindows={openWindowIds} onOpen={openWindow} />
    </div>
  )
}
