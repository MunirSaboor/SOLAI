import React from 'react';
import { StyleSheet, Switch, ScrollView, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { enhancedColors } from '@/constants/EnhancedColors';

export default function NotificationsComponent() {
  const colorScheme = useColorScheme();
  const colors = enhancedColors[colorScheme ?? 'light'];
  const [settings, setSettings] = React.useState({
    pushEnabled: true,
    emailEnabled: false,
    newContentAlerts: true,
    updateNotifications: true,
    weeklyDigest: false,
    soundEnabled: true,
    vibrationEnabled: true,
  });
  
  const toggleSetting = (key) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [key]: !prevSettings[key]
    }));
  };
  
  const renderSettingItem = (label, key, description = null) => (
    <ThemedView 
      style={[
        styles.settingItem,
        { borderBottomColor: colors.separator }
      ]}
    >
      <View style={styles.settingTextContainer}>
        <ThemedText type="callout">{label}</ThemedText>
        {description && (
          <ThemedText type="footnote" style={styles.description}>
            {description}
          </ThemedText>
        )}
      </View>
      <Switch
        value={settings[key]}
        onValueChange={() => toggleSetting(key)}
        trackColor={{ 
          false: '#767577', 
          true: colorScheme === 'dark' ? colors.primary : '#34C759' 
        }}
        thumbColor="#FFFFFF"
        ios_backgroundColor="#3e3e3e"
      />
    </ThemedView>
  );
  
  return (
    <ScrollView style={styles.container}>
      <ThemedText type="title2" style={styles.title}>Notification Preferences</ThemedText>
      
      <ThemedView variant="grouped">
        <ThemedText type="subheadBold" style={styles.sectionHeader}>
          Delivery Methods
        </ThemedText>
        
        {renderSettingItem('Push Notifications', 'pushEnabled', 
          'Receive notifications directly on your device')}
        
        {renderSettingItem('Email Notifications', 'emailEnabled', 
          'Receive notifications via email')}
      </ThemedView>
      
      <ThemedView variant="grouped">
        <ThemedText type="subheadBold" style={styles.sectionHeader}>
          Notification Types
        </ThemedText>
        
        {renderSettingItem('New Content Alerts', 'newContentAlerts', 
          'Get notified when new content is available')}
        
        {renderSettingItem('App Updates', 'updateNotifications', 
          'Get notified about app updates and new features')}
        
        {renderSettingItem('Weekly Digest', 'weeklyDigest', 
          'Receive a weekly summary of activity')}
      </ThemedView>
      
      <ThemedView variant="grouped">
        <ThemedText type="subheadBold" style={styles.sectionHeader}>
          Alert Settings
        </ThemedText>
        
        {renderSettingItem('Sound', 'soundEnabled', 
          'Play sound when notifications arrive')}
        
        {renderSettingItem('Vibration', 'vibrationEnabled', 
          'Vibrate when notifications arrive')}
      </ThemedView>
      
      <ThemedView style={styles.infoBox}>
        <ThemedText type="caption1" style={styles.infoText}>
          Notification settings are stored locally on your device. In a production app, these would sync with your account settings on our servers.
        </ThemedText>
      </ThemedView>
    </ScrollView>
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
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  settingTextContainer: {
    flex: 1,
    paddingRight: 16,
  },
  description: {
    marginTop: 4,
    opacity: 0.7,
  },
  infoBox: {
    padding: 16,
    marginTop: 16,
    marginBottom: 32,
    backgroundColor: 'rgba(142, 142, 147, 0.12)',
    borderRadius: 10,
  },
  infoText: {
    fontStyle: 'italic',
  }
});
