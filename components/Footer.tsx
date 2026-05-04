import Link from 'next/link'

const GREEN = '#6b8f47'
const BORDER = '#1e1e1e'
const M = "'Montserrat', sans-serif"

const links = [
  { href: '/',             label: 'Home' },
  { href: '/about',        label: 'About' },
  { href: '/services',     label: 'Service' },
  { href: '/quote',        label: 'Quote' },
  { href: '/facilities',   label: 'Facilities' },
  { href: '/gallery',      label: 'Gallery' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/contact',      label: 'Contact' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#060606', borderTop: `1px solid ${BORDER}`, fontFamily: M }}>

      {/* MAIN */}
      <div style={{ padding: '60px 80px', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 60, borderBottom: `1px solid ${BORDER}` }}>

        {/* BRAND */}
        <div>
          <div style={{ fontFamily: M, fontSize: '1.6rem', fontWeight: 900, color: '#fff', letterSpacing: '4px', marginBottom: 4 }}>ABT</div>
          <div style={{ fontFamily: M, fontSize: '.62rem', fontWeight: 700, color: GREEN, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 18 }}>Auto Body Technicians</div>
          <p style={{ fontFamily: M, fontSize: '.82rem', color: '#777', lineHeight: 1.8, maxWidth: 280, marginBottom: 20 }}>
            Canberra's trusted smash repairers since 1988.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              ['Phone', '02 6241 3801'],
              ['Email', 'admin@autobodytech.net.au'],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <span style={{ fontFamily: M, fontSize: '.58rem', fontWeight: 700, color: GREEN, textTransform: 'uppercase', letterSpacing: '1px', minWidth: 40 }}>{label}</span>
                <span style={{ fontFamily: M, fontSize: '.82rem', color: '#777' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* NAV */}
        <div>
          <p style={{ fontFamily: M, fontSize: '.62rem', fontWeight: 800, color: '#fff', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 20 }}>Pages</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            {links.map(({ href, label }) => (
              <Link key={href} href={href} style={{ fontFamily: M, fontSize: '.82rem', fontWeight: 500, color: '#777', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 12, height: 1, background: GREEN, display: 'inline-block', flexShrink: 0 }} />
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* DETAILS */}
        <div>
          <p style={{ fontFamily: M, fontSize: '.62rem', fontWeight: 800, color: '#fff', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 20 }}>Details</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              ['Hours', 'Mon–Fri 8:00am – 4:30pm'],
              ['ABN', '78 685 130 090'],
              ['Licence', '20000332'],
              ['Contact', 'Sheraz Khan'],
            ].map(([label, value]) => (
              <div key={label}>
                <p style={{ fontFamily: M, fontSize: '.58rem', fontWeight: 700, color: GREEN, textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 3px' }}>{label}</p>
                <p style={{ fontFamily: M, fontSize: '.82rem', color: '#777', margin: 0 }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div style={{ padding: '18px 80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
        <p style={{ fontFamily: M, fontSize: '.72rem', color: '#444', margin: 0 }}>
          © {new Date().getFullYear()} ABT Auto Body Technicians. All rights reserved.
        </p>
        <p style={{ fontFamily: M, fontSize: '.72rem', color: '#444', margin: 0 }}>
          Managed by{' '}
          <a href="https://empreusitsupport.com.au" target="_blank" rel="noopener noreferrer"
            style={{ color: GREEN, textDecoration: 'none', fontWeight: 700 }}>
            Empreus IT Support
          </a>
        </p>
      </div>

    </footer>
  )
}