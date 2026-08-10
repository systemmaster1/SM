'use client';

import {useEffect, useMemo, useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
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

type Position = readonly [number, number];

type Geometry = {
  type: 'Polygon' | 'MultiPolygon';
  coordinates: number[][][] | number[][][][];
};

type Feature = {
  type: 'Feature';
  properties?: Record<string, unknown>;
  geometry: Geometry;
};

type FeatureCollection = {
  type: 'FeatureCollection';
  features: Feature[];
};

const INDIA_GEOJSON =
  'https://cdn.jsdelivr.net/gh/udit-001/india-maps-data@2884453/geojson/india.geojson';

const WORLD_GEOJSON =
  'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson';

function projectIndia([lon, lat]: Position) {
  const minLon = 67;
  const maxLon = 98;
  const minLat = 6;
  const maxLat = 37;
  const x = ((lon - minLon) / (maxLon - minLon)) * 760 + 20;
  const y = 520 - ((lat - minLat) / (maxLat - minLat)) * 500;
  return [x, y] as const;
}

function projectWorld([lon, lat]: Position) {
  const x = ((lon + 180) / 360) * 1000;
  const latRad = (lat * Math.PI) / 180;
  const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  const y = 270 - (mercN / Math.PI) * 220;
  return [x, y] as const;
}

function ringToPath(ring: number[][], projector: (p: Position) => readonly [number, number]) {
  if (!ring?.length) return '';
  return ring
    .map((point, index) => {
      const [x, y] = projector([point[0], point[1]]);
      return `${index === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ') + ' Z';
}

function geometryToPath(
  geometry: Geometry,
  projector: (p: Position) => readonly [number, number]
) {
  if (!geometry) return '';

  if (geometry.type === 'Polygon') {
    return (geometry.coordinates as number[][][])
      .map((ring) => ringToPath(ring, projector))
      .join(' ');
  }

  if (geometry.type === 'MultiPolygon') {
    return (geometry.coordinates as number[][][][])
      .flatMap((polygon) => polygon.map((ring) => ringToPath(ring, projector)))
      .join(' ');
  }

  return '';
}

function curvePath(
  from: readonly [number, number],
  to: readonly [number, number],
  lift = 55
) {
  const midX = (from[0] + to[0]) / 2;
  const midY = Math.min(from[1], to[1]) - lift;
  return `M ${from[0]} ${from[1]} Q ${midX} ${midY} ${to[0]} ${to[1]}`;
}

export function GlobalPresence() {
  const t = useTranslations('presence');
  const [indiaGeo, setIndiaGeo] = useState<FeatureCollection | null>(null);
  const [worldGeo, setWorldGeo] = useState<FeatureCollection | null>(null);
  const [activeState, setActiveState] = useState(indiaPresence[0]);
  const [activeCountry, setActiveCountry] = useState(worldwidePresence[1]);

  useEffect(() => {
    let mounted = true;

    Promise.allSettled([
      fetch(INDIA_GEOJSON).then((r) => {
        if (!r.ok) throw new Error('India map failed');
        return r.json();
      }),
      fetch(WORLD_GEOJSON).then((r) => {
        if (!r.ok) throw new Error('World map failed');
        return r.json();
      })
    ]).then(([india, world]) => {
      if (!mounted) return;
      if (india.status === 'fulfilled') setIndiaGeo(india.value);
      if (world.status === 'fulfilled') setWorldGeo(world.value);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const indiaPaths = useMemo(
    () => indiaGeo?.features.map((f) => geometryToPath(f.geometry, projectIndia)) ?? [],
    [indiaGeo]
  );

  const worldPaths = useMemo(
    () => worldGeo?.features.map((f) => geometryToPath(f.geometry, projectWorld)) ?? [],
    [worldGeo]
  );

  const indiaHub = projectIndia([78.9629, 20.5937]);
  const indiaTarget = projectIndia(activeState.coordinates);

  const worldHub = projectWorld([78.9629, 20.5937]);
  const worldTarget = projectWorld(activeCountry.coordinates);

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
          {/* INDIA - FULL CODE SVG */}
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
                      <strong>{t('stats.active')}</strong>
                      <span>{t('stats.presence')}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-7 grid gap-2 sm:grid-cols-2">
                  {indiaPresence.map((state) => (
                    <button
                      key={state.key}
                      type="button"
                      onClick={() => setActiveState(state)}
                      onMouseEnter={() => setActiveState(state)}
                      className={`sm-location-row ${
                        activeState.key === state.key ? 'is-active' : ''
                      }`}
                    >
                      <span className="sm-location-dot" />
                      <span>{state.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="sm-code-map sm-code-map--india">
                <svg
                  viewBox="0 0 800 540"
                  role="img"
                  aria-label="Animated SystemMaster India project presence map"
                  className="sm-map-svg"
                >
                  <defs>
                    <linearGradient id="indiaFill" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="currentColor" stopOpacity=".08" />
                      <stop offset="100%" stopColor="currentColor" stopOpacity=".18" />
                    </linearGradient>
                    <filter id="indiaGlow" x="-60%" y="-60%" width="220%" height="220%">
                      <feGaussianBlur stdDeviation="5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <g className="sm-map-land">
                    {indiaPaths.length ? (
                      indiaPaths.map((d, index) => (
                        <motion.path
                          key={index}
                          d={d}
                          fill="url(#indiaFill)"
                          stroke="currentColor"
                          strokeWidth=".9"
                          initial={{opacity: 0}}
                          whileInView={{opacity: 1}}
                          viewport={{once: true}}
                          transition={{delay: Math.min(index * .008, .28)}}
                        />
                      ))
                    ) : (
                      <text x="400" y="270" textAnchor="middle" className="sm-map-loading">
                        {t('loading')}
                      </text>
                    )}
                  </g>

                  <motion.path
                    key={activeState.key}
                    d={curvePath(indiaHub, indiaTarget, 70)}
                    className="sm-route-line"
                    fill="none"
                    pathLength={1}
                    initial={{pathLength: 0, opacity: 0}}
                    animate={{pathLength: 1, opacity: 1}}
                    transition={{duration: .9, ease: 'easeInOut'}}
                  />

                  <motion.circle
                    key={`pulse-${activeState.key}`}
                    cx={indiaTarget[0]}
                    cy={indiaTarget[1]}
                    r="7"
                    className="sm-map-target"
                    filter="url(#indiaGlow)"
                    initial={{scale: .4, opacity: 0}}
                    animate={{scale: [1, 1.7, 1], opacity: [1, .55, 1]}}
                    transition={{duration: 2, repeat: Infinity}}
                  />

                  {indiaPresence.map((state) => {
                    const [x, y] = projectIndia(state.coordinates);
                    const active = activeState.key === state.key;
                    return (
                      <g
                        key={state.key}
                        className={`sm-map-marker ${active ? 'is-active' : ''}`}
                        onClick={() => setActiveState(state)}
                      >
                        <circle cx={x} cy={y} r={active ? 7 : 5} />
                        <text x={x + 9} y={y - 8}>{state.name}</text>
                      </g>
                    );
                  })}

                  <g className="sm-logo-hub" transform={`translate(${indiaHub[0] - 33} ${indiaHub[1] - 33})`}>
                    <motion.circle
                      cx="33"
                      cy="33"
                      r="31"
                      className="sm-logo-hub-ring"
                      animate={{scale: [1, 1.08, 1]}}
                      transition={{duration: 2.4, repeat: Infinity}}
                    />
                    <image
                      href="/logo/systemmaster.png"
                      width="66"
                      height="66"
                      preserveAspectRatio="xMidYMid meet"
                    />
                  </g>
                </svg>

                <div className="sm-map-live-card">
                  <span className="sm-live-dot" />
                  <div>
                    <strong>{activeState.name}</strong>
                    <small>{t('india.connected')}</small>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>

          {/* WORLD - FULL CODE SVG */}
          <Reveal delay={.07}>
            <article className="sm-presence-card sm-presence-card--world">
              <div className="sm-world-code-map">
                <svg
                  viewBox="0 0 1000 540"
                  role="img"
                  aria-label="Animated SystemMaster worldwide project presence map"
                  className="sm-map-svg sm-map-svg--world"
                >
                  <defs>
                    <radialGradient id="worldBg" cx="63%" cy="52%" r="70%">
                      <stop offset="0%" stopColor="#0c3a73" stopOpacity=".7" />
                      <stop offset="100%" stopColor="#03142d" stopOpacity="1" />
                    </radialGradient>
                    <filter id="worldGlow" x="-100%" y="-100%" width="300%" height="300%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <rect width="1000" height="540" rx="28" fill="url(#worldBg)" />

                  <g className="sm-world-grid">
                    {[80,160,240,320,400,480].map((y) => (
                      <line key={`h-${y}`} x1="0" y1={y} x2="1000" y2={y} />
                    ))}
                    {[100,200,300,400,500,600,700,800,900].map((x) => (
                      <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="540" />
                    ))}
                  </g>

                  <g className="sm-world-land">
                    {worldPaths.length ? (
                      worldPaths.map((d, index) => (
                        <motion.path
                          key={index}
                          d={d}
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth=".45"
                          initial={{opacity: 0}}
                          whileInView={{opacity: .28}}
                          viewport={{once: true}}
                          transition={{delay: Math.min(index * .002, .25)}}
                        />
                      ))
                    ) : (
                      <text x="500" y="270" textAnchor="middle" className="sm-map-loading sm-map-loading--world">
                        {t('loading')}
                      </text>
                    )}
                  </g>

                  {worldwidePresence
                    .filter((country) => country.key !== 'india')
                    .map((country, index) => {
                      const target = projectWorld(country.coordinates);
                      const isActive = activeCountry.key === country.key;

                      return (
                        <g key={country.key}>
                          <motion.path
                            d={curvePath(worldHub, target, 88 + index * 4)}
                            className={`sm-world-route ${isActive ? 'is-active' : ''}`}
                            fill="none"
                            pathLength={1}
                            initial={{pathLength: 0}}
                            whileInView={{pathLength: 1}}
                            viewport={{once: true}}
                            transition={{duration: 1.1, delay: index * .16}}
                          />

                          <motion.circle
                            r="4"
                            className="sm-route-particle"
                            initial={{opacity: 0}}
                            animate={
                              isActive
                                ? {
                                    offsetDistance: ['0%', '100%'],
                                    opacity: [0, 1, 1, 0]
                                  }
                                : {opacity: .3}
                            }
                            style={{
                              offsetPath: `path("${curvePath(worldHub, target, 88 + index * 4)}")`
                            }}
                            transition={{
                              duration: 2.7,
                              repeat: Infinity,
                              ease: 'linear'
                            }}
                          />
                        </g>
                      );
                    })}

                  {worldwidePresence.map((country) => {
                    const [x, y] = projectWorld(country.coordinates);
                    const active = activeCountry.key === country.key;
                    const isIndia = country.key === 'india';

                    return (
                      <g
                        key={country.key}
                        className={`sm-world-marker ${active ? 'is-active' : ''} ${
                          isIndia ? 'is-hub' : ''
                        }`}
                        onClick={() => !isIndia && setActiveCountry(country)}
                      >
                        <circle cx={x} cy={y} r={isIndia ? 9 : active ? 7 : 5} />
                        {!isIndia && (
                          <text x={x + 10} y={y - 8}>{country.name}</text>
                        )}
                      </g>
                    );
                  })}

                  <g
                    className="sm-logo-hub sm-logo-hub--world"
                    transform={`translate(${worldHub[0] - 36} ${worldHub[1] - 36})`}
                  >
                    <motion.circle
                      cx="36"
                      cy="36"
                      r="35"
                      className="sm-logo-hub-ring"
                      animate={{scale: [1, 1.13, 1], opacity: [1, .72, 1]}}
                      transition={{duration: 2.2, repeat: Infinity}}
                    />
                    <image
                      href="/logo/systemmaster.png"
                      width="72"
                      height="72"
                      preserveAspectRatio="xMidYMid meet"
                    />
                  </g>
                </svg>

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
                  {worldwidePresence
                    .filter((country) => country.key !== 'india')
                    .map((country) => (
                      <button
                        key={country.key}
                        type="button"
                        onClick={() => setActiveCountry(country)}
                        onMouseEnter={() => setActiveCountry(country)}
                        className={`sm-world-country ${
                          activeCountry.key === country.key ? 'is-active' : ''
                        }`}
                      >
                        <span className="sm-country-code">{country.code}</span>
                        <span>{country.name}</span>
                      </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCountry.key}
                    className="sm-world-live-card"
                    initial={{opacity: 0, y: 8}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -8}}
                  >
                    <span className="sm-live-dot" />
                    <div>
                      <strong>{activeCountry.name}</strong>
                      <small>{t('world.routeActive')}</small>
                    </div>
                  </motion.div>
                </AnimatePresence>
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
            <p className="muted text-sm leading-6">{t('note')}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
