import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {PortfolioDetailPage} from '@/components/pages/portfolio-detail-page';
import {portfolioProjects,portfolioSlugs} from '@/data/portfolio';
import type {Locale} from '@/data/site';

export function generateStaticParams(){return ['en','hi'].flatMap(locale=>portfolioSlugs.map(slug=>({locale,slug})));}

export async function generateMetadata({params}:{params:Promise<{locale:string;slug:string}>}):Promise<Metadata>{
 const {locale,slug}=await params;const project=portfolioProjects.find(x=>x.slug===slug);if(!project)return{};const l:Locale=locale==='hi'?'hi':'en';
 return {title:`${project.name[l]} | SystemMaster Portfolio`,description:project.description[l],alternates:{canonical:`https://systemmaster.in/${l}/portfolio/${slug}`,languages:{en:`https://systemmaster.in/en/portfolio/${slug}`,hi:`https://systemmaster.in/hi/portfolio/${slug}`}},openGraph:{title:`${project.name[l]} | SystemMaster`,description:project.description[l],url:`https://systemmaster.in/${l}/portfolio/${slug}`,type:'website'}};
}

export default async function Page({params}:{params:Promise<{locale:string;slug:string}>}){const {locale,slug}=await params;const project=portfolioProjects.find(x=>x.slug===slug);if(!project||!['en','hi'].includes(locale))notFound();return <PortfolioDetailPage project={project} locale={locale as Locale}/>;}
