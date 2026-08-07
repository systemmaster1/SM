import type {Metadata} from 'next';
import {ResourcesPage} from '@/components/pages/resources-page';

export const metadata: Metadata = {
  title: 'Resources & Insights | SystemMaster Automations',
  description: 'Practical guides for ERP, CRM, HRMS, automation, manufacturing systems and custom software planning.'
};

export default function Page() {
  return <ResourcesPage />;
}
