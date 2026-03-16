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
      prompt: 'Inflation is 4% per year but your savings account pays 1% interest. What happens to the real value of your money?',
      choices: ['It still grows because 1% is positive', 'It loses purchasing power over time', 'The bank compensates the difference automatically', 'It depends on how much you have saved'],
      correctIndex: 1,
      explanation: 'Even though your balance number goes up by 1%, prices rise 4% faster. So your money actually buys less each year.',
    },
    {
      id: 'q2',
      prompt: 'What does it mean to diversify your investments?',
      choices: ['Focus on one sector you know really well', 'Move money between accounts frequently', 'Spread money across different assets to reduce risk', 'Invest only in low-risk government bonds'],
      correctIndex: 2,
      explanation: 'Diversifying means not putting all your eggs in one basket. If one investment drops, others can cushion the loss.',
    },
    {
      id: 'q3',
      prompt: 'If you only pay the minimum amount due on a credit card each month, what usually happens?',
      choices: ['You avoid all interest charges', 'Your credit score improves the fastest this way', 'You end up paying far more than the original amount', 'The bank splits the remaining balance interest-free'],
      correctIndex: 2,
      explanation: 'Paying only the minimum means interest keeps piling on the rest of the balance. A small debt can quietly grow into a much bigger one.',
    },
    {
      id: 'q4',
      prompt: 'What is "opportunity cost"?',
      choices: ['The profit made from picking the right investment', 'The value of the best option you gave up when making a choice', 'A hidden fee banks charge on transactions', 'The total amount spent on a purchase including tax'],
      correctIndex: 1,
      explanation: 'Every financial choice means giving something else up. That trade-off is your opportunity cost. Spending money on one thing means you cannot use it for something else.',
    },
  ],
};
