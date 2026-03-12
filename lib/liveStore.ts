type HomeroomState = {
  homeroom: string;
  score: number;
  answered: number;
  totalQuestions: number;
  updatedAt: number;
};

const GLOBAL_KEY = '__INVESTED_LIVE_STORE__';

type StoreShape = {
  byQuiz: Record<string, Record<string, HomeroomState>>;
};

function getScopedQuizId(quizId: string, leaderboardKey: string) {
  return `${quizId}::${leaderboardKey}`;
}

function getStore(): StoreShape {
  const globalWithStore = globalThis as typeof globalThis & { [GLOBAL_KEY]?: StoreShape };

  if (!globalWithStore[GLOBAL_KEY]) {
    globalWithStore[GLOBAL_KEY] = { byQuiz: {} };
  }

  return globalWithStore[GLOBAL_KEY] as StoreShape;
}

export function upsertLiveHomeroom(params: {
  quizId: string;
  leaderboardKey: string;
  homeroom: string;
  score: number;
  answered: number;
  totalQuestions: number;
}) {
  const store = getStore();
  const scopedQuizId = getScopedQuizId(params.quizId, params.leaderboardKey);

  if (!store.byQuiz[scopedQuizId]) {
    store.byQuiz[scopedQuizId] = {};
  }

  store.byQuiz[scopedQuizId][params.homeroom] = {
    homeroom: params.homeroom,
    score: params.score,
    answered: params.answered,
    totalQuestions: params.totalQuestions,
    updatedAt: Date.now(),
  };
}

export function getLiveLeaderboard(quizId: string, leaderboardKey: string) {
  const store = getStore();
  const scopedQuizId = getScopedQuizId(quizId, leaderboardKey);
  const entries = Object.values(store.byQuiz[scopedQuizId] || {});

  return entries
    .map((entry) => ({
      ...entry,
      percentage: entry.answered > 0 ? Math.round((entry.score / entry.answered) * 100) : 0,
    }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (b.percentage !== a.percentage) return b.percentage - a.percentage;
      return a.homeroom.localeCompare(b.homeroom);
    })
    .map((entry, index) => ({ ...entry, rank: index + 1 }));
}

export function clearLiveLeaderboard(quizId: string) {
  const store = getStore();
  store.byQuiz[quizId] = {};
}
