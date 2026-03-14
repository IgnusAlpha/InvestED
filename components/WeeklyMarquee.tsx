import { useEffect, useRef } from 'react';
import type { WeeklyEntry } from '@/pages/api/weekly-leaderboard';

const RANK_STYLES: Record<number, { emoji: string; color: string; glow: string }> = {
  1: { emoji: '🥇', color: 'text-yellow-300', glow: 'shadow-[0_0_16px_rgba(253,224,71,0.35)]' },
  2: { emoji: '🥈', color: 'text-slate-300', glow: 'shadow-[0_0_12px_rgba(148,163,184,0.25)]' },
  3: { emoji: '🥉', color: 'text-amber-500', glow: 'shadow-[0_0_12px_rgba(245,158,11,0.25)]' },
};

type Props = {
  entries: WeeklyEntry[];
};

function MarqueeItem({ entry }: { entry: WeeklyEntry }) {
  const style = RANK_STYLES[entry.rank];

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium backdrop-blur-sm ${style?.glow ?? ''}`}
    >
      <span className="text-base">{style?.emoji ?? '📍'}</span>
      <span className={`font-semibold ${style?.color ?? 'text-slate-300'}`}>{entry.homeroom}</span>
      <span className="text-slate-500">·</span>
      <span className="text-cyan-300/90">{entry.totalScore} pts</span>
    </span>
  );
}

export function WeeklyMarquee({ entries }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let offset = 0;
    let rafId: number;
    const speed = 0.55;

    const tick = () => {
      offset += speed;
      const half = track.scrollWidth / 2;
      if (offset >= half) offset = 0;
      track.style.transform = `translateX(-${offset}px)`;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [entries]);

  if (entries.length === 0) return null;

  const doubled = [...entries, ...entries];

  return (
    <div className="relative z-20 -mx-4 overflow-hidden border-b border-white/[0.07] bg-white/[0.03] py-2.5 backdrop-blur-md sm:-mx-6 lg:-mx-8">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#020617] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#020617] to-transparent" />

      <div className="flex items-center gap-1 whitespace-nowrap text-xs uppercase tracking-widest text-slate-500 px-4 mb-1.5">
        <span className="text-cyan-400/60">📈</span>
        <span>Weekly standings</span>
      </div>

      <div className="overflow-hidden">
        <div ref={trackRef} className="flex gap-3 will-change-transform" style={{ width: 'max-content' }}>
          {doubled.map((entry, i) => (
            <MarqueeItem key={`${entry.homeroom}-${i}`} entry={entry} />
          ))}
        </div>
      </div>
    </div>
  );
}
