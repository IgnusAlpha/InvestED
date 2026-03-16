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
      prompt: 'Using the Rule of 72, roughly how many years does it take to double your money at a 6% annual return?',
      choices: ['6 years', '18 years', '12 years', '24 years'],
      correctIndex: 2,
      explanation: 'The Rule of 72 says divide 72 by your interest rate. 72 divided by 6 equals 12 years. Quick mental trick used by real investors.',
    },
    {
      id: 'q2',
      prompt: 'When interest rates rise, what typically happens to the price of existing bonds?',
      choices: ['They rise along with interest rates', 'They stay the same since the terms are already fixed', 'They fall', 'They become government property'],
      correctIndex: 2,
      explanation: 'Bond prices move opposite to interest rates. When rates go up, new bonds pay more, so older lower-paying bonds become less attractive and their price drops.',
    },
    {
      id: 'q3',
      prompt: 'You earn €30,000 and get a raise to €35,000, moving into a higher tax bracket. What gets taxed at the higher rate?',
      choices: ['Your entire €35,000 income', 'Nothing changes until next year', 'Only the extra €5,000 above the threshold', 'Your employer absorbs the difference'],
      correctIndex: 2,
      explanation: 'Tax brackets are marginal. Only the portion of income above the threshold is taxed at the higher rate, not your whole salary. A very common misconception.',
    },
    {
      id: 'q4',
      prompt: 'You own a house worth €200,000, €500 cash, and €2,000 in a savings account. Which asset is the least liquid?',
      choices: ['The savings account because it has withdrawal limits', 'The cash because its value can inflate away', 'The house because it takes time and effort to convert to cash', 'They are all equally liquid'],
      correctIndex: 2,
      explanation: 'Liquidity means how quickly you can convert an asset to cash without losing value. A house can take months to sell. Cash is instantly usable.',
    },
  ],
};
