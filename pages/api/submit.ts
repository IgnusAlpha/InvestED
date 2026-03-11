import type { NextApiRequest, NextApiResponse } from 'next';
import { activeQuiz } from '@/data/quizData';
import { appendQuizSubmission } from '@/lib/googleSheets';
import { formatPercentage, getCurrentDateParts } from '@/lib/utils';

type Body = {
  homeroom?: string;
  accessCode?: string;
  score?: number;
  totalQuestions?: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { homeroom, accessCode, score, totalQuestions } = req.body as Body;

    if (!homeroom || !accessCode || typeof score !== 'number' || typeof totalQuestions !== 'number') {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    if (!activeQuiz.homerooms.includes(homeroom)) {
      return res.status(400).json({ message: 'Invalid homeroom.' });
    }

    if (accessCode.trim() !== activeQuiz.accessCode) {
      return res.status(403).json({ message: 'Incorrect access code.' });
    }

    const dateParts = getCurrentDateParts();

    await appendQuizSubmission({
      ...dateParts,
      homeroom,
      score,
      totalQuestions,
      percentageCorrect: formatPercentage(score, totalQuestions),
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Could not save submission.' });
  }
}
