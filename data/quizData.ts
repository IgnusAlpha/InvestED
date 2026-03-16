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
      prompt: 'What does it mean to own a share in a company?',
      choices: ['You are guaranteed a profit every year', 'You own a small piece of that company and share in its gains and losses', 'You lend money to the company and earn fixed interest', 'You can instruct the CEO on business decisions'],
      correctIndex: 1,
      explanation: 'A share represents part ownership of a company. If it does well, your share grows in value. If it does badly, it can lose value. No guarantees.',
    },
    {
      id: 'q2',
      prompt: 'You borrow €1,000 at 10% simple interest per year for 2 years. How much do you owe in total at the end?',
      choices: ['€1,100', '€1,210', '€1,200', '€1,020'],
      correctIndex: 2,
      explanation: 'Simple interest is calculated only on the original amount. 10% of €1,000 is €100 per year, so over 2 years that is €200 extra. Total: €1,200. Note: €1,210 would be compound interest.',
    },
    {
      id: 'q3',
      prompt: 'Which of these is an example of a personal asset?',
      choices: ['A student loan you still owe', 'A monthly subscription you pay', 'A savings account with €500 in it', 'A credit card balance you have not paid'],
      correctIndex: 2,
      explanation: 'An asset is something you own that has value. A savings account holds your money. Loans and unpaid balances are liabilities, meaning money you owe.',
    },
    {
      id: 'q4',
      prompt: 'What is the main purpose of having insurance?',
      choices: ['To grow your money through investments', 'To guarantee you make a profit if something goes wrong', 'To protect you from large unexpected financial losses', 'To reduce the taxes you pay each year'],
      correctIndex: 2,
      explanation: 'Insurance does not make you money. Its job is to protect you from a financial disaster you could not afford to cover on your own, like a car crash or medical emergency.',
    },
  ],
};
