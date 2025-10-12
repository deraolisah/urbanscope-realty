import React, { useContext } from 'react';
import { PropertyContext } from '../contexts/PropertyContext';
import PropertyPreview from './PropertyPreview';

const FeaturedProperties = () => {
  const { properties, loading } = useContext(PropertyContext);

  if (loading) return <div className="container py-8">Loading properties...</div>;
  if (!Array.isArray(properties) || properties.length === 0) {
    return <div className="container py-8 text-center">No featured properties available.</div>;
  }

  // Recently added: sort by createdAt descending, take first 2
  const recentProperties = [...properties]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 2);



  return (
    <section className="container py-8 md:py-12">
      {/* Featured Properties Section */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center leading-tight uppercase mb-4 md:mb-8">
        Featured Properties
      </h2>
      <div className='grid grid-cols-2 gap-3 md:gap-4'>
        {properties.map(property => (
          <div key={property._id} className=''>
            <PropertyPreview property={property} showMore={true} />
            <hr className='my-12 border-dark/20' />
          </div>
        ))}
      </div>

      {/* New in Town Section */}
      {/* New in Town Section */}
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center leading-tight uppercase mb-4 md:mb-8">
          New in Town
        </h2>
        <div className='grid grid-cols-2 gap-3 md:gap-4'>
          {recentProperties.map(property => (
            <div key={property._id}>
              <PropertyPreview property={property} showMore={true} />
              <hr className='my-12 border-dark/20' />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;