import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { AuthProvider, useAuth } from '@/src/context/AuthContext';
import { supabase } from '@/src/lib/supabase';

// Mock the supabase client
jest.mock('@/src/lib/supabase', () => ({
  supabase: {
    auth: {
      signUp: jest.fn(),
      signInWithPassword: jest.fn(),
      signOut: jest.fn(),
      resetPasswordForEmail: jest.fn(),
      updateUser: jest.fn(),
      getSession: jest.fn(),
      onAuthStateChange: jest.fn(() => ({
        data: {
          subscription: {
            unsubscribe: jest.fn(),
          },
        },
      })),
    },
  },
}));

// Mock React Native Alert
jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

// Test component that uses the auth context
const TestComponent = () => {
  const { user, signIn, signUp, signOut } = useAuth();
  
  return (
    <>
      <div data-testid="user-status">{user ? 'Logged In' : 'Logged Out'}</div>
      <button 
        data-testid="sign-in-button" 
        onPress={() => signIn('test@example.com', 'password')}
      >
        Sign In
      </button>
      <button 
        data-testid="sign-up-button" 
        onPress={() => signUp('test@example.com', 'password')}
      >
        Sign Up
      </button>
      <button 
        data-testid="sign-out-button" 
        onPress={() => signOut()}
      >
        Sign Out
      </button>
    </>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('provides authentication state', () => {
    supabase.auth.getSession.mockResolvedValue({
      data: { session: null },
      error: null,
    });

    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(getByTestId('user-status').props.children).toBe('Logged Out');
  });

  test('handles sign in', async () => {
    supabase.auth.getSession.mockResolvedValue({
      data: { session: null },
      error: null,
    });
    
    supabase.auth.signInWithPassword.mockResolvedValue({
      data: { user: { id: '123' }, session: { user: { id: '123' } } },
      error: null,
    });

    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.press(getByTestId('sign-in-button'));

    await waitFor(() => {
      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password',
      });
    });
  });

  test('handles sign up', async () => {
    supabase.auth.getSession.mockResolvedValue({
      data: { session: null },
      error: null,
    });
    
    supabase.auth.signUp.mockResolvedValue({
      data: { user: { id: '123' } },
      error: null,
    });

    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.press(getByTestId('sign-up-button'));

    await waitFor(() => {
      expect(supabase.auth.signUp).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password',
      });
    });
  });

  test('handles sign out', async () => {
    supabase.auth.getSession.mockResolvedValue({
      data: { 
        session: { 
          user: { id: '123' } 
        } 
      },
      error: null,
    });
    
    supabase.auth.signOut.mockResolvedValue({
      error: null,
    });

    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.press(getByTestId('sign-out-button'));

    await waitFor(() => {
      expect(supabase.auth.signOut).toHaveBeenCalled();
    });
  });

  test('handles authentication errors', async () => {
    supabase.auth.getSession.mockResolvedValue({
      data: { session: null },
      error: null,
    });
    
    supabase.auth.signInWithPassword.mockResolvedValue({
      data: { user: null, session: null },
      error: { message: 'Invalid login credentials' },
    });

    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.press(getByTestId('sign-in-button'));

    await waitFor(() => {
      expect(supabase.auth.signInWithPassword).toHaveBeenCalled();
    });
  });
});
