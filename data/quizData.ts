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
};

/**
 * DAILY UPDATE GUIDE
 * 1. Replace quizId, dateLabel, accessCode, and questions below.
 * 2. Keep exactly 4 questions per day.
 * 3. Push to GitHub and redeploy on Railway.
 */
export const activeQuiz: QuizConfig = {
  quizId: 'gmw-day-3',
  title: 'InvestED',
  subtitle: 'Global Money Week Quiz',
  dateLabel: 'Global Money Week - Day 3',
  accessCode: 'MONEYWEEK',
  homerooms: ['9V', '9I', '9S', '10V', '10I', '10S', '11V', '11I', '11S', '12V', '12I', '12S'],
  questions: [
    {
      id: 'q1',
      prompt: 'A company earns €600,000 in revenue and has €480,000 in total costs. What is its profit margin?',
      choices: ['80%', '8%', '20%', '12%'],
      correctIndex: 2,
      explanation: 'Profit = €600,000 - €480,000 = €120,000. Profit margin = profit divided by revenue. €120,000 / €600,000 = 20%. Revenue and profit are not the same thing.',
    },
    {
      id: 'q2',
      prompt: 'A company pays a €3 dividend per share. You own 200 shares. How much do you receive?',
      choices: ['€203', '€600', '€197', '€300'],
      correctIndex: 1,
      explanation: 'Dividends are paid per share you own. €3 multiplied by 200 shares = €600. Dividends are a way companies share profits directly with investors.',
    },
    {
      id: 'q3',
      prompt: 'An investor short sells 100 shares at €50. The price drops to €35 and they close their position. What is their profit?',
      choices: ['They lose €1,500', 'They profit €1,500', 'They profit €3,500', 'They break even'],
      correctIndex: 1,
      explanation: 'Short selling means borrowing shares to sell high, then buying them back cheaper. Sold at €50, bought back at €35. Profit = €15 per share x 100 shares = €1,500.',
    },
    {
      id: 'q4',
      prompt: 'A company has 5 million shares outstanding, each trading at €40. What is its market capitalisation?',
      choices: ['€40 million', '€45 million', '€200 million', '€2 billion'],
      correctIndex: 2,
      explanation: 'Market cap = share price multiplied by total shares outstanding. €40 x 5,000,000 = €200,000,000 which is €200 million. Market cap shows the total market value of a company.',
    },
  ],
};
