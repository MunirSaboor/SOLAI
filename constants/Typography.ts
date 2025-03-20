import { StyleSheet } from 'react-native';
import { enhancedColors } from './EnhancedColors';

// Enhanced typography styles following iOS design guidelines
export const Typography = {
  light: {
    // Headings
    largeTitle: {
      fontSize: 34,
      fontWeight: '700',
      letterSpacing: 0.41,
      color: enhancedColors.light.primaryText,
    },
    title1: {
      fontSize: 28,
      fontWeight: '700',
      letterSpacing: 0.34,
      color: enhancedColors.light.primaryText,
    },
    title2: {
      fontSize: 22,
      fontWeight: '700',
      letterSpacing: 0.35,
      color: enhancedColors.light.primaryText,
    },
    title3: {
      fontSize: 20,
      fontWeight: '600',
      letterSpacing: 0.38,
      color: enhancedColors.light.primaryText,
    },
    
    // Body text
    body: {
      fontSize: 17,
      fontWeight: '400',
      letterSpacing: -0.41,
      color: enhancedColors.light.primaryText,
    },
    bodyBold: {
      fontSize: 17,
      fontWeight: '600',
      letterSpacing: -0.41,
      color: enhancedColors.light.primaryText,
    },
    callout: {
      fontSize: 16,
      fontWeight: '400',
      letterSpacing: -0.32,
      color: enhancedColors.light.primaryText,
    },
    calloutBold: {
      fontSize: 16,
      fontWeight: '600',
      letterSpacing: -0.32,
      color: enhancedColors.light.primaryText,
    },
    subhead: {
      fontSize: 15,
      fontWeight: '400',
      letterSpacing: -0.24,
      color: enhancedColors.light.primaryText,
    },
    subheadBold: {
      fontSize: 15,
      fontWeight: '600',
      letterSpacing: -0.24,
      color: enhancedColors.light.primaryText,
    },
    
    // Small text
    footnote: {
      fontSize: 13,
      fontWeight: '400',
      letterSpacing: -0.08,
      color: enhancedColors.light.secondaryText,
    },
    footnoteBold: {
      fontSize: 13,
      fontWeight: '600',
      letterSpacing: -0.08,
      color: enhancedColors.light.secondaryText,
    },
    caption1: {
      fontSize: 12,
      fontWeight: '400',
      letterSpacing: 0,
      color: enhancedColors.light.secondaryText,
    },
    caption2: {
      fontSize: 11,
      fontWeight: '400',
      letterSpacing: 0.07,
      color: enhancedColors.light.tertiaryText,
    },
  },
  dark: {
    // Headings
    largeTitle: {
      fontSize: 34,
      fontWeight: '700',
      letterSpacing: 0.41,
      color: enhancedColors.dark.primaryText,
    },
    title1: {
      fontSize: 28,
      fontWeight: '700',
      letterSpacing: 0.34,
      color: enhancedColors.dark.primaryText,
    },
    title2: {
      fontSize: 22,
      fontWeight: '700',
      letterSpacing: 0.35,
      color: enhancedColors.dark.primaryText,
    },
    title3: {
      fontSize: 20,
      fontWeight: '600',
      letterSpacing: 0.38,
      color: enhancedColors.dark.primaryText,
    },
    
    // Body text
    body: {
      fontSize: 17,
      fontWeight: '400',
      letterSpacing: -0.41,
      color: enhancedColors.dark.primaryText,
    },
    bodyBold: {
      fontSize: 17,
      fontWeight: '600',
      letterSpacing: -0.41,
      color: enhancedColors.dark.primaryText,
    },
    callout: {
      fontSize: 16,
      fontWeight: '400',
      letterSpacing: -0.32,
      color: enhancedColors.dark.primaryText,
    },
    calloutBold: {
      fontSize: 16,
      fontWeight: '600',
      letterSpacing: -0.32,
      color: enhancedColors.dark.primaryText,
    },
    subhead: {
      fontSize: 15,
      fontWeight: '400',
      letterSpacing: -0.24,
      color: enhancedColors.dark.primaryText,
    },
    subheadBold: {
      fontSize: 15,
      fontWeight: '600',
      letterSpacing: -0.24,
      color: enhancedColors.dark.primaryText,
    },
    
    // Small text
    footnote: {
      fontSize: 13,
      fontWeight: '400',
      letterSpacing: -0.08,
      color: enhancedColors.dark.secondaryText,
    },
    footnoteBold: {
      fontSize: 13,
      fontWeight: '600',
      letterSpacing: -0.08,
      color: enhancedColors.dark.secondaryText,
    },
    caption1: {
      fontSize: 12,
      fontWeight: '400',
      letterSpacing: 0,
      color: enhancedColors.dark.secondaryText,
    },
    caption2: {
      fontSize: 11,
      fontWeight: '400',
      letterSpacing: 0.07,
      color: enhancedColors.dark.tertiaryText,
    },
  }
};

// Function to get typography styles based on color scheme
export function useTypography(colorScheme) {
  return Typography[colorScheme ?? 'light'];
}
