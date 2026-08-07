import type {Metadata} from 'next';
import {CaseStudiesPage} from '@/components/pages/case-studies-page';

export const metadata: Metadata = {
  title: 'Case Studies | SystemMaster Automations',
  description: 'Examples of how operational problems can be mapped into ERP, CRM, production, inventory and automation systems.'
};

export default function Page() {
  return <CaseStudiesPage />;
}
