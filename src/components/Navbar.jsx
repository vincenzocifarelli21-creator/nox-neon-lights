import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { itemCount } = useCart();
  const { user, signOut, profile } = useAuth();

  // Dynamic navigation links based on auth status
  const getNavLinks = () => {
    const baseLinks = [
      { name: 'Home', path: '/' },
      { name: 'Collection', path: '/collection' },
      { name: 'About', path: '/about' },
      { name: 'Shop', path: '/cart' },
    ];

    if (user) {
      return [
        ...baseLinks,
        { name: 'Dashboard', path: '/dashboard' },
      ];
    } else {
      return [
        ...baseLinks,
        { name: 'Sign In', path: '/login' },
        { name: 'Sign Up', path: '/signup' },
      ];
    }
  };

  const navLinks = getNavLinks();

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname.startsWith('/dashboard');
    }
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <nav className="fixed top-0 w-full z-50 cyberpunk-bg border-b border-neon-teal/30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-2xl font-audiowide font-bold text-neon-teal-electric text-neon animate-glow-pulse">
              NN
            </div>
            <span className="ml-2 text-sm font-orbitron text-neon-orange-intense hidden sm:block">
              Nox Neon
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-6">
              <div className="flex items-baseline space-x-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-3 py-2 text-sm font-orbitron transition-all duration-300 hover:text-neon-orange-intense hover:text-neon-sm ${
                      isActive(link.path)
                        ? 'text-neon-teal-electric text-neon border-b border-neon-teal-electric'
                        : 'text-white/80 hover:text-neon-orange-intense'
                    } ${link.name === 'Shop' ? 'relative' : ''}`}
                  >
                    {link.name}
                    {link.name === 'Shop' && itemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-neon-orange text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">
                        {itemCount > 99 ? '99+' : itemCount}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
              
              {/* User Info & Sign Out */}
              {user && (
                <div className="flex items-center space-x-4 pl-4 border-l border-neon-teal/30">
                  <div className="text-sm font-orbitron text-neon-cyan">
                    {profile?.first_name ? `Hi, ${profile.first_name}` : 'Hi there!'}
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="px-3 py-1 text-sm font-orbitron text-white/80 hover:text-neon-red border border-white/20 hover:border-neon-red rounded transition-all duration-300"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white/80 hover:text-neon-teal p-2"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden cyberpunk-bg border-t border-neon-teal/30">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 text-base font-orbitron transition-all duration-300 relative ${
                  isActive(link.path)
                    ? 'text-neon-teal text-neon bg-black/30'
                    : 'text-white/80 hover:text-neon-orange-bright hover:bg-black/20'
                }`}
              >
                <span className="flex items-center gap-2">
                  {link.name}
                  {link.name === 'Shop' && itemCount > 0 && (
                    <span className="bg-neon-orange text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">
                      {itemCount > 99 ? '99+' : itemCount}
                    </span>
                  )}
                </span>
              </Link>
            ))}
            
            {/* Mobile User Info & Sign Out */}
            {user && (
              <div className="border-t border-neon-teal/30 pt-3 mt-3">
                <div className="px-3 py-2 text-sm font-orbitron text-neon-cyan">
                  {profile?.first_name ? `Hi, ${profile.first_name}` : 'Hi there!'}
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-3 py-2 text-base font-orbitron text-white/80 hover:text-neon-red hover:bg-black/20 transition-all duration-300"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
