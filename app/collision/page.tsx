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

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '12px 16px',
  border: `1px solid ${BORDER}`, borderLeft: `3px solid ${BORDER}`,
  fontSize: '.88rem', background: CARD, outline: 'none',
  fontFamily: "'Montserrat', sans-serif", color: TEXT,
  marginBottom: '20px', display: 'block', boxSizing: 'border-box',
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '.6rem', fontWeight: 700,
  color: MUTED, letterSpacing: '2px', textTransform: 'uppercase',
  marginBottom: '8px', fontFamily: "'Montserrat', sans-serif",
}

const badgeStyle: React.CSSProperties = {
  width: '28px', height: '28px', background: GREEN, color: '#fff',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontSize: '.72rem', fontWeight: 700, flexShrink: 0,
}

const sectionHeaderStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: '14px',
  marginBottom: '28px', paddingBottom: '16px',
  borderBottom: `1px solid ${BORDER}`,
}

export default function Collision() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const driverNameRef = useRef<HTMLInputElement>(null)
  const genderRef = useRef<HTMLSelectElement>(null)
  const ageRef = useRef<HTMLInputElement>(null)
  const driverAddressRef = useRef<HTMLInputElement>(null)
  const driverPhoneRef = useRef<HTMLInputElement>(null)
  const licenseRef = useRef<HTMLInputElement>(null)
  const registrationRef = useRef<HTMLInputElement>(null)
  const vehicleMakeRef = useRef<HTMLInputElement>(null)
  const vehicleTypeRef = useRef<HTMLInputElement>(null)
  const vehicleColourRef = useRef<HTMLInputElement>(null)
  const insurerRef = useRef<HTMLInputElement>(null)
  const ownsVehicleRef = useRef<HTMLSelectElement>(null)
  const vehicleOwnerRef = useRef<HTMLInputElement>(null)
  const timeRef = useRef<HTMLInputElement>(null)
  const dateRef = useRef<HTMLInputElement>(null)
  const locationRef = useRef<HTMLInputElement>(null)
  const towTruckRef = useRef<HTMLInputElement>(null)
  const witnessNameRef = useRef<HTMLInputElement>(null)
  const witnessAddressRef = useRef<HTMLInputElement>(null)
  const witnessPhoneRef = useRef<HTMLInputElement>(null)
  const constableNameRef = useRef<HTMLInputElement>(null)
  const stationRef = useRef<HTMLInputElement>(null)
  const reportNumberRef = useRef<HTMLInputElement>(null)

  function validate() {
    const e: Record<string, string> = {}
    if (!driverNameRef.current?.value.trim()) e.driverName = 'Driver name is required'
    if (!dateRef.current?.value.trim()) e.date = 'Date is required'
    if (!locationRef.current?.value.trim()) e.location = 'Location is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit() {
    if (!validate()) return
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/collision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          driverName: driverNameRef.current?.value,
          gender: genderRef.current?.value,
          age: ageRef.current?.value,
          driverAddress: driverAddressRef.current?.value,
          driverPhone: driverPhoneRef.current?.value,
          license: licenseRef.current?.value,
          registration: registrationRef.current?.value,
          vehicleMake: vehicleMakeRef.current?.value,
          vehicleType: vehicleTypeRef.current?.value,
          vehicleColour: vehicleColourRef.current?.value,
          insurer: insurerRef.current?.value,
          ownsVehicle: ownsVehicleRef.current?.value,
          vehicleOwner: vehicleOwnerRef.current?.value,
          time: timeRef.current?.value,
          date: dateRef.current?.value,
          location: locationRef.current?.value,
          towTruck: towTruckRef.current?.value,
          witnessName: witnessNameRef.current?.value,
          witnessAddress: witnessAddressRef.current?.value,
          witnessPhone: witnessPhoneRef.current?.value,
          constableName: constableNameRef.current?.value,
          station: stationRef.current?.value,
          reportNumber: reportNumberRef.current?.value,
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
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80"
          alt="Collision Form"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, animation: 'zoomin 8s ease forwards' }}
        />
        <div style={{ position: 'absolute', top: '50%', right: '20%', transform: 'translateY(-50%)', width: 500, height: 500, background: `radial-gradient(circle, ${GREEN}22 0%, transparent 70%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.05) 100%)' }} />
        <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 80px' }}>
          <div style={{ animation: 'fadeup 0.8s ease 0.2s both' }}><Label text="Accident checklist" /></div>
          <div style={{ animation: 'fadeup 0.8s ease 0.4s both' }}>
            <h1 style={{ ...M, fontSize: '4rem', fontWeight: 900, color: '#fff', lineHeight: 1, margin: '0 0 8px' }}>COLLISION</h1>
            <h1 style={{ ...M, fontSize: '4rem', fontWeight: 300, color: GREEN, lineHeight: 1, margin: '0 0 24px', letterSpacing: '6px' }}>FORM</h1>
          </div>
          <div style={{ animation: 'fadeup 0.8s ease 0.6s both' }}>
            <div style={{ width: 48, height: 3, background: GREEN, marginBottom: 20 }} />
            <p style={{ ...M, fontSize: '.95rem', color: TEXT, lineHeight: 1.8, maxWidth: 480, margin: 0 }}>
              Record details at the scene of an accident. All information will be sent directly to ABT Auto Body Technicians.
            </p>
          </div>
        </div>
      </div>

      {/* QUICK INFO STRIP */}
      <div style={{ background: '#4a6332', padding: '0 80px', display: 'flex', flexWrap: 'wrap' }}>
        {[
          { label: 'Workshop', value: '25 Winchcombe Court, Mitchell ACT 2911' },
          { label: 'Phone', value: '02 6241 3801' },
          { label: 'Towing', value: 'Discount Towing Canberra · 0411 259 945' },
          { label: 'Important', value: 'Call Police if anyone is injured' },
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
            <Label text="Fill in the details" />
            <h2 style={{ ...M, fontSize: '2.2rem', fontWeight: 900, color: '#fff', marginBottom: 8, textTransform: 'uppercase' }}>
              Accident <span style={{ color: GREEN, fontWeight: 300 }}>Checklist</span>
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
                <p style={{ ...M, fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>Form Submitted!</p>
                <p style={{ ...M, color: MUTED, fontSize: '.9rem', lineHeight: 1.7, margin: 0 }}>Your collision details have been sent to ABT. We will be in touch shortly.</p>
              </div>
            </FadeUp>
          ) : (
            <>
              <p style={{ ...M, color: MUTED, fontSize: '.78rem', fontStyle: 'italic', marginBottom: '40px' }}>Gain the following information from the other driver at the scene. * required fields.</p>

              {/* SECTION 1 — OTHER VEHICLE */}
              <FadeUp delay={0.1}>
                <div style={{ marginBottom: '48px' }}>
                  <div style={sectionHeaderStyle}>
                    <div style={badgeStyle}>1</div>
                    <h2 style={{ ...M, fontSize: '1rem', fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '1px', textTransform: 'uppercase' }}>Other Vehicle</h2>
                  </div>
                  <label style={labelStyle}>Driver's Name: *</label>
                  <input ref={driverNameRef} type="text" placeholder="Full name"
                    style={{ ...inputStyle, borderLeftColor: errors.driverName ? '#e55' : BORDER }} />
                  <FieldError msg={errors.driverName} />
                  <label style={labelStyle}>Male / Female:</label>
                  <select ref={genderRef} style={{ ...inputStyle, color: TEXT }}>
                    <option value="">(select)</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <label style={labelStyle}>Approx Age:</label>
                  <input ref={ageRef} type="text" placeholder="e.g. 35" style={inputStyle} />
                  <label style={labelStyle}>Address:</label>
                  <input ref={driverAddressRef} type="text" placeholder="Street address" style={inputStyle} />
                  <label style={labelStyle}>Contact Phone:</label>
                  <input ref={driverPhoneRef} type="tel" placeholder="Phone number" style={inputStyle} />
                  <label style={labelStyle}>License:</label>
                  <input ref={licenseRef} type="text" placeholder="License number" style={inputStyle} />
                  <label style={labelStyle}>Registration:</label>
                  <input ref={registrationRef} type="text" placeholder="e.g. ABC123" style={inputStyle} />
                  <label style={labelStyle}>Make of Vehicle:</label>
                  <input ref={vehicleMakeRef} type="text" placeholder="e.g. Toyota Corolla" style={inputStyle} />
                  <label style={labelStyle}>Type:</label>
                  <input ref={vehicleTypeRef} type="text" placeholder="e.g. Sedan, SUV, Ute" style={inputStyle} />
                  <label style={labelStyle}>Colour:</label>
                  <input ref={vehicleColourRef} type="text" placeholder="e.g. White" style={inputStyle} />
                  <label style={labelStyle}>Insurer:</label>
                  <input ref={insurerRef} type="text" placeholder="e.g. NRMA, AAMI" style={inputStyle} />
                  <label style={labelStyle}>Does driver own vehicle?</label>
                  <select ref={ownsVehicleRef} style={{ ...inputStyle, color: TEXT }}>
                    <option value="">(select)</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  <label style={labelStyle}>If NO, who does?</label>
                  <input ref={vehicleOwnerRef} type="text" placeholder="Owner's name" style={inputStyle} />
                </div>
              </FadeUp>

              {/* SECTION 2 — EVENT DETAILS */}
              <FadeUp delay={0.15}>
                <div style={{ marginBottom: '48px' }}>
                  <div style={sectionHeaderStyle}>
                    <div style={badgeStyle}>2</div>
                    <h2 style={{ ...M, fontSize: '1rem', fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '1px', textTransform: 'uppercase' }}>Event Details</h2>
                  </div>
                  <label style={labelStyle}>Time:</label>
                  <input ref={timeRef} type="time" style={inputStyle} />
                  <label style={labelStyle}>Date: *</label>
                  <input ref={dateRef} type="date"
                    style={{ ...inputStyle, borderLeftColor: errors.date ? '#e55' : BORDER }} />
                  <FieldError msg={errors.date} />
                  <label style={labelStyle}>Location: *</label>
                  <input ref={locationRef} type="text" placeholder="Street / suburb where accident occurred"
                    style={{ ...inputStyle, borderLeftColor: errors.location ? '#e55' : BORDER }} />
                  <FieldError msg={errors.location} />
                  <label style={labelStyle}>Tow Truck Driver:</label>
                  <input ref={towTruckRef} type="text" placeholder="Tow truck driver name / company" style={inputStyle} />
                </div>
              </FadeUp>

              {/* SECTION 3 — WITNESS */}
              <FadeUp delay={0.2}>
                <div style={{ marginBottom: '48px' }}>
                  <div style={sectionHeaderStyle}>
                    <div style={badgeStyle}>3</div>
                    <h2 style={{ ...M, fontSize: '1rem', fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '1px', textTransform: 'uppercase' }}>Details of Witness</h2>
                  </div>
                  <label style={labelStyle}>Name:</label>
                  <input ref={witnessNameRef} type="text" placeholder="Witness full name" style={inputStyle} />
                  <label style={labelStyle}>Address:</label>
                  <input ref={witnessAddressRef} type="text" placeholder="Witness address" style={inputStyle} />
                  <label style={labelStyle}>Contact Phone:</label>
                  <input ref={witnessPhoneRef} type="tel" placeholder="Witness phone number" style={inputStyle} />
                </div>
              </FadeUp>

              {/* SECTION 4 — POLICE */}
              <FadeUp delay={0.25}>
                <div style={{ marginBottom: '40px' }}>
                  <div style={sectionHeaderStyle}>
                    <div style={badgeStyle}>4</div>
                    <h2 style={{ ...M, fontSize: '1rem', fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '1px', textTransform: 'uppercase' }}>Attending Police Officer</h2>
                  </div>
                  <div style={{ padding: '16px 20px', background: CARD, border: `1px solid ${BORDER}`, borderLeft: `3px solid ${GREEN}`, marginBottom: '24px' }}>
                    <p style={{ ...M, fontSize: '.78rem', color: MUTED, lineHeight: 1.7, margin: 0 }}>
                      Call Police if anyone is injured or there is major damage and vehicles require towing. If Police are not called, report the accident to the nearest Police Station.
                    </p>
                  </div>
                  <label style={labelStyle}>Constable Name:</label>
                  <input ref={constableNameRef} type="text" placeholder="Officer's name" style={inputStyle} />
                  <label style={labelStyle}>Station:</label>
                  <input ref={stationRef} type="text" placeholder="Police station name" style={inputStyle} />
                  <label style={labelStyle}>Report #:</label>
                  <input ref={reportNumberRef} type="text" placeholder="Report number" style={inputStyle} />
                </div>
              </FadeUp>

              {error && <p style={{ ...M, color: '#e55', fontSize: '.85rem', marginBottom: '16px' }}>{error}</p>}

              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" onClick={handleSubmit} disabled={loading}
                  style={{ ...M, background: GREEN, color: '#fff', padding: '16px 44px', border: 'none', fontSize: '.75rem', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', letterSpacing: '1.5px', textTransform: 'uppercase', opacity: loading ? 0.7 : 1, borderRadius: '2px' }}>
                  {loading ? 'Sending...' : 'Submit Form'}
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
            <Label text="Police & Emergency" />
            <p style={{ ...M, fontSize: '.8rem', color: MUTED, lineHeight: 1.7, marginBottom: 16 }}>
              Call Police if anyone is injured or there is major damage. If Police are not called, report the accident to the nearest Police Station.
            </p>
            <div style={{ padding: '12px 16px', background: CARD, border: `1px solid ${BORDER}`, borderLeft: `3px solid ${GREEN}` }}>
              <p style={{ ...M, color: TEXT, fontSize: '.82rem', fontWeight: 700, margin: 0, letterSpacing: '1px' }}>Emergency: 000</p>
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