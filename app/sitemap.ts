import type { MetadataRoute } from 'next'

const SITE_URL = 'https://autobodytech.net.au'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number }[] = [
    { path: '', priority: 1 },
    { path: '/about', priority: 0.8 },
    { path: '/services', priority: 0.8 },
    { path: '/facilities', priority: 0.7 },
    { path: '/gallery', priority: 0.6 },
    { path: '/testimonials', priority: 0.6 },
    { path: '/collision', priority: 0.8 },
    { path: '/quote', priority: 0.9 },
    { path: '/contact', priority: 0.9 },
  ]
  return routes.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority,
  }))
}
