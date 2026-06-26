import { create } from 'zustand';
import { ChatMessage } from '../api/chatService';
import { HotspotChatContext } from '../types/hotspotChatContext';

interface ChatbotState {
  messages: ChatMessage[];
  pendingHotspotContext: HotspotChatContext | null;
  activeHotspotContext: HotspotChatContext | null;
  addMessage: (message: ChatMessage) => void;
  clearMessages: () => void;
  setPendingHotspotContext: (context: HotspotChatContext | null) => void;
  consumePendingHotspotContext: () => HotspotChatContext | null;
  setActiveHotspotContext: (context: HotspotChatContext | null) => void;
}

export const useChatbotStore = create<ChatbotState>((set, get) => ({
  messages: [],
  pendingHotspotContext: null,
  activeHotspotContext: null,
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  clearMessages: () => set({ messages: [], activeHotspotContext: null }),
  setPendingHotspotContext: (context) => set({ pendingHotspotContext: context }),
  consumePendingHotspotContext: () => {
    const context = get().pendingHotspotContext;
    if (!context) return null;
    set({ pendingHotspotContext: null, activeHotspotContext: context });
    return context;
  },
  setActiveHotspotContext: (context) => set({ activeHotspotContext: context }),
}));
