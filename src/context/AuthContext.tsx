import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { Alert } from 'react-native';

// Define types for our context
type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (password: string) => Promise<void>;
};

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
  forgotPassword: async () => {},
  resetPassword: async () => {},
});

// Create a provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for an existing session when the app loads
    const getSession = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }
        setSession(data.session);
        setUser(data.session?.user || null);
      } catch (error) {
        console.error('Error getting session:', error);
        Alert.alert('Session Error', 'Failed to get user session.');
      } finally {
        setIsLoading(false);
      }
    };

    getSession();

    // Set up a listener for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user || null);
      }
    );

    // Clean up the subscription when the component unmounts
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Sign up function
  const signUp = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        throw error;
      }
      Alert.alert(
        'Registration Successful',
        'Please check your email for verification instructions.'
      );
    } catch (error: any) {
      console.error('Error signing up:', error);
      Alert.alert('Sign Up Error', error.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Sign in function
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        throw error;
      }
    } catch (error: any) {
      console.error('Error signing in:', error);
      Alert.alert('Sign In Error', error.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out function
  const signOut = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
    } catch (error: any) {
      console.error('Error signing out:', error);
      Alert.alert('Sign Out Error', error.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Forgot password function
  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'solai://reset-password',
      });
      if (error) {
        throw error;
      }
      Alert.alert(
        'Password Reset Email Sent',
        'Check your email for a password reset link'
      );
    } catch (error: any) {
      console.error('Error resetting password:', error);
      Alert.alert('Password Reset Error', error.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password function
  const resetPassword = async (password: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });
      if (error) {
        throw error;
      }
      Alert.alert('Success', 'Your password has been updated');
    } catch (error: any) {
      console.error('Error updating password:', error);
      Alert.alert('Update Error', error.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Create the value object to be provided to consumers
  const value = {
    user,
    session,
    isLoading,
    signUp,
    signIn,
    signOut,
    forgotPassword,
    resetPassword,
  };

  // Return the provider with the value
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create a custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
