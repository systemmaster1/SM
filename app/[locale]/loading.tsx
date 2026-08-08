export default function Loading() {
  return (
    <main className="min-h-[70vh]">
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="animate-pulse">
            <div className="h-8 w-36 rounded-full bg-[var(--surface-strong)]" />
            <div className="mt-6 h-16 max-w-3xl rounded-2xl bg-[var(--surface-strong)]" />
            <div className="mt-4 h-6 max-w-2xl rounded-xl bg-[var(--surface-strong)]" />
            <div className="mt-3 h-6 max-w-xl rounded-xl bg-[var(--surface-strong)]" />

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({length: 6}).map((_, index) => (
                <div
                  key={index}
                  className="card h-52 bg-[var(--surface-strong)]/55"
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
