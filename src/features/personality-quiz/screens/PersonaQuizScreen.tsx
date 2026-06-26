import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView, ImageBackground, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { fetchQuizQuestions, submitQuizAnswers } from '../api/quizService';
import { QuestionRow } from '../components/QuestionRow';
import { QuizProgressBar } from '../components/QuizProgressBar';
import { Typography } from '../../../shared/components/Typography';
import { PrimaryButton } from '../../../shared/components/PrimaryButton';
import { useAuthStore } from '../../../core/store/authStore';
import { useNavigation } from '@react-navigation/native';
import { useResponsive } from '../../../shared/utils/responsive';
import { Colors } from '../../../shared/constants/colors';

interface QuizQuestion {
  id: string;
  text: string;
}

export const PersonaQuizScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { sWidth, sHeight, sFont } = useResponsive();
  const { t } = useTranslation();
  const setPersona = useAuthStore((state) => state.setPersona);

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      setError('');
      const data = (await fetchQuizQuestions()) as { id: string }[];
      setQuestions(
        data.map((q) => ({
          id: q.id,
          text: t(`quiz.questions.${q.id}`),
        }))
      );
    } catch {
      setError(t('quiz.loadError'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, [t]);

  const handleSelect = (questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      try {
        setSubmitting(true);
        const formattedAnswers = Object.entries(answers).map(([questionId, value]) => ({
          questionId,
          value,
        }));
        const result: any = await submitQuizAnswers(formattedAnswers);
        setPersona(result.persona);
        navigation.navigate('MainTabNavigator' as never);
      } catch {
        setError(t('quiz.submitError'));
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      navigation.goBack();
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Typography color={Colors.textOnDark} style={{ marginTop: 16 }}>
          {t('quiz.loading')}
        </Typography>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Typography color={Colors.errorStrong}>{error}</Typography>
        <PrimaryButton title={t('common.retry')} onPress={loadQuestions} style={{ marginTop: 16 }} />
      </View>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isCurrentAnswered = answers[currentQuestion?.id] !== undefined;

  return (
    <ImageBackground
      source={require('../../../../assets/Personality Quiz/quizHeaderImage.png')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
          <View style={[styles.headerImageContainer, { height: sHeight(180) }]}>
            <Image style={styles.headerImage} resizeMode="cover" />
          </View>

          <QuizProgressBar currentStep={currentIndex + 1} totalSteps={questions.length} />

          <ScrollView
            contentContainerStyle={[styles.scrollContent, { padding: sWidth(10), marginTop: sHeight(40) }]}
          >
            <View style={[styles.card, { paddingVertical: sHeight(20) }]}>
              <Typography
                variant="h2"
                color={Colors.textOnDark}
                align="center"
                style={[styles.title, { fontSize: sFont(24), marginBottom: sHeight(32) }]}
              >
                {t('quiz.title')}
              </Typography>

              <QuestionRow
                question={currentQuestion}
                selectedValue={answers[currentQuestion.id] || null}
                onSelect={handleSelect}
              />
            </View>
          </ScrollView>

          <View style={[styles.footer, { paddingHorizontal: sWidth(10), gap: sWidth(10) }]}>
            <PrimaryButton
              title={t('common.back')}
              onPress={handleBack}
              textColor={Colors.textTitle}
              style={[styles.backButton, { marginBottom: Math.max(insets.bottom + sHeight(10), sHeight(40)) }]}
            />
            <PrimaryButton
              title={
                currentIndex === questions.length - 1
                  ? submitting
                    ? t('common.submitting')
                    : t('common.finish')
                  : t('common.next')
              }
              onPress={handleNext}
              disabled={!isCurrentAnswered || submitting}
              style={[styles.nextButton, { marginBottom: Math.max(insets.bottom + sHeight(10), sHeight(40)) }]}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover' },
  overlay: { flex: 1, backgroundColor: Colors.overlayQuiz },
  container: { flex: 1 },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.surfaceDark,
  },
  headerImageContainer: {
    width: '100%',
    overflow: 'hidden',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  card: {
    backgroundColor: Colors.overlayGlassButton,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.borderGlassSubtle,
  },
  title: {
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  nextButton: {
    width: '100%',
  },
  backButton: {
    width: '100%',
    backgroundColor: Colors.surface,
  },
});
