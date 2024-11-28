import React, { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { useMessageStore } from '../store/messageStore';
import { useAuthStore } from '../store/authStore';

export const CustomerSupport: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const { user } = useAuthStore();
  const { addMessage, getMessages } = useMessageStore();

  if (!user) return null;

  const messages = getMessages(user.id);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    addMessage(user.id, message, false);
    setMessage('');
  };

  return (
    <div className="fixed bottom-6 right-6">
      {isOpen ? (
        <div className="bg-gray-800 rounded-lg shadow-xl w-96 h-[500px] flex flex-col">
          <div className="p-4 bg-gray-700 rounded-t-lg flex items-center justify-between">
            <h3 className="text-white font-semibold">Customer Support</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              ×
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isAdmin ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    msg.isAdmin
                      ? 'bg-gray-700 text-white'
                      : 'bg-red-600 text-white'
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
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="submit"
                className="bg-red-600 text-white rounded-lg p-2 hover:bg-red-700"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-red-600 text-white rounded-full p-4 shadow-lg hover:bg-red-700"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
};