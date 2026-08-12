import Link from 'next/link'

export const metadata = {
  title: 'Page Not Found',
}

export default function NotFound() {
  return (
    <section style={{ textAlign: 'center', padding: '140px 60px' }}>
      <div className="green-label" style={{ justifyContent: 'center' }}>404</div>
      <h1 style={{ color: '#141813', fontSize: 'clamp(1.7rem, 3.8vw, 2rem)', margin: '16px 0' }}>
        PAGE NOT <span style={{ color: 'var(--green)' }}>FOUND</span>
      </h1>
      <p style={{ maxWidth: 480, margin: '0 auto 32px' }}>
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="btn">
        Back to Home
      </Link>
    </section>
  )
}
