import { motion } from 'framer-motion';
import { useState } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Cyber Blade',
      price: 299.99,
      quantity: 1,
      color: 'neon-cyan',
      option: 'Standard',
      image: '/api/placeholder/150/150'
    },
    {
      id: 2,
      name: 'Neon Dragon',
      price: 899.99,
      quantity: 2,
      color: 'neon-red',
      option: 'RGB Color Change',
      image: '/api/placeholder/150/150'
    }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [shippingMethod, setShippingMethod] = useState('standard');

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = shippingMethod === 'express' ? 29.99 : 0;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const shippingOptions = [
    { id: 'standard', name: 'Standard Shipping (5-7 days)', price: 0 },
    { id: 'express', name: 'Express Shipping (2-3 days)', price: 29.99 }
  ];

  return (
    <div className="min-h-screen cyberpunk-bg pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-audiowide font-bold text-neon-cyan text-neon-lg mb-2">
            SHOPPING CART
          </h1>
          <p className="text-lg font-orbitron text-white/70">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cyberpunk collection
          </p>
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div
            className="text-center py-20"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <div className="text-8xl text-neon-cyan/30 mb-6">🛒</div>
            <h2 className="text-2xl font-audiowide font-bold text-neon-orange mb-4">
              YOUR CART IS EMPTY
            </h2>
            <p className="text-white/60 font-orbitron mb-8">
              Looks like you haven't added any neon magic to your cart yet.
            </p>
            <motion.a
              href="/collection"
              className="inline-block px-8 py-4 bg-gradient-to-r from-neon-orange to-neon-red text-black font-orbitron font-bold text-lg rounded-lg shadow-neon hover:shadow-neon-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              EXPLORE COLLECTION
            </motion.a>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="cyberpunk-card p-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center border border-neon-cyan/30 rounded-lg flex-shrink-0">
                      <div className={`text-2xl text-${item.color}`}>⚡</div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-grow">
                      <h3 className={`text-xl font-audiowide font-bold text-${item.color} text-neon-sm mb-1`}>
                        {item.name}
                      </h3>
                      <p className="text-sm text-white/60 font-orbitron mb-2">
                        Configuration: {item.option}
                      </p>
                      <p className="text-lg font-orbitron font-bold text-neon-orange">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-neon-cyan/30 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-2 text-neon-cyan hover:bg-neon-cyan/10 transition-colors"
                        >
                          -
                        </button>
                        <span className="px-4 py-2 font-orbitron font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-2 text-neon-cyan hover:bg-neon-cyan/10 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-neon-red hover:text-red-400 transition-colors"
                        title="Remove item"
                      >
                        🗑️
                      </button>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <p className="text-xl font-orbitron font-bold text-neon-yellow">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="cyberpunk-card p-6 sticky top-24">
                <h2 className="text-2xl font-audiowide font-bold text-neon-cyan text-neon mb-6">
                  ORDER SUMMARY
                </h2>

                {/* Promo Code */}
                <div className="mb-6">
                  <label className="block text-sm font-orbitron font-bold text-neon-orange text-neon-sm mb-2">
                    PROMO CODE
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 px-3 py-2 bg-black/50 border border-neon-cyan/30 rounded text-white font-orbitron focus:border-neon-cyan focus:outline-none"
                    />
                    <button className="px-4 py-2 border border-neon-orange text-neon-orange hover:bg-neon-orange hover:text-black transition-all duration-300 rounded font-orbitron text-sm">
                      APPLY
                    </button>
                  </div>
                </div>

                {/* Shipping Options */}
                <div className="mb-6">
                  <label className="block text-sm font-orbitron font-bold text-neon-orange text-neon-sm mb-3">
                    SHIPPING METHOD
                  </label>
                  <div className="space-y-2">
                    {shippingOptions.map((option) => (
                      <label key={option.id} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="shipping"
                          value={option.id}
                          checked={shippingMethod === option.id}
                          onChange={(e) => setShippingMethod(e.target.value)}
                          className="text-neon-cyan"
                        />
                        <div className="flex-1 flex justify-between">
                          <span className="text-white/80 font-orbitron text-sm">{option.name}</span>
                          <span className="text-neon-orange font-orbitron font-bold text-sm">
                            {option.price === 0 ? 'FREE' : `$${option.price}`}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Order Totals */}
                <div className="space-y-3 mb-6 border-t border-neon-cyan/20 pt-4">
                  <div className="flex justify-between">
                    <span className="text-white/80 font-orbitron">Subtotal:</span>
                    <span className="font-orbitron font-bold text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80 font-orbitron">Shipping:</span>
                    <span className="font-orbitron font-bold text-white">
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80 font-orbitron">Tax:</span>
                    <span className="font-orbitron font-bold text-white">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl border-t border-neon-cyan/20 pt-3">
                    <span className="text-neon-cyan font-orbitron font-bold text-neon-sm">Total:</span>
                    <span className="font-orbitron font-bold text-neon-orange text-neon">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button className="w-full px-6 py-4 bg-gradient-to-r from-neon-orange to-neon-red text-black font-orbitron font-bold text-lg rounded-lg shadow-neon hover:shadow-neon-lg transition-all duration-300 hover:scale-105 mb-4">
                  PROCEED TO CHECKOUT
                </button>

                {/* Stripe Placeholder */}
                <div className="text-center text-xs text-white/40 font-orbitron mb-4">
                  Secure payment powered by Stripe
                </div>

                {/* Payment Methods */}
                <div className="flex justify-center gap-2 text-2xl">
                  <span title="Visa">💳</span>
                  <span title="Mastercard">💳</span>
                  <span title="PayPal">💰</span>
                  <span title="Bitcoin">₿</span>
                </div>

                {/* Security Features */}
                <div className="mt-6 space-y-2 text-xs text-white/60 font-orbitron">
                  <div className="flex items-center gap-2">
                    <span className="text-neon-cyan">🔒</span>
                    <span>256-bit SSL encryption</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-neon-orange">🛡️</span>
                    <span>PCI DSS compliant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-neon-red">↩️</span>
                    <span>30-day return policy</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
