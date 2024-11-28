import React from 'react';
import { useSpring, animated } from '@react-spring/web';

export const AnimatedBackground: React.FC = () => {
  const [{ background }] = useSpring(() => ({
    from: { background: 'linear-gradient(120deg, #000428, #004e92)' },
    to: [
      { background: 'linear-gradient(120deg, #2E1437, #ff0844)' },
      { background: 'linear-gradient(120deg, #000428, #004e92)' },
      { background: 'linear-gradient(120deg, #1a2a6c, #b21f1f)' }
    ],
    loop: true,
    config: { duration: 10000 }
  }));

  return (
    <animated.div
      style={{ background }}
      className="fixed inset-0 -z-10"
    />
  );
};