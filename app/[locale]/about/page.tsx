import type {Metadata} from 'next';
import {CompanyPage} from '@/components/pages/company-page';

export const metadata: Metadata = {
  title: 'About SystemMaster Automations',
  description:
    'Learn about SystemMaster Automations, our business software products, custom development approach, technology and automation vision.'
};

export default function AboutPage() {
  return <CompanyPage />;
}
