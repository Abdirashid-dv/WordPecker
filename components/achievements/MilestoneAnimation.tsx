import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { COLORS } from '@/constants/colors';
import { Achievement } from '@/types/achievement';
import { ACHIEVEMENT_LEVEL_COLORS } from '@/constants/achievementConstants';
import { AchievementBadge } from './AchievementBadge';
import { Platform } from 'react-native';

interface MilestoneAnimationProps {
  achievement: Achievement;
  onAnimationComplete?: () => void;
}

export const MilestoneAnimation: React.FC<MilestoneAnimationProps> = ({
  achievement,
  onAnimationComplete,
}) => {
  const { width, height } = Dimensions.get('window');
  
  // Animation values
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.5)).current;
  const translateY = useRef(new Animated.Value(50)).current;
  
  // Particle animations (only on native platforms)
  const particles = Array.from({ length: 20 }, (_, i) => ({
    translateX: useRef(new Animated.Value(0)).current,
    translateY: useRef(new Animated.Value(0)).current,
    opacity: useRef(new Animated.Value(1)).current,
    scale: useRef(new Animated.Value(0.5)).current,
  }));
  
  useEffect(() => {
    // Main animation sequence
    Animated.sequence([
      // Fade in and scale up
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 500,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        }),
      ]),
      
      // Hold for a moment
      Animated.delay(2000),
      
      // Fade out
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    });
    
    // Particle animations (only on native)
    if (Platform.OS !== 'web') {
      particles.forEach((particle, i) => {
        const angle = (i / particles.length) * Math.PI * 2;
        const distance = Math.random() * 150 + 50;
        
        Animated.sequence([
          Animated.delay(Math.random() * 200),
          Animated.parallel([
            Animated.timing(particle.translateX, {
              toValue: Math.cos(angle) * distance,
              duration: 1000,
              easing: Easing.out(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(particle.translateY, {
              toValue: Math.sin(angle) * distance,
              duration: 1000,
              easing: Easing.out(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(particle.opacity, {
              toValue: 0,
              duration: 1000,
              delay: 500,
              useNativeDriver: true,
            }),
            Animated.timing(particle.scale, {
              toValue: 0,
              duration: 1000,
              delay: 500,
              useNativeDriver: true,
            }),
          ]),
        ]).start();
      });
    }
  }, []);
  
  const levelColor = ACHIEVEMENT_LEVEL_COLORS[achievement.level];
  
  return (
    <View style={[styles.container, { width, height }]}>
      <View style={styles.overlay} />
      
      <Animated.View
        style={[
          styles.content,
          {
            opacity,
            transform: [{ scale }, { translateY }],
          },
        ]}
      >
        <Text style={styles.congratsText}>Achievement Unlocked!</Text>
        
        <View style={styles.badgeContainer}>
          <AchievementBadge
            achievement={achievement}
            size="large"
            style={styles.badge}
          />
        </View>
        
        <Text style={[styles.levelText, { color: levelColor }]}>
          {achievement.level.charAt(0).toUpperCase() + achievement.level.slice(1)} Achievement
        </Text>
      </Animated.View>
      
      {Platform.OS !== 'web' && particles.map((particle, i) => (
        <Animated.View
          key={i}
          style={[
            styles.particle,
            {
              backgroundColor: levelColor,
              opacity: particle.opacity,
              transform: [
                { translateX: particle.translateX },
                { translateY: particle.translateY },
                { scale: particle.scale },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  content: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: '80%',
    maxWidth: 350,
  },
  congratsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  badgeContainer: {
    marginVertical: 16,
    alignItems: 'center',
  },
  badge: {
    width: '100%',
  },
  levelText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
  },
  particle: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});