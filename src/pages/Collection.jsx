import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Collection = () => {
  const products = [
    {
      id: 1,
      name: 'Cyber Blade',
      price: '$299.99',
      image: '/api/placeholder/400/300',
      category: 'Signs',
      color: 'neon-cyan',
      description: 'Futuristic blade design with pulsing cyan glow'
    },
    {
      id: 2,
      name: 'Neon Dragon',
      price: '$899.99',
      image: '/api/placeholder/400/300',
      category: 'Art',
      color: 'neon-red',
      description: 'Majestic dragon sculpture with animated red flames'
    },
    {
      id: 3,
      name: 'Circuit Board',
      price: '$549.99',
      image: '/api/placeholder/400/300',
      category: 'Tech',
      color: 'neon-orange',
      description: 'Interactive circuit pattern with orange pathways'
    },
    {
      id: 4,
      name: 'Neon Wave',
      price: '$399.99',
      image: '/api/placeholder/400/300',
      category: 'Abstract',
      color: 'neon-yellow',
      description: 'Flowing wave pattern with golden yellow illumination'
    },
    {
      id: 5,
      name: 'Cyber Logo',
      price: '$199.99',
      image: '/api/placeholder/400/300',
      category: 'Custom',
      color: 'neon-cyan',
      description: 'Personalized logo design with cyan edge lighting'
    },
    {
      id: 6,
      name: 'Matrix Code',
      price: '$449.99',
      image: '/api/placeholder/400/300',
      category: 'Signs',
      color: 'neon-red',
      description: 'Cascading code effect with red digital rain'
    },
    {
      id: 7,
      name: 'Neon Heart',
      price: '$329.99',
      image: '/api/placeholder/400/300',
      category: 'Art',
      color: 'neon-orange',
      description: 'Pulsating heart with warm orange glow'
    },
    {
      id: 8,
      name: 'Lightning Bolt',
      price: '$259.99',
      image: '/api/placeholder/400/300',
      category: 'Signs',
      color: 'neon-yellow',
      description: 'Electric bolt design with animated yellow strikes'
    }
  ];

  const categories = ['All', 'Signs', 'Art', 'Tech', 'Abstract', 'Custom'];

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const ProductCard = ({ product }) => (
    <motion.div
      variants={fadeInUp}
      className="cyberpunk-card group cursor-pointer overflow-hidden"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative overflow-hidden">
        {/* Placeholder for product image */}
        <div className={`w-full h-64 bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center border-b border-${product.color}/30`}>
          <div className={`text-6xl text-${product.color} opacity-60`}>
            ⚡
          </div>
        </div>
        
        {/* Hover overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-${product.color}/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
        
        {/* Category badge */}
        <div className={`absolute top-4 left-4 px-2 py-1 bg-black/60 border border-${product.color}/50 text-${product.color} text-xs font-orbitron rounded`}>
          {product.category}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className={`text-xl font-audiowide font-bold text-${product.color} text-neon-sm mb-2`}>
          {product.name}
        </h3>
        <p className="text-white/70 font-orbitron text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-neon-orange font-orbitron">
            {product.price}
          </span>
          <Link
            to={`/product/${product.id}`}
            className={`px-4 py-2 border border-${product.color} text-${product.color} font-orbitron text-sm hover:bg-${product.color} hover:text-black transition-all duration-300 rounded`}
          >
            VIEW PRODUCT
          </Link>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen cyberpunk-bg pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-audiowide font-bold text-neon-cyan text-neon-lg mb-6">
            NOX COLLECTION
          </h1>
          <p className="text-lg sm:text-xl font-orbitron text-white/70 max-w-3xl mx-auto">
            Discover our curated selection of cyberpunk neon lights. 
            Each piece is designed to illuminate your world with futuristic brilliance.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              className="px-6 py-2 border border-neon-cyan/50 text-neon-cyan font-orbitron hover:bg-neon-cyan hover:text-black transition-all duration-300 rounded-lg text-sm"
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>

        {/* Load More Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <button className="px-8 py-4 bg-gradient-to-r from-neon-orange to-neon-red text-black font-orbitron font-bold rounded-lg shadow-neon hover:shadow-neon-lg transition-all duration-300 hover:scale-105">
            LOAD MORE PRODUCTS
          </button>
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 pt-20 border-t border-neon-cyan/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center">
            <div className="text-4xl text-neon-orange mb-4">🚚</div>
            <h3 className="text-xl font-audiowide font-bold text-neon-orange text-neon-sm mb-2">
              FREE SHIPPING
            </h3>
            <p className="text-white/70 font-orbitron text-sm">
              Free delivery on all orders over $500 across the digital realm.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl text-neon-cyan mb-4">🛡️</div>
            <h3 className="text-xl font-audiowide font-bold text-neon-cyan text-neon-sm mb-2">
              WARRANTY
            </h3>
            <p className="text-white/70 font-orbitron text-sm">
              5-year warranty on all neon products with 24/7 support.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl text-neon-red mb-4">⚡</div>
            <h3 className="text-xl font-audiowide font-bold text-neon-red text-neon-sm mb-2">
              INSTALLATION
            </h3>
            <p className="text-white/70 font-orbitron text-sm">
              Professional installation service available in your area.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Collection;
