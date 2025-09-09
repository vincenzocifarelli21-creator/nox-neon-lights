import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const EmailConfirmed = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    // Auto-redirect to dashboard after 5 seconds if user is authenticated
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (user) {
            navigate('/dashboard');
          } else {
            navigate('/login');
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [user, navigate]);

  const handleContinue = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md text-center"
      >
        {/* Success Icon */}
        <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
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
        <h1 className="text-3xl font-bold text-white mb-4">
          Email Confirmed!
        </h1>
        
        <p className="text-gray-300 mb-8">
          Your email has been successfully verified. You can now access all features of your Nox Neon account.
        </p>

        {/* Status Message */}
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-green-500/20 p-6 mb-8">
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-green-400/30 border-t-green-400 rounded-full animate-spin"></div>
              <p className="text-green-400">Verifying your account...</p>
            </div>
          ) : user ? (
            <div>
              <p className="text-green-400 mb-2">✓ Account verified successfully</p>
              <p className="text-gray-400 text-sm">
                Redirecting to dashboard in {countdown} seconds...
              </p>
            </div>
          ) : (
            <div>
              <p className="text-yellow-400 mb-2">⚠ Please sign in to complete the process</p>
              <p className="text-gray-400 text-sm">
                Redirecting to login in {countdown} seconds...
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleContinue}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
          >
            {user ? 'Go to Dashboard' : 'Sign In Now'}
          </button>
          
          <Link
            to="/"
            className="block w-full bg-black/20 border border-cyan-500/20 text-cyan-400 py-3 px-6 rounded-lg font-semibold hover:bg-black/30 hover:border-cyan-500/30 transition-all duration-200"
          >
            Back to Home
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Need help? <Link to="/support" className="text-cyan-400 hover:text-cyan-300">Contact support</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default EmailConfirmed;
