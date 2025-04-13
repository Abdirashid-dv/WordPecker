import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS } from '@/constants/colors';
import { Tip, TipCategory } from '@/types/motivation';
import { TIP_CATEGORIES } from '@/constants/motivationConstants';
import { shareContent } from '@/utils/motivationUtils';
import { 
  Lightbulb, 
  RefreshCw, 
  Share2, 
  FileText, 
  BookOpen, 
  Mic, 
  MessageCircle, 
  Globe 
} from 'lucide-react-native';

interface DailyTipProps {
  tip: Tip | null;
  onRefresh: () => void;
  style?: any;
}

export const DailyTip: React.FC<DailyTipProps> = ({
  tip,
  onRefresh,
  style,
}) => {
  if (!tip) {
    return (
      <View style={[styles.container, styles.emptyContainer, style]}>
        <Text style={styles.emptyText}>No tip available</Text>
        <Pressable style={styles.refreshButton} onPress={onRefresh}>
          <RefreshCw size={20} color={COLORS.textSecondary} />
          <Text style={styles.refreshText}>Refresh</Text>
        </Pressable>
      </View>
    );
  }
  
  // Get category info
  const categoryInfo = TIP_CATEGORIES[tip.category] || {
    label: 'Tip',
    color: COLORS.primary,
    icon: 'Lightbulb'
  };
  
  // Render category icon
  const renderCategoryIcon = () => {
    const iconSize = 20;
    const iconColor = categoryInfo.color;
    
    switch (tip.category) {
      case TipCategory.GRAMMAR:
        return <FileText size={iconSize} color={iconColor} />;
      case TipCategory.VOCABULARY:
        return <BookOpen size={iconSize} color={iconColor} />;
      case TipCategory.PRONUNCIATION:
        return <Mic size={iconSize} color={iconColor} />;
      case TipCategory.IDIOMS:
        return <MessageCircle size={iconSize} color={iconColor} />;
      case TipCategory.CULTURE:
        return <Globe size={iconSize} color={iconColor} />;
      case TipCategory.LEARNING_STRATEGY:
      default:
        return <Lightbulb size={iconSize} color={iconColor} />;
    }
  };
  
  // Handle share button press
  const handleShare = () => {
    shareContent(tip.content, 'WordPecker Language Tip');
  };
  
  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <View style={styles.categoryContainer}>
          {renderCategoryIcon()}
          <Text style={[styles.categoryText, { color: categoryInfo.color }]}>
            {categoryInfo.label}
          </Text>
        </View>
        
        <View style={styles.actions}>
          <Pressable 
            style={styles.actionButton} 
            onPress={handleShare}
            hitSlop={10}
          >
            <Share2 size={18} color={COLORS.textSecondary} />
          </Pressable>
          
          <Pressable 
            style={styles.actionButton} 
            onPress={onRefresh}
            hitSlop={10}
          >
            <RefreshCw size={18} color={COLORS.textSecondary} />
          </Pressable>
        </View>
      </View>
      
      <Text style={styles.content}>{tip.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 16,
    marginBottom: 12,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  refreshText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginLeft: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 4,
    marginLeft: 12,
  },
  content: {
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 24,
  },
});