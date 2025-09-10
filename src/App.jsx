import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Components
import Navbar from './components/Navbar'
import PageTransition from './components/PageTransition'
import ProtectedRoute from './components/ProtectedRoute'
import AuthDebug from './components/AuthDebug'

// Pages
import Home from './pages/Home'
import Collection from './pages/Collection'
import Product from './pages/Product'
import About from './pages/About'
import Cart from './pages/Cart'
import Signup from './pages/Signup'
import SignupSuccess from './pages/SignupSuccess'
import Login from './pages/Login'
import EmailConfirmed from './pages/EmailConfirmed'
import Checkout from './pages/Checkout'
import Dashboard from './pages/Dashboard'

// Context
import { CartProvider } from './context/CartContext'
import { CustomerProvider } from './context/CustomerContext'
import { AuthProvider } from './context/AuthContext'

function AppContent() {
  const location = useLocation()
  const isDashboard = location.pathname.startsWith('/dashboard')
  
  console.log('🚀 AppContent render - Current path:', location.pathname, 'isDashboard:', isDashboard)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Only show Navbar on non-dashboard pages */}
      {!isDashboard && <Navbar />}
      
      {isDashboard ? (
        // Dashboard routes without page transitions
        <Routes>
          <Route path="/dashboard/*" element={
            <ProtectedRoute requireAuth={true}>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Routes>
      ) : (
        // Main site routes with optimized mobile-friendly animations
        <AnimatePresence mode="wait">
          <Routes key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/collection" element={<PageTransition><Collection /></PageTransition>} />
            <Route path="/product/:id" element={<PageTransition><Product /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/cart" element={<PageTransition><Cart /></PageTransition>} />
            <Route path="/signup" element={
              <PageTransition>
                <ProtectedRoute requireAuth={false}>
                  <Signup />
                </ProtectedRoute>
              </PageTransition>
            } />
            <Route path="/signup-success" element={<PageTransition><SignupSuccess /></PageTransition>} />
            <Route path="/login" element={
              <PageTransition>
                <ProtectedRoute requireAuth={false}>
                  <Login />
                </ProtectedRoute>
              </PageTransition>
            } />
            <Route path="/email-confirmed" element={<PageTransition><EmailConfirmed /></PageTransition>} />
            <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      )}
      
      {/* Debug component for development */}
      <AuthDebug />
    </div>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <CustomerProvider>
            <AppContent />
          </CustomerProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
