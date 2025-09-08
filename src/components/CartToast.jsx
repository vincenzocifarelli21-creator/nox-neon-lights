import { motion, AnimatePresence } from 'framer-motion';

const CartToast = ({ isVisible, product, quantity, selectedOption, onClose }) => {
  if (!product) return null;

  const finalPrice = product.price + (product.options?.find(opt => opt.name === selectedOption)?.price || 0);
  const totalPrice = finalPrice * quantity;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 50, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 50, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-6 right-6 z-50 bg-gradient-to-r from-neon-cyan/20 to-neon-blue/20 backdrop-blur-md border border-neon-cyan/50 text-white px-6 py-4 rounded-xl shadow-neon font-orbitron max-w-sm"
          onClick={onClose}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-neon-cyan rounded-full flex items-center justify-center text-black font-bold text-lg animate-pulse">
                ✓
              </div>
            </div>
            <div className="flex-grow">
              <div className="font-bold text-neon-cyan text-sm mb-1">Added to Cart!</div>
              <div className="text-white/90 text-sm">
                {quantity} x {product.name}
              </div>
              {selectedOption && selectedOption !== 'Standard' && (
                <div className="text-neon-blue/80 text-xs mt-0.5">
                  {selectedOption}
                </div>
              )}
              <div className="text-neon-orange text-xs mt-1 font-bold">
                ${totalPrice.toFixed(2)}
              </div>
            </div>
            <div className="flex-shrink-0 text-neon-cyan/60 text-xs">
              🛒
            </div>
          </div>
          {/* Progress bar for auto-dismiss */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-neon-cyan rounded-b-xl"
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 3, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartToast;
