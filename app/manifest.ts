import type {MetadataRoute} from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SystemMaster Automations',
    short_name: 'SystemMaster',
    description:
      'Ready-to-use business software and custom ERP, CRM, HRMS, apps and automation solutions.',
    start_url: '/en',
    display: 'standalone',
    background_color: '#071326',
    theme_color: '#0b1d3a',
    icons: [
      {
        src: '/logo/systemmaster.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  };
}
