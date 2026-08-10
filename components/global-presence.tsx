'use client';

import Image from 'next/image';
import {motion} from 'framer-motion';
import {useTranslations} from 'next-intl';
import {
  Building2,
  Globe2,
  MapPin,
  Network,
  Radio,
  Sparkles
} from 'lucide-react';
import {
  indiaPresence,
  presenceStats,
  worldwidePresence
} from '@/data/presence';
import {Reveal} from '@/components/reveal';

const indiaMarkers = [
  {left: '55%', top: '31%', delay: 0},
  {left: '59%', top: '35%', delay: .25},
  {left: '52%', top: '48%', delay: .5},
  {left: '31%', top: '51%', delay: .75},
  {left: '42%', top: '66%', delay: 1},
  {left: '37%', top: '42%', delay: 1.25},
  {left: '45%', top: '79%', delay: 1.5}
];

const worldParticles = [
  {x1: '61%', y1: '53%', x2: '19%', y2: '47%', delay: 0},
  {x1: '61%', y1: '53%', x2: '48%', y2: '37%', delay: .7},
  {x1: '61%', y1: '53%', x2: '82%', y2: '28%', delay: 1.4},
  {x1: '61%', y1: '53%', x2: '85%', y2: '56%', delay: 2.1},
  {x1: '61%', y1: '53%', x2: '80%', y2: '76%', delay: 2.8}
];

export function GlobalPresence() {
  const t = useTranslations('presence');

  return (
    <section className="section sm-presence-section">
      <div className="container">
        <Reveal>
          <div className="sm-section-heading center">
            <div className="eyebrow">
              <Network size={15} />
              {t('eyebrow')}
            </div>
            <h2 className="display mt-4 sm-section-title mx-auto">
              {t('title')}
            </h2>
            <p className="muted mx-auto mt-5 max-w-3xl text-lg leading-8">
              {t('desc')}
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6">
          {/* INDIA */}
          <Reveal>
            <article className="sm-presence-card sm-presence-card--india">
              <div className="sm-presence-copy">
                <div className="eyebrow">
                  <MapPin size={15} />
                  {t('india.eyebrow')}
                </div>
                <h3 className="display mt-4 sm-presence-title">
                  {t('india.title')}
                </h3>
                <p className="muted mt-4 max-w-xl leading-7">
                  {t('india.desc')}
                </p>

                <div className="mt-7 grid grid-cols-2 gap-3">
                  <div className="sm-presence-metric">
                    <Building2 size={20} />
                    <div>
                      <strong>7</strong>
                      <span>{t('stats.states')}</span>
                    </div>
                  </div>
                  <div className="sm-presence-metric">
                    <Radio size={20} />
                    <div>
                      <strong>Active</strong>
                      <span>{t('stats.presence')}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-7 grid gap-2 sm:grid-cols-2">
                  {indiaPresence.map((state, index) => (
                    <motion.div
                      key={state.key}
                      initial={{opacity: 0, x: -10}}
                      whileInView={{opacity: 1, x: 0}}
                      viewport={{once: true}}
                      transition={{delay: index * .04}}
                      className="sm-location-row"
                    >
                      <span className="sm-location-dot" />
                      <span>{state.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="sm-map-visual sm-map-visual--india">
                <Image
                  src="/images/presence/india-presence-map.jpg"
                  alt="SystemMaster presence across selected Indian states"
                  fill
                  sizes="(max-width: 1024px) 100vw, 52vw"
                  className="object-cover"
                />
                <div className="sm-map-overlay" />
                {indiaMarkers.map((marker, index) => (
                  <motion.span
                    key={index}
                    className="sm-map-pulse"
                    style={{left: marker.left, top: marker.top}}
                    animate={{
                      scale: [1, 1.45, 1],
                      opacity: [.55, 1, .55]
                    }}
                    transition={{
                      duration: 2.3,
                      delay: marker.delay,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                ))}
                <div className="sm-map-hub">
                  <span>SM</span>
                  <small>{t('india.hub')}</small>
                </div>
              </div>
            </article>
          </Reveal>

          {/* WORLD */}
          <Reveal delay={.07}>
            <article className="sm-presence-card sm-presence-card--world">
              <div className="sm-world-map-wrap">
                <Image
                  src="/images/presence/world-presence-map.jpg"
                  alt="SystemMaster worldwide project presence from India"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="sm-world-map-overlay" />

                {worldParticles.map((particle, index) => (
                  <motion.span
                    key={index}
                    className="sm-world-particle"
                    style={{
                      left: particle.x1,
                      top: particle.y1
                    }}
                    animate={{
                      left: [particle.x1, particle.x2],
                      top: [particle.y1, particle.y2],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 4.8,
                      delay: particle.delay,
                      repeat: Infinity,
                      repeatDelay: 1.2,
                      ease: 'easeInOut'
                    }}
                  />
                ))}

                <div className="sm-world-copy">
                  <div className="eyebrow sm-world-eyebrow">
                    <Globe2 size={15} />
                    {t('world.eyebrow')}
                  </div>
                  <h3 className="display mt-4 sm-world-title">
                    {t('world.title')}
                  </h3>
                  <p className="mt-4 max-w-lg text-sm leading-7 text-white/72">
                    {t('world.desc')}
                  </p>
                </div>

                <div className="sm-world-country-strip">
                  {worldwidePresence.map((country, index) => (
                    <motion.div
                      key={country.key}
                      initial={{opacity: 0, y: 8}}
                      whileInView={{opacity: 1, y: 0}}
                      viewport={{once: true}}
                      transition={{delay: index * .05}}
                      className="sm-world-country"
                    >
                      <span className="sm-country-code">{country.code}</span>
                      <span>{country.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        </div>

        <Reveal>
          <div className="sm-presence-stats mt-6">
            {presenceStats.map((stat, index) => (
              <motion.div
                key={stat.key}
                initial={{opacity: 0, y: 10}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{delay: index * .04}}
                className="sm-presence-stat"
              >
                <strong>{stat.value}</strong>
                <span>{t(`stats.${stat.key}`)}</span>
              </motion.div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4">
            <Sparkles className="mt-0.5 shrink-0 text-[var(--gold)]" size={18} />
            <p className="muted text-sm leading-6">
              {t('note')}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
