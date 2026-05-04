'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const GREEN = '#6b8f47'
const BLACK = '#0a0a0a'
const DARK = '#111'
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

const services = [
  { num: '01', tag: 'Repairs', title: 'Smash Repairs', img: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=800&q=80', desc: 'State of the art technology and equipment. Premium quality products and skilled technicians. Pre and post repair checklists completed on all vehicles.', contact: null, cta: { label: 'Read More', href: '/about' }, size: 'large' },
  { num: '02', tag: 'Painting', title: 'Vehicle Spray Painting', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', desc: 'Highest standards of vehicle painting using the industry leading Sikkens Refinishing System. Only highly skilled paint technicians employed.', contact: null, cta: null, size: 'small' },
  { num: '03', tag: 'Quoting', title: 'Quoting & Assessing', img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80', desc: 'Digital images taken in under 15 minutes. 90% of vehicles completed on time. We keep you informed throughout the entire repair process.', contact: null, cta: { label: 'Book Online', href: '/quote' }, size: 'small' },
  { num: '04', tag: 'Fleet', title: 'Fleet Company Repairs', img: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=800&q=80', desc: 'Extensive experience with Fleet Management Companies. Primary repairer for Innovation, a major fleet company, for over 10 years.', contact: null, cta: { label: 'Contact Us', href: '/contact' }, size: 'large' },
  { num: '05', tag: 'Dents', title: 'Paintless Dent Removal', img: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&q=80', desc: 'Repairs hail and light impact dents without repainting. Cost-effective solution that removes damage without the necessity of repainting.', contact: 'No More Dents. Phone: 0403 906 258', cta: null, size: 'small' },
  { num: '06', tag: 'Towing', title: 'Towing Vehicles', img: 'https://images.unsplash.com/photo-1606577924006-27d39b132ae2?w=800&q=80', desc: 'Preferred towing sub-contractor Discount Towing Canberra available 24 hours a day, 365 days a year.', contact: 'Discount Towing Canberra. Phone: 0411 259 945', cta: null, size: 'small' },
  { num: '07', tag: 'Glass', title: 'Windscreen Replacement', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80', desc: 'Complete windscreen replacement service via our preferred windscreen repairer. Quick and professional.', contact: 'Auto Windscreen Service. Phone: 0419 214 722', cta: null, size: 'small' },
  { num: '08', tag: 'Wheels', title: 'Wheel Repairs', img: 'https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?w=800&q=80', desc: 'Wheel repair service available via Wicked Wheels for vehicles repaired at our Mitchell workshop.', contact: 'Wicked Wheels. Phone: 0407 051 892', cta: null, size: 'small' },
]

function ServiceCard({ num, tag, title, img, desc, contact, cta, height = 280, delay = 0 }: {
  num: string, tag: string, title: string, img: string, desc: string,
  contact: string | null, cta: { label: string, href: string } | null,
  height?: number, delay?: number
}) {
  const [hovered, setHovered] = useState(false)
  const { ref, visible } = useInView()

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative', height, overflow: 'hidden', cursor: 'pointer',
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.97)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {/* BG IMAGE */}
      <img src={img} alt={title} style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        objectFit: 'cover', display: 'block',
        opacity: hovered ? 0.80 : 0.6,
        transform: hovered ? 'scale(1.06)' : 'scale(1)',
        transition: 'opacity 0.5s ease, transform 0.6s ease',
      }} />

      {/* GRADIENT OVERLAY */}
      <div style={{
        position: 'absolute', inset: 0,
        background: hovered
          ? 'linear-gradient(to top, rgba(0,0,0,0.88) 25%, transparent 100%)'
          : 'linear-gradient(to top, rgba(0,0,0,0.6) 30%, transparent 100%)',
        transition: 'background 0.4s ease',
      }} />

      {/* TAG */}
      <div style={{
        position: 'absolute', top: 20, left: 20,
        background: GREEN, color: '#fff',
        ...M, fontSize: '.58rem', fontWeight: 700,
        letterSpacing: '2px', textTransform: 'uppercase',
        padding: '4px 12px',
        opacity: hovered ? 1 : 0.85,
        transition: 'opacity 0.3s ease',
      }}>{tag}</div>

      {/* NUM */}
      <div style={{
        position: 'absolute', top: 16, right: 20,
        ...M, fontSize: '.6rem', fontWeight: 700,
        color: GREEN, letterSpacing: '2px',
      }}>{num}</div>

      {/* CONTENT */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px' }}>
        <h3 style={{ ...M, fontSize: '1rem', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 10 }}>{title}</h3>

        <div style={{
          maxHeight: hovered ? 200 : 0,
          overflow: 'hidden',
          opacity: hovered ? 1 : 0,
          transition: 'max-height 0.4s ease, opacity 0.3s ease 0.1s',
        }}>
          <p style={{ ...M, fontSize: '.8rem', color: TEXT, lineHeight: 1.8, marginBottom: contact || cta ? 12 : 0 }}>{desc}</p>
          {contact && (
            <p style={{ ...M, fontSize: '.72rem', fontWeight: 700, color: GREEN, marginBottom: cta ? 10 : 0 }}>✦ {contact}</p>
          )}
          {cta && (
            <Link href={cta.href} onClick={e => e.stopPropagation()} style={{ ...M, fontSize: '.6rem', fontWeight: 700, color: GREEN, textDecoration: 'none', letterSpacing: '2px', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 14, height: 1, background: GREEN, display: 'inline-block' }} />{cta.label}
            </Link>
          )}
        </div>

        <div style={{
          height: 2, background: GREEN, marginTop: 12,
          width: hovered ? '100%' : '32px',
          transition: 'width 0.4s ease',
        }} />
      </div>
    </div>
  )
}

export default function Services() {
  return (
    <div style={{ ...M, background: BLACK, color: TEXT }}>

      {/* HERO */}
      <div style={{ position: 'relative', height: '60vh', minHeight: 420, overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=1600&q=80" alt="Workshop"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, animation: 'zoomin 8s ease forwards' }} />
        <div style={{ position: 'absolute', top: '50%', right: '20%', transform: 'translateY(-50%)', width: 500, height: 500, background: `radial-gradient(circle, ${GREEN}22 0%, transparent 70%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.05) 100%)' }} />
        <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 80px' }}>
          <div style={{ animation: 'fadeup 0.8s ease 0.2s both' }}><Label text="What we offer" /></div>
          <div style={{ animation: 'fadeup 0.8s ease 0.4s both' }}>
            <h1 style={{ ...M, fontSize: '4rem', fontWeight: 900, color: '#fff', lineHeight: 1, margin: '0 0 8px' }}>OUR</h1>
            <h1 style={{ ...M, fontSize: '4rem', fontWeight: 300, color: GREEN, lineHeight: 1, margin: '0 0 24px', letterSpacing: '6px' }}>SERVICES</h1>
          </div>
          <div style={{ animation: 'fadeup 0.8s ease 0.6s both' }}>
            <div style={{ width: 48, height: 3, background: GREEN, marginBottom: 20 }} />
            <p style={{ ...M, fontSize: '.95rem', color: TEXT, lineHeight: 1.8, maxWidth: 440, margin: 0 }}>
              We carry out repairs for all major insurance companies using state of the art technology and premium quality products.
            </p>
          </div>
        </div>
      </div>

      {/* INTRO STRIP */}
      <div style={{ background: '#4a6332', padding: '22px 80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <p style={{ ...M, fontSize: '.82rem', fontWeight: 600, color: '#fff', margin: 0 }}>
          Call us on <strong>02 6241 3801</strong> to book an appointment or use our online quote form.
        </p>
        <Link href="/quote" style={{ ...M, background: BLACK, color: '#fff', padding: '11px 28px', textDecoration: 'none', fontSize: '.68rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
          Request a Quote
        </Link>
      </div>

      {/* GRID */}
      <div style={{ padding: '60px 80px', display: 'flex', flexDirection: 'column', gap: 3 }}>

        <FadeUp style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 3 }}>
          <ServiceCard {...services[0]} height={360} delay={0} />
          <ServiceCard {...services[1]} height={360} delay={0.1} />
        </FadeUp>

        <FadeUp delay={0.1} style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 3 }}>
          <ServiceCard {...services[2]} height={300} delay={0.1} />
          <ServiceCard {...services[3]} height={300} delay={0.2} />
        </FadeUp>

        <FadeUp delay={0.15} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 3 }}>
          <ServiceCard {...services[4]} height={260} delay={0.1} />
          <ServiceCard {...services[5]} height={260} delay={0.2} />
          <ServiceCard {...services[6]} height={260} delay={0.3} />
        </FadeUp>

        <FadeUp delay={0.2}>
          <ServiceCard {...services[7]} height={220} delay={0} />
        </FadeUp>
      </div>

      {/* CTA */}
      <div style={{ background: '#4a6332', padding: '60px 80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
        <div>
          <h2 style={{ ...M, fontSize: '2rem', fontWeight: 900, color: '#fff', marginBottom: 8, textTransform: 'uppercase' }}>Ready to get started?</h2>
          <p style={{ ...M, fontSize: '.9rem', color: 'rgba(255,255,255,0.85)', margin: 0 }}>Bookings can be made by contacting our office or through our online quote page.</p>
        </div>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <Link href="/quote" style={{ ...M, background: BLACK, color: '#fff', padding: '14px 32px', textDecoration: 'none', fontSize: '.68rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>Online Quote</Link>
          <Link href="/contact" style={{ ...M, background: 'transparent', color: '#fff', padding: '14px 32px', textDecoration: 'none', fontSize: '.68rem', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.4)' }}>Contact Us</Link>
        </div>
      </div>

      <style>{`
        @keyframes zoomin { from { transform: scale(1); } to { transform: scale(1.06); } }
        @keyframes fadeup { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  )
}