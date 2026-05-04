'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const GREEN = '#6b8f47'
const BLACK = '#0a0a0a'
const BORDER = '#1e1e1e'

const links = [
  { href: '/',             label: 'Home' },
  { href: '/about',        label: 'About' },
  { href: '/services',     label: 'Service' },
  { href: '/quote',        label: 'Quote' },
  { href: '/facilities',   label: 'Facilities' },
  { href: '/gallery',      label: 'Gallery' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/collision',    label: 'Collision Form' },
  { href: '/contact',      label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* HAMBURGER BUTTON — always visible */}
      <button
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed', top: 24, left: 24, zIndex: 200,
          background: 'transparent', border: 'none',
          cursor: 'pointer', display: 'flex',
          flexDirection: 'column', gap: 6, padding: 8,
        }}
        aria-label="Open menu"
      >
        <span style={{ width: 28, height: 1.5, background: '#fff', display: 'block', transition: 'background .2s' }} />
        <span style={{ width: 20, height: 1.5, background: '#fff', display: 'block' }} />
        <span style={{ width: 28, height: 1.5, background: '#fff', display: 'block' }} />
      </button>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 300,
            background: 'rgba(0,0,0,0.7)',
            animation: 'fadein 0.2s ease',
          }}
        />
      )}

      {/* SIDEBAR PANEL */}
      <div style={{
        position: 'fixed', top: 0, left: 0, zIndex: 400,
        width: 220, height: '100vh',
        background: BLACK,
        borderRight: `1px solid ${BORDER}`,
        display: 'flex', flexDirection: 'column',
        transform: open ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        fontFamily: "'Raleway', sans-serif",
      }}>

        {/* CLOSE + LOGO */}
        <div style={{ padding: '28px 24px 22px', borderBottom: `1px solid ${BORDER}`, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '1.6rem', fontWeight: 900, color: '#fff', letterSpacing: '4px', lineHeight: 1 }}>ABT</div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '.55rem', fontWeight: 600, color: GREEN, letterSpacing: '3px', textTransform: 'uppercase', marginTop: 5 }}>Auto Body Tech</div>
          </div>
          <button
            onClick={() => setOpen(false)}
            style={{ background: 'transparent', border: 'none', color: '#444', cursor: 'pointer', fontSize: '1.2rem', padding: 0, marginTop: 4 }}
          >✕</button>
        </div>

      {/* NAV LINKS */}
        <nav style={{ flex: 1, padding: '16px 0', overflowY: 'auto' }}>
          {links.map(({ href, label }) => {
            const active = pathname === href
            return (
              <Link key={href} href={href} onClick={() => setOpen(false)} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '13px 24px',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '.7rem', fontWeight: 600,
                letterSpacing: '2px', textTransform: 'uppercase',
                color: active ? GREEN : '#888',
                textDecoration: 'none',
                borderLeft: active ? `2px solid ${GREEN}` : '2px solid transparent',
                background: active ? 'rgba(107,143,71,0.07)' : 'transparent',
                transition: 'color .2s',
              }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'currentColor', flexShrink: 0 }} />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* BOTTOM */}
        <div style={{ padding: '20px 24px', borderTop: `1px solid ${BORDER}` }}>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '.6rem', fontWeight: 500, color: '#555', lineHeight: 1.8, marginBottom: 8 }}>
            25 Winchcombe Court<br />Mitchell ACT 2911
          </p>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '.85rem', fontWeight: 700, color: GREEN, letterSpacing: '1px', margin: 0 }}>
            02 6241 3801
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadein { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </>
  )
}