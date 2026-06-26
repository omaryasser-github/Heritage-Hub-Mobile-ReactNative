// src/features/chatbot/api/chatService.ts

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
      resolve({
        replyKey: 'chatbot.mockReply',
        replyParams: { message: payload.message },
        suggestionKeys: ['chatbot.followUp1', 'chatbot.followUp2'],
      });
    }, 1500);
  });
};
