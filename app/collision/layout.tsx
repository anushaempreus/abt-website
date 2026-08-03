import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Collision Form — Report Your Accident',
  description:
    'Been in an accident? Submit your collision details online and ABT Auto Body Technicians in Mitchell ACT will guide you through the repair process.',
  alternates: { canonical: '/collision' },
}

export default function CollisionLayout({ children }: { children: React.ReactNode }) {
  return children
}
