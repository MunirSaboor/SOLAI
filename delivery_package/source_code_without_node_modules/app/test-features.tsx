import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { useColorScheme } from '@/hooks/useColorScheme';
import UserProfileComponent from '@/components/UserProfile';
import ContentLibraryComponent from '@/components/ContentLibrary';
import NotificationsComponent from '@/components/Notifications';

export default function TestFeaturesScreen() {
  const colorScheme = useColorScheme();
  const [activeTab, setActiveTab] = React.useState('profile');
  
  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <UserProfileComponent />;
      case 'content':
        return <ContentLibraryComponent />;
      case 'notifications':
        return <NotificationsComponent />;
      default:
        return <UserProfileComponent />;
    }
  };
  
  return (
    <View style={styles.container}>
      <ThemedText type="largeTitle" style={styles.title}>Feature Testing</ThemedText>
      
      <View style={styles.tabContainer}>
        <Button 
          variant={activeTab === 'profile' ? 'primary' : 'outline'} 
          style={styles.tabButton}
          onPress={() => setActiveTab('profile')}
        >
          Profile
        </Button>
        <Button 
          variant={activeTab === 'content' ? 'primary' : 'outline'} 
          style={styles.tabButton}
          onPress={() => setActiveTab('content')}
        >
          Content
        </Button>
        <Button 
          variant={activeTab === 'notifications' ? 'primary' : 'outline'} 
          style={styles.tabButton}
          onPress={() => setActiveTab('notifications')}
        >
          Notifications
        </Button>
      </View>
      
      <View style={styles.contentContainer}>
        {renderContent()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  contentContainer: {
    flex: 1,
  },
});
