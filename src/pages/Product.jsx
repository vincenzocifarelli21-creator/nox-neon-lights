import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import CartToast from '../components/CartToast';

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState('Standard');
  const [isAdding, setIsAdding] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock product data - in a real app, this would come from an API
  const product = {
    id: parseInt(id),
    name: 'Cyber Blade',
    price: 299.99,
    originalPrice: 349.99,
    images: ['/api/placeholder/600/400', '/api/placeholder/600/400', '/api/placeholder/600/400'],
    category: 'Signs',
    color: 'neon-cyan',
    description: 'The Cyber Blade neon sign represents the cutting edge of cyberpunk aesthetics. Featuring ultra-bright cyan LEDs arranged in a sleek blade pattern, this piece transforms any space into a futuristic sanctuary.',
    longDescription: `
      Step into the world of tomorrow with the Cyber Blade neon sign. This masterpiece combines traditional neon craftsmanship with modern LED technology to create a stunning visual experience that captures the essence of cyberpunk culture.

      Crafted from premium materials and featuring our proprietary SmartGlow™ technology, the Cyber Blade offers multiple lighting modes including steady glow, pulse, and reactive patterns that respond to sound and movement.
    `,
    specifications: {
      'Dimensions': '24" x 8" x 2"',
      'Power': '12V LED',
      'Brightness': '3000 Lumens',
      'Colors': 'Cyan Primary, Multi-color available',
      'Material': 'Premium Acrylic, Aluminum Frame',
      'Installation': 'Wall Mount / Hanging Kit Included',
      'Warranty': '5 Years'
    },
    options: [
      { name: 'Standard', price: 0 },
      { name: 'RGB Color Change', price: 99 },
      { name: 'Smart Home Compatible', price: 149 },
      { name: 'Premium Package (RGB + Smart)', price: 199 }
    ],
    inStock: true,
    rating: 4.8,
    reviews: 156
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    try {
      // Add the product to cart with selected options
      addToCart(product, selectedOption, quantity);
      
      // Show success feedback
      setShowSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleBuyNow = async () => {
    setIsBuying(true);
    
    try {
      // Add the product to cart with selected options
      addToCart(product, selectedOption, quantity);
      
      // Navigate to cart page immediately
      navigate('/cart');
    } catch (error) {
      console.error('Error during buy now:', error);
    } finally {
      setIsBuying(false);
    }
  };

  return (
    <div className="min-h-screen cyberpunk-bg pt-24 pb-12">
      {/* Cart Toast Notification */}
      <CartToast
        isVisible={showSuccess}
        product={product}
        quantity={quantity}
        selectedOption={selectedOption}
        onClose={() => setShowSuccess(false)}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.nav
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center space-x-2 text-sm font-orbitron text-white/60">
            <Link to="/" className="hover:text-neon-cyan transition-colors">Home</Link>
            <span>/</span>
            <Link to="/collection" className="hover:text-neon-cyan transition-colors">Collection</Link>
            <span>/</span>
            <span className="text-neon-cyan">{product.name}</span>
          </div>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            className="space-y-4"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            {/* Main Image */}
            <div className="cyberpunk-card overflow-hidden">
              <div className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center border border-neon-cyan/30">
                <div className="text-8xl text-neon-cyan animate-glow-pulse">
                  ⚡
                </div>
              </div>
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((img) => (
                <div key={img} className="cyberpunk-card cursor-pointer hover:scale-105 transition-transform">
                  <div className="w-full h-24 bg-gradient-to-br from-black via-gray-800 to-black flex items-center justify-center border border-neon-cyan/20">
                    <div className="text-2xl text-neon-cyan/60">⚡</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            className="space-y-6"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
          >
            {/* Title and Price */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2 py-1 bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan text-xs font-orbitron rounded">
                  {product.category}
                </span>
                <div className="flex items-center text-neon-yellow">
                  <span className="text-sm font-orbitron">★ {product.rating}</span>
                  <span className="text-xs text-white/60 ml-2">({product.reviews} reviews)</span>
                </div>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-audiowide font-bold text-neon-cyan text-neon-lg mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-bold text-neon-orange font-orbitron">
                  ${(product.price + (product.options.find(opt => opt.name === selectedOption)?.price || 0)).toFixed(2)}
                </span>
                <span className="text-xl text-white/40 line-through font-orbitron">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="px-2 py-1 bg-neon-red/20 text-neon-red text-sm font-orbitron rounded">
                  SAVE ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-white/80 font-orbitron leading-relaxed mb-4">
                {product.description}
              </p>
              <p className="text-white/60 font-orbitron text-sm leading-relaxed">
                {product.longDescription}
              </p>
            </div>

            {/* Options */}
            <div>
              <h3 className="text-lg font-audiowide font-bold text-neon-orange text-neon-sm mb-3">
                CONFIGURATION
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.options.map((option) => (
                  <button
                    key={option.name}
                    onClick={() => setSelectedOption(option.name)}
                    className={`p-3 border rounded-lg font-orbitron text-sm transition-all duration-300 ${
                      selectedOption === option.name
                        ? 'border-neon-cyan bg-neon-cyan/10 text-neon-cyan'
                        : 'border-white/20 text-white/80 hover:border-neon-cyan/50 hover:text-neon-cyan'
                    }`}
                  >
                    <div className="font-bold">{option.name}</div>
                    {option.price > 0 && (
                      <div className="text-xs text-neon-orange">+${option.price}</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-orbitron font-bold text-neon-orange text-neon-sm mb-2">
                  QUANTITY
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-neon-cyan/30 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-neon-cyan hover:bg-neon-cyan/10 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 font-orbitron font-bold text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-neon-cyan hover:bg-neon-cyan/10 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className={`flex-1 px-8 py-4 border-2 border-neon-orange text-neon-orange font-orbitron font-bold text-lg rounded-lg neon-border hover:bg-neon-orange hover:text-black transition-all duration-300 ${
                    isAdding ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                  }`}
                >
                  {isAdding ? 'ADDING...' : 'ADD TO CART'}
                </button>
                <button 
                  onClick={handleBuyNow}
                  disabled={isBuying}
                  className={`px-8 py-4 border-2 border-neon-cyan text-neon-cyan font-orbitron font-bold text-lg rounded-lg neon-border hover:bg-neon-cyan hover:text-black transition-all duration-300 ${
                    isBuying ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                  }`}
                >
                  {isBuying ? 'BUYING...' : 'BUY NOW'}
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-neon-cyan/20">
              <div className="flex items-center gap-3">
                <div className="text-neon-orange">🚚</div>
                <span className="text-sm font-orbitron text-white/80">Free Shipping</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-neon-cyan">🛡️</div>
                <span className="text-sm font-orbitron text-white/80">5 Year Warranty</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-neon-red">⚡</div>
                <span className="text-sm font-orbitron text-white/80">Easy Installation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-neon-yellow">🔧</div>
                <span className="text-sm font-orbitron text-white/80">24/7 Support</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Specifications */}
        <motion.div
          className="mt-16 cyberpunk-card p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-audiowide font-bold text-neon-cyan text-neon-lg mb-6">
            SPECIFICATIONS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="font-orbitron text-white/80">{key}</span>
                <span className="font-orbitron font-bold text-neon-orange">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Product;
