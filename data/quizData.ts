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
      prompt: 'The 50/30/20 budgeting rule splits your income three ways. What does the 20% represent?',
      choices: ['Entertainment and dining out', 'Essential bills like rent and food', 'Savings and paying off debt', 'Taxes and government contributions'],
      correctIndex: 2,
      explanation: '50% goes to needs, 30% to wants, and 20% to savings and debt repayment. The 50/30/20 rule is one of the simplest frameworks for managing your money.',
    },
    {
      id: 'q2',
      prompt: 'A bank pays 2% interest to savers but charges 7% on loans. How does the bank make its profit?',
      choices: ['By investing deposits in government property', 'By keeping the 5% difference between what it pays savers and charges borrowers', 'By printing extra money when demand is high', 'By charging a flat fee on every transaction'],
      correctIndex: 1,
      explanation: 'This difference is called the interest rate spread. Banks borrow money cheaply from savers and lend it out at a higher rate. The gap in between is how they earn.',
    },
    {
      id: 'q3',
      prompt: 'Which investment typically offers higher potential returns but also carries higher risk?',
      choices: ['A fixed-term savings account', 'A government bond', 'Company shares', 'Cash in a current account'],
      correctIndex: 2,
      explanation: 'Shares can grow significantly if a company does well, but can also fall in value. Savings accounts and government bonds are safer but usually offer lower returns.',
    },
    {
      id: 'q4',
      prompt: 'How many months of living expenses do financial advisors typically recommend keeping in an emergency fund?',
      choices: ['2 weeks', '1 month', '3 to 6 months', 'At least 2 years'],
      correctIndex: 2,
      explanation: '3 to 6 months gives you enough time to recover from a job loss, unexpected bill, or emergency without going into debt. Too little leaves you exposed, too much means money sitting idle.',
    },
  ],
};
