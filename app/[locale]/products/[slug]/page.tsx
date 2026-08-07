import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {ProductDetailPage} from '@/components/pages/product-detail-page';
import {productDetails, productSlugs, type Locale} from '@/data/catalog';

export function generateStaticParams(){
  return productSlugs.flatMap(slug=>['en','hi'].map(locale=>({locale,slug})));
}

export async function generateMetadata({params}:{params:Promise<{locale:string;slug:string}>}):Promise<Metadata>{
  const {locale,slug}=await params;
  const product=productDetails.find(x=>x.slug===slug);
  if(!product) return {};
  const l:Locale=locale==='hi'?'hi':'en';
  return {
    title:`${product.name} | SystemMaster Automations`,
    description:product.description[l],
    alternates:{canonical:`https://systemmaster.in/${l}/products/${product.slug}`},
    openGraph:{title:product.name,description:product.description[l],url:`https://systemmaster.in/${l}/products/${product.slug}`,type:'website'}
  };
}

export default async function Page({params}:{params:Promise<{locale:string;slug:string}>}){
  const {locale,slug}=await params;
  const product=productDetails.find(x=>x.slug===slug);
  if(!product) notFound();
  return <ProductDetailPage product={product} locale={locale==='hi'?'hi':'en'}/>;
}
