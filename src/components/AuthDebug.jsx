import { useAuth } from '../context/AuthContext';

const AuthDebug = () => {
  const { user, loading, error, isAuthenticated } = useAuth();

  // Only show in development
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs max-w-sm z-50">
      <div className="font-bold text-cyan-400 mb-2">🔐 Auth Debug</div>
      <div className="space-y-1">
        <div>Loading: <span className={loading ? 'text-yellow-400' : 'text-green-400'}>{loading ? 'Yes' : 'No'}</span></div>
        <div>Authenticated: <span className={isAuthenticated ? 'text-green-400' : 'text-red-400'}>{isAuthenticated ? 'Yes' : 'No'}</span></div>
        <div>User: <span className={user ? 'text-green-400' : 'text-gray-400'}>{user ? user.email : 'None'}</span></div>
        {user && (
          <div>Email Confirmed: <span className={user.email_confirmed_at ? 'text-green-400' : 'text-red-400'}>
            {user.email_confirmed_at ? 'Yes' : 'No'}
          </span></div>
        )}
        {error && (
          <div>Error: <span className="text-red-400">{error}</span></div>
        )}
      </div>
    </div>
  );
};

export default AuthDebug;
