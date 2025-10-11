import React, { useContext } from 'react';
import { PropertyContext } from '../contexts/PropertyContext';
import PropertyPreview from './PropertyPreview';

const FeaturedProperties = () => {
  const { properties, loading } = useContext(PropertyContext);

  if (loading) return <div className="container py-8">Loading properties...</div>;
  if (!Array.isArray(properties) || properties.length === 0) {
    return <div className="container py-8 text-center">No featured properties available.</div>;
  }

  return (
    <section className="container py-8 md:py-12">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center leading-tight uppercase mb-4 md:mb-8">
        Featured Properties
      </h2>
      {properties.map(property => (
        <div key={property._id}>
          <PropertyPreview property={property} />
          <hr className='my-12 border-dark/20' />
        </div>
      ))}
    </section>
  );
};

export default FeaturedProperties;