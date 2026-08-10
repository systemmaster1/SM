import type {MetadataRoute} from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SystemMaster Automations',
    short_name: 'SystemMaster',
    description:
      'Ready-to-use business software and custom ERP, CRM, HRMS, apps and automation solutions.',
    start_url: '/en',
    scope: '/',
    display: 'standalone',
    background_color: '#f7f9fc',
    theme_color: '#f7f9fc',
    categories: ['business', 'productivity'],
    icons: [
      {
        src: '/logo/systemmaster.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      }
    ]
  };
}
