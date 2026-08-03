import type { Metadata, Viewport } from 'next'
import { Montserrat, Raleway } from 'next/font/google'
import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Intro from '../components/Intro'

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

const raleway = Raleway({
  variable: '--font-raleway',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
})

const SITE_URL = 'https://autobodytech.net.au'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'ABT Auto Body Technicians | Smash Repairs, Mitchell, Canberra ACT',
    template: '%s | ABT Auto Body Technicians',
  },
  description:
    'ABT Auto Body Technicians is a privately owned boutique smash repair business serving Canberra motorists since 1988. Private, fleet, commercial and insurance work — all repairs guaranteed.',
  keywords: [
    'smash repairs Canberra',
    'panel beater Mitchell ACT',
    'auto body repairs Canberra',
    'insurance repairs ACT',
    'collision repair Canberra',
    'car accident repairs Northside Canberra',
    'ABT Auto Body Technicians',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'ABT Auto Body Technicians',
    title: 'ABT Auto Body Technicians | Smash Repairs, Mitchell, Canberra ACT',
    description:
      "Canberra's trusted smash repairers since 1988. Private, fleet, commercial and insurance work — all repairs guaranteed.",
    locale: 'en_AU',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'ABT Auto Body Technicians — Smash Repairs, Mitchell, Canberra',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ABT Auto Body Technicians | Smash Repairs, Mitchell, Canberra ACT',
    description:
      "Canberra's trusted smash repairers since 1988. Private, fleet, commercial and insurance work — all repairs guaranteed.",
    images: ['/og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#15171b',
  width: 'device-width',
  initialScale: 1,
}

const businessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AutoBodyShop',
  name: 'ABT Auto Body Technicians',
  url: SITE_URL,
  telephone: '+61 2 6241 3801',
  faxNumber: '+61 2 6241 3275',
  email: 'admin@autobodytech.net.au',
  foundingDate: '1988-10',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '25 Winchcombe Court',
    addressLocality: 'Mitchell',
    addressRegion: 'ACT',
    postalCode: '2911',
    addressCountry: 'AU',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '16:30',
  },
  areaServed: 'Canberra ACT',
  award: 'Primary Repairer of the Year (twice)',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${raleway.variable}`}>
      <body style={{ margin: 0, padding: 0, background: '#15171b', fontFamily: 'var(--font-montserrat), sans-serif', overflowX: 'hidden' }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
        <Intro />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
