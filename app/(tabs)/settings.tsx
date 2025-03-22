import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Switch } from 'react-native';
import { Card, Title, Paragraph, Button, Divider, List, Avatar, useTheme } from 'react-native-paper';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { enhancedColors } from '@/constants/EnhancedColors';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const colors = enhancedColors[colorScheme ?? 'light'];
  const theme = useTheme();
  
  // Mock user data
  const [user, setUser] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    avatar: null, // In a real app, this would be a URL or image source
  });
  
  // Settings state
  const [notifications, setNotifications] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState(true);
  const [darkMode, setDarkMode] = useState(colorScheme === 'dark');
  const [biometricLogin, setBiometricLogin] = useState(false);
  
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Settings</ThemedText>
        <ThemedText type="subtitle">Customize your SOLAI experience</ThemedText>
      </ThemedView>
      
      <Card style={styles.profileCard}>
        <Card.Content>
          <View style={styles.profileHeader}>
            <Avatar.Text 
              size={60} 
              label={user.name.split(' ').map(n => n[0]).join('')} 
              backgroundColor={colors.primary}
            />
            <View style={styles.profileInfo}>
              <ThemedText type="title2">{user.name}</ThemedText>
              <ThemedText>{user.email}</ThemedText>
            </View>
          </View>
        </Card.Content>
        <Card.Actions>
          <Button mode="outlined" style={styles.profileButton}>Edit Profile</Button>
        </Card.Actions>
      </Card>
      
      <Card style={styles.settingsCard}>
        <Card.Content>
          <Title>App Settings</Title>
          
          <List.Section>
            <List.Item
              title="Notifications"
              description="Receive updates and alerts"
              left={props => <List.Icon {...props} icon="bell" />}
              right={props => (
                <Switch
                  value={notifications}
                  onValueChange={setNotifications}
                  color={colors.primary}
                />
              )}
            />
            <Divider />
            
            <List.Item
              title="Price Alerts"
              description="Get notified of significant price changes"
              left={props => <List.Icon {...props} icon="chart-line" />}
              right={props => (
                <Switch
                  value={priceAlerts}
                  onValueChange={setPriceAlerts}
                  color={colors.primary}
                />
              )}
            />
            <Divider />
            
            <List.Item
              title="AI Trading Suggestions"
              description="Receive AI-powered trading insights"
              left={props => <List.Icon {...props} icon="robot" />}
              right={props => (
                <Switch
                  value={aiSuggestions}
                  onValueChange={setAiSuggestions}
                  color={colors.primary}
                />
              )}
            />
            <Divider />
            
            <List.Item
              title="Dark Mode"
              description="Toggle between light and dark themes"
              left={props => <List.Icon {...props} icon="theme-light-dark" />}
              right={props => (
                <Switch
                  value={darkMode}
                  onValueChange={setDarkMode}
                  color={colors.primary}
                />
              )}
            />
            <Divider />
            
            <List.Item
              title="Biometric Login"
              description="Use Face ID or Touch ID to log in"
              left={props => <List.Icon {...props} icon="fingerprint" />}
              right={props => (
                <Switch
                  value={biometricLogin}
                  onValueChange={setBiometricLogin}
                  color={colors.primary}
                />
              )}
            />
          </List.Section>
        </Card.Content>
      </Card>
      
      <Card style={styles.settingsCard}>
        <Card.Content>
          <Title>Trading Settings</Title>
          
          <List.Section>
            <List.Item
              title="Reset Portfolio"
              description="Start fresh with initial balances"
              left={props => <List.Icon {...props} icon="refresh" />}
              right={props => (
                <Button 
                  mode="text" 
                  onPress={() => alert('This would reset your portfolio in a real app')}
                >
                  Reset
                </Button>
              )}
            />
            <Divider />
            
            <List.Item
              title="Default Currency"
              description="USD"
              left={props => <List.Icon {...props} icon="currency-usd" />}
              right={props => (
                <Button 
                  mode="text" 
                  onPress={() => alert('This would open currency selection in a real app')}
                >
                  Change
                </Button>
              )}
            />
            <Divider />
            
            <List.Item
              title="Trading Fee"
              description="0.1% per transaction"
              left={props => <List.Icon {...props} icon="percent" />}
              right={props => (
                <ThemedText style={styles.infoText}>Default</ThemedText>
              )}
            />
          </List.Section>
        </Card.Content>
      </Card>
      
      <Card style={styles.settingsCard}>
        <Card.Content>
          <Title>About</Title>
          
          <List.Section>
            <List.Item
              title="App Version"
              description="SOLAI v1.0.0"
              left={props => <List.Icon {...props} icon="information" />}
            />
            <Divider />
            
            <List.Item
              title="Terms of Service"
              left={props => <List.Icon {...props} icon="file-document" />}
              onPress={() => alert('This would open Terms of Service in a real app')}
            />
            <Divider />
            
            <List.Item
              title="Privacy Policy"
              left={props => <List.Icon {...props} icon="shield-account" />}
              onPress={() => alert('This would open Privacy Policy in a real app')}
            />
            <Divider />
            
            <List.Item
              title="Contact Support"
              left={props => <List.Icon {...props} icon="help-circle" />}
              onPress={() => alert('This would open support contact in a real app')}
            />
          </List.Section>
        </Card.Content>
      </Card>
      
      <Button 
        mode="outlined" 
        style={styles.logoutButton}
        onPress={() => alert('This would log you out in a real app')}
      >
        Log Out
      </Button>
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
  profileCard: {
    marginBottom: 16,
    borderRadius: 12,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileInfo: {
    marginLeft: 16,
  },
  profileButton: {
    marginLeft: 'auto',
  },
  settingsCard: {
    marginBottom: 16,
    borderRadius: 12,
  },
  infoText: {
    opacity: 0.6,
    alignSelf: 'center',
  },
  logoutButton: {
    marginBottom: 120,
  },
});
