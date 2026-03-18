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
      prompt: 'What is the difference between gross income and net income?',
      choices: ['Gross is your annual salary, net is your monthly take-home', 'Gross is income before deductions, net is what you actually receive after tax', 'Net is your total earnings, gross is what remains after expenses', 'They are the same unless you are self-employed'],
      correctIndex: 1,
      explanation: 'Gross income is your total earnings before anything is deducted. Net income is what lands in your account after tax and other deductions. Most people confuse the two when budgeting.',
    },
    {
      id: 'q2',
      prompt: 'What does it mean when a stock is described as overvalued?',
      choices: ['The company is performing exceptionally well above expectations', 'The stock has recently split, making each share cost more', 'The share price is trading higher than the company\'s fundamentals justify', 'The company has issued too many shares to the public'],
      correctIndex: 2,
      explanation: 'Overvalued means investors are paying more for the stock than the company\'s actual earnings, assets, or growth prospects warrant. It is a signal to be cautious, not a sign of strength.',
    },
    {
      id: 'q3',
      prompt: 'What best describes a bull market?',
      choices: ['A short period of high volatility before a major crash', 'A market dominated by large institutional investors buying in bulk', 'A sustained period of rising prices and growing investor confidence', 'A market where only government bonds are performing well'],
      correctIndex: 2,
      explanation: 'A bull market means prices are generally rising and investors are optimistic. The opposite is a bear market, where prices are falling. Both terms are used constantly in financial news.',
    },
    {
      id: 'q4',
      prompt: 'What is the main function of a stock exchange?',
      choices: ['To set interest rates and control the money supply', 'To insure investors against losses on their portfolios', 'To provide a regulated marketplace where shares can be bought and sold', 'To issue new currency on behalf of the government'],
      correctIndex: 2,
      explanation: 'A stock exchange like the NYSE or London Stock Exchange is simply a regulated platform connecting buyers and sellers of shares. It does not set rates, issue money, or protect against losses.',
    },
  ],
};
