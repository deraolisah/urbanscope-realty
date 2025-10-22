import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const PropertyContext = createContext();

const PropertyProvider = ({ children }) => {
  const [ properties, setProperties ] = useState([]);
  const [ featuredProperties, setFeaturedProperties ] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  // Price formatting utility functions
  const formatPrice = (price, transactionType) => {
    if (!price) return '₦0';
    
    if (transactionType === 'Rent') {
      // Format rent prices (monthly)
      if (price >= 1000000) {
        return `₦${(price / 1000000).toFixed(1)}M`;
      } else if (price >= 1000) {
        return `₦${(price / 1000).toFixed(0)}k`;
      } else {
        return `₦${price}`;
      }
    } else {
      // Format sale prices (one-time)
      if (price >= 1000000000) {
        return `₦${(price / 1000000000).toFixed(1)}B`;
      } else if (price >= 1000000) {
        return `₦${(price / 1000000).toFixed(1)}M`;
      } else if (price >= 1000) {
        return `₦${(price / 1000).toFixed(0)}k`;
      } else {
        return `₦${price}`;
      }
    }
  };

  const getPriceSuffix = (transactionType) => {
    return transactionType === 'Rent' ? '/month' : '';
  };

  const getTransactionBadge = (transactionType) => {
    if (transactionType === 'Rent') {
      return 'bg-blue-100 text-blue-800 border-blue-200';
    } else {
      return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getPriceDescription = (transactionType) => {
    if (transactionType === 'Rent') {
      return ` /month, available for ${transactionType?.toLowerCase()}`;
    } else {
      return `, available for ${transactionType?.toLowerCase()}`;
    }
  };

  // Format property price with all details
  const getFormattedPrice = (property) => {
    return {
      formatted: formatPrice(property.price, property.propertyTransaction),
      suffix: getPriceSuffix(property.propertyTransaction),
      badge: getTransactionBadge(property.propertyTransaction),
      description: getPriceDescription(property.propertyTransaction),
      transactionType: property.propertyTransaction
    };
  };

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/properties`);
      setProperties(res.data);
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeaturedProperties = async () => {
    try{
      setLoading(true);
      const res = await axios.get(`${API_URL}/properties/featured`);
      setFeaturedProperties(res.data);
    } catch (error){
      console.log("Failed to fetch featured properties:", error);
    } finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProperties();
    fetchFeaturedProperties();
  }, []);

  return (
    <PropertyContext.Provider value={{ 
      properties, 
      setProperties, 
      featuredProperties, 
      loading, 
      setLoading,
      // Price formatting utilities
      formatPrice,
      getPriceSuffix,
      getTransactionBadge,
      getPriceDescription,
      getFormattedPrice
    }}>
      {children}
    </PropertyContext.Provider>
  );
};

export default PropertyProvider;