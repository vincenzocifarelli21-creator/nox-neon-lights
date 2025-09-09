import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { validateEmail, sanitizeInput, checkUserAgent, rateLimiter } from '../utils/security';
import {
  EnvelopeIcon,
  KeyIcon,
  EyeIcon,
  EyeSlashIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showResendConfirmation, setShowResendConfirmation] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  
  const { signIn, loading, resendConfirmation } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from || '/dashboard';
  const message = location.state?.message;

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Sanitize input to prevent XSS
    const sanitizedValue = sanitizeInput(value);
    
    setFormData({
      ...formData,
      [name]: sanitizedValue,
    });
    
    // Clear error and resend states when user starts typing
    if (error) setError('');
    if (showResendConfirmation) setShowResendConfirmation(false);
    if (resendSuccess) setResendSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic bot detection
    if (!checkUserAgent()) {
      setError('Access denied');
      return;
    }

    // Check rate limiting
    const clientKey = 'login_form_' + (navigator.userAgent || 'unknown');
    if (!rateLimiter.isAllowed(clientKey, 3, 5 * 60 * 1000)) { // 3 attempts per 5 minutes
      const timeLeft = rateLimiter.getTimeUntilReset(clientKey);
      setError(`Too many attempts. Please wait ${Math.ceil(timeLeft / 60)} minutes.`);
      return;
    }

    // Validate inputs
    if (!formData.email.trim() || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      const { error } = await signIn(formData.email, formData.password);
      
      if (error) {
        setError(error.message || 'Failed to sign in');
        
        // Show resend confirmation option if email is not confirmed
        if (error.message && (error.message.includes('confirmation') || error.message.includes('not been confirmed'))) {
          setShowResendConfirmation(true);
        }
        return;
      }

      // Success! Clear any existing errors
      setError('');
      setShowResendConfirmation(false);
      setResendSuccess(false);
      
      // Add a small delay to ensure auth state is updated
      setTimeout(() => {
        // Redirect to the intended page or dashboard
        const redirectPath = from && from !== '/login' ? from : '/dashboard';
        navigate(redirectPath, { replace: true });
      }, 100);
    } catch (err) {
      setError('An unexpected error occurred');
    }
  };

  const handleResendConfirmation = async () => {
    if (!formData.email) {
      setError('Please enter your email address first');
      return;
    }

    try {
      const { error } = await resendConfirmation(formData.email);
      
      if (error) {
        setError(error.message || 'Failed to resend confirmation email');
        return;
      }

      setResendSuccess(true);
      setShowResendConfirmation(false);
      setError('');
    } catch (err) {
      setError('An unexpected error occurred while resending confirmation email');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">N</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to your Nox Neon account</p>
        </div>

        {/* Alert Message */}
        {message && (
          <div className="mb-6 p-4 bg-cyan-500/20 border border-cyan-500/30 rounded-lg">
            <p className="text-cyan-400 text-sm">{message}</p>
          </div>
        )}

        {/* Success Message */}
        {resendSuccess && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center space-x-2">
            <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-green-400 text-sm">
              Confirmation email sent! Please check your inbox and click the confirmation link.
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center space-x-2">
            <ExclamationTriangleIcon className="w-5 h-5 text-red-400 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-red-400 text-sm">{error}</p>
              {showResendConfirmation && (
                <button
                  onClick={handleResendConfirmation}
                  disabled={loading}
                  className="mt-2 text-cyan-400 hover:text-cyan-300 text-sm underline disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Resend confirmation email
                </button>
              )}
            </div>
          </div>
        )}

        {/* Login Form */}
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3 bg-black/20 border border-cyan-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:opacity-50"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <KeyIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full pl-10 pr-12 py-3 bg-black/20 border border-cyan-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:opacity-50"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-cyan-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
              >
                Sign up here
              </Link>
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-4 text-center">
            <Link
              to="/"
              className="text-sm text-gray-500 hover:text-gray-400 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
