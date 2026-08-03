import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gallery — Our Repair Work',
  description:
    'See examples of smash repair work completed by ABT Auto Body Technicians in Canberra — from accident damage to finished, guaranteed repairs.',
  alternates: { canonical: '/gallery' },
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children
}
