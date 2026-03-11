import type { NextApiRequest, NextApiResponse } from 'next';
import { activeQuiz } from '@/data/quizData';
import { getLiveLeaderboard, upsertLiveHomeroom } from '@/lib/liveStore';

type Body = {
  homeroom?: string;
  accessCode?: string;
  score?: number;
  answered?: number;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json({ leaderboard: getLiveLeaderboard(activeQuiz.quizId) });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { homeroom, accessCode, score, answered } = req.body as Body;

  if (!homeroom || !accessCode || typeof score !== 'number' || typeof answered !== 'number') {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  if (!activeQuiz.homerooms.includes(homeroom)) {
    return res.status(400).json({ message: 'Invalid homeroom.' });
  }

  if (accessCode.trim() !== activeQuiz.accessCode) {
    return res.status(403).json({ message: 'Incorrect access code.' });
  }

  upsertLiveHomeroom({
    quizId: activeQuiz.quizId,
    homeroom,
    score,
    answered,
    totalQuestions: activeQuiz.questions.length,
  });

  return res.status(200).json({ leaderboard: getLiveLeaderboard(activeQuiz.quizId) });
}
