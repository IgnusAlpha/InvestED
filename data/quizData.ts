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
  quizId: 'gmw-day-1',
  title: 'InvestED',
  subtitle: 'Global Money Week Quiz',
  dateLabel: 'Global Money Week - Day 1',
  accessCode: 'MONEYWEEK',
  homerooms: ['9V', '9I', '9S', '10V', '10I', '10S', '11V', '11I', '11S', '12V', '12I', '12S'],
  questions: [
    {
      id: 'q1',
      prompt: 'What does a budget help you do?',
      choices: ['Spend faster', 'Track income and expenses', 'Avoid saving money', 'Borrow more often'],
      correctIndex: 1,
      explanation: 'A budget helps you plan where your money goes so you stay in control of your finances.',
    },
    {
      id: 'q2',
      prompt: 'Which is usually the safest place to keep emergency savings?',
      choices: ['A savings account', 'A video game account', 'Cash hidden at home', 'A risky investment'],
      correctIndex: 0,
      explanation: 'A savings account is low risk and easy to access when you need it most.',
    },
    {
      id: 'q3',
      prompt: 'What is compound interest?',
      choices: ['Paying tax on savings', 'Earning interest on your interest', 'A fee for spending money', 'A type of loan'],
      correctIndex: 1,
      explanation: 'Compound interest means your interest earns more interest over time, growing your money faster.',
    },
    {
      id: 'q4',
      prompt: 'A "need" is best described as:',
      choices: ['Something essential like food or transport', 'Anything trending online', 'Something bought for fun', 'Any item with a discount'],
      correctIndex: 0,
      explanation: 'Needs are things required for everyday life. Wants are extras. Knowing the difference helps you budget smarter.',
    },
  ],
};
