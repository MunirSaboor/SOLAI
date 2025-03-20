import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View, Text } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { enhancedColors } from '@/constants/EnhancedColors';
import { Typography } from '@/constants/Typography';

interface FormInputProps extends TextInputProps {
  label?: string;
  error?: string;
  helper?: string;
  containerStyle?: object;
}

export function FormInput(props: FormInputProps) {
  const { 
    style, 
    label, 
    error, 
    helper, 
    containerStyle, 
    placeholder,
    ...otherProps 
  } = props;
  
  const colorScheme = useColorScheme();
  const colors = enhancedColors[colorScheme ?? 'light'];
  const typography = Typography[colorScheme ?? 'light'];
  
  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[typography.subheadBold, styles.label]}>
          {label}
        </Text>
      )}
      
      <TextInput
        style={[
          styles.input,
          { 
            backgroundColor: colors.inputBackground,
            color: colors.primaryText,
            borderColor: error ? colors.danger : colors.border
          },
          style
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholderText}
        {...otherProps}
      />
      
      {error && (
        <Text style={[typography.footnote, styles.error, { color: colors.danger }]}>
          {error}
        </Text>
      )}
      
      {helper && !error && (
        <Text style={[typography.footnote, styles.helper, { color: colors.secondaryText }]}>
          {helper}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 6,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  error: {
    marginTop: 4,
  },
  helper: {
    marginTop: 4,
  },
});
