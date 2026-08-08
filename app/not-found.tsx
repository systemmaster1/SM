import Link from 'next/link';
import {ArrowLeft, Home, SearchX} from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex min-h-[72vh] items-center">
      <section className="container py-20 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-lg">
          <SearchX className="text-[var(--gold)]" size={28} />
        </div>

        <div className="mt-7 text-sm font-black uppercase tracking-[.16em] text-[var(--gold)]">
          Error 404
        </div>

        <h1 className="display mx-auto mt-4 max-w-3xl text-4xl font-black md:text-6xl">
          This page could not be found
        </h1>

        <p className="muted mx-auto mt-5 max-w-2xl text-lg leading-8">
          The page may have moved, the link may be outdated, or the address may
          have been entered incorrectly.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/en" className="btn btn-primary">
            <Home size={17} />
            Go to Home
          </Link>
          <Link href="/en/contact" className="btn btn-ghost">
            <ArrowLeft size={17} />
            Contact SystemMaster
          </Link>
        </div>
      </section>
    </main>
  );
}
