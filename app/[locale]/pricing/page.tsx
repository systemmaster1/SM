import type {Metadata} from 'next';
import {ProfessionalPricingPage} from '@/components/pages/professional-pricing-page';

export const metadata: Metadata = {
  title: 'Pricing | SM-Books, SM-HRMS, SM-ERP & Custom Software',
  description:
    'Explore SystemMaster pricing for SM-Books Accounting Software, SM-HRMS + Task Management, SM-ERP + CRM and custom software development.'
};

export default function Page() {
  return <ProfessionalPricingPage />;
}
