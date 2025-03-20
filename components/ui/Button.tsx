import React from 'react';
import { StyleSheet, TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { enhancedColors } from '@/constants/EnhancedColors';
import { Typography } from '@/constants/Typography';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'outline';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  textStyle?: object;
}

export function Button(props: ButtonProps) {
  const { style, variant = 'primary', size = 'medium', children, textStyle, ...otherProps } = props;
  const colorScheme = useColorScheme();
  const colors = enhancedColors[colorScheme ?? 'light'];
  const typography = Typography[colorScheme ?? 'light'];
  
  const variantStyles = {
    primary: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    secondary: {
      backgroundColor: colors.secondary,
      borderColor: colors.secondary,
    },
    success: {
      backgroundColor: colors.success,
      borderColor: colors.success,
    },
    danger: {
      backgroundColor: colors.danger,
      borderColor: colors.danger,
    },
    outline: {
      backgroundColor: 'transparent',
      borderColor: colors.primary,
      borderWidth: 1,
    },
  };
  
  const sizeStyles = {
    small: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 12,
    },
    medium: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 14,
    },
    large: {
      paddingVertical: 14,
      paddingHorizontal: 20,
      borderRadius: 16,
    },
  };
  
  const textVariantStyles = {
    primary: { color: '#FFFFFF' },
    secondary: { color: '#FFFFFF' },
    success: { color: '#FFFFFF' },
    danger: { color: '#FFFFFF' },
    outline: { color: colors.primary },
  };
  
  const textSizeStyles = {
    small: typography.subhead,
    medium: typography.callout,
    large: typography.body,
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variantStyles[variant],
        sizeStyles[size],
        style
      ]}
      activeOpacity={0.7}
      {...otherProps}
    >
      <Text style={[
        textSizeStyles[size],
        textVariantStyles[variant],
        { fontWeight: '600' },
        textStyle
      ]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
