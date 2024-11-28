export interface User {
  id: string;
  username: string;
  role: 'admin' | 'customer';
  phrase?: string;
  balance: {
    bitcoin: number;
    ethereum: number;
    solana: number;
    ton: number;
    usdt: number;
    tesla: number;
  };
  profile?: {
    email?: string;
    fullName?: string;
    country?: string;
    joinedAt: string;
  };
}

export interface WalletAddresses {
  bitcoin: string;
  ethereum: string;
  solana: string;
  ton: string;
  usdt: string;
}

export interface Message {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
  isAdmin: boolean;
}