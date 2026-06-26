// Mock quiz questions — text resolved via i18n in PersonaQuizScreen
const MOCK_QUESTIONS = [
  { id: '1' },
  { id: '2' },
  { id: '3' },
  { id: '4' },
  { id: '5' },
  { id: '6' },
  { id: '7' },
];

export const fetchQuizQuestions = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_QUESTIONS), 1000);
  });
};

export const submitQuizAnswers = async (answers: { questionId: string; value: number }[]) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ persona: 'Explorer', recommendedCategories: ['Nature', 'Hidden Gems'] });
    }, 1000);
  });
};
