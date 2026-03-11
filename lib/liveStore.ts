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

function getStore(): StoreShape {
  const globalWithStore = globalThis as typeof globalThis & { [GLOBAL_KEY]?: StoreShape };

  if (!globalWithStore[GLOBAL_KEY]) {
    globalWithStore[GLOBAL_KEY] = { byQuiz: {} };
  }

  return globalWithStore[GLOBAL_KEY] as StoreShape;
}

export function upsertLiveHomeroom(params: {
  quizId: string;
  homeroom: string;
  score: number;
  answered: number;
  totalQuestions: number;
}) {
  const store = getStore();

  if (!store.byQuiz[params.quizId]) {
    store.byQuiz[params.quizId] = {};
  }

  store.byQuiz[params.quizId][params.homeroom] = {
    homeroom: params.homeroom,
    score: params.score,
    answered: params.answered,
    totalQuestions: params.totalQuestions,
    updatedAt: Date.now(),
  };
}

export function getLiveLeaderboard(quizId: string) {
  const store = getStore();
  const entries = Object.values(store.byQuiz[quizId] || {});

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
