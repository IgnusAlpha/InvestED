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
  quizId: 'gmw-day-2',
  title: 'InvestED',
  subtitle: 'Global Money Week Quiz',
  dateLabel: 'Global Money Week - Day 2',
  accessCode: 'MONEYWEEK',
  homerooms: ['9V', '9I', '9S', '10V', '10I', '10S', '11V', '11I', '11S', '12V', '12I', '12S'],
  questions: [
    {
      id: 'q1',
      prompt: 'A stock is trading at €50 and the company earns €5 per share. What is its Price-to-Earnings (P/E) ratio?',
      choices: ['5', '250', '45', '10'],
      correctIndex: 3,
      explanation: 'The P/E ratio = share price divided by earnings per share. €50 divided by €5 = 10. Investors use the P/E ratio to judge whether a stock is cheap or expensive relative to its earnings.',
    },
    {
      id: 'q2',
      prompt: 'You have €5,000 in savings, a car worth €8,000, and €12,000 in student loans. What is your net worth?',
      choices: ['€13,000', '€25,000', '€1,000', '-€4,000'],
      correctIndex: 2,
      explanation: 'Net worth = assets minus liabilities. €5,000 + €8,000 = €13,000 in assets. Minus €12,000 in debt = €1,000. Many people forget to subtract what they owe.',
    },
    {
      id: 'q3',
      prompt: 'When a central bank raises interest rates, what is it primarily trying to control?',
      choices: ['Rising unemployment', 'A falling stock market', 'High inflation', 'Government debt levels'],
      correctIndex: 2,
      explanation: 'Higher interest rates make borrowing more expensive, so people spend less. Less spending slows price rises. Central banks raise rates specifically to cool down inflation.',
    },
    {
      id: 'q4',
      prompt: 'Investing €100 every month no matter what the market is doing is known as:',
      choices: ['Market timing', 'Hedging your portfolio', 'Dollar cost averaging', 'Leveraged investing'],
      correctIndex: 2,
      explanation: 'Dollar cost averaging means investing a fixed amount regularly. When prices drop you automatically buy more shares for the same money. It removes the pressure of trying to time the market perfectly.',
    },
  ],
};
