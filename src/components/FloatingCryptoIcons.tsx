import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { CRYPTO_CONFIG } from '../config/cryptoConfig';

interface FloatingIconProps {
  src: string;
  delay: number;
  x: number;
}

const FloatingIcon: React.FC<FloatingIconProps> = ({ src, delay, x }) => {
  const props = useSpring({
    from: { y: -20, opacity: 0 },
    to: async (next) => {
      while (true) {
        await next({ y: 20, opacity: 0.8 });
        await next({ y: -20, opacity: 0.2 });
      }
    },
    delay,
    config: { duration: 3000 }
  });

  return (
    <animated.img
      src={src}
      style={{
        ...props,
        position: 'fixed',
        left: `${x}%`,
        width: '32px',
        height: '32px',
        filter: 'blur(1px)',
        pointerEvents: 'none'
      }}
      alt="Floating crypto icon"
    />
  );
};

export const FloatingCryptoIcons: React.FC = () => {
  return (
    <>
      {Object.values(CRYPTO_CONFIG).map((crypto, index) => (
        <FloatingIcon
          key={crypto.symbol}
          src={crypto.logo}
          delay={index * 500}
          x={15 + (index * 20)}
        />
      ))}
    </>
  );
};