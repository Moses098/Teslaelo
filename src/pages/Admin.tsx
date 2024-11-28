import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useMessageStore } from '../store/messageStore';
import { User } from '../types';
import { MessageCircle, Users } from 'lucide-react';

interface CustomerData extends User {
  unreadMessages?: number;
}

// Simulated customer data (in a real app, this would come from a backend)
const MOCK_CUSTOMERS: CustomerData[] = [
  {
    id: 'user1',
    username: 'John Doe',
    role: 'customer',
    balance: { bitcoin: 0, ethereum: 0, solana: 0, ton: 0, usdt: 0, tesla: 0 },
    profile: {
      email: 'john@example.com',
      fullName: 'John Doe',
      country: 'United States',
      joinedAt: '2024-03-15T10:30:00Z'
    }
  },
  {
    id: 'user2',
    username: 'Jane Smith',
    role: 'customer',
    balance: { bitcoin: 0, ethereum: 0, solana: 0, ton: 0, usdt: 0, tesla: 0 },
    profile: {
      email: 'jane@example.com',
      fullName: 'Jane Smith',
      country: 'Canada',
      joinedAt: '2024-03-14T15:45:00Z'
    }
  }
];

export const Admin: React.FC = () => {
  const { user } = useAuthStore();
  const { getMessages, addMessage } = useMessageStore();
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [replyMessage, setReplyMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'profile' | 'balance' | 'support'>('profile');
  const [balanceUpdates, setBalanceUpdates] = useState<User['balance']>({
    bitcoin: 0,
    ethereum: 0,
    solana: 0,
    ton: 0,
    usdt: 0,
    tesla: 0
  });

  if (user?.role !== 'admin') return null;

  const selectedCustomer = MOCK_CUSTOMERS.find(c => c.id === selectedUser);
  const customerMessages = selectedUser ? getMessages(selectedUser) : [];

  const handleUpdateBalance = () => {
    console.log('Updating balance for user:', selectedUser, balanceUpdates);
    alert('Balance updated successfully!');
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim() || !selectedUser) return;
    
    addMessage(selectedUser, replyMessage, true);
    setReplyMessage('');
  };

  return (
    <div className="space-y-8">
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Admin Dashboard</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Select Customer
            </label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select a customer...</option>
              {MOCK_CUSTOMERS.map(customer => (
                <option key={customer.id} value={customer.id}>
                  {customer.profile?.fullName || customer.username}
                </option>
              ))}
            </select>
          </div>

          {selectedCustomer && (
            <>
              <div className="flex border-b border-gray-700">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`px-4 py-2 ${
                    activeTab === 'profile'
                      ? 'border-b-2 border-red-500 text-white'
                      : 'text-gray-400'
                  }`}
                >
                  <Users className="inline-block mr-2" size={18} />
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('balance')}
                  className={`px-4 py-2 ${
                    activeTab === 'balance'
                      ? 'border-b-2 border-red-500 text-white'
                      : 'text-gray-400'
                  }`}
                >
                  Balance
                </button>
                <button
                  onClick={() => setActiveTab('support')}
                  className={`px-4 py-2 ${
                    activeTab === 'support'
                      ? 'border-b-2 border-red-500 text-white'
                      : 'text-gray-400'
                  }`}
                >
                  <MessageCircle className="inline-block mr-2" size={18} />
                  Support
                </button>
              </div>

              {activeTab === 'profile' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400">
                        Full Name
                      </label>
                      <p className="text-white">
                        {selectedCustomer.profile?.fullName}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400">
                        Email
                      </label>
                      <p className="text-white">
                        {selectedCustomer.profile?.email}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400">
                        Country
                      </label>
                      <p className="text-white">
                        {selectedCustomer.profile?.country}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400">
                        Joined
                      </label>
                      <p className="text-white">
                        {new Date(selectedCustomer.profile?.joinedAt || '').toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'balance' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(balanceUpdates).map(([asset, value]) => (
                      <div key={asset} className="space-y-2">
                        <label className="block text-sm font-medium text-gray-400 capitalize">
                          {asset === 'tesla' ? 'Tesla Shares' : `${asset} Balance`}
                        </label>
                        <input
                          type="number"
                          min="0"
                          step={asset === 'tesla' ? '1' : '0.000001'}
                          value={value}
                          onChange={(e) => setBalanceUpdates(prev => ({
                            ...prev,
                            [asset]: parseFloat(e.target.value) || 0
                          }))}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleUpdateBalance}
                    className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Update Customer Balance
                  </button>
                </div>
              )}

              {activeTab === 'support' && (
                <div className="space-y-4">
                  <div className="h-64 overflow-y-auto bg-gray-900 rounded-lg p-4 space-y-4">
                    {customerMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.isAdmin ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`rounded-lg px-4 py-2 max-w-[80%] ${
                            msg.isAdmin
                              ? 'bg-red-600 text-white'
                              : 'bg-gray-700 text-white'
                          }`}
                        >
                          <p>{msg.content}</p>
                          <span className="text-xs opacity-75">
                            {new Date(msg.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <form onSubmit={handleSendReply} className="flex gap-2">
                    <input
                      type="text"
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      placeholder="Type your reply..."
                      className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Send Reply
                    </button>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};