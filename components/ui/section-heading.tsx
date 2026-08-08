import type {ReactNode} from 'react';

export function SectionHeading({
  eyebrow,
  title,
  description,
  icon,
  align = 'left',
  className = ''
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div
      className={[
        'section-heading',
        align === 'center' ? 'section-heading--center' : '',
        className
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {eyebrow ? (
        <div className="eyebrow">
          {icon}
          {eyebrow}
        </div>
      ) : null}

      <h2 className="display mt-4">{title}</h2>

      {description ? (
        <p className="muted mt-5 text-lg">{description}</p>
      ) : null}
    </div>
  );
}
