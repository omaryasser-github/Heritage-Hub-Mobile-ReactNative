// src/features/chatbot/api/chatService.ts

import { HotspotChatContext } from '../types/hotspotChatContext';

export interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  text: string;
  timestamp: number;
}

export interface ChatRequestPayload {
  agentId: string;
  message: string;
  history: ChatMessage[];
  hotspotContext?: HotspotChatContext | null;
}

export interface ChatResponsePayload {
  replyKey: string;
  replyParams?: Record<string, string>;
  suggestionKeys: string[];
}

export const sendChatMessage = async (
  payload: ChatRequestPayload
): Promise<ChatResponsePayload> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (payload.hotspotContext) {
        resolve({
          replyKey: 'chatbot.hotspotMockReply',
          replyParams: {
            hotspot: payload.hotspotContext.hotspotTitle,
            monument: payload.hotspotContext.monumentName,
            message: payload.message,
          },
          suggestionKeys: [
            'chatbot.hotspotFollowUp1',
            'chatbot.hotspotFollowUp2',
            'chatbot.hotspotFollowUp3',
          ],
        });
        return;
      }

      resolve({
        replyKey: 'chatbot.mockReply',
        replyParams: { message: payload.message },
        suggestionKeys: ['chatbot.followUp1', 'chatbot.followUp2'],
      });
    }, 1500);
  });
};
