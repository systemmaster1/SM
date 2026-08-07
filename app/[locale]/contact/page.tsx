import type {Metadata} from 'next';
import {ContactConversionPage} from '@/components/pages/contact-conversion-page';

export const metadata: Metadata = {
  title: 'Contact SystemMaster | Product Demo & Custom Software Consultation',
  description:
    'Contact SystemMaster for SM-Books, SM-HRMS, SM-ERP, CRM, custom software, mobile apps, website development, AI automation and WhatsApp automation.'
};

export default function Page() {
  return <ContactConversionPage />;
}
