import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { enhancedColors } from '@/constants/EnhancedColors';

interface ThemedViewProps extends ViewProps {
  variant?: 'default' | 'card' | 'grouped';
  children: React.ReactNode;
}

export function ThemedView(props: ThemedViewProps) {
  const { style, variant = 'default', ...otherProps } = props;
  const colorScheme = useColorScheme();
  const colors = enhancedColors[colorScheme ?? 'light'];
  
  const variantStyles = {
    default: {
      backgroundColor: 'transparent',
    },
    card: {
      backgroundColor: colors.cardBackground,
      borderRadius: 10,
      padding: 16,
      shadowColor: colorScheme === 'dark' ? '#000' : '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: colorScheme === 'dark' ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    grouped: {
      backgroundColor: colors.groupedBackground,
      borderRadius: 10,
      overflow: 'hidden',
      marginVertical: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
  };

  return (
    <View
      style={[variantStyles[variant], style]}
      {...otherProps}
    />
  );
}
