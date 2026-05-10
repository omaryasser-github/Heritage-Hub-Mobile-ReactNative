import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView, ImageBackground, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fetchQuizQuestions, submitQuizAnswers } from '../api/quizService';
import { QuestionRow } from '../components/QuestionRow';
import { QuizProgressBar } from '../components/QuizProgressBar';
import { Typography } from '../../../shared/components/Typography';
import { PrimaryButton } from '../../../shared/components/PrimaryButton';
import { useAuthStore } from '../../../core/store/authStore';
import { useNavigation } from '@react-navigation/native';

export const PersonaQuizScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const setPersona = useAuthStore((state: any) => state.setPersona);

  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchQuizQuestions();
      setQuestions(data as any[]);
    } catch (err) {
      setError('Failed to load questions.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Submit
      try {
        setSubmitting(true);
        const formattedAnswers = Object.entries(answers).map(([questionId, value]) => ({ questionId, value }));
        const result: any = await submitQuizAnswers(formattedAnswers);
        setPersona(result.persona);
        navigation.navigate('MainTabNavigator' as never);
      } catch (err) {
        setError('Failed to submit answers.');
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      navigation.goBack();
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#D9A941" />
        <Typography color="#FFF" style={{ marginTop: 16 }}>Loading quiz...</Typography>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Typography color="red">{error}</Typography>
        <PrimaryButton title="Retry" onPress={loadQuestions} style={{ marginTop: 16 }} />
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

          <View style={styles.headerImageContainer}>
            <Image
              // source={require('../../../../assets/Personality Quiz/quizHeaderImage.png')}
              style={styles.headerImage}
              resizeMode="cover"
            />
          </View>

          <QuizProgressBar currentStep={currentIndex + 1} totalSteps={questions.length} />

          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.card}>
              <Typography variant="h2" color="#FFFFFF" align="center" style={styles.title}>
                Discover Your Persona
              </Typography>

              <QuestionRow
                question={currentQuestion}
                selectedValue={answers[currentQuestion.id] || null}
                onSelect={handleSelect}
              />
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <PrimaryButton
              title={'Back'}
              onPress={handleBack}
              textColor='black'
              style={styles.backButton}
            />
            <PrimaryButton
              title={currentIndex === questions.length - 1 ? (submitting ? 'Submitting...' : 'Finish') : 'Next'}
              onPress={handleNext}
              disabled={!isCurrentAnswered || submitting}
              style={styles.nextButton}
            />
          </View>

        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' },
  container: { flex: 1 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  headerImageContainer: {
    width: '100%',
    height: 180,
    overflow: 'hidden',
    // borderBottomLeftRadius: 24,
    // borderBottomRightRadius: 24,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 10,
    marginTop: 40,
    justifyContent: 'flex-start',
    overflow: "hidden",
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 24,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  title: {
    marginBottom: 32,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: "row",
    alignItems: 'center',
    paddingHorizontal: 10,
    width: "50%",
    gap: 10
  },
  nextButton: {
    width: '100%',
    marginBottom: 60,
  },
  backButton: {
    width: '100%',
    marginBottom: 60,
    backgroundColor: "white",
  }
});
