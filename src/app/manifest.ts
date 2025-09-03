import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Redar Rasporeda Časova - Rasporedar',
    short_name: 'Rasporedar',
    description: 'Aplikacija za efikasan menadžment rasporeda časova – jednostavno kreiranje, pregled i organizacija školskih rasporeda na jednom mestu.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}