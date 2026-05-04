'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: '35+', label: 'Years in Canberra' },
  { value: '90%', label: 'Completed on time' },
  { value: '2×',  label: 'Repairer of the Year' },
  { value: '100%',label: 'Repairs guaranteed' },
]

const reasons = [
  'Because we take pride in our work',
  'Because we use modern equipment',
  'Because we ensure the repair process is simple and our clients are inconvenienced as little as possible.',
  'Because we have highly trained and motivated technicians.',
  'Because we repair all vehicles makes and models.',
]

const services = [
  { title: 'Smash Repairs', desc: 'We take pride in our workmanship from the very beginning of repairs to the completion when our valued clients collect their vehicle.', href: '/services', cta: 'Read More' },
  { title: 'Repair Process', desc: 'Bring your vehicle and claim number in — we take images in under 15 minutes and organise the entire process from there.', href: '/services', cta: 'Read More' },
  { title: 'Car Repaired?', desc: 'Browse through to see our full range of services and facilities available at our Mitchell workshop.', href: '/services', cta: 'See More' },
  { title: 'Vehicle Damaged?', desc: 'Feel free to contact us and we would be pleased to answer any questions you may have.', href: '/contact', cta: 'Contact Us' },
]

const GREEN = '#6b8f47'
const BLACK = '#0a0a0a'
const DARK = '#111'
const CARD = '#161616'
const BORDER = '#1e1e1e'
const TEXT = '#cccccc'
const MUTED = '#777'
const M: React.CSSProperties = { fontFamily: "'Montserrat', sans-serif" }

function useInView(threshold = 0.15) {
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
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(32px)',
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  )
}

