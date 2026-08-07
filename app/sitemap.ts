import type {MetadataRoute} from 'next';
import {productSlugs,serviceSlugs} from '@/data/catalog';

export default function sitemap():MetadataRoute.Sitemap{
  const base='https://systemmaster.in';
  const locales=['en','hi'];
  const core=['','products','services','industries','portfolio','pricing','about','contact','privacy','terms'];
  const entries:MetadataRoute.Sitemap=[];

  for(const locale of locales){
    for(const path of core){
      entries.push({
        url:`${base}/${locale}${path?`/${path}`:''}`,
        lastModified:new Date(),
        changeFrequency:path?'monthly':'weekly',
        priority:path?0.8:1
      });
    }
    for(const slug of productSlugs){
      entries.push({url:`${base}/${locale}/products/${slug}`,lastModified:new Date(),changeFrequency:'monthly',priority:0.9});
    }
    for(const slug of serviceSlugs){
      entries.push({url:`${base}/${locale}/services/${slug}`,lastModified:new Date(),changeFrequency:'monthly',priority:0.85});
    }
  }
  return entries;
}
