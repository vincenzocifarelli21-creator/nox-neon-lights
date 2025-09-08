import { createContext, useContext, useReducer, useEffect, useRef } from 'react';

const CustomerContext = createContext();

const customerReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CUSTOMER_INFO':
      return {
        ...state,
        customerInfo: action.payload
      };
    case 'UPDATE_FIELD':
      return {
        ...state,
        customerInfo: {
          ...state.customerInfo,
          [action.field]: action.value
        }
      };
    case 'CLEAR_CUSTOMER':
      return initialState;
    default:
      return state;
  }
};

const initialState = {
  customerInfo: {
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Delivery Address
    address: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    
    // Billing Address (if different)
    billingAddressSame: true,
    billingAddress: '',
    billingAddressLine2: '',
    billingCity: '',
    billingState: '',
    billingZipCode: '',
    billingCountry: 'United States',
    
    // Preferences
    createAccount: false,
    password: '',
    confirmPassword: '',
    marketingOptIn: false,
    specialInstructions: ''
  }
};

export const CustomerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(customerReducer, initialState);
  const saveTimeoutRef = useRef(null);
  const isInitialLoadRef = useRef(true);

  // Load customer data from localStorage on mount
  useEffect(() => {
    const savedCustomerInfo = localStorage.getItem('nox-customer-info');
    if (savedCustomerInfo) {
      dispatch({
        type: 'SET_CUSTOMER_INFO',
        payload: JSON.parse(savedCustomerInfo)
      });
    }
    isInitialLoadRef.current = false;
  }, []);

  // Debounced save customer data to localStorage
  useEffect(() => {
    // Skip saving during initial load to prevent unnecessary localStorage writes
    if (isInitialLoadRef.current) return;
    
    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    // Set new timeout to save after user stops typing
    saveTimeoutRef.current = setTimeout(() => {
      localStorage.setItem('nox-customer-info', JSON.stringify(state.customerInfo));
    }, 500); // 500ms delay
    
    // Cleanup timeout on unmount
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [state.customerInfo]);

  const setCustomerInfo = (customerData) => {
    dispatch({
      type: 'SET_CUSTOMER_INFO',
      payload: customerData
    });
  };

  const updateField = (field, value) => {
    dispatch({
      type: 'UPDATE_FIELD',
      field,
      value
    });
  };

  const clearCustomer = () => {
    dispatch({ type: 'CLEAR_CUSTOMER' });
    localStorage.removeItem('nox-customer-info');
  };

  const validateCustomerInfo = () => {
    const { customerInfo } = state;
    const errors = {};

    // Required fields validation
    if (!customerInfo.firstName.trim()) errors.firstName = 'First name is required';
    if (!customerInfo.lastName.trim()) errors.lastName = 'Last name is required';
    if (!customerInfo.email.trim()) errors.email = 'Email is required';
    if (!customerInfo.phone.trim()) errors.phone = 'Phone number is required';
    if (!customerInfo.address.trim()) errors.address = 'Address is required';
    if (!customerInfo.city.trim()) errors.city = 'City is required';
    if (!customerInfo.state.trim()) errors.state = 'State is required';
    if (!customerInfo.zipCode.trim()) errors.zipCode = 'ZIP code is required';

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (customerInfo.email && !emailRegex.test(customerInfo.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Phone format validation
    const phoneRegex = /^[\+]?[\s\-\(\)]*([0-9][\s\-\(\)]*){10,}$/;
    if (customerInfo.phone && !phoneRegex.test(customerInfo.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    // ZIP code validation
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (customerInfo.zipCode && !zipRegex.test(customerInfo.zipCode)) {
      errors.zipCode = 'Please enter a valid ZIP code';
    }

    // Password validation if creating account
    if (customerInfo.createAccount) {
      if (!customerInfo.password.trim()) {
        errors.password = 'Password is required';
      } else if (customerInfo.password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
      }
      
      if (customerInfo.password !== customerInfo.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }

    // Billing address validation if different
    if (!customerInfo.billingAddressSame) {
      if (!customerInfo.billingAddress.trim()) errors.billingAddress = 'Billing address is required';
      if (!customerInfo.billingCity.trim()) errors.billingCity = 'Billing city is required';
      if (!customerInfo.billingState.trim()) errors.billingState = 'Billing state is required';
      if (!customerInfo.billingZipCode.trim()) errors.billingZipCode = 'Billing ZIP code is required';
      
      if (customerInfo.billingZipCode && !zipRegex.test(customerInfo.billingZipCode)) {
        errors.billingZipCode = 'Please enter a valid billing ZIP code';
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  const value = {
    ...state,
    setCustomerInfo,
    updateField,
    clearCustomer,
    validateCustomerInfo
  };

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }
  return context;
};
