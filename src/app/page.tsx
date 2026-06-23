export default function HomePage() {
  return (
    <main className="grid min-h-screen place-items-center gap-4 p-10">
      <h1 className="text-ink font-display text-5xl font-bold tracking-tight">Hatch — Daybreak</h1>
      <div className="flex gap-3">
        <span className="bg-brand-strong text-brand-foreground rounded-full px-4 py-2">brand</span>
        <span className="bg-accent text-accent-foreground rounded-full px-4 py-2">accent</span>
        <span className="bg-band text-on-band rounded-2xl px-6 py-4">band</span>
      </div>
    </main>
  );
}
