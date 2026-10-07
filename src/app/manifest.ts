import { MetadataRoute } from 'next';
import { APP_NAME } from '@/lib/constants';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: APP_NAME,
    short_name: APP_NAME,
    description: 'Proactive IDX Market Intelligence',
    start_url: '/app',
    display: 'standalone',
    background_color: '#0f141e',
    theme_color: '#0f141e',
    orientation: 'portrait',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
