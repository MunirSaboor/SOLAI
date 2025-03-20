import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { FormInput } from '@/components/ui/FormInput';
import { useColorScheme } from '@/hooks/useColorScheme';
import { enhancedColors } from '@/constants/EnhancedColors';

export default function UserProfileComponent() {
  const colorScheme = useColorScheme();
  const colors = enhancedColors[colorScheme ?? 'light'];
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [bio, setBio] = React.useState('');
  const [errors, setErrors] = React.useState({
    name: '',
    email: '',
    bio: ''
  });
  
  const handleSave = () => {
    // Reset errors
    setErrors({
      name: '',
      email: '',
      bio: ''
    });
    
    // Validate inputs
    let hasErrors = false;
    const newErrors = { name: '', email: '', bio: '' };
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
      hasErrors = true;
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
      hasErrors = true;
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
      hasErrors = true;
    }
    
    if (hasErrors) {
      setErrors(newErrors);
      return;
    }
    
    // In a real app, this would save to a backend or local storage
    alert('Profile information saved successfully!');
  };
  
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  return (
    <ScrollView style={styles.container}>
      <ThemedView variant="card" style={styles.card}>
        <ThemedText type="title2" style={styles.title}>User Profile</ThemedText>
        
        <FormInput
          label="Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          error={errors.name}
          autoCapitalize="words"
        />
        
        <FormInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <FormInput
          label="Bio"
          value={bio}
          onChangeText={setBio}
          placeholder="Tell us about yourself"
          multiline
          numberOfLines={4}
          style={styles.textArea}
        />
        
        <View style={styles.buttonContainer}>
          <Button 
            variant="outline" 
            style={styles.button}
            onPress={() => {
              setName('');
              setEmail('');
              setBio('');
              setErrors({ name: '', email: '', bio: '' });
            }}
          >
            Cancel
          </Button>
          
          <Button 
            variant="primary" 
            style={styles.button}
            onPress={handleSave}
          >
            Save Profile
          </Button>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 20,
  },
  title: {
    marginBottom: 20,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  }
});
