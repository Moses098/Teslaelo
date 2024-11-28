import React from 'react';
import { useAuthStore } from '../store/authStore';
import { CryptoCard } from '../components/CryptoCard';
import { TeslaSharesCard } from '../components/TeslaSharesCard';
import { CustomerSupport } from '../components/CustomerSupport';
import { Rocket } from 'lucide-react';
import { CRYPTO_CONFIG } from '../config/cryptoConfig';

export const Dashboard: React.FC = () => {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="space-y-8">
      {user.role === 'customer' && user.phrase && (
        <div className="bg-red-900/30 border border-red-700/50 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Rocket className="text-red-500 w-8 h-8" />
            <h3 className="text-xl font-bold text-white">Your Recovery Phrase</h3>
          </div>
          <p className="text-red-200 font-mono bg-red-950/50 p-4 rounded-lg">{user.phrase}</p>
          <p className="text-red-400 text-sm mt-4">
            Save this phrase securely. You'll need it to recover your account.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.keys(CRYPTO_CONFIG).map((crypto) => (
          <CryptoCard
            key={crypto}
            name={crypto as keyof typeof CRYPTO_CONFIG}
            balance={user.balance[crypto as keyof typeof user.balance]}
          />
        ))}
      </div>

      <TeslaSharesCard user={user} />
      
      {user.role === 'customer' && <CustomerSupport />}
    </div>
  );
};