import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { rateLimiter, secureDelay, validateEmail, validatePassword } from '../utils/security';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        setUser(session?.user ?? null);
      } catch (error) {
        // Don't log sensitive auth errors in production
        if (import.meta.env.DEV) {
          console.error('Error initializing auth:', error);
        }
        setError('Authentication initialization failed');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // Don't log sensitive user information
        if (import.meta.env.DEV) {
          console.log('Auth state changed:', event);
        }
        setUser(session?.user ?? null);
        setLoading(false);
        setError(null);
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const signUp = async (email, password, userData = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      // Rate limiting check
      const clientIP = 'signup_' + (navigator.userAgent || 'unknown');
      if (!rateLimiter.isAllowed(clientIP, 3, 60 * 1000)) { // 3 attempts per minute
        throw new Error('Too many signup attempts. Please wait before trying again.');
      }
      
      // Validate inputs
      if (!validateEmail(email)) {
        throw new Error('Please enter a valid email address');
      }
      
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        throw new Error(passwordValidation.message);
      }
      
      // Add timing delay to prevent timing attacks
      await secureDelay();
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });

      if (error) throw error;
      
      return { data, error: null };
    } catch (error) {
      // Don't log sensitive auth errors in production
      if (import.meta.env.DEV) {
        console.error('Sign up error:', error.message);
      }
      setError(error.message || 'Signup failed');
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      // Rate limiting check (stricter for login)
      const clientIP = 'login_' + (navigator.userAgent || 'unknown');
      if (!rateLimiter.isAllowed(clientIP, 5, 15 * 60 * 1000)) { // 5 attempts per 15 minutes
        throw new Error('Too many login attempts. Please wait before trying again.');
      }
      
      // Validate inputs
      if (!validateEmail(email)) {
        throw new Error('Please enter a valid email address');
      }
      
      if (!password || password.length < 6) {
        throw new Error('Invalid credentials');
      }
      
      // Add timing delay to prevent timing attacks
      await secureDelay();
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      
      return { data, error: null };
    } catch (error) {
      // Don't log sensitive auth errors in production
      if (import.meta.env.DEV) {
        console.error('Sign in error:', error.message);
      }
      // Generic error message to prevent information disclosure
      setError(error.message === 'Too many login attempts. Please wait before trying again.' 
        ? error.message 
        : 'Invalid credentials');
      
      // Add delay even on error to prevent timing attacks
      await secureDelay();
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      return { error: null };
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Sign out error:', error.message);
      }
      setError('Sign out failed');
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email) => {
    try {
      setLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) throw error;
      
      return { error: null };
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Reset password error:', error.message);
      }
      setError('Password reset failed');
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (newPassword) => {
    try {
      setLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;
      
      return { error: null };
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Update password error:', error.message);
      }
      setError('Password update failed');
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates) => {
    try {
      setLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.updateUser({
        data: updates
      });

      if (error) throw error;
      
      return { error: null };
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Update profile error:', error.message);
      }
      setError('Profile update failed');
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
