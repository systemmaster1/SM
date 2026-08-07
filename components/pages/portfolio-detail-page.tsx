'use client';
import Link from 'next/link';
import {motion} from 'framer-motion';
import {ArrowRight,CheckCircle2,ExternalLink,Layers3,MonitorPlay,Sparkles,Target,Users2} from 'lucide-react';
import type {PortfolioProject} from '@/data/portfolio';
import type {Locale} from '@/data/site';
import {Reveal} from '@/components/reveal';

export function PortfolioDetailPage({project,locale}:{project:PortfolioProject;locale:Locale}){
 const hi=locale==='hi';
 const t={
  eyebrow:hi?'लाइव सिस्टम डेमो':'Live System Demo',
  open:hi?'लाइव डेमो खोलें':'Open Live Demo',
  consult:hi?'इसी तरह का सिस्टम बनवाएं':'Build a Similar System',
  modules:hi?'डेमो में क्या शामिल है':'What This Demo Includes',
  highlights:hi?'मुख्य विशेषताएँ':'Key Highlights',
  ideal:hi?'किसके लिए उपयोगी':'Ideal For',
  tech:hi?'टेक्नोलॉजी / सिस्टम फोकस':'Technology / System Focus',
  note:hi?'यह एक प्रदर्शन डेमो है। आपके वास्तविक workflow, users, permissions, reports और integrations के अनुसार solution customize किया जा सकता है।':'This is a demonstration environment. Your production solution can be customized around your workflow, users, permissions, reports and integrations.'
 };
 return <main>
  <section className="relative overflow-hidden py-20 md:py-28"><div className="container grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]"><div><motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="eyebrow"><Sparkles size={15}/>{t.eyebrow}</motion.div><motion.h1 initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:.06}} className="display mt-5 text-5xl font-black md:text-7xl">{project.name[locale]}</motion.h1><motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:.12}} className="mt-6 max-w-3xl text-xl font-bold leading-8">{project.shortDescription[locale]}</motion.p><motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:.18}} className="muted mt-4 max-w-3xl text-lg leading-8">{project.description[locale]}</motion.p><div className="mt-8 flex flex-wrap gap-3"><a href={project.demoUrl} target="_blank" rel="noreferrer" className="btn btn-gold">{t.open}<ExternalLink size={18}/></a><Link href={`/${locale}/contact`} className="btn btn-ghost">{t.consult}<ArrowRight size={18}/></Link></div></div><motion.div initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} className="card relative flex min-h-[390px] items-center justify-center overflow-hidden bg-gradient-to-br from-blue-500/20 to-amber-400/10"><div className="absolute inset-0 opacity-30 [background-image:linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [background-size:38px_38px]"/><MonitorPlay size={120} className="relative text-[var(--primary)]"/></motion.div></div></section>
  <section className="section pt-4"><div className="container grid gap-8 lg:grid-cols-2"><Reveal><div className="card h-full p-8"><Layers3 className="text-[var(--primary)]"/><h2 className="display mt-4 text-3xl font-black">{t.modules}</h2><div className="mt-6 grid gap-4">{project.modules.map(x=><div key={x.en} className="flex items-start gap-3 rounded-2xl border border-[var(--line)] p-4 font-bold"><CheckCircle2 size={18} className="mt-1 shrink-0 text-emerald-500"/>{x[locale]}</div>)}</div></div></Reveal><Reveal delay={.08}><div className="card h-full p-8"><Target className="text-[var(--gold)]"/><h2 className="display mt-4 text-3xl font-black">{t.highlights}</h2><div className="mt-6 grid gap-4">{project.highlights.map(x=><div key={x.en} className="rounded-2xl border border-[var(--line)] p-4 font-bold">{x[locale]}</div>)}</div></div></Reveal></div></section>
  <section className="section"><div className="container grid gap-8 lg:grid-cols-[.9fr_1.1fr]"><Reveal><div className="card h-full p-8"><Users2 className="text-[var(--gold)]"/><h2 className="display mt-4 text-3xl font-black">{t.ideal}</h2><div className="mt-6 flex flex-wrap gap-3">{project.idealFor.map(x=><span key={x.en} className="rounded-full border border-[var(--line)] px-4 py-2 font-bold">{x[locale]}</span>)}</div></div></Reveal><Reveal delay={.08}><div className="card h-full p-8"><h2 className="display text-3xl font-black">{t.tech}</h2><div className="mt-6 flex flex-wrap gap-3">{project.technologies.map(x=><span key={x} className="rounded-full bg-blue-500/15 px-4 py-2 text-sm font-extrabold text-[var(--primary)]">{x}</span>)}</div><p className="muted mt-7 leading-7">{t.note}</p><Link href={`/${locale}/contact`} className="btn btn-primary mt-7">{t.consult}<ArrowRight size={18}/></Link></div></Reveal></div></section>
 </main>;
}
