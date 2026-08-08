'use client';

import {useEffect} from 'react';
import {AlertTriangle, RotateCcw} from 'lucide-react';

export default function ErrorPage({
  error,
  reset
}: {
  error: Error & {digest?: string};
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] items-center">
      <section className="container py-20 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border border-red-500/20 bg-red-500/5">
          <AlertTriangle className="text-red-500" size={28} />
        </div>

        <div className="mt-7 text-sm font-black uppercase tracking-[.16em] text-red-500">
          Something went wrong
        </div>

        <h1 className="display mx-auto mt-4 max-w-3xl text-4xl font-black md:text-5xl">
          We could not load this page correctly
        </h1>

        <p className="muted mx-auto mt-5 max-w-2xl text-lg leading-8">
          Please try again. If the issue continues, contact SystemMaster support.
        </p>

        <button type="button" onClick={reset} className="btn btn-primary mt-8">
          <RotateCcw size={17} />
          Try Again
        </button>
      </section>
    </main>
  );
}
