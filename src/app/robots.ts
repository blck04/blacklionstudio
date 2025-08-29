import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/manager/',
    },
    sitemap: 'https://your-production-domain.com/sitemap.xml',
  }
}
