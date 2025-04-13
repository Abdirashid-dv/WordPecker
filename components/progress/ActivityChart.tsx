import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '@/constants/colors';
import { DailyActivity } from '@/types/progress';

interface ActivityChartProps {
  data: DailyActivity[];
  style?: any;
}

const BAR_WIDTH = 8;
const MAX_BAR_HEIGHT = 100;

export const ActivityChart: React.FC<ActivityChartProps> = ({
  data,
  style,
}) => {
  // Find the maximum value to normalize heights
  const maxWordsLearned = Math.max(...data.map(day => day.wordsLearned), 1);
  
  // Format date to day of week
  const formatDay = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0);
  };
  
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>Daily Activity</Text>
      
      <View style={styles.chartContainer}>
        {data.map((day, index) => {
          const barHeight = (day.wordsLearned / maxWordsLearned) * MAX_BAR_HEIGHT;
          const isToday = index === data.length - 1;
          
          return (
            <View key={day.date} style={styles.barContainer}>
              <View style={styles.barLabelContainer}>
                <Text style={styles.barValue}>{day.wordsLearned}</Text>
              </View>
              
              <View style={styles.barWrapper}>
                <View 
                  style={[
                    styles.bar, 
                    { 
                      height: Math.max(barHeight, 4),
                      backgroundColor: isToday ? COLORS.primary : COLORS.accent,
                    }
                  ]} 
                />
              </View>
              
              <Text style={styles.dayLabel}>{formatDay(day.date)}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    width: '100%',
  },
  title: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: MAX_BAR_HEIGHT + 40, // Add space for labels
  },
  barContainer: {
    alignItems: 'center',
    width: BAR_WIDTH + 16,
  },
  barLabelContainer: {
    marginBottom: 4,
  },
  barValue: {
    color: COLORS.textSecondary,
    fontSize: 10,
  },
  barWrapper: {
    height: MAX_BAR_HEIGHT,
    justifyContent: 'flex-end',
  },
  bar: {
    width: BAR_WIDTH,
    borderRadius: 4,
  },
  dayLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 8,
  },
});