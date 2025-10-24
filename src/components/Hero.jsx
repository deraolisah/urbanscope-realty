import React, { useState, useEffect } from 'react';
import hero from '../assets/hero.png';
import heroImg from '../assets/hero-img.png';
import heroImg1 from '../assets/hero-img-1.png';
import heroImg2 from '../assets/hero-img-2.png';
import heroImg3 from '../assets/hero-img-3.png';
import { HiMiniArrowRight } from "react-icons/hi2";
import { Link } from 'react-router-dom';

const images = [ heroImg1, heroImg, heroImg2, heroImg3 ]; // Replace with actual image imports

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => setIsOpen(false);

  const nextSlide = () => setCurrentIndex((currentIndex + 1) % images.length);
  const prevSlide = () => setCurrentIndex((currentIndex - 1 + images.length) % images.length);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentIndex]);

  return (
    <section className="container py-8 md:py-12">
      <div className='flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8'>
        <h1 className='text-4xl md:text-5xl lg:text-7xl font-extrabold -mb-2'>
          FIND YOUR<br />PERFECT HOME
        </h1>
        <div className='flex flex-col gap-4 md:max-w-md'>
          <p className='text-md md:pr-[28%]'>
            We offer over 100 apartments, houses and lands, for every request... you are guaranteed to find a property that suits you.
          </p>
          <Link to="/explore" className='flex gap-0'>
            <input
              type='search'
              placeholder='Enter country, city or region'
              className='flex-1 px-4 py-3 border border-dark/20 border-r-0 rounded-l-lg focus:outline-none focus:border-dark'
            />
            <button className='btn w-fit rounded-l-none rounded-r-lg'>
              <HiMiniArrowRight />
            </button>
          </Link>
        </div>
      </div>

      {/* HERO IMAGE */}
      <div className='overflow-hidden rounded-lg shadow-lg mt-6 md:mt-8'>
        <img
          src={hero}
          alt='Modern apartment building'
          className='w-full cursor-pointer hover:scale-[1.008] transition-all duration-300'
          onClick={() => openLightbox(0)}
          />
      </div>

      {/* LIGHTBOX MODAL */}
      {isOpen && (
        <div className="fixed inset-0 bg-dark/80 backdrop-blur-xs flex flex-col items-center justify-center z-50">
          <button className="absolute top-4 right-4 text-dark text-4xl cursor-pointer z-10 bg-light/70 rounded-full w-10 h-10 flex items-center justify-center hover:bg-light/80 transition-colors" onClick={closeLightbox}>&times;</button>
          <div className="relative max-w-3xl mx-auto w-full px-4">
            <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="rounded-lg w-full" />
            <div className="absolute w-8 h-8 top-1/2 left-0 transform -translate-y-1/2 text-dark bg-light rounded-full shadow text-xl flex items-center justify-center cursor-pointer" onClick={prevSlide}>&#10094;</div>
            <div className="absolute w-8 h-8 top-1/2 right-0 transform -translate-y-1/2 text-dark bg-light rounded-full shadow text-xl flex items-center justify-center cursor-pointer" onClick={nextSlide}>&#10095;</div>
          </div>
          <div className='flex items-center justify-center gap-3 my-4'>
            {images.map((_, index) => (
              <span
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300 ${
                  currentIndex === index ? 'bg-white scale-125' : 'bg-light/40 hover:bg-light'
                }`}
              ></span>
            ))}
          </div>
          <p className="text-white mt-2 text-sm">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </section>
  );
};

export default Hero;