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
 * 1. Replace dateLabel, accessCode, and questions below.
 * 2. Keep exactly one active quiz in this file.
 * 3. Deploy again to Vercel after editing.
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
      explanation: 'A budget helps you plan where your money goes.',
    },
    {
      id: 'q2',
      prompt: 'Which option is usually the safest place to keep emergency savings?',
      choices: ['A savings account', 'A video game account', 'Cash hidden randomly', 'A risky meme coin'],
      correctIndex: 0,
      explanation: 'Emergency savings should be easy to access and low risk.',
    },
    {
      id: 'q3',
      prompt: 'If you earn interest on both your original savings and past interest, that is called:',
      choices: ['Inflation', 'Compound interest', 'Taxation', 'Depreciation'],
      correctIndex: 1,
      explanation: 'Compound interest means interest earns interest over time.',
    },
    {
      id: 'q4',
      prompt: 'Why is it risky to spend all your money as soon as you receive it?',
      choices: ['You may have nothing left for needs or emergencies', 'It improves your credit score', 'It lowers prices', 'It guarantees future income'],
      correctIndex: 0,
      explanation: 'Keeping some money aside gives you flexibility and security.',
    },
    {
      id: 'q5',
      prompt: 'What is the main benefit of comparing prices before buying something?',
      choices: ['It makes products disappear', 'It helps you find better value', 'It removes taxes', 'It increases your debt'],
      correctIndex: 1,
      explanation: 'Comparing prices helps you make smarter buying decisions.',
    },
    {
      id: 'q6',
      prompt: 'A need is best described as:',
      choices: ['Something essential like food or transport', 'Anything trending online', 'Any item with a discount', 'Something bought for fun'],
      correctIndex: 0,
      explanation: 'Needs are essential items required for daily living.',
    },
    {
      id: 'q7',
      prompt: 'What should you check before borrowing money?',
      choices: ['The interest rate and repayment terms', 'Only the logo', 'Whether your friends borrowed too', 'Just the color of the card'],
      correctIndex: 0,
      explanation: 'You should understand the total cost and terms before borrowing.',
    },
    {
      id: 'q8',
      prompt: 'Which habit can help build wealth over time?',
      choices: ['Saving regularly', 'Ignoring bank balances', 'Buying things impulsively', 'Spending every bonus immediately'],
      correctIndex: 0,
      explanation: 'Consistent saving can compound into meaningful progress.',
    },
  ],
};
