import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { LikertCircle } from './LikertCircle';
import { Typography } from '../../../shared/components/Typography';
import { useResponsive } from '../../../shared/utils/responsive';
import { Colors } from '../../../shared/constants/colors';

interface QuestionRowProps {
  question: { id: string; text: string };
  selectedValue: number | null;
  onSelect: (questionId: string, value: number) => void;
}

export const QuestionRow: React.FC<QuestionRowProps> = ({ question, selectedValue, onSelect }) => {
  const { sWidth, sFont, sHeight } = useResponsive();
  const { t } = useTranslation();

  return (
    <View style={[styles.container, { marginBottom: sHeight(12) }]}>
      <Typography
        variant="body"
        color={Colors.textOnDark}
        style={[
          styles.questionText,
          { fontSize: sFont(18), lineHeight: sFont(26), paddingHorizontal: sWidth(5) },
        ]}
      >
        {question.text}
      </Typography>
      <View style={[styles.likertContainer, { paddingHorizontal: sWidth(15), gap: sWidth(4) }]}>
        <Typography variant="caption" style={[styles.label, { width: sWidth(60), fontSize: sFont(12) }]}>
          {t('quiz.disagree')}
        </Typography>
        <View style={styles.circles}>
          {[1, 2, 3, 4, 5].map((val) => (
            <LikertCircle
              key={val}
              value={val}
              isSelected={selectedValue === val}
              onSelect={(value) => onSelect(question.id, value)}
            />
          ))}
        </View>
        <Typography variant="caption" style={[styles.label, { width: sWidth(60), fontSize: sFont(12) }]}>
          {t('quiz.agree')}
        </Typography>
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
    color: Colors.textQuizMuted,
    textAlign: 'center',
  },
});
