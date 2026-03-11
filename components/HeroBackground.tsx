import { motion } from 'framer-motion';

export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[0, 1, 2].map((item) => (
        <motion.div
          key={item}
          className="absolute rounded-full border border-cyan-300/10"
          initial={{ scale: 0.8, opacity: 0.15 }}
          animate={{ scale: [0.9, 1.15, 0.95], opacity: [0.1, 0.22, 0.1] }}
          transition={{ duration: 7 + item * 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: `${240 + item * 140}px`,
            height: `${240 + item * 140}px`,
            left: '50%',
            top: '50%',
            x: '-50%',
            y: '-50%',
          }}
        />
      ))}
    </div>
  );
}
