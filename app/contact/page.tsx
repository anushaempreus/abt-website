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

const FieldError = ({ msg }: { msg?: string }) => msg
  ? <p style={{ ...M, color: '#e55', fontSize: '.72rem', marginTop: '-14px', marginBottom: '16px', letterSpacing: '.5px' }}>⚠ {msg}</p>
  : null

const years = Array.from({ length: 2020 - 1900 + 1 }, (_, i) => 2020 - i)

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  border: `1px solid ${BORDER}`,
  borderLeft: `3px solid ${BORDER}`,
  fontSize: '.88rem',
  background: CARD,
  outline: 'none',
  fontFamily: "'Montserrat', sans-serif",
  color: TEXT,
  marginBottom: '20px',
  display: 'block',
  boxSizing: 'border-box',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '.6rem',
  fontWeight: 700,
  color: MUTED,
  letterSpacing: '2px',
  textTransform: 'uppercase',
  marginBottom: '8px',
  fontFamily: "'Montserrat', sans-serif",
}

const badgeStyle: React.CSSProperties = {
  width: '28px',
  height: '28px',
  background: GREEN,
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '.72rem',
  fontWeight: 700,
  flexShrink: 0,
}

const sectionHeaderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
  marginBottom: '28px',
  paddingBottom: '16px',
  borderBottom: `1px solid ${BORDER}`,
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const mobileRef = useRef<HTMLInputElement>(null)
  const makeRef = useRef<HTMLInputElement>(null)
  const modelRef = useRef<HTMLInputElement>(null)
  const yearRef = useRef<HTMLSelectElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

  function validate() {
    const e: Record<string, string> = {}
    if (!nameRef.current?.value.trim()) e.name = 'Name is required'
    if (!emailRef.current?.value.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailRef.current.value)) e.email = 'Enter a valid email'
    if (!phoneRef.current?.value.trim()) e.phone = 'Phone number is required'
    if (!messageRef.current?.value.trim()) e.message = 'Message is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit() {
    if (!validate()) return
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nameRef.current?.value,
          email: emailRef.current?.value,
          phone: phoneRef.current?.value,
          mobile: mobileRef.current?.value,
          make: makeRef.current?.value,
          model: modelRef.current?.value,
          year: yearRef.current?.value,
          message: messageRef.current?.value,
        }),
      })
      const data = await res.json()
      if (data.error) { setError(data.error); setLoading(false); return }
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div style={{ ...M, background: BLACK, color: TEXT }}>

      {/* HERO */}
      <div style={{ position: 'relative', height: '60vh', minHeight: 420, overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1600&q=80"
          alt="Contact ABT Auto Body Technicians"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, animation: 'zoomin 8s ease forwards' }}
        />
        <div style={{ position: 'absolute', top: '50%', right: '20%', transform: 'translateY(-50%)', width: 500, height: 500, background: `radial-gradient(circle, ${GREEN}22 0%, transparent 70%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.05) 100%)' }} />
        <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 80px' }}>
          <div style={{ animation: 'fadeup 0.8s ease 0.2s both' }}><Label text="Get in touch" /></div>
          <div style={{ animation: 'fadeup 0.8s ease 0.4s both' }}>
            <h1 style={{ ...M, fontSize: '4rem', fontWeight: 900, color: '#fff', lineHeight: 1, margin: '0 0 8px' }}>CONTACT</h1>
            <h1 style={{ ...M, fontSize: '4rem', fontWeight: 300, color: GREEN, lineHeight: 1, margin: '0 0 24px', letterSpacing: '6px' }}>ABT</h1>
          </div>
          <div style={{ animation: 'fadeup 0.8s ease 0.6s both' }}>
            <div style={{ width: 48, height: 3, background: GREEN, marginBottom: 20 }} />
            <p style={{ ...M, fontSize: '.95rem', color: TEXT, lineHeight: 1.8, maxWidth: 480, margin: 0 }}>
              Please fill in the details below and we will contact you as soon as we can.
            </p>
          </div>
        </div>
      </div>

      {/* QUICK INFO STRIP */}
      <div style={{ background: '#4a6332', padding: '0 80px', display: 'flex', flexWrap: 'wrap' }}>
        {[
          { label: 'Trading Hours', value: 'Mon – Fri: 8:00am – 4:30pm' },
          { label: 'Phone', value: '02 6241 3801' },
          { label: 'Towing', value: 'Discount Towing Canberra · 0411 259 945' },
          { label: 'Guarantee', value: 'All Repairs Guaranteed' },
        ].map(({ label, value }, i) => (
          <div key={label} style={{ padding: '20px 40px 20px 0', marginRight: '40px', borderRight: i < 3 ? '1px solid rgba(255,255,255,.2)' : 'none' }}>
            <p style={{ ...M, fontSize: '.58rem', fontWeight: 700, color: 'rgba(255,255,255,.65)', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 4px' }}>{label}</p>
            <p style={{ ...M, fontSize: '.88rem', color: '#fff', fontWeight: 600, margin: 0 }}>{value}</p>
          </div>
        ))}
      </div>

      {/* MAIN GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', alignItems: 'start' }}>

        {/* FORM */}
        <div style={{ padding: '64px 80px', borderRight: `1px solid ${BORDER}` }}>
          <FadeUp>
            <Label text="Send us a message" />
            <h2 style={{ ...M, fontSize: '2.2rem', fontWeight: 900, color: '#fff', marginBottom: 8, textTransform: 'uppercase' }}>
              Get In <span style={{ color: GREEN, fontWeight: 300 }}>Touch</span>
            </h2>
            <div style={{ width: 48, height: 3, background: GREEN, marginBottom: 40 }} />
          </FadeUp>

          {submitted ? (
            <FadeUp>
              <div style={{ padding: '48px 40px', background: CARD, border: `1px solid ${BORDER}`, borderTop: `4px solid ${GREEN}`, textAlign: 'center' }}>
                <div style={{ width: '56px', height: '56px', background: GREEN, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <p style={{ ...M, fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>Message Sent!</p>
                <p style={{ ...M, color: MUTED, fontSize: '.9rem', lineHeight: 1.7, margin: 0 }}>Thank you for contacting us. We will get back to you as soon as possible.</p>
              </div>
            </FadeUp>
          ) : (
            <>
              <p style={{ ...M, color: MUTED, fontSize: '.78rem', fontStyle: 'italic', marginBottom: '40px' }}>* details must be entered</p>

              <FadeUp delay={0.1}>
                <div style={{ marginBottom: '48px' }}>
                  <div style={sectionHeaderStyle}>
                    <div style={badgeStyle}>1</div>
                    <h2 style={{ ...M, fontSize: '1rem', fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '1px', textTransform: 'uppercase' }}>Contact Details</h2>
                  </div>
                  <label style={labelStyle}>name: *</label>
                  <input ref={nameRef} type="text" placeholder="Full name"
                    style={{ ...inputStyle, borderLeftColor: errors.name ? '#e55' : BORDER }} />
                  <FieldError msg={errors.name} />
                  <label style={labelStyle}>email: *</label>
                  <input ref={emailRef} type="email" placeholder="your@email.com"
                    style={{ ...inputStyle, borderLeftColor: errors.email ? '#e55' : BORDER }} />
                  <FieldError msg={errors.email} />
                  <label style={labelStyle}>Ph: *</label>
                  <input ref={phoneRef} type="tel" placeholder="Phone number"
                    style={{ ...inputStyle, borderLeftColor: errors.phone ? '#e55' : BORDER }} />
                  <FieldError msg={errors.phone} />
                  <label style={labelStyle}>Mobile:</label>
                  <input ref={mobileRef} type="tel" placeholder="Mobile number" style={inputStyle} />
                </div>
              </FadeUp>

              <FadeUp delay={0.15}>
                <div style={{ marginBottom: '48px' }}>
                  <div style={sectionHeaderStyle}>
                    <div style={badgeStyle}>2</div>
                    <h2 style={{ ...M, fontSize: '1rem', fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '1px', textTransform: 'uppercase' }}>Vehicle Information</h2>
                  </div>
                  <label style={labelStyle}>Make:</label>
                  <input ref={makeRef} type="text" placeholder="e.g. Toyota" style={inputStyle} />
                  <label style={labelStyle}>Model:</label>
                  <input ref={modelRef} type="text" placeholder="e.g. Corolla" style={inputStyle} />
                  <label style={labelStyle}>Year of Manufacture:</label>
                  <select ref={yearRef} style={{ ...inputStyle, color: TEXT }}>
                    <option value="">(pls select)</option>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </FadeUp>

              <FadeUp delay={0.2}>
                <div style={{ marginBottom: '40px' }}>
                  <div style={sectionHeaderStyle}>
                    <div style={badgeStyle}>3</div>
                    <h2 style={{ ...M, fontSize: '1rem', fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '1px', textTransform: 'uppercase' }}>Message</h2>
                  </div>
                  <label style={labelStyle}>Message: *</label>
                  <textarea ref={messageRef} placeholder="How can we help you?"
                    style={{ ...inputStyle, minHeight: '140px', resize: 'vertical', borderLeftColor: errors.message ? '#e55' : BORDER }} />
                  <FieldError msg={errors.message} />
                </div>
              </FadeUp>

              {error && <p style={{ ...M, color: '#e55', fontSize: '.85rem', marginBottom: '16px' }}>{error}</p>}

              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" onClick={handleSubmit} disabled={loading}
                  style={{ ...M, background: GREEN, color: '#fff', padding: '16px 44px', border: 'none', fontSize: '.75rem', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', letterSpacing: '1.5px', textTransform: 'uppercase', opacity: loading ? 0.7 : 1, borderRadius: '2px' }}>
                  {loading ? 'Sending...' : 'Submit'}
                </button>
                <button type="button"
                  style={{ ...M, background: 'transparent', color: TEXT, padding: '16px 32px', border: '1px solid #333', fontSize: '.75rem', fontWeight: 600, cursor: 'pointer', letterSpacing: '1.5px', textTransform: 'uppercase', borderRadius: '2px' }}>
                  Reset
                </button>
              </div>
            </>
          )}
        </div>

        {/* SIDEBAR */}
        <div style={{ background: DARK, position: 'sticky', top: 0, borderLeft: `1px solid ${BORDER}` }}>
          <div style={{ padding: '40px 32px', borderBottom: `1px solid ${BORDER}` }}>
            <Label text="Location & Details" />
            <p style={{ ...M, fontSize: '.9rem', fontWeight: 700, color: '#fff', marginBottom: '20px' }}>ABT Auto Body Technicians</p>
            {[
              { label: 'Workshop', value: '25 Winchcombe Court\nMitchell ACT 2911' },
              { label: 'Postal', value: 'as above' },
              { label: 'p', value: '02 6241 3801' },
              { label: 'f', value: '02 6241 3275' },
              { label: 'e', value: 'admin@autobodytech.net.au', green: true },
              { label: 'Contact', value: 'Sheraz Khan' },
              { label: 'ABN', value: '78 685 130 090' },
              { label: 'Licence', value: '20000332' },
            ].map(({ label, value, green }) => (
              <div key={label} style={{ display: 'flex', gap: '10px', marginBottom: '12px', paddingBottom: '12px', borderBottom: `1px solid ${BORDER}` }}>
                <p style={{ ...M, fontSize: '.6rem', fontWeight: 700, color: MUTED, textTransform: 'uppercase', letterSpacing: '1.5px', margin: 0, minWidth: '60px', flexShrink: 0, paddingTop: '2px' }}>{label}:</p>
                <p style={{ ...M, fontSize: '.82rem', color: green ? GREEN : TEXT, whiteSpace: 'pre-line', lineHeight: 1.6, margin: 0 }}>{value}</p>
              </div>
            ))}
          </div>

          <div style={{ padding: '28px 32px', borderBottom: `1px solid ${BORDER}`, background: BLACK }}>
            <Label text="Towing Service" />
            <p style={{ ...M, fontSize: '.88rem', color: '#fff', fontWeight: 700, marginBottom: '4px' }}>Discount Towing Canberra</p>
            <p style={{ ...M, fontSize: '.8rem', color: MUTED, lineHeight: 1.7, margin: 0 }}>
              24 Hours a Day, 365 Days a Year<br />
              Phone: 0411 259 945
            </p>
          </div>

          <div style={{ padding: '28px 32px' }}>
            <Label text="Trusted Brands" />
            <p style={{ ...M, fontSize: '.8rem', color: MUTED, lineHeight: 1.7, marginBottom: 16 }}>
              Auto Body Technicians use some of Australia's most recognised and trusted brands to deliver first class collision repairs.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['Wurth', 'Snap-on'].map(brand => (
                <div key={brand} style={{ padding: '10px 16px', background: CARD, border: `1px solid ${BORDER}`, borderLeft: `3px solid ${GREEN}` }}>
                  <p style={{ ...M, color: TEXT, fontSize: '.82rem', fontWeight: 700, margin: 0, letterSpacing: '1px' }}>{brand}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes zoomin { from { transform: scale(1); } to { transform: scale(1.06); } }
        @keyframes fadeup { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  )
}