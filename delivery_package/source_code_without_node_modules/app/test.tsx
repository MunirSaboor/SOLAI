import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TestScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title1">Test Screen</ThemedText>
      <ThemedText type="body">This screen is used for testing the application.</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
