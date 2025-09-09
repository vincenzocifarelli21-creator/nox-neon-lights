import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validatePassword, validateName, sanitizeInput, checkUserAgent, rateLimiter } from '../utils/security';
import PasswordStrengthIndicator from '../components/PasswordStrengthIndicator';
import {
  EnvelopeIcon,
  KeyIcon,
  UserCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  
  const { signUp, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Sanitize input to prevent XSS
    const sanitizedValue = sanitizeInput(value);
    
    setFormData({
      ...formData,
      [name]: sanitizedValue,
    });
    
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    // Validate full name
    const nameValidation = validateName(formData.fullName);
    if (!nameValidation.isValid) {
      setError(nameValidation.message);
      return false;
    }

    // Validate email
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    // Validate password
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      setError(passwordValidation.message);
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
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
    const clientKey = 'signup_form_' + (navigator.userAgent || 'unknown');
    if (!rateLimiter.isAllowed(clientKey, 2, 10 * 60 * 1000)) { // 2 attempts per 10 minutes
      const timeLeft = rateLimiter.getTimeUntilReset(clientKey);
      setError(`Too many signup attempts. Please wait ${Math.ceil(timeLeft / 60)} minutes.`);
      return;
    }

    if (!validateForm()) return;

    try {
      const { error } = await signUp(formData.email, formData.password, {
        full_name: formData.fullName.trim(),
      });
      
      if (error) {
        setError(error.message || 'Failed to create account');
        return;
      }

      // Redirect to signup success page with email in state
      navigate('/signup-success', {
        state: { email: formData.email },
        replace: true
      });

    } catch (err) {
      setError('An unexpected error occurred');
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
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400">Join the Nox Neon community</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center space-x-2">
            <ExclamationTriangleIcon className="w-5 h-5 text-red-400 flex-shrink-0" />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Signup Form */}
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <UserCircleIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3 bg-black/20 border border-cyan-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:opacity-50"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

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
                  placeholder="Create a password"
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
              
              {/* Password Strength Indicator */}
              <div className="mt-3">
                <PasswordStrengthIndicator password={formData.password} />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <KeyIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full pl-10 pr-12 py-3 bg-black/20 border border-cyan-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:opacity-50"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  disabled={loading}
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="text-xs text-gray-400">
              By creating an account, you agree to our{' '}
              <Link to="/terms" className="text-cyan-400 hover:text-cyan-300">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-cyan-400 hover:text-cyan-300">
                Privacy Policy
              </Link>
              .
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
                  <span>Creating Account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
              >
                Sign in here
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

export default Signup;
