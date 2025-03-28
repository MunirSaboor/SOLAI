import { StyleSheet, Image } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import ParallaxScrollView from '../../components/ParallaxScrollView';
import { Collapsible } from '../../components/Collapsible';
import { ExternalLink } from '../../components/ExternalLink';


export default function ExploreScreen() {
  return (
    <ParallaxScrollView
    headerImage={<Image source={require('../../assets/images/icon.png')} />}  
      headerBackgroundColor={{ light: '#f39c12', dark: '#7d5109' }}
    >
      <ThemedView style={styles.container}>
        <ThemedText type="subtitle">App Features</ThemedText>
        
        <Collapsible title="User Profile">
          <ThemedText>
            Create and manage your personal profile with customizable settings and preferences.
          </ThemedText>
        </Collapsible>
        
        <Collapsible title="Content Library">
          <ThemedText>
            Browse and access your content library with intuitive navigation and organization.
          </ThemedText>
        </Collapsible>
        
        <Collapsible title="Notifications">
          <ThemedText>
            Stay updated with push notifications for important events and updates.
          </ThemedText>
        </Collapsible>
        
        <Collapsible title="Settings">
          <ThemedText>
            Customize your app experience with various settings and configuration options.
          </ThemedText>
        </Collapsible>
        
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">About This App</ThemedText>
          <ThemedText>
            This iOS application was built using React Native and Expo, allowing for cross-platform 
            development while maintaining native iOS look and feel. The app features a modern UI with 
            support for both light and dark modes, responsive design for various iPhone screen sizes, 
            and intuitive navigation.
          </ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Resources</ThemedText>
          <ExternalLink href="https://reactnative.dev">
            React Native Documentation
          </ExternalLink>
          <ExternalLink href="https://docs.expo.dev">
            Expo Documentation
          </ExternalLink>
          <ExternalLink href="https://developer.apple.com/ios/">
            Apple iOS Developer Resources
          </ExternalLink>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  section: {
    marginTop: 16,
    gap: 8,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
});
