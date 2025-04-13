import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '@/constants/colors';
import { Achievement } from '@/types/achievement';
import { AchievementBadge } from './AchievementBadge';

interface AchievementRowProps {
  title: string;
  achievements: Achievement[];
  emptyMessage?: string;
  onPress?: (achievement: Achievement) => void;
  style?: any;
}

export const AchievementRow: React.FC<AchievementRowProps> = ({
  title,
  achievements,
  emptyMessage = 'No achievements to display',
  onPress,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      
      {achievements.length > 0 ? (
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {achievements.map((achievement) => (
            <AchievementBadge
              key={achievement.id}
              achievement={achievement}
              size="medium"
              onPress={() => onPress && onPress(achievement)}
              style={styles.badge}
            />
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.emptyMessage}>{emptyMessage}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 12,
  },
  scrollContent: {
    paddingRight: 16,
  },
  badge: {
    marginRight: 12,
    minWidth: 200,
  },
  emptyMessage: {
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    marginVertical: 12,
  },
});