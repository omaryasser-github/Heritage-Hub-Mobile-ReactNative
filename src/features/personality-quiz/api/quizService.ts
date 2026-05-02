// import { api } from '../../../core/api/apiClient';

// Mocking the quiz questions
const MOCK_QUESTIONS = [
  { id: '1', text: 'I see myself as someone who loves discovering hidden places.' },
  { id: '2', text: 'I am fascinated by ancient history and artifacts.' },
  { id: '3', text: 'I prefer thrilling outdoor activities over museums.' },
  { id: '4', text: 'I enjoy taking pictures and documenting every detail.' },
  { id: '5', text: 'I seek experiences that connect me with local cultures.' },
  { id: '6', text: 'I find peace in exploring natural landscapes.' },
  { id: '7', text: 'I like my travel itinerary to be completely unplanned.' },
];

export const fetchQuizQuestions = async () => {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_QUESTIONS), 1000);
  });
};

export const submitQuizAnswers = async (answers: { questionId: string; value: number }[]) => {
  // Mock calculate persona based on answers
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ persona: 'Explorer', recommendedCategories: ['Nature', 'Hidden Gems'] });
    }, 1000);
  });
};
