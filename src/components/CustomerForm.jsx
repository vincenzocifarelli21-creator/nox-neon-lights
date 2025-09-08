import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCustomer } from '../context/CustomerContext';

const CustomerForm = ({ showAccountCreation = true, onSubmit, submitButtonText = "CONTINUE" }) => {
  const { customerInfo, updateField, validateCustomerInfo } = useCustomer();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef(null);
  
  // Define the order of form fields for navigation
  const getFieldOrder = () => {
    const baseFields = [
      'firstName', 'lastName', 'email', 'phone',
      'address', 'addressLine2', 'city', 'state', 'zipCode',
      'billingAddressSame'
    ];
    
    const billingFields = !customerInfo.billingAddressSame ? [
      'billingAddress', 'billingAddressLine2', 'billingCity', 'billingState', 'billingZipCode'
    ] : [];
    
    const accountCreationField = showAccountCreation ? ['createAccount'] : [];
    
    const accountFields = showAccountCreation && customerInfo.createAccount ? [
      'password', 'confirmPassword'
    ] : [];
    
    const additionalFields = ['specialInstructions', 'marketingOptIn'];
    
    return [...baseFields, ...billingFields, ...accountCreationField, ...accountFields, ...additionalFields];
  };
  
  // Auto-focus first field on component mount
  useEffect(() => {
    if (formRef.current) {
      const firstInput = formRef.current.querySelector('input[name="firstName"]');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
      }
    }
  }, []);
  
  // Handle focus when billing address section becomes visible
  useEffect(() => {
    if (!customerInfo.billingAddressSame && formRef.current) {
      const billingAddressField = formRef.current.querySelector('input[name="billingAddress"]');
      if (billingAddressField && document.activeElement === formRef.current.querySelector('input[name="billingAddressSame"]')) {
        setTimeout(() => billingAddressField.focus(), 300);
      }
    }
  }, [customerInfo.billingAddressSame]);
  
  // Handle focus when account creation section becomes visible
  useEffect(() => {
    if (customerInfo.createAccount && formRef.current) {
      const passwordField = formRef.current.querySelector('input[name="password"]');
      if (passwordField && document.activeElement === formRef.current.querySelector('input[name="createAccount"]')) {
        setTimeout(() => passwordField.focus(), 300);
      }
    }
  }, [customerInfo.createAccount]);
  
  // Function to move focus to next field
  const focusNextField = (currentFieldName) => {
    const fieldOrder = getFieldOrder();
    const currentIndex = fieldOrder.indexOf(currentFieldName);
    
    if (currentIndex < fieldOrder.length - 1) {
      const nextFieldName = fieldOrder[currentIndex + 1];
      const nextField = formRef.current?.querySelector(`[name="${nextFieldName}"]`);
      
      if (nextField) {
        setTimeout(() => nextField.focus(), 50);
        return true;
      }
    }
    return false;
  };
  
  // Function to move focus to previous field
  const focusPreviousField = (currentFieldName) => {
    const fieldOrder = getFieldOrder();
    const currentIndex = fieldOrder.indexOf(currentFieldName);
    
    if (currentIndex > 0) {
      const prevFieldName = fieldOrder[currentIndex - 1];
      const prevField = formRef.current?.querySelector(`[name="${prevFieldName}"]`);
      
      if (prevField) {
        setTimeout(() => prevField.focus(), 50);
        return true;
      }
    }
    return false;
  };
  
  // Function to check if field should auto-advance
  const shouldAutoAdvance = (fieldName, value) => {
    switch (fieldName) {
      case 'zipCode':
      case 'billingZipCode':
        return value.length === 5; // US ZIP code
      case 'state':
      case 'billingState':
        return value.length > 0; // State selected
      case 'phone':
        return value.replace(/\D/g, '').length === 10; // Phone number complete
      default:
        return false;
    }
  };
  
  // Enhanced field change handler
  const handleFieldChange = (fieldName, value) => {
    updateField(fieldName, value);
    
    // Auto-advance to next field if conditions are met
    if (shouldAutoAdvance(fieldName, value)) {
      setTimeout(() => focusNextField(fieldName), 100);
    }
  };
  
  // Enhanced keyboard event handler
  const handleKeyDown = (e, fieldName) => {
    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        if (!focusNextField(fieldName)) {
          // If no next field, try to submit form
          const submitButton = formRef.current?.querySelector('button[type="submit"]');
          if (submitButton) {
            submitButton.focus();
          }
        }
        break;
      case 'Tab':
        // Let default Tab behavior work, but ensure proper order
        if (e.shiftKey) {
          // Shift+Tab for previous field
          if (focusPreviousField(fieldName)) {
            e.preventDefault();
          }
        } else {
          // Tab for next field
          if (focusNextField(fieldName)) {
            e.preventDefault();
          }
        }
        break;
    }
  };

  // US States for dropdown
  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const validation = validateCustomerInfo();
    setErrors(validation.errors);
    
    if (validation.isValid) {
      if (onSubmit) {
        await onSubmit(customerInfo);
      }
    } else {
      // Scroll to first error
      const firstErrorField = Object.keys(validation.errors)[0];
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorElement.focus();
      }
    }
    
    setIsSubmitting(false);
  };

  const InputField = ({ label, name, type = "text", required = false, ...props }) => (
    <div className="mb-4">
      <label className="block text-sm font-orbitron font-bold text-neon-orange text-neon-sm mb-2">
        {label} {required && <span className="text-neon-red">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={customerInfo[name] || ''}
        onChange={(e) => handleFieldChange(name, e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, name)}
        className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white font-orbitron focus:outline-none transition-all duration-300 ${
          errors[name] 
            ? 'border-neon-red focus:border-neon-red shadow-[0_0_10px_rgba(255,0,100,0.3)]' 
            : 'border-neon-cyan/30 focus:border-neon-cyan focus:shadow-[0_0_10px_rgba(0,255,255,0.2)]'
        }`}
        {...props}
      />
      {errors[name] && (
        <motion.p 
          className="text-neon-red text-sm font-orbitron mt-1"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {errors[name]}
        </motion.p>
      )}
    </div>
  );

  const SelectField = ({ label, name, options, required = false, ...props }) => (
    <div className="mb-4">
      <label className="block text-sm font-orbitron font-bold text-neon-orange text-neon-sm mb-2">
        {label} {required && <span className="text-neon-red">*</span>}
      </label>
      <select
        name={name}
        value={customerInfo[name] || ''}
        onChange={(e) => handleFieldChange(name, e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, name)}
        className={`w-full px-4 py-3 bg-black/50 border rounded-lg text-white font-orbitron focus:outline-none transition-all duration-300 ${
          errors[name] 
            ? 'border-neon-red focus:border-neon-red shadow-[0_0_10px_rgba(255,0,100,0.3)]' 
            : 'border-neon-cyan/30 focus:border-neon-cyan focus:shadow-[0_0_10px_rgba(0,255,255,0.2)]'
        }`}
        {...props}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option} className="bg-black text-white">
            {option}
          </option>
        ))}
      </select>
      {errors[name] && (
        <motion.p 
          className="text-neon-red text-sm font-orbitron mt-1"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {errors[name]}
        </motion.p>
      )}
    </div>
  );

  const CheckboxField = ({ label, name, description }) => (
    <div className="mb-4">
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          name={name}
          checked={customerInfo[name] || false}
          onChange={(e) => {
            updateField(name, e.target.checked);
            // For special checkboxes that reveal new sections, handle focus
            if ((name === 'billingAddressSame' && !e.target.checked) || 
                (name === 'createAccount' && e.target.checked)) {
              // Focus will be handled by useEffect hooks
            } else {
              // For other checkboxes, try to move to next field
              setTimeout(() => focusNextField(name), 100);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              e.target.click();
            } else {
              handleKeyDown(e, name);
            }
          }}
          className="mt-1 text-neon-cyan focus:ring-neon-cyan focus:ring-2"
        />
        <div>
          <span className="text-white/90 font-orbitron text-sm font-bold">{label}</span>
          {description && (
            <p className="text-white/60 font-orbitron text-xs mt-1">{description}</p>
          )}
        </div>
      </label>
    </div>
  );

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information Section */}
      <motion.div
        className="cyberpunk-card p-6"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        <h2 className="text-2xl font-audiowide font-bold text-neon-cyan text-neon mb-6">
          PERSONAL INFORMATION
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField 
            label="First Name" 
            name="firstName" 
            required 
            placeholder="Enter your first name"
          />
          <InputField 
            label="Last Name" 
            name="lastName" 
            required 
            placeholder="Enter your last name"
          />
        </div>
        
        <InputField 
          label="Email Address" 
          name="email" 
          type="email" 
          required 
          placeholder="your@email.com"
        />
        
        <InputField 
          label="Phone Number" 
          name="phone" 
          type="tel" 
          required 
          placeholder="(555) 123-4567"
        />
      </motion.div>

      {/* Delivery Address Section */}
      <motion.div
        className="cyberpunk-card p-6"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-2xl font-audiowide font-bold text-neon-cyan text-neon mb-6">
          DELIVERY ADDRESS
        </h2>
        
        <InputField 
          label="Street Address" 
          name="address" 
          required 
          placeholder="123 Neon Street"
        />
        
        <InputField 
          label="Apartment, Suite, etc." 
          name="addressLine2" 
          placeholder="Apt 4B (optional)"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField 
            label="City" 
            name="city" 
            required 
            placeholder="Cyber City"
          />
          <SelectField 
            label="State" 
            name="state" 
            options={states} 
            required 
          />
          <InputField 
            label="ZIP Code" 
            name="zipCode" 
            required 
            placeholder="12345"
            maxLength={10}
          />
        </div>
        
        <InputField 
          label="Country" 
          name="country" 
          value={customerInfo.country}
          readOnly
          className="bg-gray-800/50 cursor-not-allowed"
        />
      </motion.div>

      {/* Billing Address Section */}
      <motion.div
        className="cyberpunk-card p-6"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-audiowide font-bold text-neon-cyan text-neon mb-6">
          BILLING ADDRESS
        </h2>
        
        <CheckboxField 
          label="Same as delivery address" 
          name="billingAddressSame"
        />
        
        {!customerInfo.billingAddressSame && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 space-y-4"
          >
            <InputField 
              label="Billing Street Address" 
              name="billingAddress" 
              required 
              placeholder="123 Billing Street"
            />
            
            <InputField 
              label="Apartment, Suite, etc." 
              name="billingAddressLine2" 
              placeholder="Apt 4B (optional)"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField 
                label="Billing City" 
                name="billingCity" 
                required 
                placeholder="Billing City"
              />
              <SelectField 
                label="Billing State" 
                name="billingState" 
                options={states} 
                required 
              />
              <InputField 
                label="Billing ZIP Code" 
                name="billingZipCode" 
                required 
                placeholder="12345"
                maxLength={10}
              />
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Account Creation Section */}
      {showAccountCreation && (
        <motion.div
          className="cyberpunk-card p-6"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-audiowide font-bold text-neon-cyan text-neon mb-6">
            ACCOUNT OPTIONS
          </h2>
          
          <CheckboxField 
            label="Create an account for faster future orders" 
            name="createAccount"
            description="Save your information for quicker checkout next time"
          />
          
          {customerInfo.createAccount && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField 
                  label="Password" 
                  name="password" 
                  type="password" 
                  required 
                  placeholder="Minimum 8 characters"
                  minLength={8}
                />
                <InputField 
                  label="Confirm Password" 
                  name="confirmPassword" 
                  type="password" 
                  required 
                  placeholder="Confirm your password"
                />
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Special Instructions & Marketing */}
      <motion.div
        className="cyberpunk-card p-6"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-audiowide font-bold text-neon-cyan text-neon mb-6">
          ADDITIONAL OPTIONS
        </h2>
        
        <div className="mb-4">
          <label className="block text-sm font-orbitron font-bold text-neon-orange text-neon-sm mb-2">
            Special Delivery Instructions
          </label>
          <textarea
            name="specialInstructions"
            value={customerInfo.specialInstructions || ''}
            onChange={(e) => handleFieldChange('specialInstructions', e.target.value)}
            onKeyDown={(e) => {
              // For textarea, only handle Tab navigation, not Enter
              if (e.key === 'Tab') {
                handleKeyDown(e, 'specialInstructions');
              }
            }}
            rows={4}
            placeholder="Gate code, delivery preferences, etc. (optional)"
            className="w-full px-4 py-3 bg-black/50 border border-neon-cyan/30 rounded-lg text-white font-orbitron focus:border-neon-cyan focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,255,0.2)] transition-all duration-300 resize-vertical"
          />
        </div>
        
        <CheckboxField 
          label="Subscribe to our newsletter for exclusive offers" 
          name="marketingOptIn"
          description="Get notified about new products, sales, and cyberpunk updates"
        />
      </motion.div>

      {/* Submit Button */}
      <motion.div
        className="text-center"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.5 }}
      >
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-8 py-4 bg-gradient-to-r from-neon-orange to-neon-red text-black font-orbitron font-bold text-lg rounded-lg shadow-neon transition-all duration-300 ${
            isSubmitting 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:shadow-neon-lg hover:scale-105'
          }`}
        >
          {isSubmitting ? 'PROCESSING...' : submitButtonText}
        </button>
      </motion.div>
    </form>
  );
};

export default CustomerForm;
