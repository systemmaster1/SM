
/* PHASE 17B — CODE-BASED ANIMATED INDIA + WORLD MAPS
   Append this block to your current app/globals.css.
   The map is SVG/GeoJSON code; no JPG/PNG map background is used. */

.sm-presence-card {
  display:grid;
  overflow:hidden;
  border:1px solid var(--line);
  border-radius:28px;
  background:var(--surface);
  box-shadow:var(--shadow-lg);
}

@media (min-width:1024px){
  .sm-presence-card--india{
    grid-template-columns:minmax(360px,.82fr) minmax(0,1.18fr);
  }
}

.sm-presence-copy{padding:clamp(26px,4vw,48px)}
.sm-presence-title{
  max-width:15ch;
  font-size:clamp(2rem,3.3vw,3.2rem);
  line-height:1.07;
  letter-spacing:-.04em;
  font-weight:900
}

.sm-presence-metric{
  display:flex;
  min-height:86px;
  align-items:center;
  gap:13px;
  border:1px solid var(--line);
  border-radius:18px;
  background:color-mix(in srgb,var(--surface-strong) 58%,transparent);
  padding:15px
}
.sm-presence-metric svg{color:var(--primary);flex:0 0 auto}
.sm-presence-metric strong,.sm-presence-metric span{display:block}
.sm-presence-metric strong{font-size:1.25rem;line-height:1;font-weight:900}
.sm-presence-metric span{margin-top:5px;color:var(--muted);font-size:.69rem;font-weight:750}

.sm-location-row{
  width:100%;
  display:flex;
  align-items:center;
  gap:9px;
  border:0;
  border-bottom:1px solid color-mix(in srgb,var(--line) 72%,transparent);
  background:transparent;
  padding:10px 4px;
  color:var(--text-soft);
  font-size:.82rem;
  font-weight:800;
  text-align:left;
  cursor:pointer;
  transition:color .18s ease,transform .18s ease
}
.sm-location-row:hover,.sm-location-row.is-active{color:var(--primary);transform:translateX(3px)}
.sm-location-dot{
  width:8px;height:8px;flex:0 0 auto;border-radius:50%;
  background:var(--primary);box-shadow:0 0 0 5px var(--primary-soft)
}

.sm-code-map{
  position:relative;
  min-height:480px;
  overflow:hidden;
  background:
    radial-gradient(circle at 55% 48%,rgba(61,126,240,.13),transparent 35%),
    linear-gradient(135deg,color-mix(in srgb,var(--surface) 95%,#eaf3ff),var(--surface))
}
.sm-map-svg{display:block;width:100%;height:100%;min-height:480px;color:#6fa4ef}
.sm-map-land path{transition:fill .2s ease,stroke .2s ease}
.sm-map-loading{fill:var(--muted);font-size:13px;font-weight:700}

.sm-route-line{
  stroke:var(--gold);stroke-width:3;stroke-linecap:round;
  stroke-dasharray:8 8;filter:drop-shadow(0 0 8px rgba(229,169,60,.5))
}
.sm-map-target{fill:var(--gold);transform-box:fill-box;transform-origin:center}

.sm-map-marker{cursor:pointer;color:var(--primary)}
.sm-map-marker circle{fill:var(--primary);stroke:#fff;stroke-width:2;transition:r .18s ease,fill .18s ease}
.sm-map-marker text{fill:var(--text-soft);font-size:10px;font-weight:800;pointer-events:none}
.sm-map-marker.is-active circle{fill:var(--gold)}
.sm-map-marker.is-active text{fill:var(--text);font-weight:900}

.sm-logo-hub{cursor:default}
.sm-logo-hub-ring{
  fill:rgba(255,255,255,.94);
  stroke:rgba(229,169,60,.55);
  stroke-width:2;
  transform-box:fill-box;
  transform-origin:center;
  filter:drop-shadow(0 10px 22px rgba(20,48,86,.18))
}

.sm-map-live-card,.sm-world-live-card{
  position:absolute;z-index:8;
  display:flex;align-items:center;gap:10px;
  border:1px solid var(--line);
  border-radius:14px;
  background:color-mix(in srgb,var(--surface) 90%,transparent);
  padding:10px 13px;
  box-shadow:var(--shadow-sm);
  backdrop-filter:blur(12px)
}
.sm-map-live-card{right:18px;bottom:18px}
.sm-live-dot{
  width:9px;height:9px;flex:0 0 auto;border-radius:50%;background:#18c780;
  box-shadow:0 0 0 5px rgba(24,199,128,.13)
}
.sm-map-live-card strong,.sm-map-live-card small,
.sm-world-live-card strong,.sm-world-live-card small{display:block}
.sm-map-live-card strong,.sm-world-live-card strong{font-size:.78rem}
.sm-map-live-card small,.sm-world-live-card small{margin-top:2px;color:var(--muted);font-size:.62rem}

.sm-presence-card--world{border-color:rgba(76,138,229,.22);background:#03142d}
.sm-world-code-map{position:relative;min-height:560px;overflow:hidden}
.sm-map-svg--world{min-height:560px;color:#5c9ff2}
.sm-world-grid line{stroke:rgba(105,164,238,.07);stroke-width:1}
.sm-world-land path{color:#64a7f5}
.sm-map-loading--world{fill:rgba(255,255,255,.6)}

.sm-world-route{
  stroke:rgba(246,185,69,.55);
  stroke-width:1.6;
  stroke-linecap:round;
  stroke-dasharray:5 7;
  filter:drop-shadow(0 0 5px rgba(246,185,69,.35))
}
.sm-world-route.is-active{
  stroke:#ffd26d;stroke-width:3;
  filter:drop-shadow(0 0 10px rgba(255,210,109,.78))
}
.sm-route-particle{fill:#ffd26d;filter:drop-shadow(0 0 7px #ffd26d)}

.sm-world-marker{cursor:pointer}
.sm-world-marker circle{fill:#5c9ff2;stroke:#eaf3ff;stroke-width:1.5}
.sm-world-marker text{fill:rgba(255,255,255,.74);font-size:10px;font-weight:800;pointer-events:none}
.sm-world-marker.is-active circle{fill:#ffd26d;filter:drop-shadow(0 0 7px rgba(255,210,109,.8))}
.sm-world-marker.is-active text{fill:#fff}
.sm-world-marker.is-hub circle{fill:#ffd26d}

.sm-logo-hub--world .sm-logo-hub-ring{
  fill:rgba(5,27,59,.93);
  stroke:rgba(255,210,109,.78);
  filter:drop-shadow(0 0 18px rgba(255,210,109,.45))
}

.sm-world-copy{
  position:absolute;z-index:5;top:36px;left:38px;max-width:380px
}
.sm-world-eyebrow{color:#ffc85a!important;border-color:rgba(255,200,90,.2)!important;background:rgba(255,200,90,.08)!important}
.sm-world-title{
  max-width:11ch;color:#fff;font-size:clamp(2rem,3.4vw,3.45rem);
  line-height:1.05;letter-spacing:-.045em;font-weight:900
}

.sm-world-country-strip{
  position:absolute;z-index:6;right:24px;bottom:22px;left:24px;
  display:flex;flex-wrap:wrap;justify-content:flex-end;gap:8px
}
.sm-world-country{
  display:inline-flex;align-items:center;gap:8px;
  border:1px solid rgba(255,255,255,.16);border-radius:999px;
  background:rgba(7,26,55,.72);padding:8px 11px;color:rgba(255,255,255,.88);
  font-size:.72rem;font-weight:850;cursor:pointer;backdrop-filter:blur(10px);
  transition:transform .18s ease,border-color .18s ease,background .18s ease
}
.sm-world-country:hover,.sm-world-country.is-active{
  transform:translateY(-2px);border-color:rgba(255,210,109,.7);background:rgba(32,61,104,.88)
}
.sm-country-code{
  display:grid;min-width:26px;height:22px;place-items:center;border-radius:7px;
  background:rgba(80,144,244,.17);color:#8dbbff;font-size:.58rem;font-weight:950
}
.sm-world-live-card{right:24px;top:24px;background:rgba(5,27,59,.82);border-color:rgba(255,255,255,.14);color:#fff}
.sm-world-live-card small{color:rgba(255,255,255,.62)}

.sm-presence-stats{
  display:grid;gap:10px;grid-template-columns:repeat(2,minmax(0,1fr))
}
@media(min-width:760px){.sm-presence-stats{grid-template-columns:repeat(4,minmax(0,1fr))}}
.sm-presence-stat{
  border:1px solid var(--line);border-radius:17px;background:var(--surface);
  padding:18px;box-shadow:var(--shadow-sm)
}
.sm-presence-stat strong,.sm-presence-stat span{display:block}
.sm-presence-stat strong{font-size:1.55rem;line-height:1;font-weight:950;letter-spacing:-.04em}
.sm-presence-stat span{margin-top:8px;color:var(--muted);font-size:.72rem;font-weight:780;line-height:1.4}

@media(max-width:1023px){
  .sm-code-map,.sm-map-svg{min-height:520px}
  .sm-world-code-map,.sm-map-svg--world{min-height:620px}
}
@media(max-width:640px){
  .sm-presence-card{border-radius:22px}
  .sm-presence-copy{padding:24px 20px}
  .sm-code-map,.sm-map-svg{min-height:420px}
  .sm-world-code-map,.sm-map-svg--world{min-height:600px}
  .sm-world-copy{top:22px;right:18px;left:18px}
  .sm-world-title{max-width:14ch;font-size:2.15rem}
  .sm-world-country-strip{right:14px;bottom:14px;left:14px;justify-content:flex-start}
  .sm-world-live-card{top:auto;right:14px;bottom:106px}
}
