import { motion } from 'framer-motion';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type FloatingGraphProps = {
  values: number[];
  lastResult: 'correct' | 'incorrect' | null;
};

function createSmoothSeries(values: number[]) {
  if (values.length <= 1) {
    return values.map((value, index) => ({ step: index + 1, value }));
  }

  const series: Array<{ step: number; value: number }> = [];

  for (let index = 0; index < values.length - 1; index += 1) {
    const current = values[index];
    const next = values[index + 1];

    series.push({ step: index + 1, value: current });
    series.push({ step: index + 1.1, value: current + (next - current) * 0.16 });
    series.push({ step: index + 1.22, value: current + (next - current) * 0.32 });
    series.push({ step: index + 1.36, value: current + (next - current) * 0.5 });
    series.push({ step: index + 1.5, value: current + (next - current) * 0.66 });
    series.push({ step: index + 1.64, value: current + (next - current) * 0.8 });
    series.push({ step: index + 1.78, value: current + (next - current) * 0.9 });
    series.push({ step: index + 1.9, value: current + (next - current) * 0.97 });
  }

  series.push({ step: values.length, value: values[values.length - 1] });
  return series;
}

export function FloatingGraph({ values, lastResult }: FloatingGraphProps) {
  const color = lastResult === 'correct' ? '#4ade80' : lastResult === 'incorrect' ? '#fb7185' : '#67e8f9';
  const data = createSmoothSeries(values);

  return (
    <motion.div
      layout
      className="glass hidden w-full max-w-[420px] rounded-[28px] p-5 lg:block xl:sticky xl:top-8"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Momentum</p>
          <h3 className="mt-2 text-lg font-semibold text-white">Performance curve</h3>
        </div>
        <div className="rounded-full border px-3 py-1 text-xs text-slate-300" style={{ borderColor: `${color}55`, boxShadow: `0 0 20px ${color}22` }}>
          Live
        </div>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
            <defs>
              <linearGradient id="graphFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.45} />
                <stop offset="100%" stopColor={color} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(148,163,184,0.08)" vertical={false} />
            <XAxis
              dataKey="step"
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => Number.isInteger(value) ? String(value) : ''}
            />
            <YAxis hide domain={[0, 100]} />
            <Tooltip
              contentStyle={{ background: '#020617', border: `1px solid ${color}44`, borderRadius: 16 }}
              labelFormatter={(label) => `Step ${Math.ceil(Number(label))}`}
              formatter={(value: number) => [`${Math.round(value)} momentum`, 'Level']}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={3.5}
              fill="url(#graphFill)"
              isAnimationActive
              animationDuration={1150}
              animationEasing="ease-in-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-3 text-sm text-slate-400">Correct answers push the curve up. Misses create a dip, then you recover on the next one.</p>
    </motion.div>
  );
}
