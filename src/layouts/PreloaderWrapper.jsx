// layouts/PreloaderWrapper.jsx
import React, { useEffect, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PreloaderContext } from '../contexts/PreloaderContext';
import Preloader from '../components/Preloader';

const PreloaderWrapper = ({ children }) => {
  const location = useLocation();
  const { loading, setLoading } = useContext(PreloaderContext);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Show preloader on route changes
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // Adjust duration as needed

    return () => clearTimeout(timer);
  }, [location]);

  // Handle initial app load
  useEffect(() => {
    if (isInitialLoad) {
      const timer = setTimeout(() => {
        setIsInitialLoad(false);
      }, 1500); // Show preloader for 1.5 seconds on initial load
      return () => clearTimeout(timer);
    }
  }, [isInitialLoad]);

  // Show preloader if either initial loading or route changing
  if (loading || isInitialLoad) {
    return <Preloader />;
  }

  return children;
};

export default PreloaderWrapper;