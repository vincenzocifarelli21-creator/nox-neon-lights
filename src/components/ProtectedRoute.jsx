import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, requireAuth = true, redirectTo = '/login' }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  console.log('ProtectedRoute render:', { 
    path: location.pathname, 
    user: !!user, 
    loading, 
    isAuthenticated,
    requireAuth
  });

  useEffect(() => {
    // Don't redirect while we're still loading
    if (loading) {
      return;
    }

    if (requireAuth && !isAuthenticated) {
      // Save the attempted URL to redirect back after login
      navigate(redirectTo, { 
        state: { 
          from: location.pathname,
          message: 'Please sign in to access this page'
        } 
      });
    } else if (!requireAuth && isAuthenticated) {
      // User is signed in but trying to access auth pages (login/signup)
      navigate('/dashboard');
    }
  }, [isAuthenticated, loading, requireAuth, navigate, redirectTo, location.pathname]);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-cyan-400 font-medium text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // Show children if auth requirements are met
  if ((requireAuth && isAuthenticated) || (!requireAuth && !isAuthenticated)) {
    return children;
  }

  // Return null while redirecting
  return null;
};

export default ProtectedRoute;
