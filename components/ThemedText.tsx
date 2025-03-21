import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Typography } from '@/constants/Typography';

interface ThemedTextProps extends TextProps {
  type?: 'largeTitle' | 'title1' | 'title2' | 'title3' | 'body' | 'bodyBold' | 
         'callout' | 'calloutBold' | 'subhead' | 'subheadBold' | 
         'footnote' | 'footnoteBold' | 'caption1' | 'caption2' | 
         'title' | 'subtitle' | 'default' | 'defaultSemiBold';
  children: React.ReactNode;
}

export function ThemedText(props: ThemedTextProps) {
  const { style, type = 'body', ...otherProps } = props;
  const colorScheme = useColorScheme();
  const typography = Typography[colorScheme ?? 'light'];
  
  // Map old type names to new typography styles
  const typeMap = {
    title: typography.title1,
    subtitle: typography.title3,
    default: typography.body,
    defaultSemiBold: typography.bodyBold,
  };
  
  const textStyle = typography[type] || typeMap[type] || typography.body;

  return (
    <Text
      style={[textStyle, style]}
      {...otherProps}
    />
  );
}
