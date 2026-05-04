import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Intro from '../components/Intro'

export const metadata = {
  title: 'ABT Auto Body Technicians | Smash Repairs, Mitchell, Canberra ACT',
  description: 'ABT Auto Body Technicians has been serving Canberra motorists since 1988.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
              <body style={{ margin: 0, padding: 0, background: '#0a0a0a', fontFamily: "'Montserrat', sans-serif", overflowX: 'hidden' }}>
        <Intro />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}