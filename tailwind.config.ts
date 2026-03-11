import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: '#07111f',
        panel: 'rgba(13, 22, 38, 0.72)',
        accent: '#67e8f9',
        success: '#4ade80',
        danger: '#fb7185',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(103,232,249,.2), 0 0 40px rgba(56,189,248,.15)',
      },
      backgroundImage: {
        hero: 'radial-gradient(circle at top, rgba(56,189,248,.18), transparent 35%), radial-gradient(circle at 80% 20%, rgba(168,85,247,.16), transparent 28%), linear-gradient(180deg, #030712 0%, #07111f 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
