import {ImageResponse} from 'next/og';

export const runtime = 'edge';

export const alt = 'SystemMaster Automations — Business Software & Automation';
export const size = {
  width: 1200,
  height: 630
};
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background:
            'radial-gradient(circle at 18% 20%, rgba(59,130,246,.30), transparent 32%), radial-gradient(circle at 82% 75%, rgba(245,183,63,.22), transparent 30%), #071326',
          color: '#fff',
          padding: '72px',
          fontFamily: 'Arial, sans-serif'
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            opacity: 0.13,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.13) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.13) 1px, transparent 1px)',
            backgroundSize: '58px 58px'
          }}
        />

        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: '18px'}}>
            <div
              style={{
                width: '74px',
                height: '74px',
                borderRadius: '22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(145deg,#f4c967,#337fe8)',
                color: '#071326',
                fontSize: '28px',
                fontWeight: 900
              }}
            >
              SM
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <div style={{fontSize: '31px', fontWeight: 800}}>SystemMaster</div>
              <div
                style={{
                  marginTop: '4px',
                  color: '#f4bd4f',
                  fontSize: '17px',
                  fontWeight: 800,
                  letterSpacing: '5px'
                }}
              >
                AUTOMATIONS
              </div>
            </div>
          </div>

          <div style={{display: 'flex', flexDirection: 'column', maxWidth: '980px'}}>
            <div
              style={{
                color: '#78aaff',
                fontWeight: 800,
                fontSize: '22px',
                letterSpacing: '3px',
                textTransform: 'uppercase'
              }}
            >
              ERP · CRM · HRMS · AI · Custom Software
            </div>
            <div
              style={{
                marginTop: '22px',
                fontSize: '66px',
                lineHeight: 1.04,
                fontWeight: 900,
                letterSpacing: '-3px'
              }}
            >
              Run your business on one intelligent system
            </div>
            <div
              style={{
                marginTop: '26px',
                color: '#b9c6dc',
                fontSize: '26px',
                lineHeight: 1.4
              }}
            >
              Ready-to-use SaaS products and custom digital systems for growing businesses.
            </div>
          </div>

          <div style={{display: 'flex', gap: '18px', color: '#dbe6f8', fontSize: '20px'}}>
            <div>systemmaster.in</div>
            <div style={{color: '#f4bd4f'}}>•</div>
            <div>India</div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
