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
      prompt: 'Inflation is running at 4% per year but your savings account only pays 1% interest. What happens to the real value of your money?',
      choices: ['It grows slowly but safely', 'It stays exactly the same', 'It loses purchasing power over time', 'It doubles every year'],
      correctIndex: 2,
      explanation: 'When inflation is higher than your interest rate, your money buys less over time even though the number in your account goes up.',
    },
    {
      id: 'q2',
      prompt: 'What does it mean to diversify your investments?',
      choices: ['Put all your money into one reliable stock', 'Spread money across different assets to reduce risk', 'Only invest in businesses from your own country', 'Avoid investing and keep everything in cash'],
      correctIndex: 1,
      explanation: 'Diversifying means not putting all your eggs in one basket. If one investment drops, others can cushion the loss.',
    },
    {
      id: 'q3',
      prompt: 'If you only pay the minimum amount due on a credit card each month, what usually happens?',
      choices: ['Your debt clears faster than expected', 'Your interest rate is automatically reduced', 'You end up paying much more than the original amount', 'The remaining balance is written off after a year'],
      correctIndex: 2,
      explanation: 'Paying only the minimum means interest keeps building on the rest. A small debt can cost you far more over time.',
    },
    {
      id: 'q4',
      prompt: 'What is "opportunity cost"?',
      choices: ['A fee charged when opening a bank account', 'The value of the best alternative you gave up when making a choice', 'A discount offered during a sale', 'The total cost of an investment including tax'],
      correctIndex: 1,
      explanation: 'Every financial choice means giving something else up. That "something else" is your opportunity cost. For example, spending money on a night out means you cannot invest it.',
    },
  ],
};
