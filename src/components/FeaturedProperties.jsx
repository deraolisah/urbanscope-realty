import React, { useContext, useEffect, useRef } from 'react';
import PropertyPreview from './PropertyPreview';
import { PropertyContext } from '../contexts/PropertyContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);


const FeaturedProperties = () => {
  const sectionRef = useRef(null);
  const { featuredProperties, properties, loading, fetchFeaturedProperties } = useContext(PropertyContext);

  useEffect(() => {
    const section = sectionRef.current;

    gsap.to(section, {
      backgroundColor: '#1d1d1b', // dark background
      color: '#fff',           // light text
      scrollTrigger: {
        trigger: section,
        start: '-10% center',
        end: '8% center',
        scrub: true,
      },
    });
  }, []);

  if (loading) return <div className="container text-center py-8"> Loading Featured properties... </div>;


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
    .slice(0, 4);



  return (
    <section ref={sectionRef} className="container py-12 md:py-16 bg-white text-dark transition-colors duration-50">
      {/* Featured Properties Section */}
      <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center leading-tight uppercase mb-4 md:mb-8">
        Featured Properties
      </h2>
      <div className='w-full h-full flex gap-4 overflow-x-scroll lg:grid lg:grid-cols-4 lg:gap-4 scrollbar-hidden'>
        {/* {properties.map(property => (
          <div key={property._id} className=''>
            <PropertyPreview property={property} />
            <hr className='my-12 border-dark/20' />
          </div>
        ))} */}
        {featuredProperties.slice(0, 4).map(property => (
          <div key={property._id} className=''>
            <PropertyPreview property={property} />
            <hr className='my-12 border-dark/20' />
          </div>
        ))}
      </div>

      {/* New in Town Section */}
      {/* <div className="mb-4 hidden">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center leading-tight uppercase mb-4 md:mb-8">
          New in Town
        </h2>
        <div className='w-full h-full flex gap-4 overflow-x-scroll lg:grid lg:grid-cols-4 lg:gap-4 scrollbar-hidden'>
          {recentProperties.map(property => (
            <div key={property._id}>
              <PropertyPreview property={property} />
            </div>
          ))}
        </div>
      </div> */}
    </section>
  );
};

export default FeaturedProperties;