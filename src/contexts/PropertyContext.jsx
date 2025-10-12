import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const PropertyContext = createContext();

const PropertyProvider = ({ children }) => {
  const [ properties, setProperties ] = useState([]);
  const [ featuredProperties, setFeaturedProperties ] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/properties`);
      // console.log(res.data);
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
    <PropertyContext.Provider value={{ properties, featuredProperties, loading }}>
      {children}
    </PropertyContext.Provider>
  );
};

export default PropertyProvider;