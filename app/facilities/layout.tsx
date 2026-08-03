import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Facilities — Modern Repair Equipment',
  description:
    'Our Mitchell ACT workshop uses modern equipment and highly trained technicians to deliver quality smash repairs for all vehicle makes and models.',
  alternates: { canonical: '/facilities' },
}

export default function FacilitiesLayout({ children }: { children: React.ReactNode }) {
  return children
}
