import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { COLORS } from '@/constants/colors';
import { useProgress } from '@/hooks/useProgress';
import { useAchievements } from '@/hooks/useAchievements';
import { StreakCounter } from './StreakCounter';
import { AchievementRow } from './AchievementRow';
import { MilestoneAnimation } from './MilestoneAnimation';
import { getStreakStatusMessage, isStreakActive } from '@/utils/streakUtils';
import { Achievement } from '@/types/achievement';
import { Award, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export const StreaksAndAchievements: React.FC = () => {
  const router = useRouter();
  const { progressData } = useProgress();
  const { 
    recentlyUnlocked, 
    highestLevel, 
    nextAchievements,
    actions: { markAchievementSeen } 
  } = useAchievements();
  
  const [showAnimation, setShowAnimation] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);
  
  // Show animation when a new achievement is unlocked
  useEffect(() => {
    if (recentlyUnlocked.length > 0 && !showAnimation) {
      // Get the first achievement that hasn't been seen
      const achievement = recentlyUnlocked[0];
      setCurrentAchievement(achievement);
      setShowAnimation(true);
    }
  }, [recentlyUnlocked, showAnimation]);
  
  const handleAnimationComplete = () => {
    if (currentAchievement) {
      markAchievementSeen(currentAchievement.id);
    }
    setShowAnimation(false);
    setCurrentAchievement(null);
  };
  
  const handleAchievementPress = (achievement: Achievement) => {
    // Navigate to achievement details
    // router.push(`/achievements/${achievement.id}`);
    
    // For now, just navigate to the achievements tab
    router.push('/achievements');
  };
  
  const navigateToAchievements = () => {
    router.push('/achievements');
  };
  
  const streakActive = isStreakActive(progressData.streak.lastActive);
  const streakMessage = getStreakStatusMessage(progressData.streak);
  
  return (
    <View style={styles.container}>
      {/* Streak Section */}
      <View style={styles.streakSection}>
        <View style={styles.streakHeader}>
          <Text style={styles.sectionTitle}>Your Streak</Text>
          <StreakCounter 
            streak={progressData.streak.current} 
            isActive={streakActive}
            size="medium"
          />
        </View>
        
        <Text style={styles.streakMessage}>{streakMessage}</Text>
        
        {progressData.streak.longest > progressData.streak.current && (
          <Text style={styles.longestStreak}>
            Longest streak: {progressData.streak.longest} days
          </Text>
        )}
      </View>
      
      {/* Achievements Section */}
      <View style={styles.achievementsSection}>
        <Pressable 
          style={styles.achievementsHeader}
          onPress={navigateToAchievements}
        >
          <View style={styles.achievementsTitleContainer}>
            <Award size={20} color={COLORS.highlight} style={styles.achievementsIcon} />
            <Text style={styles.sectionTitle}>Achievements</Text>
          </View>
          
          <View style={styles.achievementsLevelContainer}>
            <Text style={styles.achievementsLevel}>{highestLevel}</Text>
            <ChevronRight size={16} color={COLORS.textSecondary} />
          </View>
        </Pressable>
        
        <AchievementRow
          title="Up Next"
          achievements={nextAchievements}
          emptyMessage="You've unlocked all achievements!"
          onPress={handleAchievementPress}
        />
      </View>
      
      {/* Achievement Animation */}
      {showAnimation && currentAchievement && Platform.OS !== 'web' && (
        <MilestoneAnimation
          achievement={currentAchievement}
          onAnimationComplete={handleAnimationComplete}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  streakSection: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  streakHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  streakMessage: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginBottom: 8,
  },
  longestStreak: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontStyle: 'italic',
  },
  achievementsSection: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
  },
  achievementsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  achievementsTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementsIcon: {
    marginRight: 8,
  },
  achievementsLevelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementsLevel: {
    color: COLORS.highlight,
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
});