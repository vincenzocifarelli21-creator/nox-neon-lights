import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

// Cart reducer to manage cart state
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, selectedOption, quantity } = action.payload;
      
      // Calculate the final price including option price
      const optionPrice = product.options.find(opt => opt.name === selectedOption)?.price || 0;
      const finalPrice = product.price + optionPrice;
      
      // Create a unique item identifier including product id and option
      const itemId = `${product.id}-${selectedOption}`;
      
      // Check if item already exists in cart
      const existingItemIndex = state.items.findIndex(item => item.itemId === itemId);
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += quantity;
        return {
          ...state,
          items: updatedItems
        };
      } else {
        // Add new item to cart
        const newItem = {
          itemId,
          id: product.id,
          name: product.name,
          price: finalPrice,
          originalPrice: product.price,
          optionPrice,
          quantity,
          color: product.color,
          option: selectedOption,
          category: product.category,
          image: product.images?.[0] || '/api/placeholder/150/150'
        };
        
        return {
          ...state,
          items: [...state.items, newItem]
        };
      }
    }
    
    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        items: state.items.filter(item => item.itemId !== action.payload)
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { itemId, quantity } = action.payload;
      
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        return {
          ...state,
          items: state.items.filter(item => item.itemId !== itemId)
        };
      }
      
      return {
        ...state,
        items: state.items.map(item =>
          item.itemId === itemId ? { ...item, quantity } : item
        )
      };
    }
    
    case 'CLEAR_CART': {
      return {
        ...state,
        items: []
      };
    }
    
    default:
      return state;
  }
};

// Initial cart state
const initialState = {
  items: []
};

// CartProvider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  // Action creators
  const addToCart = (product, selectedOption, quantity) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { product, selectedOption, quantity }
    });
  };
  
  const removeFromCart = (itemId) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: itemId
    });
  };
  
  const updateQuantity = (itemId, quantity) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { itemId, quantity }
    });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  // Calculated values
  const cartItems = state.items;
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Cart context value
  const value = {
    cartItems,
    itemCount,
    subtotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
