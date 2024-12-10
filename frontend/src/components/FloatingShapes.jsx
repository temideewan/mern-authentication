import { motion } from 'framer-motion';
export default function FloatingShape({ color, size, top, left, delay }) {
  return (
    <motion.div
      className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl`}
      style={{top, left}}
      animate={{
        y: ['0%', '100%', '0%'],
        x: ['0%', '100%', '0%'],
        rotate: [0, 360],
      }}
      transition={{ ease: 'linear', repeat: Infinity, duration: 20, delay }}
      aria-hidden={true}
    />
  );
}
