import { motion } from 'framer-motion';

export type LeaderboardEntry = {
  homeroom: string;
  score: number;
  answered: number;
  totalQuestions: number;
  percentage: number;
  rank: number;
};

type LiveLeaderboardProps = {
  entries: LeaderboardEntry[];
  activeHomeroom: string;
  isLive: boolean;
};

export function LiveLeaderboard({ entries, activeHomeroom, isLive }: LiveLeaderboardProps) {
  return (
    <div className="glass w-full max-w-[320px] rounded-[28px] p-3 lg:block xl:sticky xl:top-8">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Homeroom battle</p>
          <h3 className="mt-2 text-lg font-semibold text-white">Live leaderboard</h3>
        </div>
        <div className={`rounded-full border px-3 py-1 text-xs ${isLive ? 'border-emerald-400/30 text-emerald-300' : 'border-slate-700 text-slate-400'}`}>
          {isLive ? 'Live' : 'Waiting'}
        </div>
      </div>

      <div className="space-y-3 font-[Inter,_ui-sans-serif,_system-ui] tabular-nums">
        {entries.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-700/80 px-4 py-6 text-sm text-slate-400">
            Leaderboard will appear as homerooms start answering.
          </div>
        )}

        {entries.map((entry) => {
          const isActive = activeHomeroom === entry.homeroom;

          return (
            <motion.div
              key={entry.homeroom}
              layout
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              className={`rounded-2xl border px-4 py-4 ${isActive ? 'border-cyan-300/40 bg-cyan-400/10 shadow-[0_0_25px_rgba(34,211,238,.12)]' : 'border-white/10 bg-white/5'}`}
            >
              <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${entry.rank === 1 ? 'bg-amber-400/15 text-amber-200' : 'bg-slate-800 text-slate-200'}`}>
                  #{entry.rank}
                </div>
                <div className="min-w-0">
                  <p className="break-words font-medium leading-5 text-white">{entry.homeroom}</p>
                  <p className="text-xs text-slate-400">
                    {entry.score}/{entry.answered || 0} correct so far
                  </p>
                </div>
                <div className="min-w-[64px] text-right">
                  <p className="text-lg font-semibold leading-5 text-white">{entry.percentage}%</p>
                  <p className="text-xs text-slate-400">{entry.answered}/{entry.totalQuestions}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
