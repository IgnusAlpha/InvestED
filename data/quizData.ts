export type QuizQuestion = {
  id: string;
  prompt: string;
  choices: string[];
  correctIndex: number;
  explanation?: string;
};

export type QuizConfig = {
  quizId: string;
  title: string;
  subtitle: string;
  dateLabel: string;
  accessCode: string;
  homerooms: string[];
  questions: QuizQuestion[];
  isFinalDay?: boolean;
};

/**
 * DAILY UPDATE GUIDE
 * 1. Replace quizId, dateLabel, accessCode, and questions below.
 * 2. Keep exactly 4 questions per day.
 * 3. Push to GitHub and redeploy on Railway.
 */
export const activeQuiz: QuizConfig = {
  quizId: 'gmw-day-4',
  title: 'InvestED',
  subtitle: 'Global Money Week Quiz',
  dateLabel: 'Global Money Week - Final Day',
  accessCode: 'MONEYWEEK',
  isFinalDay: true,
  homerooms: ['9V', '9I', '9S', '10V', '10I', '10S', '11V', '11I', '11S', '12V', '12I', '12S', 'TEST'],
  questions: [
    {
      id: 'q1',
      prompt: 'What does ROI stand for, and what does it measure?',
      choices: ['Rate of Inflation - how fast prices rise each year', 'Return on Investment - how much profit you made relative to what you put in', 'Risk of Insolvency - the likelihood a company cannot pay its debts', 'Revenue over Income - the ratio of sales to total earnings'],
      correctIndex: 1,
      explanation: 'ROI is one of the most commonly used measures in finance. It tells you how efficient an investment was. If you put in €100 and got back €120, your ROI is 20%.',
    },
    {
      id: 'q2',
      prompt: 'What is the main purpose of a pension?',
      choices: ['A short-term savings account for large purchases', 'A government fine paid throughout your working life', 'A long-term savings plan that provides income when you retire', 'An insurance policy that pays out if you lose your job'],
      correctIndex: 2,
      explanation: 'A pension is built up over your working years so that when you stop working you still have a regular income. Starting contributions early makes an enormous difference to what you end up with.',
    },
    {
      id: 'q3',
      prompt: 'What does it mean when a company "goes public"?',
      choices: ['The company is being investigated by a financial regulator', 'The company releases its annual results to the media', 'The company offers shares to the public on a stock exchange for the first time', 'The company expands its operations into international markets'],
      correctIndex: 2,
      explanation: 'Going public, also called an IPO (Initial Public Offering), means a private company sells shares to outside investors for the first time. It is a major milestone and raises large amounts of capital.',
    },
    {
      id: 'q4',
      prompt: 'Which statement about risk and return in investing is most accurate?',
      choices: ['Higher risk always guarantees higher returns', 'Risk and return have no proven relationship in modern markets', 'Lower risk investments always lose money over time', 'Generally, higher potential returns come with higher potential risk'],
      correctIndex: 3,
      explanation: 'The risk-return tradeoff is a core investing principle. You cannot expect big returns without accepting more risk. Safe investments like bonds offer stability but lower growth.',
    },
  ],
};
