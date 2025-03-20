import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { CryptoProvider } from './src/context/CryptoContext';
import { AIProvider } from './src/context/AIContext';

// Import the existing RootLayout component
import RootLayout from './app/_layout';

export default function App() {
  return (
    <PaperProvider>
      <CryptoProvider>
        <AIProvider>
          <RootLayout />
        </AIProvider>
      </CryptoProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
