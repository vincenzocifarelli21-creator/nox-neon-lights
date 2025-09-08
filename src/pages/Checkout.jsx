import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCustomer } from '../context/CustomerContext';
import CustomerForm from '../components/CustomerForm';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, subtotal: cartSubtotal, clearCart } = useCart();
  const { customerInfo, validateCustomerInfo } = useCustomer();
  const [promoCode, setPromoCode] = useState('');
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [orderStep, setOrderStep] = useState('customer-info'); // 'customer-info', 'payment', 'confirmation'
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  // Calculate totals
  const subtotal = cartSubtotal;
  const shipping = shippingMethod === 'express' ? 29.99 : 0;
  const promoDiscount = promoCode === 'CYBER10' ? subtotal * 0.1 : 0; // Example promo code
  const tax = (subtotal - promoDiscount + shipping) * 0.08; // 8% tax
  const total = subtotal + shipping + tax - promoDiscount;

  const shippingOptions = [
    { id: 'standard', name: 'Standard Shipping (5-7 days)', price: 0 },
    { id: 'express', name: 'Express Shipping (2-3 days)', price: 29.99 }
  ];

  const handleCustomerFormSubmit = async (customerData) => {
    setOrderStep('payment');
  };

  const handlePaymentSubmit = async () => {
    setIsProcessingOrder(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would integrate with your payment processor (Stripe, etc.)
      console.log('Processing order:', {
        customer: customerInfo,
        items: cartItems,
        shipping: shippingMethod,
        totals: { subtotal, shipping, tax, promoDiscount, total }
      });
      
      // Clear cart and redirect to confirmation
      clearCart();
      setOrderStep('confirmation');
      
    } catch (error) {
      console.error('Payment error:', error);
      // Handle payment error
    } finally {
      setIsProcessingOrder(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 }
  };

  // Order Confirmation Step
  if (orderStep === 'confirmation') {
    return (
      <div className="min-h-screen cyberpunk-bg pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="cyberpunk-card p-12"
          >
            <div className="text-8xl text-neon-cyan mb-6">✅</div>
            <h1 className="text-4xl font-audiowide font-bold text-neon-cyan text-neon-lg mb-4">
              ORDER CONFIRMED!
            </h1>
            <p className="text-xl font-orbitron text-white/70 mb-8">
              Your cyberpunk adventure is on its way!
            </p>
            
            <div className="bg-black/30 p-6 rounded-lg border border-neon-cyan/20 mb-8">
              <h3 className="text-lg font-audiowide font-bold text-neon-orange mb-4">ORDER DETAILS</h3>
              <div className="space-y-2 text-sm font-orbitron text-white/80">
                <div className="flex justify-between">
                  <span>Order Number:</span>
                  <span className="text-neon-cyan font-bold">#NOX{Date.now().toString().slice(-6)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Amount:</span>
                  <span className="text-neon-orange font-bold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Address:</span>
                  <span>{customerInfo.address}, {customerInfo.city}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Delivery:</span>
                  <span>{shippingMethod === 'express' ? '2-3 business days' : '5-7 business days'}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={() => navigate('/collection')}
                className="px-8 py-4 bg-gradient-to-r from-neon-orange to-neon-red text-black font-orbitron font-bold text-lg rounded-lg shadow-neon hover:shadow-neon-lg transition-all duration-300 hover:scale-105 mx-2"
              >
                CONTINUE SHOPPING
              </button>
              <button
                onClick={() => navigate('/')}
                className="px-8 py-4 border-2 border-neon-cyan text-neon-cyan font-orbitron font-bold text-lg rounded-lg hover:bg-neon-cyan hover:text-black transition-all duration-300 hover:scale-105 mx-2"
              >
                BACK TO HOME
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen cyberpunk-bg pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-audiowide font-bold text-neon-cyan text-neon-lg mb-2">
            SECURE CHECKOUT
          </h1>
          <p className="text-lg font-orbitron text-white/70">
            Complete your order with confidence
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center ${orderStep === 'customer-info' ? 'text-neon-orange' : 'text-neon-cyan'}`}>
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                orderStep === 'customer-info' 
                  ? 'border-neon-orange bg-neon-orange text-black' 
                  : orderStep === 'payment' 
                    ? 'border-neon-cyan bg-neon-cyan text-black' 
                    : 'border-neon-cyan/30'
              }`}>
                {orderStep === 'payment' ? '✓' : '1'}
              </div>
              <span className="ml-2 font-orbitron text-sm">Customer Info</span>
            </div>
            
            <div className="flex-1 h-0.5 bg-neon-cyan/30"></div>
            
            <div className={`flex items-center ${orderStep === 'payment' ? 'text-neon-orange' : 'text-white/40'}`}>
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                orderStep === 'payment' 
                  ? 'border-neon-orange bg-neon-orange text-black' 
                  : 'border-neon-cyan/30'
              }`}>
                2
              </div>
              <span className="ml-2 font-orbitron text-sm">Payment</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {orderStep === 'customer-info' && (
              <motion.div
                key="customer-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <CustomerForm 
                  showAccountCreation={false}
                  onSubmit={handleCustomerFormSubmit}
                  submitButtonText="CONTINUE TO PAYMENT"
                />
              </motion.div>
            )}

            {orderStep === 'payment' && (
              <motion.div
                key="payment-form"
                className="space-y-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Customer Summary */}
                <div className="cyberpunk-card p-6">
                  <h2 className="text-2xl font-audiowide font-bold text-neon-cyan text-neon mb-4">
                    DELIVERY INFORMATION
                  </h2>
                  <div className="bg-black/30 p-4 rounded border border-neon-cyan/20">
                    <p className="text-white font-orbitron">
                      <strong>{customerInfo.firstName} {customerInfo.lastName}</strong><br/>
                      {customerInfo.address}<br/>
                      {customerInfo.addressLine2 && `${customerInfo.addressLine2}<br/>`}
                      {customerInfo.city}, {customerInfo.state} {customerInfo.zipCode}<br/>
                      {customerInfo.phone}
                    </p>
                    <button 
                      onClick={() => setOrderStep('customer-info')}
                      className="text-neon-orange hover:text-neon-orange-bright text-sm mt-2 underline"
                    >
                      Edit Address
                    </button>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="cyberpunk-card p-6">
                  <h2 className="text-2xl font-audiowide font-bold text-neon-cyan text-neon mb-6">
                    PAYMENT METHOD
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="p-4 border border-neon-cyan/30 rounded bg-black/30">
                      <h3 className="font-orbitron font-bold text-neon-orange mb-4">Credit/Debit Card</h3>
                      
                      <div className="grid grid-cols-1 gap-4">
                        <input
                          type="text"
                          placeholder="Card Number"
                          className="w-full px-4 py-3 bg-black/50 border border-neon-cyan/30 rounded text-white font-orbitron focus:border-neon-cyan focus:outline-none"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="px-4 py-3 bg-black/50 border border-neon-cyan/30 rounded text-white font-orbitron focus:border-neon-cyan focus:outline-none"
                          />
                          <input
                            type="text"
                            placeholder="CVC"
                            className="px-4 py-3 bg-black/50 border border-neon-cyan/30 rounded text-white font-orbitron focus:border-neon-cyan focus:outline-none"
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Cardholder Name"
                          className="w-full px-4 py-3 bg-black/50 border border-neon-cyan/30 rounded text-white font-orbitron focus:border-neon-cyan focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handlePaymentSubmit}
                    disabled={isProcessingOrder}
                    className={`w-full mt-6 px-6 py-4 bg-gradient-to-r from-neon-orange to-neon-red text-black font-orbitron font-bold text-lg rounded-lg shadow-neon transition-all duration-300 ${
                      isProcessingOrder 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:shadow-neon-lg hover:scale-105'
                    }`}
                  >
                    {isProcessingOrder ? 'PROCESSING ORDER...' : `PLACE ORDER - $${total.toFixed(2)}`}
                  </button>

                  <div className="text-center text-xs text-white/40 font-orbitron mt-4">
                    Your payment information is secure and encrypted
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary Sidebar */}
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

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.itemId} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center border border-neon-cyan/30 rounded">
                      <div className={`text-sm text-${item.color}`}>⚡</div>
                    </div>
                    <div className="flex-grow">
                      <h4 className={`text-sm font-audiowide text-${item.color} text-neon-sm`}>
                        {item.name}
                      </h4>
                      <p className="text-xs text-white/60 font-orbitron">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-orbitron font-bold text-neon-orange">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

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
                    placeholder="CYBER10"
                    className="flex-1 px-3 py-2 bg-black/50 border border-neon-cyan/30 rounded text-white font-orbitron focus:border-neon-cyan focus:outline-none"
                  />
                  <button className="px-4 py-2 border border-neon-orange text-neon-orange hover:bg-neon-orange hover:text-black transition-all duration-300 rounded font-orbitron text-sm">
                    APPLY
                  </button>
                </div>
                {promoDiscount > 0 && (
                  <p className="text-xs text-neon-cyan mt-1">Discount applied!</p>
                )}
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
              <div className="space-y-3 border-t border-neon-cyan/20 pt-4">
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
                {promoDiscount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-white/80 font-orbitron">Discount:</span>
                    <span className="font-orbitron font-bold text-neon-cyan">-${promoDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-white/80 font-orbitron">Tax:</span>
                  <span className="font-orbitron font-bold text-white">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl border-t border-neon-cyan/20 pt-3">
                  <span className="text-neon-cyan font-orbitron font-bold text-neon-sm">Total:</span>
                  <span className="font-orbitron font-bold text-neon-orange text-neon">${total.toFixed(2)}</span>
                </div>
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
      </div>
    </div>
  );
};

export default Checkout;
