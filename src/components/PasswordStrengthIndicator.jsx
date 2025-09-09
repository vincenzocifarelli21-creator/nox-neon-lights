import React from 'react';
import { validatePassword } from '../utils/security';

const PasswordStrengthIndicator = ({ password, className = '' }) => {
  // Calculate password strength score
  const calculateStrength = (password) => {
    if (!password) return { score: 0, feedback: '', color: 'bg-gray-300', textColor: 'text-gray-500' };

    let score = 0;
    const checks = {
      length: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]/.test(password),
      noRepeatedChars: !/(.)\1{2,}/.test(password),
      noCommonPatterns: !/123456|abcdef|password|qwerty/i.test(password),
      goodLength: password.length >= 12
    };

    // Calculate score based on criteria
    Object.values(checks).forEach(check => {
      if (check) score++;
    });

    // Determine strength level
    if (score <= 2) {
      return {
        score: Math.max(1, score),
        level: 'Very Weak',
        feedback: 'Password is too weak',
        color: 'bg-red-500',
        textColor: 'text-red-400',
        bgColor: 'bg-red-500/20',
        borderColor: 'border-red-500/30'
      };
    } else if (score <= 4) {
      return {
        score,
        level: 'Weak',
        feedback: 'Password could be stronger',
        color: 'bg-orange-500',
        textColor: 'text-orange-400',
        bgColor: 'bg-orange-500/20',
        borderColor: 'border-orange-500/30'
      };
    } else if (score <= 6) {
      return {
        score,
        level: 'Good',
        feedback: 'Password is reasonably strong',
        color: 'bg-yellow-500',
        textColor: 'text-yellow-400',
        bgColor: 'bg-yellow-500/20',
        borderColor: 'border-yellow-500/30'
      };
    } else {
      return {
        score,
        level: 'Strong',
        feedback: 'Password is strong and secure',
        color: 'bg-green-500',
        textColor: 'text-green-400',
        bgColor: 'bg-green-500/20',
        borderColor: 'border-green-500/30'
      };
    }
  };

  const strength = calculateStrength(password);
  const widthPercentage = (strength.score / 8) * 100;

  // Get specific requirement checks for display
  const getRequirements = (password) => {
    return [
      {
        text: 'At least 8 characters',
        met: password.length >= 8,
        icon: password.length >= 8 ? '✓' : '✗'
      },
      {
        text: 'Contains uppercase letter',
        met: /[A-Z]/.test(password),
        icon: /[A-Z]/.test(password) ? '✓' : '✗'
      },
      {
        text: 'Contains lowercase letter',
        met: /[a-z]/.test(password),
        icon: /[a-z]/.test(password) ? '✓' : '✗'
      },
      {
        text: 'Contains number',
        met: /\d/.test(password),
        icon: /\d/.test(password) ? '✓' : '✗'
      },
      {
        text: 'Contains special character',
        met: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]/.test(password),
        icon: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]/.test(password) ? '✓' : '✗'
      }
    ];
  };

  const requirements = getRequirements(password);

  if (!password) {
    return null;
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Strength Bar */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-300">Password Strength</span>
          <span className={`text-sm font-medium ${strength.textColor}`}>
            {strength.level}
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${strength.color}`}
            style={{ width: `${widthPercentage}%` }}
          ></div>
        </div>
        
        {/* Feedback Text */}
        <p className={`text-xs mt-1 ${strength.textColor}`}>
          {strength.feedback}
        </p>
      </div>

      {/* Requirements Checklist */}
      <div className={`p-3 rounded-lg ${strength.bgColor} border ${strength.borderColor}`}>
        <h4 className="text-sm font-medium text-gray-300 mb-2">Password Requirements:</h4>
        <div className="space-y-1">
          {requirements.map((req, index) => (
            <div key={index} className="flex items-center space-x-2 text-xs">
              <span className={req.met ? 'text-green-400' : 'text-red-400'}>
                {req.icon}
              </span>
              <span className={req.met ? 'text-green-300' : 'text-gray-400'}>
                {req.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;
