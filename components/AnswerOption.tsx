type AnswerOptionProps = {
  label: string;
  index: number;
  isSelected: boolean;
  isCorrect: boolean;
  reveal: boolean;
  disabled: boolean;
  onClick: () => void;
};

export function AnswerOption({ label, index, isSelected, isCorrect, reveal, disabled, onClick }: AnswerOptionProps) {
  const stateClass = reveal
    ? isCorrect
      ? 'border-emerald-400/70 bg-emerald-500/15 text-emerald-100 shadow-[0_0_25px_rgba(74,222,128,.15)]'
      : isSelected
        ? 'border-rose-400/70 bg-rose-500/15 text-rose-100 shadow-[0_0_25px_rgba(251,113,133,.15)]'
        : 'border-slate-700/80 bg-slate-900/50 text-slate-300'
    : isSelected
      ? 'border-cyan-300/80 bg-cyan-400/10 text-white'
      : 'border-slate-700/80 bg-slate-900/50 text-slate-200 hover:border-cyan-300/40 hover:bg-cyan-400/5';

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`w-full rounded-2xl border px-4 py-4 text-left transition-all duration-300 ${stateClass} ${disabled ? 'cursor-not-allowed' : ''}`}
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-slate-200">
          {String.fromCharCode(65 + index)}
        </span>
        <span className="text-sm leading-6 sm:text-base">{label}</span>
      </div>
    </button>
  );
}
