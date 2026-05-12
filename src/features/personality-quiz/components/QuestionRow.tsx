import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LikertCircle } from './LikertCircle';
import { Typography } from '../../../shared/components/Typography';
import { useResponsive } from '../../../shared/utils/responsive';

interface QuestionRowProps {
  question: { id: string; text: string };
  selectedValue: number | null;
  onSelect: (questionId: string, value: number) => void;
}

export const QuestionRow: React.FC<QuestionRowProps> = ({ question, selectedValue, onSelect }) => {
  const { sWidth, sFont, sHeight } = useResponsive();

  return (
    <View style={[styles.container, { marginBottom: sHeight(12) }]}>
      <Typography 
        variant="body" 
        color="#FFFFFF" 
        style={[styles.questionText, { fontSize: sFont(18), lineHeight: sFont(26), paddingHorizontal: sWidth(5) }]}
      >
        {question.text}
      </Typography>
      <View style={[styles.likertContainer, { paddingHorizontal: sWidth(15), gap: sWidth(4) }]}>
        <Typography variant="caption" style={[styles.label, { width: sWidth(60), fontSize: sFont(12) }]}>Disagree</Typography>
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
        <Typography variant="caption" style={[styles.label, { width: sWidth(60), fontSize: sFont(12) }]}>Agree</Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  questionText: {
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: '500',
  },
  likertContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circles: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: "#AAAAAA",
    textAlign: 'center',
  }
});