function FadeIn({ children, delay = 0, style = {} }: { children: React.ReactNode, delay?: number, style?: React.CSSProperties }) {
  const { ref, visible } = useInView()
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transition: `opacity 0.8s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  )
}

function SlideIn({ children, from = 'left', delay = 0, style = {} }: { children: React.ReactNode, from?: 'left' | 'right', delay?: number, style?: React.CSSProperties }) {
  const { ref, visible } = useInView()
  const x = from === 'left' ? '-40px' : '40px'
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateX(0)' : `translateX(${x})`,
      transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      ...style,
    }}>
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

export default function Home() {
  return (
    <div style={{ ...M, background: BLACK, color: TEXT }}>

      {/* ── 1. HERO ── */}
      <div style={{ position: 'relative', height: '100vh', minHeight: 600, overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1600&q=80"
          alt="Luxury car"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45, animation: 'zoomin 8s ease forwards' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(0,0,0,0.95) 40%, rgba(0,0,0,0.25) 100%)' }} />
        <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 80px', maxWidth: 660 }}>
          <div style={{ animation: 'fadeup 0.8s ease 0.2s both' }}>
            <Label text="Canberra's trusted smash repairers since 1988" />
          </div>
          <div style={{ animation: 'fadeup 0.8s ease 0.4s both' }}>
            <h1 style={{ ...M, fontSize: '4.8rem', fontWeight: 900, color: '#fff', lineHeight: 1, margin: 0 }}>AUTO BODY</h1>
            <h1 style={{ ...M, fontSize: '4.8rem', fontWeight: 300, color: GREEN, lineHeight: 1.1, margin: '0 0 28px', letterSpacing: '6px' }}>TECHNICIANS</h1>
          </div>
          <div style={{ animation: 'fadeup 0.8s ease 0.6s both' }}>
            <div style={{ width: 50, height: 3, background: GREEN, marginBottom: 28 }} />
            <p style={{ ...M, fontSize: '1.05rem', fontWeight: 400, color: TEXT, lineHeight: 1.9, marginBottom: 40, maxWidth: 460 }}>
              Serving Canberra's motorists since 1988 — private, fleet, commercial and insurance work. One of the most dependable smash repairers in the Northside.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 14, animation: 'fadeup 0.8s ease 0.8s both' }}>
            <Link href="/quote" style={{ ...M, background: GREEN, color: '#fff', padding: '14px 34px', textDecoration: 'none', fontSize: '.68rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
              Request a Quote
            </Link>
            <Link href="/contact" style={{ ...M, background: 'transparent', color: '#aaa', padding: '14px 34px', textDecoration: 'none', fontSize: '.68rem', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', border: `1px solid ${BORDER}` }}>
              Contact Us
            </Link>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, animation: 'fadeup 1s ease 1.2s both' }}>
          <p style={{ ...M, fontSize: '.55rem', fontWeight: 700, color: '#2a2a2a', letterSpacing: '3px', textTransform: 'uppercase', margin: 0 }}>Scroll</p>
          <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, #2a2a2a, transparent)', animation: 'pulse 2s ease infinite' }} />
        </div>
      </div>

      {/* ── 2. STATS BAR ── */}
      <div style={{ background: DARK, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {stats.map(({ value, label }, i) => (
          <FadeUp key={label} delay={i * 0.1}>
            <div style={{ padding: '30px 20px', textAlign: 'center', borderRight: i < 3 ? `1px solid ${BORDER}` : 'none' }}>
              <div style={{ ...M, fontSize: '2.6rem', fontWeight: 900, color: GREEN, marginBottom: 6 }}>{value}</div>
              <div style={{ ...M, fontSize: '.65rem', fontWeight: 700, color: MUTED, letterSpacing: '2px', textTransform: 'uppercase' }}>{label}</div>
            </div>
          </FadeUp>
        ))}
      </div>

      {/* ── 3. ABOUT US ── */}
      <div style={{ background: BLACK, borderBottom: `1px solid ${BORDER}`, display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <SlideIn from="left" style={{ height: 600, overflow: 'hidden', position: 'relative' }}>
          <img
            src="https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=900&q=80"
            alt="Workshop"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.75 }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 70%, #0a0a0a 100%)' }} />
        </SlideIn>
        <SlideIn from="right">
          <div style={{ padding: '60px 60px 60px 50px', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
            <FadeUp delay={0.2}><Label text="Est. October 1988" /></FadeUp>
            <FadeUp delay={0.3}>
              <h2 style={{ ...M, fontSize: '2rem', fontWeight: 900, color: '#fff', margin: '0 0 4px' }}>ABOUT</h2>
              <h2 style={{ ...M, fontSize: '2rem', fontWeight: 300, color: GREEN, margin: '0 0 20px', letterSpacing: '4px' }}>US</h2>
              <div style={{ width: 40, height: 3, background: GREEN, marginBottom: 24 }} />
            </FadeUp>
            <FadeUp delay={0.4}>
              <p style={{ ...M, fontSize: '.95rem', fontWeight: 400, color: TEXT, lineHeight: 1.9, marginBottom: 14 }}>
                Auto Body Technicians has been operating in Canberra since October 1988. We are a privately owned boutique smash repairs business specialising in quality repairs.
              </p>
              <p style={{ ...M, fontSize: '.95rem', fontWeight: 400, color: TEXT, lineHeight: 1.9, marginBottom: 14 }}>
                Customer service is a priority — we are proud of the strong relationships we have with our clients, insurance companies, fleet companies and suppliers.
              </p>
              <p style={{ ...M, fontSize: '.95rem', fontWeight: 400, color: TEXT, lineHeight: 1.9, marginBottom: 28 }}>
                Auto Body Technicians carry out repairs for all major insurance companies and have won the Primary Repairer of the Year award twice.
              </p>
            </FadeUp>
            <FadeUp delay={0.5}>
              <Link href="/about" style={{ ...M, fontSize: '.65rem', fontWeight: 700, color: GREEN, textDecoration: 'none', letterSpacing: '2px', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 24, height: 1, background: GREEN, display: 'inline-block' }} />Learn more
              </Link>
            </FadeUp>
          </div>
        </SlideIn>
      </div>

      {/* ── 4. WHY CHOOSE US ── */}
      <div style={{ background: BLACK, padding: '90px 80px', borderBottom: `1px solid ${BORDER}`, overflow: 'hidden' }}>
        <FadeUp>
          <div style={{ textAlign: 'center', marginBottom: 70 }}>
            <Label text="Why choose us" />
            <h2 style={{ ...M, fontSize: '2.4rem', fontWeight: 900, color: '#fff', margin: '0 0 4px' }}>WHY GET YOUR VEHICLE</h2>
            <h2 style={{ ...M, fontSize: '2.4rem', fontWeight: 300, color: GREEN, margin: 0, letterSpacing: '3px' }}>REPAIRED WITH US?</h2>
          </div>
        </FadeUp>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
          {reasons.map((text, i) => (
            <FadeUp key={i} delay={i * 0.12} style={{ flex: '0 0 auto', width: 'calc(33% - 16px)', minWidth: 240 }}>
              <div style={{ position: 'relative', padding: '40px 32px 32px', border: `1px solid ${BORDER}`, background: CARD, overflow: 'hidden' }}>
                <div style={{ ...M, position: 'absolute', top: -10, right: 16, fontSize: '7rem', fontWeight: 900, color: GREEN, opacity: 0.06, lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: i === 0 ? GREEN : BORDER }} />
                <div style={{ ...M, fontSize: '.6rem', fontWeight: 700, color: GREEN, letterSpacing: '3px', marginBottom: 16 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p style={{ ...M, fontSize: '.95rem', fontWeight: 500, color: TEXT, lineHeight: 1.8, margin: 0, position: 'relative' }}>{text}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* ── 5. SERVICES ── */}
      <div style={{ background: BLACK, padding: '90px 80px', borderBottom: `1px solid ${BORDER}` }}>
        <FadeUp>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 24 }}>
            <div>
              <Label text="What we do" />
              <h2 style={{ ...M, fontSize: '2.4rem', fontWeight: 900, color: '#fff', margin: 0 }}>OUR SERVICES</h2>
            </div>
            <Link href="/services" style={{ ...M, fontSize: '.65rem', fontWeight: 700, color: GREEN, textDecoration: 'none', letterSpacing: '2px', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 20, height: 1, background: GREEN, display: 'inline-block' }} />View all services
            </Link>
          </div>
        </FadeUp>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1px', background: BORDER, border: `1px solid ${BORDER}` }}>
          {services.map(({ title, desc, href, cta }, i) => (
            <FadeUp key={title} delay={i * 0.12}>
              <div style={{ background: CARD, padding: '40px 32px', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ width: 36, height: 2, background: GREEN, marginBottom: 24 }} />
                <h3 style={{ ...M, fontSize: '1rem', fontWeight: 800, color: '#fff', marginBottom: 14, textTransform: 'uppercase' }}>{title}</h3>
                <p style={{ ...M, fontSize: '.92rem', fontWeight: 400, color: MUTED, lineHeight: 1.9, marginBottom: 28, flex: 1 }}>{desc}</p>
                <Link href={href} style={{ ...M, fontSize: '.62rem', fontWeight: 700, color: GREEN, textDecoration: 'none', letterSpacing: '2px', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 14, height: 1, background: GREEN, display: 'inline-block' }} />{cta}
                </Link>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* ── 6. CTA ── */}
      <FadeIn>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80"
            alt="Spray painting"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.18 }}
          />
          <div style={{ position: 'absolute', inset: 0, background: '#4a6332', opacity: 0.95 }} />
          <div style={{ position: 'relative', padding: '70px 80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 28, height: 1, background: '#fff' }} />
                <p style={{ ...M, fontSize: '.65rem', fontWeight: 700, letterSpacing: '3px', color: '#fff', textTransform: 'uppercase', margin: 0 }}>Get in touch</p>
              </div>
              <h2 style={{ ...M, fontSize: '2rem', fontWeight: 900, color: '#fff', margin: '0 0 8px', textTransform: 'uppercase' }}>Has your vehicle been damaged?</h2>
              <p style={{ ...M, fontSize: '.9rem', fontWeight: 400, color: 'rgba(255,255,255,0.8)', margin: 0, lineHeight: 1.8 }}>
                Contact us today — we make the repair process as simple as possible. All repairs are guaranteed.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', flexShrink: 0 }}>
              <Link href="/quote" style={{ ...M, background: BLACK, color: '#fff', padding: '14px 36px', textDecoration: 'none', fontSize: '.68rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
                Request a Quote
              </Link>
              <Link href="/contact" style={{ ...M, background: 'transparent', color: '#fff', padding: '14px 36px', textDecoration: 'none', fontSize: '.68rem', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.4)' }}>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </FadeIn>

      <style>{`
        @keyframes zoomin {
          from { transform: scale(1); }
          to   { transform: scale(1.08); }
        }
        @keyframes fadeup {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 1; }
        }
      `}</style>

    </div>
  )
}