import { create } from 'zustand';
import { Message } from '../types';

interface MessageState {
  messages: Record<string, Message[]>;
  addMessage: (userId: string, content: string, isAdmin: boolean) => void;
  getMessages: (userId: string) => Message[];
}

export const useMessageStore = create<MessageState>((set, get) => ({
  messages: {},
  addMessage: (userId, content, isAdmin) => {
    const message: Message = {
      id: crypto.randomUUID(),
      userId,
      content,
      timestamp: new Date().toISOString(),
      isAdmin,
    };
    set((state) => ({
      messages: {
        ...state.messages,
        [userId]: [...(state.messages[userId] || []), message],
      },
    }));
  },
  getMessages: (userId) => get().messages[userId] || [],
}));