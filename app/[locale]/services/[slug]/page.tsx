import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {ServiceDetailPage} from '@/components/pages/service-detail-page';
import {serviceDetails, serviceSlugs, type Locale} from '@/data/catalog';

export function generateStaticParams(){
  return serviceSlugs.flatMap(slug=>['en','hi'].map(locale=>({locale,slug})));
}

export async function generateMetadata({params}:{params:Promise<{locale:string;slug:string}>}):Promise<Metadata>{
  const {locale,slug}=await params;
  const service=serviceDetails.find(x=>x.slug===slug);
  if(!service) return {};
  const l:Locale=locale==='hi'?'hi':'en';
  return {
    title:`${service.name} | SystemMaster Automations`,
    description:service.description[l],
    alternates:{canonical:`https://systemmaster.in/${l}/services/${service.slug}`},
    openGraph:{title:service.name,description:service.description[l],url:`https://systemmaster.in/${l}/services/${service.slug}`,type:'website'}
  };
}

export default async function Page({params}:{params:Promise<{locale:string;slug:string}>}){
  const {locale,slug}=await params;
  const service=serviceDetails.find(x=>x.slug===slug);
  if(!service) notFound();
  return <ServiceDetailPage service={service} locale={locale==='hi'?'hi':'en'}/>;
}
