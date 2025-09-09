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
        // Main site routes - TEMPORARILY WITHOUT animations for debugging
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={
            <ProtectedRoute requireAuth={false}>
              <Signup />
            </ProtectedRoute>
          } />
          <Route path="/login" element={
            <ProtectedRoute requireAuth={false}>
              <Login />
            </ProtectedRoute>
          } />
          <Route path="/email-confirmed" element={<EmailConfirmed />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
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
