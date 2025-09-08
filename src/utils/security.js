/**
 * Security utilities for input validation and sanitization
 */

// Email validation with comprehensive regex
export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email) && email.length <= 254; // RFC 5321 limit
};

// Password validation with security requirements
export const validatePassword = (password) => {
  if (!password || password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long' };
  }
  
  if (password.length > 128) {
    return { isValid: false, message: 'Password too long (max 128 characters)' };
  }
  
  // Check for at least one uppercase, lowercase, number, and special character
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]/.test(password);
  
  if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar) {
    return { 
      isValid: false, 
      message: 'Password must contain at least one uppercase letter, lowercase letter, number, and special character' 
    };
  }
  
  // Check for common weak patterns
  const commonPatterns = [
    /(.)\1{2,}/,  // Repeated characters (aaa, 111)
    /123456/,     // Sequential numbers
    /abcdef/,     // Sequential letters
    /password/i,  // Contains "password"
    /qwerty/i,    // Common keyboard patterns
  ];
  
  for (const pattern of commonPatterns) {
    if (pattern.test(password)) {
      return { isValid: false, message: 'Password contains common patterns. Please choose a stronger password.' };
    }
  }
  
  return { isValid: true };
};

// Sanitize string input to prevent XSS
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[<>\"'&]/g, (match) => {
      switch (match) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '"': return '&quot;';
        case "'": return '&#x27;';
        case '&': return '&amp;';
        default: return match;
      }
    })
    .slice(0, 1000); // Limit length to prevent DoS
};

// Validate name fields
export const validateName = (name) => {
  if (!name || typeof name !== 'string') {
    return { isValid: false, message: 'Name is required' };
  }
  
  const trimmedName = name.trim();
  
  if (trimmedName.length < 2) {
    return { isValid: false, message: 'Name must be at least 2 characters long' };
  }
  
  if (trimmedName.length > 100) {
    return { isValid: false, message: 'Name too long (max 100 characters)' };
  }
  
  // Allow letters, spaces, hyphens, apostrophes
  const nameRegex = /^[a-zA-Z\s\-']+$/;
  if (!nameRegex.test(trimmedName)) {
    return { isValid: false, message: 'Name can only contain letters, spaces, hyphens, and apostrophes' };
  }
  
  return { isValid: true, value: trimmedName };
};

// Rate limiting for client-side protection
class RateLimiter {
  constructor() {
    this.attempts = new Map();
  }
  
  // Check if action is allowed (returns false if rate limited)
  isAllowed(key, maxAttempts = 5, timeWindow = 15 * 60 * 1000) { // 15 minutes default
    const now = Date.now();
    const userAttempts = this.attempts.get(key) || { count: 0, resetTime: now + timeWindow };
    
    // Reset if time window has passed
    if (now > userAttempts.resetTime) {
      userAttempts.count = 0;
      userAttempts.resetTime = now + timeWindow;
    }
    
    // Check if limit exceeded
    if (userAttempts.count >= maxAttempts) {
      return false;
    }
    
    // Increment counter
    userAttempts.count++;
    this.attempts.set(key, userAttempts);
    
    return true;
  }
  
  // Get remaining attempts
  getRemainingAttempts(key, maxAttempts = 5) {
    const userAttempts = this.attempts.get(key);
    if (!userAttempts) return maxAttempts;
    
    const now = Date.now();
    if (now > userAttempts.resetTime) return maxAttempts;
    
    return Math.max(0, maxAttempts - userAttempts.count);
  }
  
  // Get time until reset (in seconds)
  getTimeUntilReset(key) {
    const userAttempts = this.attempts.get(key);
    if (!userAttempts) return 0;
    
    const now = Date.now();
    return Math.max(0, Math.ceil((userAttempts.resetTime - now) / 1000));
  }
}

// Global rate limiter instance
export const rateLimiter = new RateLimiter();

// Validate phone number (basic international format)
export const validatePhoneNumber = (phone) => {
  if (!phone) return { isValid: true }; // Optional field
  
  // Remove all non-digits except +
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  if (cleaned.length < 10 || cleaned.length > 15) {
    return { isValid: false, message: 'Invalid phone number format' };
  }
  
  const phoneRegex = /^\+?[\d]{10,15}$/;
  if (!phoneRegex.test(cleaned)) {
    return { isValid: false, message: 'Invalid phone number format' };
  }
  
  return { isValid: true, value: cleaned };
};

// Validate address (basic validation)
export const validateAddress = (address) => {
  if (!address) return { isValid: true }; // Optional field
  
  const trimmed = address.trim();
  if (trimmed.length > 500) {
    return { isValid: false, message: 'Address too long (max 500 characters)' };
  }
  
  return { isValid: true, value: trimmed };
};

// Check if user agent looks suspicious (basic bot detection)
export const checkUserAgent = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const suspiciousPatterns = [
    'bot', 'crawl', 'spider', 'scraper', 'curl', 'wget', 'python', 'automated'
  ];
  
  return !suspiciousPatterns.some(pattern => userAgent.includes(pattern));
};

// Generate secure random string for CSRF tokens
export const generateSecureToken = (length = 32) => {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Basic timing attack protection
export const secureDelay = async (minMs = 100, maxMs = 300) => {
  const delay = Math.random() * (maxMs - minMs) + minMs;
  await new Promise(resolve => setTimeout(resolve, delay));
};
