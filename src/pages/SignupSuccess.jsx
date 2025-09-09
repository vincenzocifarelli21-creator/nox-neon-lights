import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const SignupSuccess = () => {
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { resendConfirmation, loading } = useAuth();

  useEffect(() => {
    // Get email from navigation state or redirect if not available
    if (location.state?.email) {
      setUserEmail(location.state.email);
    } else {
      // If no email in state, redirect to signup
      navigate('/signup');
      return;
    }
  }, [navigate, location.state]);

  const handleResendConfirmation = async () => {
    if (!userEmail) return;
    
    try {
      await resendConfirmation(userEmail);
      // Show success feedback (could add a toast notification)
    } catch (error) {
      console.error('Failed to resend confirmation:', error);
    }
  };

  const handleGoToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg text-center"
      >
        {/* Success Icon */}
        <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg 
            className="w-10 h-10 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>

        {/* Header */}
        <h1 className="text-4xl font-bold text-white mb-4">
          Account Created Successfully!
        </h1>
        
        <p className="text-xl text-gray-300 mb-8">
          Welcome to Nox Neon Lights!
        </p>

        {/* Email Confirmation Instructions */}
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-8 mb-8">
          <div className="mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg 
                className="w-8 h-8 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Check Your Email!
            </h2>
            <p className="text-gray-300">
              We've sent a confirmation email to:
            </p>
            <p className="text-cyan-400 font-semibold text-lg mt-2">
              {userEmail}
            </p>
          </div>

          <div className="space-y-4 text-left">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <div>
                <p className="text-gray-300">
                  <strong className="text-white">Check your inbox</strong> for an email from Nox Neon Lights
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <div>
                <p className="text-gray-300">
                  <strong className="text-white">Click the confirmation link</strong> in the email to activate your account
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">3</span>
              </div>
              <div>
                <p className="text-gray-300">
                  <strong className="text-white">Sign in</strong> with your credentials to access your dashboard
                </p>
              </div>
            </div>
          </div>

          {/* Email Tips */}
          <div className="mt-6 pt-6 border-t border-gray-600">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">
              💡 Can't find the email?
            </h3>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>• Check your spam/junk folder</li>
              <li>• Make sure you entered the correct email address</li>
              <li>• The email may take a few minutes to arrive</li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleGoToLogin}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-cyan-600 hover:to-purple-700 transition-all duration-200"
            >
              Go to Sign In
            </button>
            
            <button
              onClick={handleResendConfirmation}
              disabled={loading}
              className="flex-1 bg-black/20 border border-cyan-500/20 text-cyan-400 py-3 px-6 rounded-lg font-semibold hover:bg-black/30 hover:border-cyan-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div>
                  <span>Sending...</span>
                </div>
              ) : (
                'Resend Email'
              )}
            </button>
          </div>
          
          <Link
            to="/"
            className="block w-full bg-black/20 border border-gray-500/20 text-gray-400 py-3 px-6 rounded-lg font-semibold hover:bg-black/30 hover:border-gray-500/30 transition-all duration-200"
          >
            Back to Home
          </Link>
        </div>

      </motion.div>
    </div>
  );
};

export default SignupSuccess;
