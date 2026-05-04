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

function FadeUp({ children, delay = 0, style = {} }: { children: React.ReactNode, delay?: number, style?: React.CSSProperties }) {
  const { ref, visible } = useInView()
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(28px)', transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`, ...style }}>
      {children}
    </div>
  )
}

const Label = ({ text }: { text: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
    <div style={{ width: 28, height: 1, background: GREEN }} />
    <p style={{ ...M, fontSize: '.6rem', fontWeight: 700, letterSpacing: '3px', color: GREEN, textTransform: 'uppercase', margin: 0 }}>{text}</p>
  </div>
)

const testimonials = [
  {
    intro: 'I would like to take this opportunity to leave a positive feedback:',
    quote: 'Autobody Technicians is the best repair shop I have ever been to. I have been to them 3 times for my vehicle repairs. Staff members are all very professional. After the repairs, the vehicle was as good as new. They are very helpful and I highly recommend them for professional repair jobs.',
    closing: 'Thank you again Barbara and I am pleased to know that my vehicle will be in good hands in the future as well.',
    sign: 'Tom C',
    label: 'Kind regards',
  },
  {
    intro: null,
    quote: 'After I hit the kangaroo, I was really concerned about the whole process, I expected it to be lengthy and stressful, thank you so much for ensuring that this was not the case. The customer service was excellent and my baby (Mazda) looks beautiful.',
    closing: 'I will be recommending you to others.',
    sign: 'Murrumbateman',
    label: 'Cheers',
  },
  {
    intro: null,
    quote: "After my wife's little mishap (collision), I would just like to pass on my congratulations to you and all of your staff for the professionalism in the handling of the repairs to our motor vehicle. All matters, from the quotation to the repairs, and very short down time, and the finished product is 'WOW'.",
    closing: 'Once again thank you, I will be recommending you to all my friends.',
    sign: 'Satisfied Customer',
    label: null,
  },
]

const stats = [
  { value: '35+', label: 'Years in business' },
  { value: '2x', label: 'Repairer of the Year' },
  { value: '90%', label: 'Completed on time' },
  { value: '100%', label: 'Repairs guaranteed' },
]

const awards = [
  'Primary Repairer of the Year — awarded twice by a major fleet company "in recognition of quality repairs and customer service"',
  'Nominated for Paint and Panel Autobody Repairer of the Year (2013)',
  "Two apprentices have won 'Apprentice of the Year' in Canberra since inception",
]

export default function Testimonials() {
  return (
    <div style={{ ...M, background: BLACK, color: TEXT }}>

      {/* HERO */}
      <div style={{ position: 'relative', height: '60vh', minHeight: 420, overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=1600&q=80"
          alt="Happy customer with repaired car"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, animation: 'zoomin 8s ease forwards' }}
        />
        <div style={{ position: 'absolute', top: '50%', right: '20%', transform: 'translateY(-50%)', width: 500, height: 500, background: `radial-gradient(circle, ${GREEN}22 0%, transparent 70%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.05) 100%)' }} />
        <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 80px' }}>
          <div style={{ animation: 'fadeup 0.8s ease 0.2s both' }}><Label text="What our clients say" /></div>
          <div style={{ animation: 'fadeup 0.8s ease 0.4s both' }}>
            <h1 style={{ ...M, fontSize: '4rem', fontWeight: 900, color: '#fff', lineHeight: 1, margin: '0 0 8px' }}>CUSTOMER</h1>
            <h1 style={{ ...M, fontSize: '4rem', fontWeight: 300, color: GREEN, lineHeight: 1, margin: '0 0 24px', letterSpacing: '6px' }}>TESTIMONIALS</h1>
          </div>
          <div style={{ animation: 'fadeup 0.8s ease 0.6s both' }}>
            <div style={{ width: 48, height: 3, background: GREEN, marginBottom: 20 }} />
            <p style={{ ...M, fontSize: '.95rem', color: TEXT, lineHeight: 1.8, maxWidth: 480, margin: 0 }}>
              Trusted by Canberra motorists since 1988. Here's what our customers have to say.
            </p>
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      <div style={{ background: '#4a6332', padding: '24px 80px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {stats.map(({ value, label }, i) => (
          <div key={label} style={{ textAlign: 'center', padding: '0 20px', borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,.25)' : 'none' }}>
            <p style={{ ...M, fontSize: '2rem', fontWeight: 900, color: '#fff', margin: '0 0 4px' }}>{value}</p>
            <p style={{ ...M, fontSize: '.62rem', fontWeight: 700, color: 'rgba(255,255,255,.85)', letterSpacing: '2px', textTransform: 'uppercase', margin: 0 }}>{label}</p>
          </div>
        ))}
      </div>

      {/* TESTIMONIALS */}
      <div style={{ background: DARK, padding: '80px 80px', borderBottom: `1px solid ${BORDER}` }}>
        <FadeUp>
          <Label text="Client Stories" />
          <h2 style={{ ...M, fontSize: '2.2rem', fontWeight: 900, color: '#fff', marginBottom: 8, textTransform: 'uppercase' }}>
            What They <span style={{ color: GREEN, fontWeight: 300 }}>Said</span>
          </h2>
          <div style={{ width: 48, height: 3, background: GREEN, marginBottom: 56 }} />
        </FadeUp>

        {testimonials.map(({ intro, quote, closing, sign, label }, i) => (
          <FadeUp key={i} delay={i * 0.12}>
            <div style={{ marginBottom: i < testimonials.length - 1 ? '48px' : '0' }}>
              <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${GREEN}`, padding: '44px 48px', position: 'relative' }}>
                <div style={{ ...M, fontSize: '6rem', lineHeight: 1, color: GREEN, opacity: 0.1, position: 'absolute', top: '12px', left: '40px', userSelect: 'none', fontWeight: 900 }}>&ldquo;</div>
                {intro && (
                  <p style={{ ...M, color: MUTED, fontSize: '.88rem', fontStyle: 'italic', marginBottom: '16px', paddingTop: '8px' }}>{intro}</p>
                )}
                <p style={{ ...M, color: TEXT, fontSize: '1rem', lineHeight: 1.9, marginBottom: '20px', paddingTop: intro ? '0' : '8px' }}>
                  &ldquo;{quote}&rdquo;
                </p>
                <p style={{ ...M, color: MUTED, fontSize: '.9rem', lineHeight: 1.7, marginBottom: '24px' }}>{closing}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingTop: '20px', borderTop: `1px solid ${BORDER}` }}>
                  <div style={{ ...M, width: '40px', height: '40px', borderRadius: '50%', background: GREEN, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 900, flexShrink: 0 }}>
                    {sign.charAt(0)}
                  </div>
                  <div>
                    <p style={{ ...M, fontSize: '.9rem', fontWeight: 700, color: '#fff', margin: 0 }}>{sign}</p>
                    {label && <p style={{ ...M, fontSize: '.75rem', color: MUTED, margin: '2px 0 0' }}>{label}</p>}
                  </div>
                </div>
              </div>
              {i < testimonials.length - 1 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '28px 0 0' }}>
                  <div style={{ flex: 1, height: '1px', background: BORDER }} />
                  <span style={{ color: GREEN, fontSize: '10px' }}>✦</span>
                  <div style={{ flex: 1, height: '1px', background: BORDER }} />
                </div>
              )}
            </div>
          </FadeUp>
        ))}
      </div>

      {/* AWARDS */}
      <div style={{ background: BLACK, padding: '80px 80px', borderBottom: `1px solid ${BORDER}` }}>
        <FadeUp>
          <Label text="Recognition" />
          <h2 style={{ ...M, fontSize: '2.2rem', fontWeight: 900, color: '#fff', marginBottom: 8, textTransform: 'uppercase' }}>
            Award-winning <span style={{ color: GREEN, fontWeight: 300 }}>Service</span>
          </h2>
          <div style={{ width: 48, height: 3, background: GREEN, marginBottom: 44 }} />
        </FadeUp>
        {awards.map((a, i) => (
          <FadeUp key={i} delay={i * 0.1}>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', padding: '22px 0', borderBottom: `1px solid ${BORDER}` }}>
              <span style={{ color: GREEN, fontSize: '10px', flexShrink: 0, marginTop: '6px' }}>✦</span>
              <p style={{ ...M, color: TEXT, fontSize: '.95rem', lineHeight: 1.75, margin: 0 }}>{a}</p>
            </div>
          </FadeUp>
        ))}
      </div>

      {/* CTA */}
      <div style={{ background: '#4a6332', padding: '60px 80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
        <div>
          <h2 style={{ ...M, fontSize: '2rem', fontWeight: 900, color: '#fff', marginBottom: 8, textTransform: 'uppercase' }}>Ready to experience the difference?</h2>
          <p style={{ ...M, fontSize: '.9rem', color: 'rgba(255,255,255,0.85)', margin: 0 }}>Join our many satisfied customers across Canberra.</p>
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