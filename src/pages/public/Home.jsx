import React from 'react';
import Hero from '../../components/Hero.jsx';
import FeaturedProperties from '../../components/FeaturedProperties.jsx';
import Newsletter from '../../components/Newsletter.jsx';

const Home = () => {
  return (
    <div className="">
      <Hero />
      <FeaturedProperties />
      <Newsletter />
    </div>
  );
};

export default Home;