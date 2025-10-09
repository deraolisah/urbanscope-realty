import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const PropertyContext = createContext();

const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/properties");
      setProperties(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <PropertyContext.Provider value={{ properties, loading }}>
      {children}
    </PropertyContext.Provider>
  );
};

export default PropertyProvider;