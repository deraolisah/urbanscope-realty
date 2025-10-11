import React, { useContext } from 'react';
import { PropertyContext } from '../contexts/PropertyContext';
import PropertyPreview from './PropertyPreview';

const FeaturedProperties = () => {
  const { properties, loading } = useContext(PropertyContext);

  if (loading) return <div className="container py-8">Loading properties...</div>;

  if (!Array.isArray(properties)) {
    console.error("Expected an array but got:", typeof properties);
    return null;
  }

  const featuredProperties = properties.filter(p => p.featured === true);
  const newProperties = properties.filter(p => p.featured !== true);

  return (
    <section className="container py-8 md:py-12">
      {/* Featured Properties Section */}
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center leading-tight uppercase mb-4 md:mb-8">
          Featured Properties
        </h2>
        {featuredProperties.map(property => (
          <div key={property._id}>
            <PropertyPreview property={property} />
            <hr className='my-12 border-dark/20' />
          </div>
        ))}
      </div>

      {/* New in Town Section */}
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center leading-tight uppercase mb-4 md:mb-8">
          New in Town
        </h2>
        {newProperties.map(property => (
          <div key={property._id}>
            <PropertyPreview property={property} showMore={true} />
            <hr className='my-12 border-dark/20' />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProperties;