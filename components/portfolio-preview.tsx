'use client';

import {motion} from 'framer-motion';

function Shell({children}: {children: React.ReactNode}) {
  return (
    <div className="sm-portfolio-card__visual">
      <div className="sm-preview-shell">
        <motion.div
          className="sm-preview-window"
          initial={{opacity: 0, y: 12, scale: .98}}
          whileInView={{opacity: 1, y: 0, scale: 1}}
          viewport={{once: true}}
          whileHover={{y: -3}}
          transition={{duration: .42}}
        >
          <div className="sm-preview-topbar">
            <span className="sm-preview-dot" />
            <span className="sm-preview-dot" />
            <span className="sm-preview-dot" />
          </div>
          <div className="sm-preview-body">{children}</div>
        </motion.div>
      </div>
    </div>
  );
}

function ERPFull() {
  return (
    <Shell>
      <div className="sm-mini-kpis">
        <div className="sm-mini-kpi" />
        <div className="sm-mini-kpi" />
        <div className="sm-mini-kpi" />
      </div>
      <div className="sm-mini-table">
        {[0,1,2,3].map((r) => (
          <div className="sm-mini-row" key={r}>
            <div className="sm-mini-cell" />
            <div className="sm-mini-cell" />
            <div className="sm-mini-cell" />
          </div>
        ))}
      </div>
    </Shell>
  );
}

function ERPDashboard() {
  return (
    <Shell>
      <div className="sm-mini-kpis">
        <div className="sm-mini-kpi" />
        <div className="sm-mini-kpi" />
        <div className="sm-mini-kpi" />
      </div>
      <div className="sm-mini-chart">
        <svg viewBox="0 0 300 100" preserveAspectRatio="none" aria-hidden="true">
          <polyline
            points="0,82 42,68 84,72 128,48 168,57 210,30 250,39 300,18"
            fill="none"
            stroke="#2f74e8"
            strokeWidth="4"
          />
          <polyline
            points="0,88 52,80 96,61 138,68 180,48 224,56 260,32 300,38"
            fill="none"
            stroke="#e0a12b"
            strokeWidth="3"
            opacity=".8"
          />
        </svg>
      </div>
    </Shell>
  );
}

function FMS() {
  return (
    <Shell>
      <div className="sm-pipeline">
        {[0,1,2,3].map((col) => (
          <div className="sm-pipeline-col" key={col}>
            <div className="sm-pipeline-title" />
            {Array.from({length: col === 1 ? 4 : 3}).map((_, i) => (
              <div className="sm-task" key={i} />
            ))}
          </div>
        ))}
      </div>
    </Shell>
  );
}

function IMS() {
  return (
    <Shell>
      <div className="sm-stock-grid">
        <div className="sm-stock-side">
          <div className="sm-stock-ring" />
        </div>
        <div className="sm-stock-list">
          {[0,1,2,3,4].map((x) => <div key={x} className="sm-stock-item" />)}
        </div>
      </div>
    </Shell>
  );
}

function PMS() {
  const widths = ['88%','72%','61%','46%','34%'];
  return (
    <Shell>
      <div className="sm-production">
        {widths.map((w, i) => (
          <div className="sm-production-step" key={w}>
            <div className="sm-production-num" />
            <div className="sm-production-track">
              <motion.div
                className="sm-production-fill"
                initial={{width: 0}}
                whileInView={{width: w}}
                viewport={{once: true}}
                transition={{duration: .6, delay: i * .08}}
              />
            </div>
            <div className="sm-production-val" />
          </div>
        ))}
      </div>
    </Shell>
  );
}

function Analytics() {
  return (
    <Shell>
      <div className="sm-mini-kpis">
        <div className="sm-mini-kpi" />
        <div className="sm-mini-kpi" />
        <div className="sm-mini-kpi" />
      </div>
      <div className="sm-mini-chart">
        <div className="sm-mini-bars">
          {[48,72,58,84,66,92,77].map((h, i) => (
            <motion.div
              key={i}
              className="sm-mini-bar"
              initial={{height: 0}}
              whileInView={{height: `${h}%`}}
              viewport={{once: true}}
              transition={{duration: .5, delay: i * .05}}
            />
          ))}
        </div>
      </div>
    </Shell>
  );
}

function Performance() {
  const scores = ['78%','91%','66%','84%'];
  return (
    <Shell>
      <div className="sm-score-grid">
        {scores.map((score, i) => (
          <div className="sm-score-card" key={score}>
            <div className="sm-score-head" />
            <div className="sm-score-meter">
              <motion.span
                initial={{width: 0}}
                whileInView={{width: score}}
                viewport={{once: true}}
                transition={{duration: .55, delay: i * .08}}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="sm-mini-chart mt-2">
        <svg viewBox="0 0 300 100" preserveAspectRatio="none" aria-hidden="true">
          <polyline
            points="0,80 50,70 90,62 135,52 180,55 225,34 300,24"
            fill="none"
            stroke="#18c98f"
            strokeWidth="4"
          />
        </svg>
      </div>
    </Shell>
  );
}

function Certificate() {
  return (
    <Shell>
      <div className="sm-doc">
        <div className="sm-doc-logo" />
        <div className="sm-doc-line gold" />
        <div className="sm-doc-line" />
        <div className="sm-doc-line" />
        <div className="sm-doc-line" style={{width:'78%'}} />
        <div className="sm-doc-seal" />
      </div>
    </Shell>
  );
}

export function PortfolioPreview({slug}: {slug: string}) {
  switch (slug) {
    case 'enterprise-erp':
      return <ERPFull />;
    case 'erp-dashboard':
      return <ERPDashboard />;
    case 'workflow-fms':
      return <FMS />;
    case 'inventory-ims':
      return <IMS />;
    case 'production-pms':
      return <PMS />;
    case 'business-analytics':
      return <Analytics />;
    case 'performance-dashboard':
      return <Performance />;
    case 'certificate-automation':
      return <Certificate />;
    default:
      return <ERPDashboard />;
  }
}
