'use client';

import {motion} from 'framer-motion';

function Shell({
  label,
  children
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="sm-portfolio-card__visual">
      <div className="sm-preview-shell">
        <motion.div
          className="sm-preview-window"
          initial={{opacity: 0, y: 12, scale: .985}}
          whileInView={{opacity: 1, y: 0, scale: 1}}
          viewport={{once: true, amount: .25}}
          whileHover={{y: -4}}
          transition={{duration: .42}}
        >
          <div className="sm-preview-topbar">
            <span className="sm-preview-dot" />
            <span className="sm-preview-dot" />
            <span className="sm-preview-dot" />
            <span className="sm-preview-label">{label}</span>
          </div>
          <div className="sm-preview-body">{children}</div>
        </motion.div>
      </div>
    </div>
  );
}

function Kpis({labels}: {labels: string[]}) {
  return (
    <div className="sm-mini-kpis">
      {labels.map((label, i) => (
        <div className="sm-mini-kpi sm-mini-kpi--content" key={label}>
          <span>{label}</span>
          <strong>{['₹8.4L','128','94%'][i] || '24'}</strong>
        </div>
      ))}
    </div>
  );
}

function ERPFull() {
  return (
    <Shell label="ERP + CRM">
      <Kpis labels={['Revenue','Orders','Stock']} />
      <div className="sm-mini-table">
        {['Lead → Order','Purchase','Inventory','Reports'].map((name, r) => (
          <div className="sm-mini-row sm-mini-row--content" key={name}>
            <span>{name}</span>
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
    <Shell label="Executive Dashboard">
      <Kpis labels={['Sales','Orders','Target']} />
      <div className="sm-mini-chart">
        <svg viewBox="0 0 300 100" preserveAspectRatio="none" aria-hidden="true">
          <polyline points="0,82 42,68 84,72 128,48 168,57 210,30 250,39 300,18" fill="none" stroke="currentColor" strokeWidth="4" />
          <polyline points="0,88 52,80 96,61 138,68 180,48 224,56 260,32 300,38" fill="none" stroke="currentColor" strokeWidth="2" opacity=".35" />
        </svg>
      </div>
    </Shell>
  );
}

function FMS() {
  return (
    <Shell label="FMS Workflow">
      <div className="sm-pipeline">
        {['New','Working','Review','Done'].map((name, col) => (
          <div className="sm-pipeline-col" key={name}>
            <div className="sm-pipeline-title sm-pipeline-title--text">{name}</div>
            {Array.from({length: col === 1 ? 4 : 3}).map((_, i) => (
              <motion.div
                className="sm-task"
                key={i}
                initial={{opacity:.35, y:4}}
                whileInView={{opacity:1, y:0}}
                transition={{delay:(col+i)*.04}}
              />
            ))}
          </div>
        ))}
      </div>
    </Shell>
  );
}

function IMS() {
  return (
    <Shell label="Inventory / IMS">
      <div className="sm-stock-grid">
        <div className="sm-stock-side">
          <div className="sm-stock-ring"><span>72%</span></div>
          <small>Stock health</small>
        </div>
        <div className="sm-stock-list">
          {['Raw Material','Finished Goods','Inward','Outward','Low Stock'].map((x) => (
            <div key={x} className="sm-stock-item sm-stock-item--text"><span>{x}</span></div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

function PMS() {
  const steps = [
    ['Mixing','88%'],
    ['Processing','72%'],
    ['Quality','61%'],
    ['Packing','46%'],
    ['Dispatch','34%']
  ];
  return (
    <Shell label="Production / PMS">
      <div className="sm-production">
        {steps.map(([name, width], i) => (
          <div className="sm-production-step sm-production-step--content" key={name}>
            <span>{name}</span>
            <div className="sm-production-track">
              <motion.div
                className="sm-production-fill"
                initial={{width:0}}
                whileInView={{width}}
                viewport={{once:true}}
                transition={{duration:.6, delay:i*.08}}
              />
            </div>
            <b>{width}</b>
          </div>
        ))}
      </div>
    </Shell>
  );
}

function Analytics() {
  return (
    <Shell label="Business Analytics">
      <Kpis labels={['Growth','Margin','Conversion']} />
      <div className="sm-mini-chart">
        <div className="sm-mini-bars">
          {[48,72,58,84,66,92,77].map((h,i) => (
            <motion.div
              key={i}
              className="sm-mini-bar"
              initial={{height:0}}
              whileInView={{height:`${h}%`}}
              viewport={{once:true}}
              transition={{duration:.5,delay:i*.05}}
            />
          ))}
        </div>
      </div>
    </Shell>
  );
}

function Performance() {
  const scores = [
    ['Sales Team','78%'],
    ['Operations','91%'],
    ['Support','66%'],
    ['Projects','84%']
  ];
  return (
    <Shell label="Performance KPI">
      <div className="sm-score-grid">
        {scores.map(([name,score],i) => (
          <div className="sm-score-card sm-score-card--content" key={name}>
            <span>{name}</span>
            <b>{score}</b>
            <div className="sm-score-meter">
              <motion.span
                initial={{width:0}}
                whileInView={{width:score}}
                viewport={{once:true}}
                transition={{duration:.55,delay:i*.08}}
              />
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
}

function Certificate() {
  return (
    <Shell label="Document Automation">
      <div className="sm-doc sm-doc--content">
        <div className="sm-doc-logo">SM</div>
        <strong>Certificate</strong>
        <span>Automated Document</span>
        <div className="sm-doc-line gold" />
        <div className="sm-doc-line" />
        <div className="sm-doc-line" style={{width:'78%'}} />
        <div className="sm-doc-seal">✓</div>
      </div>
    </Shell>
  );
}

export function PortfolioPreview({slug}: {slug:string}) {
  switch (slug) {
    case 'enterprise-erp': return <ERPFull />;
    case 'erp-dashboard': return <ERPDashboard />;
    case 'workflow-fms': return <FMS />;
    case 'inventory-ims': return <IMS />;
    case 'production-pms': return <PMS />;
    case 'business-analytics': return <Analytics />;
    case 'performance-dashboard': return <Performance />;
    case 'certificate-automation': return <Certificate />;
    default: return <ERPDashboard />;
  }
}
