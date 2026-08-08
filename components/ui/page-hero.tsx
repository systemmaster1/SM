import type {ReactNode} from 'react';

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  aside,
  align = 'left'
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  align?: 'left' | 'center';
}) {
  const centered = align === 'center';

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div
        className={[
          'container',
          aside ? 'grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]' : '',
          centered ? 'text-center' : ''
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className={centered ? 'mx-auto max-w-5xl' : 'min-w-0'}>
          {eyebrow}
          <h1 className={centered ? 'mx-auto mt-5' : 'mt-5'}>{title}</h1>

          {description ? (
            <div
              className={[
                'muted mt-6 text-lg leading-8',
                centered ? 'mx-auto max-w-3xl' : 'max-w-3xl'
              ].join(' ')}
            >
              {description}
            </div>
          ) : null}

          {actions ? (
            <div
              className={[
                'mt-8 flex flex-wrap gap-3',
                centered ? 'justify-center' : ''
              ].join(' ')}
            >
              {actions}
            </div>
          ) : null}
        </div>

        {aside ? <div className="min-w-0">{aside}</div> : null}
      </div>
    </section>
  );
}
