import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '../../../shared/components/Typography';

interface QuizProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const QuizProgressBar: React.FC<QuizProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <View style={styles.container}>
      <Typography variant="caption" color="#FFFFFF" style={styles.text}>
        Question {currentStep} of {totalSteps}
      </Typography>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${progressPercentage}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    width: '100%',
  },
  text: {
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  track: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: '#D9A941',
    borderRadius: 3,
  }
});
