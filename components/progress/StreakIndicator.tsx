import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/colors';
import { Flame } from 'lucide-react-native';

interface StreakIndicatorProps {
  streak: number;
  style?: any;
}

export const StreakIndicator: React.FC<StreakIndicatorProps> = ({
  streak,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Flame size={20} color={COLORS.highlight} />
      <Text style={styles.streakText}>{streak}</Text>
      <Text style={styles.label}>day streak</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  streakText: {
    color: COLORS.highlight,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 4,
    marginRight: 4,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
});