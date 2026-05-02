import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LikertCircle } from './LikertCircle';
import { Typography } from '../../../shared/components/Typography';

interface QuestionRowProps {
  question: { id: string; text: string };
  selectedValue: number | null;
  onSelect: (questionId: string, value: number) => void;
}

export const QuestionRow: React.FC<QuestionRowProps> = ({ question, selectedValue, onSelect }) => {
  return (
    <View style={styles.container}>
      <Typography variant="body" color="#FFFFFF" style={styles.questionText}>
        {question.text}
      </Typography>
      <View style={styles.likertContainer}>
        <Typography variant="caption" color="#AAAAAA" style={styles.label}>Disagree</Typography>
        <View style={styles.circles}>
          {[1, 2, 3, 4, 5].map((val) => (
            <LikertCircle
              key={val}
              value={val}
              isSelected={selectedValue === val}
              onSelect={(val) => onSelect(question.id, val)}
            />
          ))}
        </View>
        <Typography variant="caption" color="#AAAAAA" style={styles.label}>Agree</Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  questionText: {
    marginBottom: 24,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 26,
  },
  likertContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  circles: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // gap: 4,
  },
  label: {
    width: 60,
    textAlign: 'center',
  }
});
