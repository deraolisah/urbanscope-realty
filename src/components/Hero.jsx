import React, { useState } from 'react';
import heroImg from '../assets/hero-img.png';
import heroImg2 from '../assets/hero-img-2.png';
import heroImg3 from '../assets/hero-img-3.png';
import { HiMiniArrowRight } from "react-icons/hi2";

const images = [heroImg, heroImg2, heroImg, heroImg3]; // Replace with actual image imports

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

  return (
    <section className="container py-8 md:py-12">
      <div className='flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8'>
        <h1 className='text-4xl md:text-5xl lg:text-7xl font-extrabold -mb-2'>
          FIND YOUR<br />PERFECT HOME
        </h1>
        <div className='flex flex-col gap-4 md:max-w-md'>
          <p className='text-md md:pr-[35%]'>
            We offer over 1,000 apartments for every request. You are guaranteed to find an apartment that suits you.
          </p>
          <div className='flex gap-0'>
            <input
              type='search'
              placeholder='Enter country, city or region'
              className='flex-1 px-4 py-3 border border-gray-300 border-r-0 rounded-l-lg focus:outline-none focus:border-dark'
            />
            <button className='btn w-fit rounded-l-none rounded-r-lg'>
              <HiMiniArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* HERO IMAGE */}
      <div className='overflow-hidden rounded-lg shadow-lg mt-6 md:mt-8'>
        <img
          src={heroImg}
          alt='Modern apartment building'
          className='w-full cursor-pointer hover:scale-[1.008] transition-all duration-300'
          onClick={() => openLightbox(0)}
          />
      </div>

      {/* LIGHTBOX MODAL */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center z-50">
          <button className="absolute top-4 right-4 text-white text-3xl cursor-pointer" onClick={closeLightbox}>&times;</button>
          <div className="relative max-w-3xl mx-auto w-full px-4">
            <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="rounded-lg w-full" />
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-3xl cursor-pointer" onClick={prevSlide}>&#10094;</div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-3xl cursor-pointer" onClick={nextSlide}>&#10095;</div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;