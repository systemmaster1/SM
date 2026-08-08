import type {ReactNode} from 'react';

export function ContentSection({
  eyebrow,
  title,
  description,
  children,
  align = 'left',
  className = ''
}: {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}) {
  const centered = align === 'center';

  return (
    <section className={`section ${className}`}>
      <div className="container">
        {title || description || eyebrow ? (
          <div
            className={[
              'section-heading',
              centered ? 'section-heading--center' : ''
            ].join(' ')}
          >
            {eyebrow}
            {title ? <h2 className="display mt-4">{title}</h2> : null}
            {description ? (
              <div className="muted mt-5 text-lg">{description}</div>
            ) : null}
          </div>
        ) : null}

        <div className={title || description || eyebrow ? 'mt-10' : ''}>
          {children}
        </div>
      </div>
    </section>
  );
}
