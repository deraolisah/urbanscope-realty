import React, { useContext } from 'react';
import { PropertyContext } from '../contexts/PropertyContext';
import { PreloaderContext } from '../contexts/PreloaderContext';
import PropertyPreview from './PropertyPreview';

const FeaturedProperties = () => {
  const { featuredProperties, properties, fetchFeaturedProperties } = useContext(PropertyContext);
   const { loading } = useContext(PreloaderContext);

  if (loading) return <div className="container py-8">Loading properties...</div>;


  if (!Array.isArray(featuredProperties) || featuredProperties.length === 0) {
    return (
      <div className="container py-8 text-center"> 
        No featured properties available.
        <button onClick={() => { fetchFeaturedProperties(); } } className='btn w-fit mx-auto mt-4'> Refresh </button>
      </div>
    );
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
      <div className='w-full h-full flex gap-4 overflow-x-scroll sm:grid sm:grid-cols-2 sm:gap-4 scrollbar-hidden'>
        {/* {properties.map(property => (
          <div key={property._id} className=''>
            <PropertyPreview property={property} />
            <hr className='my-12 border-dark/20' />
          </div>
        ))} */}
        {featuredProperties.slice(0, 2).map(property => (
          <div key={property._id} className=''>
            <PropertyPreview property={property} />
            <hr className='my-12 border-dark/20' />
          </div>
        ))}
      </div>

      {/* New in Town Section */}
      <div className="mb-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center leading-tight uppercase mb-4 md:mb-8">
          New in Town
        </h2>
        <div className='w-full h-full flex gap-4 overflow-x-scroll sm:grid sm:grid-cols-2 sm:gap-4 scrollbar-hidden'>
          {recentProperties.map(property => (
            <div key={property._id}>
              <PropertyPreview property={property} />
              {/* <hr className='my-12 border-dark/20' /> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;