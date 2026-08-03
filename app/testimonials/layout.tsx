import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Customer Testimonials',
  description:
    'What Canberra motorists, fleet operators and insurers say about smash repairs completed by ABT Auto Body Technicians.',
  alternates: { canonical: '/testimonials' },
}

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return children
}
