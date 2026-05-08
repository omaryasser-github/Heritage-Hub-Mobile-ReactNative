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
  reply: string;
  suggestions: string[];
}

export const sendChatMessage = async (payload: ChatRequestPayload): Promise<ChatResponsePayload> => {
  // Mock API call to simulate network request delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        reply: `This is a simulated AI response to: "**${payload.message}**".\n\n* The Great Sphinx was built around 2500 BC.\n* It represents a mythical creature with a lion's body and a human head.\n\nEnjoy your exploration!`,
        suggestions: ["Tell me more about the Pyramids", "Who was King Tut?"],
      });
    }, 1500);
  });
};
