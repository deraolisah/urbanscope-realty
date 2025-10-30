import React from 'react';
import Hero from '../../components/Hero.jsx';
import FeaturedProperties from '../../components/FeaturedProperties.jsx';
import Partners from '../../components/Partners.jsx';
import Articles from '../../components/Articles.jsx';
import Newsletter from '../../components/Newsletter.jsx';

const Home = () => {
  return (
    <div className="">
      <Hero />
      <FeaturedProperties />
      <Partners />
      <Articles />
      <Newsletter />
    </div>
  );
};

export default Home;