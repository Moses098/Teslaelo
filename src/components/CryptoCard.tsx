import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { ArrowUpRight, Download, Send, Copy, X, TrendingUp } from 'lucide-react';
import { WALLET_ADDRESSES } from '../config/walletAddresses';
import { CRYPTO_CONFIG } from '../config/cryptoConfig';
import { useCryptoRates } from '../services/cryptoRates';

interface CryptoCardProps {
  name: keyof typeof WALLET_ADDRESSES;
  balance: number;
}

export const CryptoCard: React.FC<CryptoCardProps> = ({ name, balance }) => {
  const [showAddress, setShowAddress] = useState(false);
  const { rates, isLoading } = useCryptoRates();
  
  const [props, api] = useSpring(() => ({
    from: { transform: 'scale(1)' },
    config: { tension: 300, friction: 10 }
  }));

  const handleHover = () => {
    api.start({
      from: { transform: 'scale(1)' },
      to: [
        { transform: 'scale(1.02)' },
        { transform: 'scale(1)' }
      ]
    });
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(WALLET_ADDRESSES[name]);
  };

  const crypto = CRYPTO_CONFIG[name];
  const currentRate = rates[name];
  const balanceUSD = balance * currentRate;

  return (
    <animated.div
      style={props}
      onMouseEnter={handleHover}
      className="bg-gray-800/90 backdrop-blur-sm rounded-lg p-6 hover:shadow-lg transition-all relative border border-gray-700/50"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img 
            src={crypto.logo} 
            alt={crypto.name} 
            className="w-10 h-10 animate-pulse"
          />
          <div>
            <h3 className="text-xl font-semibold text-white">{crypto.name}</h3>
            <p className={`text-sm ${crypto.color}`}>{crypto.symbol}</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-white">
            {balance} {crypto.symbol}
          </span>
          <div className="flex items-center gap-2 justify-end mt-1">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm text-gray-400">
              {isLoading ? 'Loading...' : `$${currentRate.toLocaleString()}`}
            </span>
          </div>
          <p className="text-sm text-gray-400">
            ≈ ${balanceUSD.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <button
          onClick={() => setShowAddress(true)}
          className="flex-1 flex items-center justify-center gap-2 bg-gray-700/50 hover:bg-gray-600 text-white rounded-lg px-4 py-2 transition-colors backdrop-blur-sm"
        >
          <Download size={18} />
          Deposit
        </button>
        <button
          className="flex-1 flex items-center justify-center gap-2 bg-gray-700/50 hover:bg-gray-600 text-white rounded-lg px-4 py-2 transition-colors backdrop-blur-sm"
        >
          <ArrowUpRight size={18} />
          Withdraw
        </button>
        <button
          className="flex-1 flex items-center justify-center gap-2 bg-gray-700/50 hover:bg-gray-600 text-white rounded-lg px-4 py-2 transition-colors backdrop-blur-sm"
        >
          <Send size={18} />
          Send
        </button>
      </div>

      {showAddress && (
        <div className="absolute inset-0 bg-gray-800/95 backdrop-blur-sm rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-white">
              Deposit {crypto.name}
            </h4>
            <button
              onClick={() => setShowAddress(false)}
              className="text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
          <div className="space-y-4">
            <div className="bg-gray-700/50 backdrop-blur-sm rounded p-3">
              <p className="text-sm text-gray-400 mb-2">Deposit Address:</p>
              <div className="flex items-center justify-between gap-2">
                <code className="text-sm text-white break-all">
                  {WALLET_ADDRESSES[name]}
                </code>
                <button
                  onClick={copyAddress}
                  className="text-gray-400 hover:text-white flex-shrink-0"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Only send {crypto.name} ({crypto.symbol}) to this address. Sending any other cryptocurrency may result in permanent loss.
            </p>
          </div>
        </div>
      )}
    </animated.div>
  );
};