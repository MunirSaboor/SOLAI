import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { FormInput } from '@/components/ui/FormInput';
import { useColorScheme } from '@/hooks/useColorScheme';
import { enhancedColors } from '@/constants/EnhancedColors';

export default function TestComponentsScreen() {
  const colorScheme = useColorScheme();
  const colors = enhancedColors[colorScheme ?? 'light'];
  const [inputValue, setInputValue] = React.useState('');
  const [hasError, setHasError] = React.useState(false);
  
  return (
    <ScrollView style={styles.container}>
      <ThemedText type="largeTitle" style={styles.sectionTitle}>Component Testing</ThemedText>
      
      {/* Typography Test */}
      <ThemedView variant="card" style={styles.section}>
        <ThemedText type="title2">Typography Test</ThemedText>
        
        <ThemedText type="largeTitle">Large Title</ThemedText>
        <ThemedText type="title1">Title 1</ThemedText>
        <ThemedText type="title2">Title 2</ThemedText>
        <ThemedText type="title3">Title 3</ThemedText>
        <ThemedText type="body">Body Text</ThemedText>
        <ThemedText type="bodyBold">Body Bold</ThemedText>
        <ThemedText type="callout">Callout Text</ThemedText>
        <ThemedText type="footnote">Footnote Text</ThemedText>
        <ThemedText type="caption1">Caption 1</ThemedText>
        <ThemedText type="caption2">Caption 2</ThemedText>
      </ThemedView>
      
      {/* ThemedView Test */}
      <ThemedText type="title2" style={styles.sectionTitle}>ThemedView Variants</ThemedText>
      
      <ThemedView variant="default" style={styles.viewTest}>
        <ThemedText>Default View</ThemedText>
      </ThemedView>
      
      <ThemedView variant="card" style={styles.viewTest}>
        <ThemedText>Card View</ThemedText>
      </ThemedView>
      
      <ThemedView variant="grouped" style={styles.viewTest}>
        <ThemedText style={{padding: 16}}>Grouped View</ThemedText>
      </ThemedView>
      
      {/* Button Test */}
      <ThemedText type="title2" style={styles.sectionTitle}>Button Variants</ThemedText>
      
      <View style={styles.buttonRow}>
        <Button variant="primary" style={styles.button}>Primary</Button>
        <Button variant="secondary" style={styles.button}>Secondary</Button>
      </View>
      
      <View style={styles.buttonRow}>
        <Button variant="success" style={styles.button}>Success</Button>
        <Button variant="danger" style={styles.button}>Danger</Button>
      </View>
      
      <View style={styles.buttonRow}>
        <Button variant="outline" style={styles.button}>Outline</Button>
      </View>
      
      <ThemedText type="title3" style={styles.subsectionTitle}>Button Sizes</ThemedText>
      
      <View style={styles.buttonColumn}>
        <Button variant="primary" size="small" style={styles.buttonSizeTest}>Small</Button>
        <Button variant="primary" size="medium" style={styles.buttonSizeTest}>Medium</Button>
        <Button variant="primary" size="large" style={styles.buttonSizeTest}>Large</Button>
      </View>
      
      {/* FormInput Test */}
      <ThemedText type="title2" style={styles.sectionTitle}>Form Input</ThemedText>
      
      <FormInput
        label="Standard Input"
        placeholder="Enter text here"
        value={inputValue}
        onChangeText={setInputValue}
      />
      
      <FormInput
        label="Input with Helper"
        placeholder="Enter text here"
        helper="This is helper text below the input"
      />
      
      <FormInput
        label="Input with Error"
        placeholder="Enter text here"
        error="This field has an error"
      />
      
      <FormInput
        label="Multiline Input"
        placeholder="Enter multiple lines of text"
        multiline
        numberOfLines={4}
        style={styles.multilineInput}
      />
      
      <ThemedText type="title2" style={styles.sectionTitle}>Test Controls</ThemedText>
      
      <Button 
        variant="primary" 
        onPress={() => setHasError(!hasError)}
      >
        Toggle Error State
      </Button>
      
      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    marginTop: 24,
    marginBottom: 16,
  },
  subsectionTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  section: {
    marginBottom: 24,
    gap: 8,
  },
  viewTest: {
    marginBottom: 16,
    minHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  buttonColumn: {
    alignItems: 'flex-start',
    gap: 16,
    marginBottom: 24,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
  buttonSizeTest: {
    alignSelf: 'flex-start',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  spacer: {
    height: 50,
  },
});
