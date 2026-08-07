import Link from 'next/link';
import {ArrowLeft, Mail, ShieldCheck} from 'lucide-react';

type Section = {
  title: string;
  body: string;
};

export function LegalPage({
  eyebrow,
  title,
  intro,
  lastUpdated,
  sections,
  contactTitle,
  contactDesc,
  email,
  backLabel,
  contactLabel,
  locale
}: {
  eyebrow: string;
  title: string;
  intro: string;
  lastUpdated: string;
  sections: Section[];
  contactTitle: string;
  contactDesc: string;
  email: string;
  backLabel: string;
  contactLabel: string;
  locale: string;
}) {
  return (
    <main>
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="container max-w-5xl">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-sm font-extrabold text-[var(--muted)] transition hover:text-[var(--text)]"
          >
            <ArrowLeft size={16} />
            {backLabel}
          </Link>

          <div className="mt-8">
            <div className="eyebrow">
              <ShieldCheck size={15} />
              {eyebrow}
            </div>
            <h1 className="display mt-5 text-[clamp(2.8rem,6vw,5rem)] font-black">{title}</h1>
            <p className="muted mt-6 max-w-4xl text-lg leading-8">{intro}</p>
            <div className="mt-5 text-sm font-bold text-[var(--gold)]">{lastUpdated}</div>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container max-w-5xl">
          <div className="grid gap-4">
            {sections.map((section) => (
              <article key={section.title} className="card p-6 md:p-8">
                <h2 className="display text-xl font-black md:text-2xl">{section.title}</h2>
                <p className="muted mt-4 leading-8">{section.body}</p>
              </article>
            ))}
          </div>

          <div className="card mt-8 p-7 md:p-9">
            <h2 className="display text-2xl font-black">{contactTitle}</h2>
            <p className="muted mt-3 max-w-3xl leading-7">{contactDesc}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`mailto:${email}`} className="btn btn-ghost">
                <Mail size={17} />
                {email}
              </a>
              <Link href={`/${locale}/contact`} className="btn btn-primary">
                {contactLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
