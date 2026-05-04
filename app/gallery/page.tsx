'use client'
import { useState, useEffect, useRef } from 'react'

const GREEN = '#6b8f47'
const BLACK = '#0a0a0a'
const DARK = '#111'
const CARD = '#161616'
const BORDER = '#1e1e1e'
const TEXT = '#cccccc'
const MUTED = '#777'
const M: React.CSSProperties = { fontFamily: "'Montserrat', sans-serif" }

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

const Label = ({ text }: { text: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
    <div style={{ width: 28, height: 1, background: GREEN }} />
    <p style={{ ...M, fontSize: '.6rem', fontWeight: 700, letterSpacing: '3px', color: GREEN, textTransform: 'uppercase', margin: 0 }}>{text}</p>
  </div>
)

const categories = ['All', 'Panel Repairs', 'Spray Painting', 'Dent Removal', 'Fleet']

const placeholders = [
  { label: 'Panel repair — front bumper', cat: 'Panel Repairs' },
  { label: 'Full respray — sedan', cat: 'Spray Painting' },
  { label: 'Rear quarter panel repair', cat: 'Panel Repairs' },
  { label: 'Hail damage dent removal', cat: 'Dent Removal' },
  { label: 'Fleet vehicle repair', cat: 'Fleet' },
  { label: 'Door panel replacement', cat: 'Panel Repairs' },
  { label: 'Bonnet respray', cat: 'Spray Painting' },
  { label: 'Collision repair — side impact', cat: 'Panel Repairs' },
  { label: 'Sikkens paint finish', cat: 'Spray Painting' },
  { label: 'Before & after — bumper', cat: 'Panel Repairs' },
  { label: 'Wheel arch repair', cat: 'Panel Repairs' },
  { label: 'Full vehicle repair', cat: 'Fleet' },
]

function GalleryCard({ label, index, src }: { label: string, index: number, src?: string }) {
  const [hovered, setHovered] = useState(false)
  const { ref, visible } = useInView()

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        aspectRatio: '4/3',
        overflow: 'hidden',
        cursor: 'pointer',
        background: CARD,
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.95)',
        transition: `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`,
      }}
    >
      {/* IMAGE or COMING SOON */}
      {src ? (
        <img src={src} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      ) : (
        <div style={{
          width: '100%', height: '100%',
          background: '#141414',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12,
        }}>
          <div style={{ width: 40, height: 1, background: '#2a2a2a' }} />
          <p style={{ ...M, fontSize: '.6rem', fontWeight: 700, color: '#444', letterSpacing: '4px', textTransform: 'uppercase', margin: 0 }}>Coming Soon</p>
          <div style={{ width: 40, height: 1, background: '#2a2a2a' }} />
        </div>
      )}

      {/* HOVER OVERLAY */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(107,143,71,0.92)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 10,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}>
        <div style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.5)' }} />
        <p style={{ ...M, fontSize: '.75rem', fontWeight: 700, color: '#fff', textAlign: 'center', padding: '0 20px', margin: 0, letterSpacing: '1px', textTransform: 'uppercase' }}>{label}</p>
        <div style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.5)' }} />
      </div>

      {/* BOTTOM LABEL */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '10px 14px',
        background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
        opacity: hovered ? 0 : 1,
        transition: 'opacity 0.3s ease',
      }}>
        <p style={{ ...M, fontSize: '.65rem', fontWeight: 600, color: MUTED, margin: 0, letterSpacing: '1px' }}>{label}</p>
      </div>
    </div>
  )
}

