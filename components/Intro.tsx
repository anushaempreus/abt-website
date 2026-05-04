'use client'
import { useEffect, useState } from 'react'

type Phase = 'car' | 'logo' | 'done'

export default function Intro() {
  const [phase, setPhase] = useState<Phase>('car')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('logo'), 1800)
    const t2 = setTimeout(() => setPhase('done'), 2800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (phase === 'done') return null

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: '#0a0a0a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>

      {/* GROUND LINE */}
      <div style={{
        position: 'absolute',
        bottom: '38%',
        left: 0,
        right: 0,
        height: '1px',
        background: '#1a1a1a',
      }} />

      {/* CAR — drives across */}
      {phase === 'car' && (
        <div style={{
          position: 'absolute',
          bottom: '38%',
          right: '-300px',
          animation: 'drivein 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        }}>
          <svg width="320" height="140" viewBox="0 0 320 140" fill="none">
            <rect x="20" y="70" width="280" height="55" rx="4" fill="#1a1a1a" />
            <path d="M60 70 L90 30 L230 25 L265 70 Z" fill="#141414" />
            <path d="M95 68 L115 35 L220 32 L245 68 Z" fill="#0d0d0d" opacity="0.8" />
            <line x1="165" y1="70" x2="165" y2="120" stroke="#222" strokeWidth="1" />
            <circle cx="75" cy="125" r="20" fill="#111" stroke="#2a2a2a" strokeWidth="4" />
            <circle cx="75" cy="125" r="10" fill="#0a0a0a" stroke="#222" strokeWidth="2" />
            <circle cx="245" cy="125" r="20" fill="#111" stroke="#2a2a2a" strokeWidth="4" />
            <circle cx="245" cy="125" r="10" fill="#0a0a0a" stroke="#222" strokeWidth="2" />
            <rect x="22" y="80" width="12" height="6" rx="1" fill="#6b8f47" opacity="0.6" />
            <rect x="286" y="80" width="10" height="6" rx="1" fill="#6b8f47" opacity="0.3" />
          </svg>
        </div>
      )}

      {/* LOGO REVEAL */}
      {phase === 'logo' && (
        <div style={{ textAlign: 'center', animation: 'fadeup 0.6s ease forwards' }}>
          <div style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '3.5rem',
            fontWeight: 900,
            color: '#fff',
            letterSpacing: '16px',
            lineHeight: 1,
          }}>ABT</div>
          <div style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '.6rem',
            fontWeight: 600,
            color: '#6b8f47',
            letterSpacing: '6px',
            textTransform: 'uppercase',
            marginTop: '8px',
          }}>Auto Body Technicians</div>
          <div style={{
            width: '40px',
            height: '1px',
            background: '#6b8f47',
            margin: '16px auto 0',
          }} />
        </div>
      )}

      <style>{`
        @keyframes drivein {
          0%   { right: -320px; opacity: 0; }
          10%  { opacity: 1; }
          80%  { right: calc(50% - 160px); }
          90%  { right: calc(50% - 160px); opacity: 1; }
          100% { right: 120%; opacity: 0; }
        }
        @keyframes fadeup {
          0%   { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}