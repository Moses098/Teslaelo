import { Bitcoin, Coins, CircleDollarSign } from 'lucide-react';

export const CRYPTO_CONFIG = {
  bitcoin: {
    name: 'Bitcoin',
    symbol: 'BTC',
    logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg',
    color: 'text-orange-500'
  },
  ethereum: {
    name: 'Ethereum',
    symbol: 'ETH',
    logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg',
    color: 'text-blue-500'
  },
  solana: {
    name: 'Solana',
    symbol: 'SOL',
    logo: 'https://cryptologos.cc/logos/solana-sol-logo.svg',
    color: 'text-purple-500'
  },
  ton: {
    name: 'Toncoin',
    symbol: 'TON',
    logo: 'https://cryptologos.cc/logos/toncoin-ton-logo.svg',
    color: 'text-cyan-500'
  },
  usdt: {
    name: 'Tether',
    symbol: 'USDT',
    logo: 'https://cryptologos.cc/logos/tether-usdt-logo.svg',
    color: 'text-green-500'
  }
} as const;