import React, { useState } from 'react';
import { hasMinimumBalance } from '../utils/balanceUtils';
import { User } from '../types';
import { TrendingUp } from 'lucide-react';

interface TeslaSharesCardProps {
  user: User;
}

export const TeslaSharesCard: React.FC<TeslaSharesCardProps> = ({ user }) => {
  const [showPurchaseError, setShowPurchaseError] = useState(false);
  const teslaPrice = user.role === 'admin' ? 0 : 180.75; // Price controlled by admin in a real app

  const handleBuyShares = () => {
    if (!hasMinimumBalance(user.balance)) {
      setShowPurchaseError(true);
      setTimeout(() => setShowPurchaseError(false), 3000);
      return;
    }
    alert('Please contact support to process your Tesla shares purchase.');
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <img
          src="https://logo.clearbit.com/tesla.com"
          alt="Tesla"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h3 className="text-xl font-bold text-white">Tesla Shares</h3>
          <div className="flex items-center gap-2 mt-1">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm text-gray-400">
              ${teslaPrice.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400">Current Holdings</p>
          <p className="text-2xl font-bold text-white">{user.balance.tesla} shares</p>
          <p className="text-sm text-gray-400">
            ≈ ${(user.balance.tesla * teslaPrice).toLocaleString()}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <button
            onClick={handleBuyShares}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            Buy Shares
          </button>
          {showPurchaseError && (
            <p className="text-red-400 text-sm mt-2">
              You need to deposit crypto assets first
            </p>
          )}
        </div>
      </div>
    </div>
  );
};