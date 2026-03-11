export function ProgressBar({ current, total }: { current: number; total: number }) {
  const width = `${(current / total) * 100}%`;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-slate-400">
        <span>Progress</span>
        <span>
          Question {current} of {total}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-800/80">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 shadow-[0_0_20px_rgba(34,211,238,0.45)] transition-all duration-500"
          style={{ width }}
        />
      </div>
    </div>
  );
}
