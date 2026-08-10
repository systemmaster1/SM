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

type IndiaPresenceItem = (typeof indiaPresence)[number];
type WorldwidePresenceItem = (typeof worldwidePresence)[number];
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
  const x = ((lon - 67) / (98 - 67)) * 720 + 40;
  const y = 510 - ((lat - 6) / (37 - 6)) * 475;
  return [x, y] as const;
}

function projectWorld([lon, lat]: Position) {
  const x = ((lon + 180) / 360) * 1000;
  const latRad = (lat * Math.PI) / 180;
  const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  const y = 275 - (mercN / Math.PI) * 220;
  return [x, y] as const;
}

function ringToPath(
  ring: number[][],
  projector: (p: Position) => readonly [number, number]
) {
  if (!ring?.length) return '';
  return (
    ring
      .map((point, index) => {
        const [x, y] = projector([point[0], point[1]]);
        return `${index === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ') + ' Z'
  );
}

function geometryToPath(
  geometry: Geometry,
  projector: (p: Position) => readonly [number, number]
) {
  if (geometry.type === 'Polygon') {
    return (geometry.coordinates as number[][][])
      .map((ring) => ringToPath(ring, projector))
      .join(' ');
  }

  return (geometry.coordinates as number[][][][])
    .flatMap((polygon) => polygon.map((ring) => ringToPath(ring, projector)))
    .join(' ');
}

function curvePath(
  from: readonly [number, number],
  to: readonly [number, number],
  lift = 58
) {
  const midX = (from[0] + to[0]) / 2;
  const direction = to[0] < from[0] ? -1 : 1;
  const midY =
    Math.min(from[1], to[1]) -
    lift -
    Math.abs(to[0] - from[0]) * 0.035;
  return `M ${from[0]} ${from[1]} Q ${midX + direction * 12} ${midY} ${to[0]} ${to[1]}`;
}

export function GlobalPresence() {
  const t = useTranslations('presence');
  const [indiaGeo, setIndiaGeo] = useState<FeatureCollection | null>(null);
  const [worldGeo, setWorldGeo] = useState<FeatureCollection | null>(null);
  const [activeState, setActiveState] =
    useState<IndiaPresenceItem>(indiaPresence[0]);
  const [activeCountry, setActiveCountry] =
    useState<WorldwidePresenceItem>(worldwidePresence[1]);

  useEffect(() => {
    let mounted = true;

    Promise.allSettled([
      fetch(INDIA_GEOJSON).then((response) => {
        if (!response.ok) throw new Error('India map failed');
        return response.json();
      }),
      fetch(WORLD_GEOJSON).then((response) => {
        if (!response.ok) throw new Error('World map failed');
        return response.json();
      })
    ]).then(([indiaResult, worldResult]) => {
      if (!mounted) return;
      if (indiaResult.status === 'fulfilled') setIndiaGeo(indiaResult.value);
      if (worldResult.status === 'fulfilled') setWorldGeo(worldResult.value);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const indiaPaths = useMemo(
    () =>
      indiaGeo?.features.map((feature) =>
        geometryToPath(feature.geometry, projectIndia)
      ) ?? [],
    [indiaGeo]
  );

  const worldPaths = useMemo(
    () =>
      worldGeo?.features.map((feature) =>
        geometryToPath(feature.geometry, projectWorld)
      ) ?? [],
    [worldGeo]
  );

  const indiaHub = projectIndia([78.9629, 20.5937]);
  const indiaTarget = projectIndia(activeState.coordinates);
  const indiaRoute = curvePath(indiaHub, indiaTarget, 62);
  const worldHub = projectWorld([78.9629, 20.5937]);

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

        <div className="mt-10 grid gap-7">
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

                <div className="sm-location-grid mt-7">
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
                <div className="sm-map-caption">
                  <span className="sm-live-dot" />
                  <span>{t('india.hub')}</span>
                </div>

                <svg
                  viewBox="0 0 800 540"
                  role="img"
                  aria-label="Interactive SystemMaster India project presence map"
                  className="sm-map-svg"
                >
                  <defs>
                    <linearGradient id="indiaFill17D" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="currentColor" stopOpacity=".07" />
                      <stop offset="100%" stopColor="currentColor" stopOpacity=".18" />
                    </linearGradient>
                  </defs>

                  <g className="sm-map-land">
                    {indiaPaths.map((d, index) => (
                      <motion.path
                        key={index}
                        d={d}
                        fill="url(#indiaFill17D)"
                        stroke="currentColor"
                        strokeWidth=".82"
                        initial={{opacity: 0}}
                        whileInView={{opacity: 1}}
                        viewport={{once: true}}
                        transition={{delay: Math.min(index * .006, .2)}}
                      />
                    ))}
                  </g>

                  <motion.path
                    key={activeState.key}
                    d={indiaRoute}
                    className="sm-route-line"
                    fill="none"
                    initial={{pathLength: 0, opacity: 0}}
                    animate={{pathLength: 1, opacity: 1}}
                    transition={{duration: .85, ease: 'easeInOut'}}
                  />

                  <circle className="sm-route-particle sm-route-particle--india" r="4.6">
                    <animateMotion
                      key={activeState.key}
                      dur="2.25s"
                      repeatCount="indefinite"
                      path={indiaRoute}
                    />
                  </circle>

                  <motion.circle
                    key={`target-${activeState.key}`}
                    cx={indiaTarget[0]}
                    cy={indiaTarget[1]}
                    r="7"
                    className="sm-map-target"
                    animate={{r: [6, 10, 6], opacity: [1, .55, 1]}}
                    transition={{duration: 1.9, repeat: Infinity}}
                  />

                  {indiaPresence.map((state) => {
                    const [x, y] = projectIndia(state.coordinates);
                    const active = activeState.key === state.key;
                    const labelWidth = Math.max(62, state.name.length * 6.4);

                    return (
                      <g
                        key={state.key}
                        className={`sm-map-marker ${active ? 'is-active' : ''}`}
                        onClick={() => setActiveState(state)}
                      >
                        <circle cx={x} cy={y} r={active ? 7 : 5} />
                        <g transform={`translate(${x + 10} ${y - 21})`}>
                          <rect
                            className="sm-map-label-bg"
                            x="0"
                            y="0"
                            rx="8"
                            width={labelWidth}
                            height="20"
                          />
                          <text x="7" y="13.5">{state.name}</text>
                        </g>
                      </g>
                    );
                  })}

                  <g
                    className="sm-logo-hub"
                    transform={`translate(${indiaHub[0] - 38} ${indiaHub[1] - 38})`}
                  >
                    <motion.circle
                      cx="38"
                      cy="38"
                      r="36"
                      className="sm-logo-hub-ring"
                      animate={{scale: [1, 1.08, 1]}}
                      transition={{duration: 2.35, repeat: Infinity}}
                    />
                    <image
                      href="/logo/systemmaster.png"
                      width="76"
                      height="76"
                      preserveAspectRatio="xMidYMid meet"
                    />
                  </g>
                </svg>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeState.key}
                    className="sm-map-live-card"
                    initial={{opacity: 0, y: 8}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -6}}
                  >
                    <span className="sm-live-dot" />
                    <div>
                      <strong>{activeState.name}</strong>
                      <small>{t('india.connected')}</small>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </article>
          </Reveal>

          <Reveal delay={.06}>
            <article className="sm-presence-card sm-presence-card--world">
              <div className="sm-world-info-panel">
                <div>
                  <div className="eyebrow sm-world-eyebrow">
                    <Globe2 size={15} />
                    {t('world.eyebrow')}
                  </div>
                  <h3 className="display mt-4 sm-world-title">
                    {t('world.title')}
                  </h3>
                  <p className="sm-world-description mt-4">
                    {t('world.desc')}
                  </p>
                </div>

                <div className="sm-world-country-list">
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
                        <span className="sm-country-arrow">→</span>
                      </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCountry.key}
                    className="sm-world-active-card"
                    initial={{opacity: 0, y: 6}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -6}}
                  >
                    <span className="sm-live-dot" />
                    <div>
                      <small>{t('world.routeActive')}</small>
                      <strong>{activeCountry.name}</strong>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="sm-world-code-map">
                <svg
                  viewBox="0 0 1000 540"
                  role="img"
                  aria-label="Interactive SystemMaster worldwide project presence map"
                  className="sm-map-svg sm-map-svg--world"
                >
                  <defs>
                    <radialGradient id="worldBg17D" cx="67%" cy="51%" r="72%">
                      <stop offset="0%" stopColor="#0d417f" stopOpacity=".82" />
                      <stop offset="100%" stopColor="#03142d" stopOpacity="1" />
                    </radialGradient>
                  </defs>

                  <rect width="1000" height="540" rx="28" fill="url(#worldBg17D)" />

                  <g className="sm-world-grid">
                    {[80,160,240,320,400,480].map((y) => (
                      <line key={`h-${y}`} x1="0" y1={y} x2="1000" y2={y} />
                    ))}
                    {[100,200,300,400,500,600,700,800,900].map((x) => (
                      <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="540" />
                    ))}
                  </g>

                  <g className="sm-world-land">
                    {worldPaths.map((d, index) => (
                      <motion.path
                        key={index}
                        d={d}
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth=".42"
                        initial={{opacity: 0}}
                        whileInView={{opacity: .27}}
                        viewport={{once: true}}
                        transition={{delay: Math.min(index * .002, .18)}}
                      />
                    ))}
                  </g>

                  {worldwidePresence
                    .filter((country) => country.key !== 'india')
                    .map((country, index) => {
                      const target = projectWorld(country.coordinates);
                      const route = curvePath(worldHub, target, 72 + index * 8);
                      const active = activeCountry.key === country.key;

                      return (
                        <g key={country.key}>
                          <motion.path
                            d={route}
                            className={`sm-world-route ${active ? 'is-active' : ''}`}
                            fill="none"
                            initial={{pathLength: 0, opacity: 0}}
                            whileInView={{pathLength: 1, opacity: 1}}
                            viewport={{once: true}}
                            transition={{duration: 1, delay: index * .1}}
                          />
                          <circle
                            r={active ? 4.5 : 3.2}
                            className={`sm-route-particle ${
                              active ? 'is-active' : ''
                            }`}
                          >
                            <animateMotion
                              dur={active ? '2.6s' : '4.2s'}
                              begin={`${index * 0.55}s`}
                              repeatCount="indefinite"
                              path={route}
                            />
                          </circle>
                        </g>
                      );
                    })}

                  {worldwidePresence.map((country) => {
                    const [x, y] = projectWorld(country.coordinates);
                    const active = activeCountry.key === country.key;
                    const isIndia = country.key === 'india';
                    const labelWidth = Math.max(52, country.name.length * 7.2);

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
                          <g transform={`translate(${x + 10} ${y - 22})`}>
                            <rect
                              className="sm-world-label-bg"
                              x="0"
                              y="0"
                              rx="8"
                              width={labelWidth}
                              height="22"
                            />
                            <text x="7" y="14.5">{country.name}</text>
                          </g>
                        )}
                      </g>
                    );
                  })}

                  <g
                    className="sm-logo-hub sm-logo-hub--world"
                    transform={`translate(${worldHub[0] - 41} ${worldHub[1] - 41})`}
                  >
                    <motion.circle
                      cx="41"
                      cy="41"
                      r="40"
                      className="sm-logo-hub-ring"
                      animate={{scale: [1, 1.12, 1], opacity: [1, .76, 1]}}
                      transition={{duration: 2.1, repeat: Infinity}}
                    />
                    <image
                      href="/logo/systemmaster.png"
                      width="82"
                      height="82"
                      preserveAspectRatio="xMidYMid meet"
                    />
                  </g>
                </svg>

                <div className="sm-world-map-caption">
                  <span className="sm-live-dot" />
                  <span>SystemMaster India Hub</span>
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
            <p className="muted text-sm leading-6">{t('note')}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
