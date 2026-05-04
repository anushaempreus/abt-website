'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

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
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(32px)', transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`, ...style }}>
      {children}
    </div>
  )
}

function SlideIn({ children, from = 'left', delay = 0, style = {} }: { children: React.ReactNode, from?: 'left' | 'right', delay?: number, style?: React.CSSProperties }) {
  const { ref, visible } = useInView()
  const x = from === 'left' ? '-40px' : '40px'
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : `translateX(${x})`, transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`, ...style }}>
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

const awards = [
  { num: '01', text: 'Primary Repairer of the Year — twice awarded by a major fleet company, "in recognition of quality repairs and customer service"' },
  { num: '02', text: 'Nominated for Paint and Panel Autobody Repairer of the Year (2013)' },
  { num: '03', text: "Two apprentices have won 'Apprentice of the Year' in Canberra since inception" },
  { num: '04', text: 'Member of the Motor Trades Association since inception' },
]

const steps = [
  { title: 'Book a Quote', desc: 'Contact Auto Body Technicians to book in for a quote for your vehicle.' },
  { title: 'Images & Assessment', desc: 'Images are taken on your vehicle and quote prepared for the insurance company, forwarded for assessment and authority.' },
  { title: 'Schedule Repairs', desc: 'Once approved, your vehicle is booked in at a mutually convenient time. Parts and sublets are organised prior to delivery.' },
  { title: 'Repairs Carried Out', desc: 'The vehicle is allocated to a technician and a pre-repair checklist completed. Repaired to its pre-accident condition.' },
  { title: 'Paint & Fit-Up', desc: 'Paint is applied using one of our state of the art paint booths. Once dry, fit-up of the panels and associated parts takes place.' },
  { title: 'Vehicle Collection', desc: 'We will contact you by 1:30pm on the day of completion to organise collection or delivery of your vehicle.' },
]

export default function About() {
  return (
    <div style={{ ...M, background: '#0d0d0d', color: TEXT }}>

      {/* ── HERO ── */}
      <div style={{ position: 'relative', height: '60vh', minHeight: 420, overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1600&q=80"
          alt="Workshop"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55, animation: 'zoomin 8s ease forwards' }}
        />
        {/* LIGHT GLOW */}
        <div style={{ position: 'absolute', top: '50%', left: '60%', transform: 'translate(-50%, -50%)', width: 600, height: 600, background: `radial-gradient(circle, ${GREEN}33 0%, transparent 70%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(0,0,0,0.88) 35%, rgba(0,0,0,0.3) 100%)' }} />
        <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 80px' }}>
          <div style={{ animation: 'fadeup 0.8s ease 0.2s both' }}>
            <Label text="Who we are" />
          </div>
          <div style={{ animation: 'fadeup 0.8s ease 0.4s both' }}>
            <h1 style={{ ...M, fontSize: '4rem', fontWeight: 900, color: '#fff', lineHeight: 1, margin: '0 0 8px' }}>ABOUT</h1>
            <h1 style={{ ...M, fontSize: '4rem', fontWeight: 300, color: GREEN, lineHeight: 1, margin: '0 0 24px', letterSpacing: '6px' }}>ABT</h1>
          </div>
          <div style={{ animation: 'fadeup 0.8s ease 0.6s both' }}>
            <div style={{ width: 48, height: 3, background: GREEN }} />
          </div>
        </div>
      </div>

      {/* GAP */}
      <div style={{ height: 80, background: '#0d0d0d' }} />

      {/* ── ABOUT US ── */}
      <div style={{ background: DARK, borderBottom: `1px solid ${BORDER}`, display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <SlideIn from="left" style={{ height: 580, overflow: 'hidden', position: 'relative' }}>
          <img
            src="https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=900&q=80"
            alt="Auto body repair workshop"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, display: 'block' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 60%, #111 100%)' }} />
        </SlideIn>
        <SlideIn from="right">
          <div style={{ padding: '70px 70px 70px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <FadeUp delay={0.2}><Label text="Est. October 1988" /></FadeUp>
            <FadeUp delay={0.3}>
              <h2 style={{ ...M, fontSize: '2.2rem', fontWeight: 900, color: '#fff', margin: '0 0 4px' }}>ABOUT</h2>
              <h2 style={{ ...M, fontSize: '2.2rem', fontWeight: 300, color: GREEN, margin: '0 0 24px', letterSpacing: '4px' }}>US</h2>
              <div style={{ width: 40, height: 3, background: GREEN, marginBottom: 36 }} />
            </FadeUp>
            <FadeUp delay={0.4}>
              <p style={{ ...M, fontSize: '.95rem', color: TEXT, lineHeight: 1.9, marginBottom: 16 }}>
                Auto Body Technicians has been operating in Canberra since October 1988. We are a privately owned boutique smash repairs business specialising in quality repairs.
              </p>
              <p style={{ ...M, fontSize: '.95rem', color: TEXT, lineHeight: 1.9, marginBottom: 16 }}>
                Customer service is a priority for our company and we are proud of the strong relationships we have with our clients, insurance companies, fleet companies and suppliers.
              </p>
              <p style={{ ...M, fontSize: '.95rem', color: TEXT, lineHeight: 1.9, marginBottom: 32 }}>
                Auto Body Technicians carry out repairs for all major insurance companies.
              </p>
            </FadeUp>
            <FadeUp delay={0.5}>
              <Link href="/contact" style={{ ...M, fontSize: '.65rem', fontWeight: 700, color: GREEN, textDecoration: 'none', letterSpacing: '2px', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 24, height: 1, background: GREEN, display: 'inline-block' }} />Get in touch
              </Link>
            </FadeUp>
          </div>
        </SlideIn>
      </div>

      {/* ── AWARDS ── */}
      <div style={{ background: BLACK, padding: '100px 80px 60px', borderBottom: `1px solid ${BORDER}` }}>
        <FadeUp>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 64, flexWrap: 'wrap', gap: 24 }}>
            <div>
              <Label text="Recognition" />
              <h2 style={{ ...M, fontSize: '2.2rem', fontWeight: 900, color: '#fff', margin: '0 0 4px' }}>AWARDS &</h2>
              <h2 style={{ ...M, fontSize: '2.2rem', fontWeight: 300, color: GREEN, margin: 0, letterSpacing: '3px' }}>ACHIEVEMENTS</h2>
            </div>
            <div style={{ width: 48, height: 3, background: GREEN }} />
          </div>
        </FadeUp>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: BORDER, border: `1px solid ${BORDER}` }}>
          {awards.map(({ num, text }, i) => (
            <FadeUp key={num} delay={i * 0.12}>
              <div style={{ background: CARD, padding: '44px 36px', position: 'relative', overflow: 'hidden', height: '100%' }}>
                <div style={{ ...M, position: 'absolute', top: -8, right: 16, fontSize: '7rem', fontWeight: 900, color: GREEN, opacity: 0.05, lineHeight: 1, userSelect: 'none' }}>{num}</div>
                <div style={{ width: 32, height: 2, background: GREEN, marginBottom: 24 }} />
                <p style={{ ...M, fontSize: '.95rem', fontWeight: 500, color: TEXT, lineHeight: 1.9, margin: 0, position: 'relative' }}>{text}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* GAP */}
      <div style={{ height: 40, background: '#0d0d0d' }} />

      {/* ── REPAIR PROCESS ── */}
      <div style={{ background: DARK, padding: '100px 80px', borderBottom: `1px solid ${BORDER}` }}>
        <FadeUp>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <Label text="Step by step" />
            <h2 style={{ ...M, fontSize: '2.2rem', fontWeight: 900, color: '#fff', margin: '0 0 4px' }}>COLLISION REPAIR</h2>
            <h2 style={{ ...M, fontSize: '2.2rem', fontWeight: 300, color: GREEN, margin: 0, letterSpacing: '3px' }}>PROCESS</h2>
          </div>
        </FadeUp>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1px', background: BORDER, border: `1px solid ${BORDER}` }}>
          {steps.map(({ title, desc }, i) => (
            <FadeUp key={title} delay={i * 0.1}>
              <div style={{ background: CARD, padding: '44px 36px', position: 'relative', overflow: 'hidden', height: '100%' }}>
                <div style={{ ...M, position: 'absolute', top: -8, right: 16, fontSize: '6rem', fontWeight: 900, color: '#fff', opacity: 0.03, lineHeight: 1, userSelect: 'none' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{ ...M, fontSize: '.62rem', fontWeight: 700, color: GREEN, letterSpacing: '2px', marginBottom: 20 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{ width: 28, height: 2, background: GREEN, marginBottom: 20 }} />
                <h3 style={{ ...M, fontSize: '1rem', fontWeight: 800, color: '#fff', marginBottom: 16, textTransform: 'uppercase' }}>{title}</h3>
                <p style={{ ...M, fontSize: '.88rem', color: MUTED, lineHeight: 1.9, margin: 0 }}>{desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* GAP */}
      <div style={{ height: 80, background: '#0d0d0d' }} />

      {/* ── IMAGE BREAK ── */}
      <div style={{ position: 'relative', height: 320, overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80"
          alt="Spray painting"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.12 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: `${GREEN}ee` }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 80px' }}>
          <FadeUp>
            <h2 style={{ ...M, fontSize: '1.6rem', fontWeight: 300, color: '#fff', maxWidth: 620, lineHeight: 1.7, fontStyle: 'italic', textAlign: 'center' }}>
              "We are constantly working to finetune our already exceptional customer service and ensure your collision repair experience is a <span style={{ color: '#fff', fontWeight: 900, fontStyle: 'italic' }}>positive one.</span>"
            </h2>
          </FadeUp>
        </div>
      </div>

      {/* GAP */}
      <div style={{ height: 80, background: '#0d0d0d' }} />

      {/* ── WORKPLACE & COMPLIANCE ── */}
      <div style={{ background: BLACK, padding: '100px 80px' }}>
        <FadeUp>
          <Label text="Our commitments" />
          <h2 style={{ ...M, fontSize: '2.2rem', fontWeight: 900, color: '#fff', margin: '0 0 4px' }}>WORKPLACE &</h2>
          <h2 style={{ ...M, fontSize: '2.2rem', fontWeight: 300, color: GREEN, margin: '0 0 56px', letterSpacing: '3px' }}>COMPLIANCE</h2>
        </FadeUp>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: BORDER, border: `1px solid ${BORDER}` }}>
          {[
            {
              title: 'OH&S Policies & Procedures',
              body: 'Auto Body Technicians has all OH&S Policies and Procedures in place with a commitment to safe work practices. An assessment is undertaken every 6 months by an outside company to ensure they are up to date. We have a clean, safe and well maintained environment for our staff.',
            },
            {
              title: 'Ablaze Total Solutions',
              body: 'Occupational Health & Safety laws are in place to prevent injuries and illness. We choose to use Ablaze Total Solutions to assist our business.\n\nCanberra Technology Park\n49 Phillip Ave, WATSON ACT 2602\n02 6262 2589',
            },
            {
              title: 'Privacy Policy',
              body: 'Auto Body Technicians (ABT) is committed to providing quality services to you and this policy outlines our ongoing obligations to you in respect of how we manage your Personal Information.',
              link: { label: 'Read Privacy Policy →', href: 'https://autobodytech.net.au/files/PrivacyPolicyClientsInformation.pdf' },
            },
          ].map(({ title, body, link }, i) => (
            <FadeUp key={title} delay={i * 0.12}>
              <div style={{ background: CARD, padding: '44px 36px', borderTop: `3px solid ${GREEN}`, height: '100%' }}>
                <h3 style={{ ...M, fontSize: '1rem', fontWeight: 800, color: '#fff', marginBottom: 20, textTransform: 'uppercase' }}>{title}</h3>
                <p style={{ ...M, fontSize: '.9rem', color: MUTED, lineHeight: 1.9, marginBottom: link ? 28 : 0, whiteSpace: 'pre-line' }}>{body}</p>
                {link && (
                  <a href={link.href} target="_blank" rel="noopener noreferrer" style={{ ...M, fontSize: '.65rem', fontWeight: 700, color: GREEN, textDecoration: 'none', letterSpacing: '1.5px' }}>
                    {link.label}
                  </a>
                )}
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes zoomin { from { transform: scale(1); } to { transform: scale(1.06); } }
        @keyframes fadeup { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

    </div>
  )
}