// ─────────────────────────────────────────────────────────────────────────────
// CUSTOM GALLERY THUMBNAILS
// We are using the screenshots you just uploaded for Lapatola & Menorita
// ─────────────────────────────────────────────────────────────────────────────

import THUMB1 from '@/assets/Screenshot 2026-03-21 at 1.15.01 PM.png' // Lapatola
import THUMB2 from '@/assets/Screenshot 2026-03-21 at 1.15.42 PM.png' // Menorita
import THUMB3 from '@/assets/Balaji wire.png'                       // Mahadev Agro
import THUMB4 from '@/assets/Spirex Infoways.png'                   // Spirex
import THUMB5 from '@/assets/shapet.jpeg'                           // Shapet

const galleryPlaneData = [
  {
    fallbackColor: '#ffffff',     // Use white so PNG transparency doesn't turn black
    accentColor: '#d4af37',
    textureSrc: THUMB1,
    position: { x: -0.9, y: 0 },
    backgroundColor: '#0a0a0a',
    blob1Color: '#2a2211',
    blob2Color: '#1a1810',
    label: {
      word: 'E-Commerce',
      pms: 'LAPATOLA',
      color: '#d4af37',
    },
    project: {
      title: 'Menorita',
      url: 'https://menorita-2.myshopify.com/',
    },
  },
  {
    fallbackColor: '#ffffff',
    accentColor: '#80455a',
    textureSrc: THUMB2,
    position: { x: 0.8, y: 0 },
    backgroundColor: '#0a0a0a',
    blob1Color: '#2b151e',
    blob2Color: '#1d1217',
    label: {
      word: 'E-Commerce',
      pms: 'MENORITA',
      color: '#f5f5f5',
    },
    project: {
      title: 'Lapatola',
      url: 'https://lapatola.com/',
    },
  },
  {
    fallbackColor: '#ffffff',
    accentColor: '#c8b560',
    textureSrc: THUMB3,
    position: { x: -0.7, y: 0 },
    backgroundColor: '#0a0a0a',
    blob1Color: '#2a2410',
    blob2Color: '#1a1a0a',
    label: {
      word: 'Import Export',
      pms: 'MAHADEV',
      color: '#c8b560',
    },
    project: {
      title: 'Mahadev Agro Product',
      url: 'https://mehadavegroprodcut.vercel.app/',
    },
  },
  {
    fallbackColor: '#ffffff',
    accentColor: '#3c72c6',
    textureSrc: THUMB4,
    position: { x: 1, y: 0 },
    backgroundColor: '#0a0a0a',
    blob1Color: '#12223b',
    blob2Color: '#0a1526',
    label: {
      word: 'IT Services',
      pms: 'SPIREX',
      color: '#f5f5f5',
    },
    project: {
      title: 'Spirex Infoways',
      url: 'https://service.spirexinfoways.com/',
    },
  },
  {
    fallbackColor: '#ffffff',
    accentColor: '#fa7b71',
    textureSrc: THUMB5,
    position: { x: -0.7, y: 0 },
    backgroundColor: '#0a0a0a',
    blob1Color: '#301816',
    blob2Color: '#1a1010',
    label: {
      word: 'Industrial',
      pms: 'SHAPET',
      color: '#f5f5f5',
    },
    project: {
      title: 'Shapet Induction',
      url: 'https://shapet.vercel.app/',
    },
  },
]

export { galleryPlaneData }
