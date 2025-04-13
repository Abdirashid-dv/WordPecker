import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { Image } from 'expo-image';
import { COLORS } from '@/constants/colors';
import { RecommendationItem } from '@/types/recommendation';
import { getContentTypeLabel, getLanguageLevelLabel, formatRelativeDate } from '@/utils/recommendationUtils';
import { BookOpen, Newspaper, Headphones, Video, Star, Bookmark, BookmarkCheck } from 'lucide-react-native';
import { useRecommendations } from '@/hooks/useRecommendations';

interface RecommendationCardProps {
  item: RecommendationItem;
  onPress?: () => void;
  style?: any;
  size?: 'small' | 'medium' | 'large';
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  item,
  onPress,
  style,
  size = 'medium',
}) => {
  const { actions } = useRecommendations();
  const isSaved = actions.isItemSaved(item.id);
  
  // Determine icon based on content type
  const renderTypeIcon = () => {
    const iconSize = 16;
    const iconColor = COLORS.textSecondary;
    
    switch (item.type) {
      case 'book':
        return <BookOpen size={iconSize} color={iconColor} />;
      case 'article':
        return <Newspaper size={iconSize} color={iconColor} />;
      case 'podcast':
        return <Headphones size={iconSize} color={iconColor} />;
      case 'video':
        return <Video size={iconSize} color={iconColor} />;
      default:
        return <BookOpen size={iconSize} color={iconColor} />;
    }
  };
  
  // Handle save button press
  const handleSavePress = (e: any) => {
    if (Platform.OS === 'web') {
      e.stopPropagation();
    }
    actions.toggleSaveItem(item.id);
  };
  
  // Determine card dimensions based on size
  const getCardDimensions = () => {
    switch (size) {
      case 'small':
        return {
          container: styles.containerSmall,
          image: styles.imageSmall,
          content: styles.contentSmall,
        };
      case 'large':
        return {
          container: styles.containerLarge,
          image: styles.imageLarge,
          content: styles.contentLarge,
        };
      default:
        return {
          container: styles.containerMedium,
          image: styles.imageMedium,
          content: styles.contentMedium,
        };
    }
  };
  
  const cardDimensions = getCardDimensions();
  
  return (
    <Pressable
      style={[styles.container, cardDimensions.container, style]}
      onPress={onPress}
    >
      <Image
        source={{ uri: item.imageUrl }}
        style={[styles.image, cardDimensions.image]}
        contentFit="cover"
        transition={200}
      />
      
      {item.isNew && (
        <View style={styles.newBadge}>
          <Text style={styles.newBadgeText}>NEW</Text>
        </View>
      )}
      
      <View style={[styles.content, cardDimensions.content]}>
        <View style={styles.header}>
          <View style={styles.typeContainer}>
            {renderTypeIcon()}
            <Text style={styles.typeText}>{getContentTypeLabel(item.type)}</Text>
          </View>
          
          <Pressable
            style={styles.saveButton}
            onPress={handleSavePress}
            hitSlop={10}
          >
            {isSaved ? (
              <BookmarkCheck size={20} color={COLORS.primary} />
            ) : (
              <Bookmark size={20} color={COLORS.textSecondary} />
            )}
          </Pressable>
        </View>
        
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        
        {size !== 'small' && (
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>
        )}
        
        <View style={styles.footer}>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>{getLanguageLevelLabel(item.level)}</Text>
          </View>
          
          <View style={styles.ratingContainer}>
            <Star size={14} color={COLORS.highlight} fill={COLORS.highlight} />
            <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
          </View>
        </View>
        
        {size === 'large' && (
          <Text style={styles.dateText}>
            Added {formatRelativeDate(item.dateAdded)}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  containerSmall: {
    width: 160,
    height: 220,
  },
  containerMedium: {
    width: 240,
    height: 320,
  },
  containerLarge: {
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
  },
  image: {
    backgroundColor: COLORS.progressBackground,
  },
  imageSmall: {
    height: 100,
  },
  imageMedium: {
    height: 140,
  },
  imageLarge: {
    width: 120,
    height: 160,
  },
  content: {
    padding: 12,
    flex: 1,
  },
  contentSmall: {
    padding: 8,
  },
  contentMedium: {
    padding: 12,
  },
  contentLarge: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  saveButton: {
    padding: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  levelBadge: {
    backgroundColor: 'rgba(33, 150, 243, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  levelText: {
    fontSize: 12,
    color: COLORS.accent,
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  dateText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 8,
  },
  newBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: COLORS.highlight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  newBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.background,
  },
});