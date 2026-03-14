import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { AnswerOption } from '@/components/AnswerOption';
import { FloatingGraph } from '@/components/FloatingGraph';
import { HeroBackground } from '@/components/HeroBackground';
import { Layout } from '@/components/Layout';
import { LiveLeaderboard, LeaderboardEntry } from '@/components/LiveLeaderboard';
import { ProgressBar } from '@/components/ProgressBar';
import { WeeklyMarquee } from '@/components/WeeklyMarquee';
import { activeQuiz } from '@/data/quizData';
import { formatPercentage } from '@/lib/utils';
import type { WeeklyEntry } from '@/pages/api/weekly-leaderboard';

type Stage = 'landing' | 'entry' | 'quiz' | 'complete';
type AnswerState = 'correct' | 'incorrect' | null;

const initialGraph = [42];

export default function HomePage() {
  const [stage, setStage] = useState<Stage>('landing');
  const [homeroom, setHomeroom] = useState(activeQuiz.homerooms[0] ?? '');
  const [accessCode, setAccessCode] = useState('');
  const [entryError, setEntryError] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>(null);
  const [score, setScore] = useState(0);
  const [graphValues, setGraphValues] = useState<number[]>(initialGraph);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [leaderboardError, setLeaderboardError] = useState('');
  const [weeklyEntries, setWeeklyEntries] = useState<WeeklyEntry[]>([]);

  const currentQuestion = activeQuiz.questions[questionIndex];
  const totalQuestions = activeQuiz.questions.length;
  const percentage = useMemo(() => formatPercentage(score, totalQuestions), [score, totalQuestions]);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const response = await fetch('/api/live-score');
        if (!response.ok) return;
        const data = (await response.json()) as { leaderboard?: LeaderboardEntry[] };
        setLeaderboard(data.leaderboard || []);
      } catch {
        setLeaderboardError('');
      }
    };

    void loadLeaderboard();
    const interval = window.setInterval(loadLeaderboard, 2500);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadWeekly = async () => {
      try {
        const response = await fetch('/api/weekly-leaderboard');
        if (!response.ok) return;
        const data = (await response.json()) as { entries?: WeeklyEntry[] };
        setWeeklyEntries(data.entries || []);
      } catch {
        // silent
      }
    };

    void loadWeekly();
    const interval = window.setInterval(loadWeekly, 30000);
    return () => window.clearInterval(interval);
  }, []);

  const handleEnterQuiz = () => {
    if (!homeroom || !accessCode.trim()) {
      setEntryError('Choose a homeroom and enter the daily code.');
      return;
    }

    if (accessCode.trim() !== activeQuiz.accessCode) {
      setEntryError('That access code is not correct for today.');
      return;
    }

    setEntryError('');
    setStage('quiz');
  };

  const pushLiveLeaderboard = async (nextScore: number, answered: number) => {
    try {
      const response = await fetch('/api/live-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          homeroom,
          accessCode,
          score: nextScore,
          answered,
        }),
      });

      if (!response.ok) {
        throw new Error('Could not update live leaderboard.');
      }

      const data = (await response.json()) as { leaderboard?: LeaderboardEntry[] };
      setLeaderboard(data.leaderboard || []);
      setLeaderboardError('');
    } catch {
      setLeaderboardError('Live leaderboard is temporarily unavailable.');
    }
  };

  const handleAnswer = async (choiceIndex: number) => {
    if (selectedIndex !== null) return;

    const isCorrect = choiceIndex === currentQuestion.correctIndex;
    const nextScore = isCorrect ? score + 1 : score;
    const answered = questionIndex + 1;

    setSelectedIndex(choiceIndex);
    setAnswerState(isCorrect ? 'correct' : 'incorrect');
    setScore(nextScore);

    setGraphValues((prev) => {
      const last = prev[prev.length - 1] ?? 42;
      const drift = Math.sin(prev.length * 0.7) * 0.9;
      const rise = isCorrect ? 7.6 : -5.8;
      const next = Math.max(8, Math.min(100, last + rise + drift));
      return [...prev, Math.round(next * 10) / 10];
    });

    void pushLiveLeaderboard(nextScore, answered);

    const revealDelay = isCorrect ? 1100 : 3000;

    window.setTimeout(async () => {
      const isLastQuestion = questionIndex === totalQuestions - 1;

      if (isLastQuestion) {
        setStage('complete');
        setIsSaving(true);
        setSaveError('');

        try {
          const response = await fetch('/api/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              homeroom,
              accessCode,
              score: nextScore,
              totalQuestions,
            }),
          });

          if (!response.ok) {
            const data = (await response.json().catch(() => ({}))) as { message?: string };
            throw new Error(data.message || 'Could not save results.');
          }
        } catch (error) {
          setSaveError(error instanceof Error ? error.message : 'Could not save results.');
        } finally {
          setIsSaving(false);
        }
      } else {
        setQuestionIndex((prev) => prev + 1);
        setSelectedIndex(null);
        setAnswerState(null);
      }
    }, revealDelay);
  };

  const resetForNewDay = () => {
    setStage('landing');
    setQuestionIndex(0);
    setSelectedIndex(null);
    setAnswerState(null);
    setScore(0);
    setGraphValues(initialGraph);
    setSaveError('');
    setAccessCode('');
  };

  return (
    <>
      <Head>
        <title>InvestED | Global Money Week Quiz</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="A premium daily financial literacy quiz experience for Global Money Week."
        />
      </Head>

      <Layout>
        {stage === 'complete' && <Confetti recycle={false} numberOfPieces={180} gravity={0.08} colors={['#67e8f9', '#4ade80', '#a78bfa']} />}

        <WeeklyMarquee entries={weeklyEntries} />

        <main className="relative flex min-h-[calc(100vh-3rem)] flex-1 items-center justify-center py-8">
          <HeroBackground />

          <div className="relative z-10 grid w-full items-start gap-4 xl:grid-cols-[280px_minmax(0,1.55fr)_380px] 2xl:grid-cols-[320px_minmax(0,1.75fr)_430px]">
            <div className="order-2 xl:order-1 xl:pt-10 xl:pr-3 2xl:pr-6">
              <LiveLeaderboard entries={leaderboard} activeHomeroom={homeroom} isLive={leaderboard.length > 0} />
              {leaderboardError && <p className="mt-3 text-sm text-rose-300">{leaderboardError}</p>}
            </div>

            <AnimatePresence mode="wait">
              {stage === 'landing' && (
                <motion.section
                  key="landing"
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.5 }}
                  className="glass order-1 relative mx-auto flex min-h-[76vh] w-full max-w-[82rem] flex-col items-center justify-center rounded-[32px] px-6 py-14 text-center sm:px-10 xl:order-2"
                >
                  <p className="mb-4 text-xs uppercase tracking-[0.45em] text-cyan-300/80">Global Money Week</p>
                  <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">{activeQuiz.title}</h1>
                  <p className="mt-4 text-lg text-slate-300 sm:text-2xl">{activeQuiz.subtitle}</p>
                  <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                    Take on the daily challenge and earn points for your homeroom. The homeroom with the strongest total performance by the end of the week wins a pizza party.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStage('entry')}
                    className="absolute bottom-8 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-8 py-4 text-base font-semibold text-white shadow-glow transition hover:border-cyan-200/50 hover:bg-cyan-300/15"
                  >
                    Enter Today's Quiz
                  </motion.button>
                </motion.section>
              )}

              {stage === 'entry' && (
                <motion.section
                  key="entry"
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.4 }}
                  className="glass order-1 mx-auto w-full max-w-[82rem] rounded-[32px] p-6 sm:p-8 lg:p-12 xl:order-2"
                >
                  <div className="mb-8 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">Today's quiz</p>
                      <h2 className="mt-2 text-3xl font-semibold text-white">Join in under 5 seconds</h2>
                    </div>
                    <button onClick={() => setStage('landing')} className="text-sm text-slate-400 transition hover:text-white">
                      Back
                    </button>
                  </div>

                  <div className="grid gap-5">
                    <label className="grid gap-2">
                      <span className="text-sm text-slate-300">Homeroom</span>
                      <select
                        value={homeroom}
                        onChange={(event) => setHomeroom(event.target.value)}
                        className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-4 text-white outline-none transition focus:border-cyan-300/60"
                      >
                        {activeQuiz.homerooms.map((room) => (
                          <option key={room} value={room}>
                            {room}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="grid gap-2">
                      <span className="text-sm text-slate-300">Daily access code</span>
                      <input
                        value={accessCode}
                        onChange={(event) => setAccessCode(event.target.value.toUpperCase())}
                        placeholder="Enter code"
                        className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-4 tracking-[0.2em] text-white uppercase outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60"
                      />
                    </label>
                  </div>

                  {entryError && <p className="mt-4 text-sm text-rose-300">{entryError}</p>}

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-slate-400">{activeQuiz.dateLabel}</p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleEnterQuiz}
                      className="rounded-full bg-white px-6 py-3 font-medium text-slate-950 transition hover:bg-cyan-100"
                    >
                      Start Quiz
                    </motion.button>
                  </div>
                </motion.section>
              )}

              {stage === 'quiz' && currentQuestion && (
                <motion.section
                  key={`quiz-${questionIndex}`}
                  initial={{ opacity: 1, x: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35 }}
                  className="glass order-1 mx-auto w-full max-w-[82rem] rounded-[32px] p-6 sm:p-8 lg:p-12 xl:order-2"
                >
                  <div className="space-y-8">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">{activeQuiz.dateLabel}</p>
                        <h2 className="mt-2 text-3xl font-semibold leading-tight text-white sm:text-4xl">{currentQuestion.prompt}</h2>
                      </div>
                      <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                        {homeroom} • Score: {score}
                      </div>
                    </div>

                    <ProgressBar current={questionIndex + 1} total={totalQuestions} />

                    <div className="grid gap-4">
                      {currentQuestion.choices.map((choice, index) => (
                        <AnswerOption
                          key={choice}
                          label={choice}
                          index={index}
                          isSelected={selectedIndex === index}
                          isCorrect={currentQuestion.correctIndex === index}
                          reveal={selectedIndex !== null}
                          disabled={selectedIndex !== null}
                          onClick={() => handleAnswer(index)}
                        />
                      ))}
                    </div>

                    <div className="min-h-20 text-sm leading-6 text-slate-300">
                      {answerState && (
                        <p className={answerState === 'correct' ? 'text-emerald-300' : 'text-rose-300'}>
                          {answerState === 'correct'
                            ? `Correct. ${currentQuestion.explanation}`
                            : `Not quite. The correct answer was \"${currentQuestion.choices[currentQuestion.correctIndex]}\". ${currentQuestion.explanation}`}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.section>
              )}

              {stage === 'complete' && (
                <motion.section
                  key="complete"
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="glass order-1 relative mx-auto w-full max-w-[82rem] rounded-[32px] p-6 text-center sm:p-10 xl:order-2"
                >
                  <div className="mx-auto max-w-2xl">
                    <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/70">Completed</p>
                    <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
                      Congratulations, you have finished today's quiz.
                    </h2>
                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                        <p className="text-sm text-slate-400">Final score</p>
                        <p className="mt-2 text-4xl font-semibold text-white">
                          {score} / {totalQuestions}
                        </p>
                      </div>
                      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                        <p className="text-sm text-slate-400">Percentage correct</p>
                        <p className="mt-2 text-4xl font-semibold text-white">{percentage}</p>
                      </div>
                    </div>
                    <p className="mt-8 text-base text-slate-300">Come back tomorrow for the next challenge.</p>
                    <div className="mt-6 min-h-6 text-sm text-slate-400">
                      {isSaving && 'Saving your result...'}
                      {!isSaving && !saveError && 'Your result has been logged.'}
                      {saveError && <span className="text-rose-300">{saveError}</span>}
                    </div>
                    <button
                      onClick={resetForNewDay}
                      className="mt-8 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-6 py-3 font-medium text-white transition hover:bg-cyan-300/15"
                    >
                      Return to landing page
                    </button>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>

            <div className="order-3 xl:pt-10 xl:pl-4 2xl:pl-8">
              <FloatingGraph values={graphValues} lastResult={answerState} />
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}
