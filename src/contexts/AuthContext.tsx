/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from 'react';
import { signIn, signUp, signOut, getCurrentUser, confirmSignUp } from 'aws-amplify/auth';
import { User } from '@/types';

/**
 * Authentication context type definition
 */
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  needsConfirmation: boolean;
  pendingEmail: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  confirmAccount: (code: string) => Promise<void>;
}

/**
 * Authentication context
 */
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider component props
 */
interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * Authentication Provider with AWS Cognito
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const cognitoUser = await getCurrentUser();
        setUser({
          id: cognitoUser.userId,
          email: cognitoUser.signInDetails?.loginId || '',
          name: cognitoUser.username,
          role: 'user',
          createdAt: new Date().toISOString()
        });
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await signIn({ username: email, password });

      if (result.isSignedIn) {
        const cognitoUser = await getCurrentUser();
        setUser({
          id: cognitoUser.userId,
          email: cognitoUser.signInDetails?.loginId || email,
          name: cognitoUser.username,
          role: 'user',
          createdAt: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      const result = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            name,
          },
        },
      });

      if (result.nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
        setNeedsConfirmation(true);
        setPendingEmail(email);
      }
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const confirmAccount = async (code: string) => {
    if (!pendingEmail) throw new Error('No pending email');

    setIsLoading(true);
    try {
      await confirmSignUp({ username: pendingEmail, confirmationCode: code });
      setNeedsConfirmation(false);
      setPendingEmail(null);
    } catch (error) {
      console.error('Confirmation error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    needsConfirmation,
    pendingEmail,
    login,
    logout,
    signup,
    confirmAccount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
