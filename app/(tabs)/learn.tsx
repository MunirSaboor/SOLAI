import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Button, Divider, ProgressBar, List, useTheme } from 'react-native-paper';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { enhancedColors } from '@/constants/EnhancedColors';

// Mock data for initial development
const mockLearningModules = [
  {
    id: 1,
    title: 'Cryptocurrency Basics',
    description: 'Learn the fundamentals of blockchain technology and cryptocurrencies.',
    progress: 0.8,
    lessons: [
      { id: 1, title: 'What is Blockchain?', completed: true },
      { id: 2, title: 'Understanding Cryptocurrencies', completed: true },
      { id: 3, title: 'Wallets and Security', completed: true },
      { id: 4, title: 'Decentralized Finance (DeFi)', completed: false },
      { id: 5, title: 'NFTs and Digital Assets', completed: false },
    ]
  },
  {
    id: 2,
    title: 'Trading Strategies',
    description: 'Explore different trading strategies for cryptocurrency markets.',
    progress: 0.4,
    lessons: [
      { id: 1, title: 'Market Analysis Basics', completed: true },
      { id: 2, title: 'Technical Analysis', completed: true },
      { id: 3, title: 'Risk Management', completed: false },
      { id: 4, title: 'Trading Psychology', completed: false },
      { id: 5, title: 'Advanced Trading Strategies', completed: false },
    ]
  },
  {
    id: 3,
    title: 'Solana Ecosystem',
    description: 'Deep dive into the Solana blockchain ecosystem and its projects.',
    progress: 0.2,
    lessons: [
      { id: 1, title: 'Introduction to Solana', completed: true },
      { id: 2, title: 'Solana Architecture', completed: false },
      { id: 3, title: 'DApps on Solana', completed: false },
      { id: 4, title: 'Solana NFT Marketplace', completed: false },
      { id: 5, title: 'Future of Solana', completed: false },
    ]
  },
  {
    id: 4,
    title: 'AI in Crypto Trading',
    description: 'Learn how AI can enhance your cryptocurrency trading strategies.',
    progress: 0,
    lessons: [
      { id: 1, title: 'AI Basics for Traders', completed: false },
      { id: 2, title: 'Sentiment Analysis', completed: false },
      { id: 3, title: 'Predictive Models', completed: false },
      { id: 4, title: 'Automated Trading Systems', completed: false },
      { id: 5, title: 'Building Your AI Strategy', completed: false },
    ]
  }
];

export default function LearnScreen() {
  const colorScheme = useColorScheme();
  const colors = enhancedColors[colorScheme ?? 'light'];
  const theme = useTheme();
  
  const [selectedModule, setSelectedModule] = useState(null);
  
  const renderModuleList = () => (
    <>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Learn</ThemedText>
        <ThemedText type="subtitle">Enhance your trading knowledge</ThemedText>
      </ThemedView>
      
      <Card style={styles.statsCard}>
        <Card.Content>
          <Title>Your Learning Progress</Title>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <ThemedText type="title2">35%</ThemedText>
              <ThemedText style={styles.statLabel}>Overall Progress</ThemedText>
            </View>
            <View style={styles.statItem}>
              <ThemedText type="title2">2/4</ThemedText>
              <ThemedText style={styles.statLabel}>Modules Started</ThemedText>
            </View>
            <View style={styles.statItem}>
              <ThemedText type="title2">7</ThemedText>
              <ThemedText style={styles.statLabel}>Lessons Completed</ThemedText>
            </View>
          </View>
        </Card.Content>
      </Card>
      
      {mockLearningModules.map((module) => (
        <Card key={module.id} style={styles.moduleCard} onPress={() => setSelectedModule(module)}>
          <Card.Content>
            <Title>{module.title}</Title>
            <Paragraph>{module.description}</Paragraph>
            <View style={styles.progressContainer}>
              <ThemedText style={styles.progressText}>
                Progress: {Math.round(module.progress * 100)}%
              </ThemedText>
              <ProgressBar 
                progress={module.progress} 
                color={colors.primary} 
                style={styles.progressBar} 
              />
            </View>
          </Card.Content>
          <Card.Actions>
            <Button mode="contained" onPress={() => setSelectedModule(module)}>
              {module.progress > 0 ? 'Continue' : 'Start Learning'}
            </Button>
          </Card.Actions>
        </Card>
      ))}
      
      <Card style={styles.aiCard}>
        <Card.Content>
          <Title>AI Learning Assistant</Title>
          <Paragraph>
            Based on your trading activity, I recommend focusing on the "Risk Management" 
            lesson in the Trading Strategies module to improve your portfolio performance.
          </Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button 
            mode="outlined" 
            onPress={() => {
              const tradingModule = mockLearningModules.find(m => m.id === 2);
              setSelectedModule(tradingModule);
            }}
          >
            Go to Recommendation
          </Button>
        </Card.Actions>
      </Card>
    </>
  );
  
  const renderModuleDetail = () => (
    <>
      <View style={styles.moduleDetailHeader}>
        <Button 
          icon="arrow-left" 
          mode="text" 
          onPress={() => setSelectedModule(null)}
          style={styles.backButton}
        >
          Back to Modules
        </Button>
        <ThemedText type="title">{selectedModule.title}</ThemedText>
      </View>
      
      <Card style={styles.moduleDetailCard}>
        <Card.Content>
          <Paragraph>{selectedModule.description}</Paragraph>
          <View style={styles.progressContainer}>
            <ThemedText style={styles.progressText}>
              Progress: {Math.round(selectedModule.progress * 100)}%
            </ThemedText>
            <ProgressBar 
              progress={selectedModule.progress} 
              color={colors.primary} 
              style={styles.progressBar} 
            />
          </View>
          
          <Title style={styles.lessonsTitle}>Lessons</Title>
          <List.Section>
            {selectedModule.lessons.map((lesson) => (
              <List.Item
                key={lesson.id}
                title={lesson.title}
                left={props => (
                  <List.Icon 
                    {...props} 
                    icon={lesson.completed ? "check-circle" : "circle-outline"} 
                    color={lesson.completed ? colors.success : colors.secondaryText}
                  />
                )}
                right={props => (
                  <Button 
                    mode={lesson.completed ? "text" : "outlined"} 
                    onPress={() => {}}
                  >
                    {lesson.completed ? "Review" : "Start"}
                  </Button>
                )}
                style={styles.lessonItem}
              />
            ))}
          </List.Section>
        </Card.Content>
      </Card>
      
      <Card style={styles.aiCard}>
        <Card.Content>
          <Title>AI Learning Tips</Title>
          <Paragraph>
            Focus on completing the "{selectedModule.lessons.find(l => !l.completed)?.title}" 
            lesson next to maintain a structured learning path through this module.
          </Paragraph>
        </Card.Content>
      </Card>
    </>
  );

  return (
    <ScrollView style={styles.container}>
      {selectedModule ? renderModuleDetail() : renderModuleList()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
    marginTop: 60,
  },
  statsCard: {
    marginBottom: 16,
    borderRadius: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    marginTop: 4,
    opacity: 0.7,
  },
  moduleCard: {
    marginBottom: 16,
    borderRadius: 12,
  },
  progressContainer: {
    marginTop: 12,
  },
  progressText: {
    marginBottom: 4,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  aiCard: {
    marginBottom: 16,
    borderRadius: 12,
  },
  moduleDetailHeader: {
    marginTop: 60,
    marginBottom: 16,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  moduleDetailCard: {
    marginBottom: 16,
    borderRadius: 12,
  },
  lessonsTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  lessonItem: {
    paddingVertical: 8,
  },
});
