import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Enhanced color palette for iOS design
export const enhancedColors = {
  light: {
    // Primary colors
    primary: '#007AFF', // iOS blue
    secondary: '#5AC8FA', // iOS light blue
    success: '#34C759', // iOS green
    warning: '#FF9500', // iOS orange
    danger: '#FF3B30', // iOS red
    info: '#5856D6', // iOS purple
    
    // Background colors
    background: '#FFFFFF',
    cardBackground: '#F2F2F7',
    groupedBackground: '#F2F2F7',
    
    // Text colors
    primaryText: '#000000',
    secondaryText: '#8E8E93',
    tertiaryText: '#C7C7CC',
    
    // Border colors
    border: '#C6C6C8',
    separator: '#E5E5EA',
    
    // UI elements
    inputBackground: '#F2F2F7',
    placeholderText: '#C7C7CC',
    
    // Tab bar
    tabBarBackground: 'rgba(255, 255, 255, 0.8)',
    tabBarBorder: '#E5E5EA',
  },
  dark: {
    // Primary colors
    primary: '#0A84FF', // iOS blue (dark mode)
    secondary: '#64D2FF', // iOS light blue (dark mode)
    success: '#30D158', // iOS green (dark mode)
    warning: '#FF9F0A', // iOS orange (dark mode)
    danger: '#FF453A', // iOS red (dark mode)
    info: '#5E5CE6', // iOS purple (dark mode)
    
    // Background colors
    background: '#000000',
    cardBackground: '#1C1C1E',
    groupedBackground: '#1C1C1E',
    
    // Text colors
    primaryText: '#FFFFFF',
    secondaryText: '#8E8E93',
    tertiaryText: '#48484A',
    
    // Border colors
    border: '#38383A',
    separator: '#38383A',
    
    // UI elements
    inputBackground: '#1C1C1E',
    placeholderText: '#48484A',
    
    // Tab bar
    tabBarBackground: 'rgba(0, 0, 0, 0.8)',
    tabBarBorder: '#38383A',
  }
};

// Function to get enhanced colors based on color scheme
export function useEnhancedColors() {
  const colorScheme = useColorScheme();
  return enhancedColors[colorScheme ?? 'light'];
}

// Function to merge enhanced colors with existing Colors
export function getThemeColors() {
  const colorScheme = useColorScheme();
  return {
    ...Colors[colorScheme ?? 'light'],
    ...enhancedColors[colorScheme ?? 'light']
  };
}