export default function Gallery() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? placeholders : placeholders.filter(p => p.cat === active)

  return (
    <div style={{ ...M, background: BLACK, color: TEXT }}>

      {/* HERO */}
      <div style={{ position: 'relative', height: '60vh', minHeight: 420, overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=80"
          alt="Car paint finish"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, animation: 'zoomin 8s ease forwards' }}
        />
        <div style={{ position: 'absolute', top: '50%', right: '20%', transform: 'translateY(-50%)', width: 500, height: 500, background: `radial-gradient(circle, ${GREEN}22 0%, transparent 70%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.05) 100%)' }} />
        <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 80px' }}>
          <div style={{ animation: 'fadeup 0.8s ease 0.2s both' }}><Label text="Our work" /></div>
          <div style={{ animation: 'fadeup 0.8s ease 0.4s both' }}>
            <h1 style={{ ...M, fontSize: '4rem', fontWeight: 900, color: '#fff', lineHeight: 1, margin: '0 0 8px' }}>OUR</h1>
            <h1 style={{ ...M, fontSize: '4rem', fontWeight: 300, color: GREEN, lineHeight: 1, margin: '0 0 24px', letterSpacing: '6px' }}>GALLERY</h1>
          </div>
          <div style={{ animation: 'fadeup 0.8s ease 0.6s both' }}>
            <div style={{ width: 48, height: 3, background: GREEN, marginBottom: 20 }} />
            <p style={{ ...M, fontSize: '.95rem', color: TEXT, lineHeight: 1.8, maxWidth: 480, margin: 0 }}>
              Take a look at some of our recent work. At ABT we take pride in every repair — from minor panel damage to major collision repairs.
            </p>
          </div>
        </div>
      </div>

      {/* CATEGORY TABS */}
      <div style={{ background: DARK, borderBottom: `1px solid ${BORDER}`, padding: '0 80px', display: 'flex', gap: 0, overflowX: 'auto' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            style={{
              ...M, background: 'transparent', border: 'none',
              padding: '18px 24px',
              fontSize: '.68rem', fontWeight: 700,
              letterSpacing: '2px', textTransform: 'uppercase',
              color: active === cat ? GREEN : MUTED,
              borderBottom: active === cat ? `2px solid ${GREEN}` : '2px solid transparent',
              cursor: 'pointer', whiteSpace: 'nowrap',
              transition: 'color 0.2s',
              marginBottom: '-1px',
            }}
          >{cat}</button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', padding: '0 0 0 24px' }}>
          <p style={{ ...M, fontSize: '.62rem', fontWeight: 600, color: MUTED, margin: 0 }}>
            {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
            {active !== 'All' && <span style={{ color: GREEN }}> in {active}</span>}
          </p>
        </div>
      </div>

      {/* GALLERY GRID */}
      <div style={{ padding: '80px 80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ width: 48, height: 1, background: BORDER, marginBottom: 24 }} />
        <p style={{ ...M, fontSize: '.65rem', fontWeight: 700, color: MUTED, letterSpacing: '4px', textTransform: 'uppercase', margin: '0 0 16px' }}>Gallery</p>
        <h2 style={{ ...M, fontSize: '2.5rem', fontWeight: 900, color: '#fff', margin: '0 0 16px', textTransform: 'uppercase' }}>Coming Soon</h2>
        <p style={{ ...M, fontSize: '.9rem', color: MUTED, lineHeight: 1.8, textAlign: 'center', maxWidth: 400, margin: '0 0 32px' }}>
          We are currently putting together our gallery. Check back soon to see our recent work.
        </p>
        <div style={{ width: 48, height: 1, background: BORDER }} />
      </div>

      {/* CTA */}
      <div style={{ background: '#4a6332', padding: '60px 80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
        <div>
          <h2 style={{ ...M, fontSize: '2rem', fontWeight: 900, color: '#fff', marginBottom: 8, textTransform: 'uppercase' }}>Like what you see?</h2>
          <p style={{ ...M, fontSize: '.9rem', color: 'rgba(255,255,255,0.85)', margin: 0 }}>Get in touch for a quote on your vehicle repairs.</p>
        </div>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <a href="/quote" style={{ ...M, background: BLACK, color: '#fff', padding: '14px 32px', textDecoration: 'none', fontSize: '.68rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
            Request a Quote
          </a>
          <a href="/contact" style={{ ...M, background: 'transparent', color: '#fff', padding: '14px 32px', textDecoration: 'none', fontSize: '.68rem', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.4)' }}>
            Contact Us
          </a>
        </div>
      </div>

      <style>{`
        @keyframes zoomin { from { transform: scale(1); } to { transform: scale(1.06); } }
        @keyframes fadeup { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  )
}