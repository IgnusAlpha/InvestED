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
      prompt: 'You get paid and immediately split your money into bills, spending, and savings. What habit does this best describe?',
      choices: ['Impulse control', 'Paying yourself first', 'Budgeting', 'Cash flow management'],
      correctIndex: 2,
      explanation: 'Splitting income into categories right away is budgeting. "Paying yourself first" specifically means putting savings aside before anything else, which is close but not quite the same thing.',
    },
    {
      id: 'q2',
      prompt: 'Which of these best explains why keeping all your savings in cash at home is a bad idea long term?',
      choices: ['It is illegal in most countries', 'Inflation slowly reduces what that cash can actually buy', 'Banks will charge you a penalty for not using them', 'Cash at home earns negative interest'],
      correctIndex: 1,
      explanation: 'Cash sitting at home earns nothing while prices rise around it. Over years, the same amount buys less and less. This is the silent cost of doing nothing with your money.',
    },
    {
      id: 'q3',
      prompt: 'A friend says "I do not need to save now, I will earn more later and save then." What is the main flaw in this thinking?',
      choices: ['Saving early is only useful if interest rates are high', 'They are right - income is the most important factor', 'Time in the market matters more than amount - starting late costs more than people realise', 'Future earnings are always higher so the logic is sound'],
      correctIndex: 2,
      explanation: 'The earlier you start saving, the more time compound interest has to work. Waiting even 5 years can cost tens of thousands in lost growth. Starting small early beats starting big late.',
    },
    {
      id: 'q4',
      prompt: 'What is the key difference between a current account and a savings account?',
      choices: ['A savings account lets you spend freely, a current account locks funds away', 'They are essentially the same product offered by different banks', 'A current account is for daily spending, a savings account earns interest over time', 'Savings accounts are only available to people over 18'],
      correctIndex: 2,
      explanation: 'Current accounts are designed for everyday transactions. Savings accounts are meant to hold money longer term and typically pay interest as a reward for leaving it there.',
    },
  ],
};
