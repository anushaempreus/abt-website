'use client'
import { useEffect, useRef, useState } from 'react'

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

const facilities = [
  { title: 'Panel Beating and Spray Painting', img: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=400&q=80', desc: 'ABT Auto Body Technicians specialises in motor vehicle accident repairs and refinishing. We have the latest equipment available, including chassis alignment systems and inverter welding.' },
  { title: 'Occupational Health and Safety', img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80', desc: 'We have a strong commitment to safe work practices to ensure our experienced Sprayers and Panel Beaters are looked after. We use and endorse Ablaze Total Solutions.' },
  { title: 'State of the Art Monarch Merlin Paint Booth', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', desc: 'ABT Auto Body Technicians use a State-of-the-Art, High Performance environmentally friendly paint booth to ensure our customers receive the very best paint finish.' },
  { title: 'Atlas Collision Repair Systems', img: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=400&q=80', desc: 'When it comes to aligning and repairing modern vehicles, ABT Auto Body Technicians use Atlas universal systems for anchoring, measuring and holding.' },
  { title: 'Careful Parts Storage and Reassembly', img: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=400&q=80', desc: 'When your vehicle is stripped for repairs the parts removed are placed onto individual parts trolleys and stored in a safe and clean manner for reassembly.' },
  { title: 'Latest Computer Technology', img: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&q=80', desc: 'Paint technology is constantly changing when it comes to the finishing process in automotive painting. Our team are all Highly Trained Professionals with up to date Industry Knowledge.' },
  { title: 'Knowledge and Experience', img: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=400&q=80', desc: '"The owner and his specialist technicians combined knowledge and experience immediately put us at ease with the often complicated process of car repairs."', isQuote: true },
  { title: 'Paint Refinishing System', img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&q=80', desc: 'We use Sikkens Paints, one of the best paints on the market. This paint is an innovative and environmentally responsible choice in vehicle refinishes and helps protect both the environment and our employees.' },
  { title: 'Skilled Employees', img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80', desc: 'Here at ABT Auto Body Technicians our greatest resource is our employees. We are always on the lookout for people with a dedicated attitude and the ability to work in a team. Sound like you?' },
  { title: 'How Long Will It Take?', img: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&q=80', desc: 'That depends on the extent of the damage. Our experienced estimators can give you an approximate repair time when they inspect your vehicle. 90% of our vehicles are completed as per the agreed client/repairer timeframes.' },
]

const associations = [
  "Motor Traders' Association of ACT",
  "Motor Traders' Association of New South Wales",
]

const recycling = ['Cardboard', 'Scrap Metal', 'Rags', 'Thinners', 'Plastic Bumper Bars', 'Headlamps']

const charities = [
  { title: 'Camp Quality', desc: "ABT are proud supporters of Camp Quality — the children's family cancer charity that believes in bringing optimism and happiness to the lives of children and families affected by cancer." },
  { title: "Canberra Special Children's Party", desc: "ABT Auto Body Technicians are proud supporters of the Canberra Special Children's Party, giving back to our local community." },
]

export default function Facilities() {
  return (
    <div style={{ ...M, background: BLACK, color: TEXT }}>

      {/* HERO */}
      <div style={{ position: 'relative', height: '60vh', minHeight: 420, overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80"
          alt="Facilities"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, animation: 'zoomin 8s ease forwards' }}
        />
        <div style={{ position: 'absolute', top: '50%', right: '20%', transform: 'translateY(-50%)', width: 500, height: 500, background: `radial-gradient(circle, ${GREEN}22 0%, transparent 70%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.05) 100%)' }} />
        <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 80px' }}>
          <div style={{ animation: 'fadeup 0.8s ease 0.2s both' }}><Label text="What we use" /></div>
          <div style={{ animation: 'fadeup 0.8s ease 0.4s both' }}>
            <h1 style={{ ...M, fontSize: '4rem', fontWeight: 900, color: '#fff', lineHeight: 1, margin: '0 0 8px' }}>OUR</h1>
            <h1 style={{ ...M, fontSize: '4rem', fontWeight: 300, color: GREEN, lineHeight: 1, margin: '0 0 24px', letterSpacing: '6px' }}>FACILITIES</h1>
          </div>
          <div style={{ animation: 'fadeup 0.8s ease 0.6s both' }}>
            <div style={{ width: 48, height: 3, background: GREEN, marginBottom: 20 }} />
            <p style={{ ...M, fontSize: '.95rem', color: TEXT, lineHeight: 1.8, maxWidth: 480, margin: 0 }}>
              State of the art equipment, environmentally responsible practices and a highly skilled team — all under one roof.
            </p>
          </div>
        </div>
      </div>

      {/* FACILITIES TIMELINE LIST */}
      <div style={{ padding: '70px 80px', display: 'flex', flexDirection: 'column' }}>
        {facilities.map(({ title, img, desc, isQuote }, i) => (
          <FadeUp key={title} delay={0.05}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '100px 280px 1fr',
              alignItems: 'stretch',
              borderBottom: `1px solid ${BORDER}`,
              background: i % 2 === 0 ? DARK : BLACK,
            }}>
              {/* NUMBER */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRight: `1px solid ${BORDER}`,
                padding: '28px 0',
              }}>
                <span style={{ ...M, fontSize: '2.8rem', fontWeight: 900, color: GREEN, opacity: 0.2, lineHeight: 1 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              {/* IMAGE */}
              <div style={{ overflow: 'hidden', borderRight: `1px solid ${BORDER}` }}>
                <img src={img} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.9 }} />
              </div>

              {/* TEXT */}
              <div style={{ padding: '28px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ width: 6, height: 6, background: GREEN, borderRadius: '50%', marginBottom: 14 }} />
                <h3 style={{ ...M, fontSize: '.95rem', fontWeight: 800, color: '#fff', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '.5px' }}>{title}</h3>
                <p style={{ ...M, fontSize: '.88rem', color: MUTED, lineHeight: 1.9, margin: 0, fontStyle: isQuote ? 'italic' : 'normal' }}>{desc}</p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>

      {/* QUOTE BANNER */}
      <div style={{ height: 60, background: BLACK }} />
      <div style={{ position: 'relative', height: 280, overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=1600&q=80"
          alt="Workshop"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.2 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: '#4a6332', opacity: 0.92 }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 80px' }}>
          <FadeUp>
            <h2 style={{ ...M, fontSize: '1.7rem', fontWeight: 300, color: '#fff', lineHeight: 1.7, fontStyle: 'italic', textAlign: 'center', width: '100%' }}>
              "Consistently deliver a level of customer service that exceeds and even anticipates our customer's{' '}
              <span style={{ fontWeight: 900 }}>expectations for value.</span>"
            </h2>
          </FadeUp>
        </div>
      </div>

      {/* ASSOCIATIONS + GREEN STAMP */}
      <div style={{ height: 80, background: BLACK }} />
      <div style={{ background: DARK, padding: '80px 80px', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
          <SlideIn from="left">
            <div>
              <Label text="Industry memberships" />
              <h2 style={{ ...M, fontSize: '2rem', fontWeight: 900, color: '#fff', margin: '0 0 4px' }}>MEMBER OF THE</h2>
              <h2 style={{ ...M, fontSize: '2rem', fontWeight: 300, color: GREEN, margin: '0 0 36px', letterSpacing: '3px' }}>FOLLOWING ASSOCIATIONS</h2>
              {associations.map((a, i) => (
                <FadeUp key={a} delay={i * 0.1}>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '18px 0', borderBottom: `1px solid ${BORDER}` }}>
                    <div style={{ width: 28, height: 28, background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ color: '#fff', fontSize: 10 }}>✦</span>
                    </div>
                    <p style={{ ...M, fontSize: '.92rem', fontWeight: 500, color: TEXT, margin: 0 }}>{a}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </SlideIn>

          <SlideIn from="right">
            <div>
              <Label text="Environment" />
              <h2 style={{ ...M, fontSize: '2rem', fontWeight: 900, color: '#fff', margin: '0 0 4px' }}>GREEN STAMP</h2>
              <h2 style={{ ...M, fontSize: '2rem', fontWeight: 300, color: GREEN, margin: '0 0 20px', letterSpacing: '3px' }}>ACCREDITATION</h2>
              <p style={{ ...M, fontSize: '.9rem', color: MUTED, lineHeight: 1.9, marginBottom: 28 }}>
                We have a strong commitment to the environment. We have processes in place to ensure that we recycle all our:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {recycling.map((item, i) => (
                  <FadeUp key={item} delay={i * 0.07}>
                    <span style={{ ...M, background: '#1a2a14', border: `1px solid ${GREEN}`, color: GREEN, fontSize: '.72rem', fontWeight: 700, padding: '7px 16px', letterSpacing: '1px' }}>
                      {item}
                    </span>
                  </FadeUp>
                ))}
              </div>
            </div>
          </SlideIn>
        </div>
      </div>

      {/* CHARITIES */}
      <div style={{ height: 80, background: BLACK }} />
      <div style={{ background: BLACK, padding: '80px 80px' }}>
        <FadeUp>
          <Label text="Giving back" />
          <h2 style={{ ...M, fontSize: '2.2rem', fontWeight: 900, color: '#fff', margin: '0 0 4px' }}>CHARITIES WE</h2>
          <h2 style={{ ...M, fontSize: '2.2rem', fontWeight: 300, color: GREEN, margin: '0 0 16px', letterSpacing: '3px' }}>SUPPORT</h2>
          <p style={{ ...M, fontSize: '.9rem', color: MUTED, lineHeight: 1.9, marginBottom: 40, maxWidth: 560 }}>
            At ABT Auto Body Technicians we promote understanding, compassion and a commitment to helping our local and wider community.
          </p>
        </FadeUp>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1px', background: BORDER, border: `1px solid ${BORDER}` }}>
          {charities.map(({ title, desc }, i) => (
            <FadeUp key={title} delay={i * 0.15}>
              <div style={{ background: CARD, padding: '44px 36px', borderTop: `3px solid ${GREEN}`, height: '100%' }}>
                <div style={{ width: 32, height: 32, background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <span style={{ color: '#fff', fontSize: 12 }}>✦</span>
                </div>
                <h3 style={{ ...M, fontSize: '1rem', fontWeight: 800, color: '#fff', marginBottom: 14, textTransform: 'uppercase' }}>{title}</h3>
                <p style={{ ...M, fontSize: '.9rem', color: MUTED, lineHeight: 1.9, margin: 0 }}>{desc}</p>
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