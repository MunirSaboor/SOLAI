import React from 'react';
import { StyleSheet, View, ScrollView, Switch } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { useColorScheme } from '@/hooks/useColorScheme';
import { enhancedColors } from '@/constants/EnhancedColors';

export default function TestResponsivenessScreen() {
  const colorScheme = useColorScheme();
  const colors = enhancedColors[colorScheme ?? 'light'];
  const [isDarkMode, setIsDarkMode] = React.useState(colorScheme === 'dark');
  
  // This is a mock function since we can't actually change the system theme in our test
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  return (
    <ScrollView style={styles.container}>
      <ThemedText type="largeTitle" style={styles.title}>Cross-cutting Tests</ThemedText>
      
      <ThemedView variant="card" style={styles.section}>
        <ThemedText type="title2" style={styles.sectionTitle}>Dark Mode Testing</ThemedText>
        <ThemedText style={styles.description}>
          This simulates dark mode appearance. In a real device, the app would respond to system dark mode settings.
        </ThemedText>
        
        <View style={styles.toggleContainer}>
          <ThemedText>Light</ThemedText>
          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            trackColor={{ 
              false: '#767577', 
              true: colors.primary
            }}
            thumbColor="#FFFFFF"
          />
          <ThemedText>Dark</ThemedText>
        </View>
        
        <ThemedView 
          style={[
            styles.previewBox,
            { 
              backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF',
              borderColor: isDarkMode ? '#38383A' : '#E5E5EA'
            }
          ]}
        >
          <ThemedText style={{ 
            color: isDarkMode ? '#FFFFFF' : '#000000' 
          }}>
            Preview Text
          </ThemedText>
          
          <Button 
            variant="primary"
            style={styles.previewButton}
          >
            Preview Button
          </Button>
        </ThemedView>
      </ThemedView>
      
      <ThemedView variant="card" style={styles.section}>
        <ThemedText type="title2" style={styles.sectionTitle}>Responsive Layout Test</ThemedText>
        <ThemedText style={styles.description}>
          These elements demonstrate how the layout responds to different screen sizes.
        </ThemedText>
        
        <View style={styles.responsiveRow}>
          <ThemedView 
            variant="grouped" 
            style={[styles.responsiveBox, { flex: 1 }]}
          >
            <ThemedText style={styles.centeredText}>Box 1</ThemedText>
          </ThemedView>
          <ThemedView 
            variant="grouped" 
            style={[styles.responsiveBox, { flex: 1 }]}
          >
            <ThemedText style={styles.centeredText}>Box 2</ThemedText>
          </ThemedView>
        </View>
        
        <View style={styles.responsiveRow}>
          <ThemedView 
            variant="grouped" 
            style={[styles.responsiveBox, { flex: 2 }]}
          >
            <ThemedText style={styles.centeredText}>Wider Box</ThemedText>
          </ThemedView>
          <ThemedView 
            variant="grouped" 
            style={[styles.responsiveBox, { flex: 1 }]}
          >
            <ThemedText style={styles.centeredText}>Box 3</ThemedText>
          </ThemedView>
        </View>
      </ThemedView>
      
      <ThemedView variant="card" style={styles.section}>
        <ThemedText type="title2" style={styles.sectionTitle}>Style Consistency Check</ThemedText>
        <ThemedText style={styles.description}>
          This section helps verify that styling is consistent across different elements.
        </ThemedText>
        
        <View style={styles.consistencyContainer}>
          <ThemedText type="title3">Heading</ThemedText>
          <ThemedText>Regular paragraph text that should maintain consistent styling with the rest of the application. The text should be readable and properly spaced.</ThemedText>
          <Button variant="primary" style={styles.consistencyButton}>Primary Action</Button>
          <Button variant="outline" style={styles.consistencyButton}>Secondary Action</Button>
        </View>
      </ThemedView>
      
      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  description: {
    marginBottom: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 16,
  },
  previewBox: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    gap: 16,
  },
  previewButton: {
    minWidth: 150,
  },
  responsiveRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  responsiveBox: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredText: {
    textAlign: 'center',
  },
  consistencyContainer: {
    gap: 12,
  },
  consistencyButton: {
    marginTop: 4,
  },
  spacer: {
    height: 50,
  },
});
