import { useState, useEffect } from 'react'

function Clock() {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const day = days[time.getDay()]
  const month = months[time.getMonth()]
  const date = time.getDate()
  const h = time.getHours()
  const m = String(time.getMinutes()).padStart(2, '0')
  const ampm = h >= 12 ? 'PM' : 'AM'
  const h12 = h % 12 || 12
  return <span>{day} {month} {date} &nbsp; {h12}:{m} {ampm}</span>
}

const MENU_ITEMS = ['File', 'Edit', 'View', 'Help']

export default function MenuBar() {
  return (
    <div className="menubar">
      <div className="menubar-left">
        <span className="menubar-apple" title="HireMeAI">🍎</span>
        <span className="menubar-item" style={{ fontWeight: 700, fontSize: 12 }}>HireMeAI</span>
        {MENU_ITEMS.map(item => (
          <span key={item} className="menubar-item">{item}</span>
        ))}
      </div>
      <div className="menubar-right">
        <Clock />
      </div>
    </div>
  )
}
