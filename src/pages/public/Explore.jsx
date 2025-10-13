import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import PropertyCard from '../../components/PropertyCard';
import PropertyList from '../../components/PropertyList';
import { MdOutlineFilterList, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FiGrid } from "react-icons/fi";
import { HiMiniListBullet } from "react-icons/hi2";
import { PropertyContext } from '../../contexts/PropertyContext';

const Explore = () => {
  const [priceRange, setPriceRange] = useState({ min: 200, max: 6000 });
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [showLayout, setShowLayout] = useState('grid');
  const [sortBy, setSortBy] = useState('price');
  const { properties, loading } = useContext(PropertyContext);

  const toggleFilter = () => setShowFilter(!showFilter);

  const handleTypeToggle = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const resetFilters = () => {
    setPriceRange({ min: 200, max: 6000 });
    setSelectedTypes([]);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleMinPriceChange = (e) => {
    const value = Math.min(Number(e.target.value), priceRange.max - 10);
    setPriceRange(prev => ({ ...prev, min: value }));
  };

  const handleMaxPriceChange = (e) => {
    const value = Math.max(Number(e.target.value), priceRange.min + 10);
    setPriceRange(prev => ({ ...prev, max: value }));
  };

  // Filter and sort properties
  const filteredProperties = properties
    .filter(p => {
      const matchesPrice = p.price >= priceRange.min && p.price <= priceRange.max;
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(p.propertyType);
      return matchesPrice && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'alphabet':
          return a.title?.localeCompare(b.title);
        case 'alphabet-desc':
          return b.title?.localeCompare(a.title);
        case 'date':
          return new Date(a.createdAt || a.date) - new Date(b.createdAt || b.date);
        case 'date-desc':
          return new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date);
        default:
          return 0;
      }
    });

  return (
    <div className="flex min-h-screen bg-dark/5 relative container md:!p-0">
      {showFilter && (
        <div
          onClick={() => setShowFilter(false)}
          className="cursor-pointer fixed z-1 inset-0 bg-dark/80 backdrop-blur-xs"
        ></div>
      )}

      {/* Sidebar Filters */}
      <aside className={`md:block w-full md:w-1/4 bg-white p-6 pb-8 shadow-md left-0 md:sticky md:top-16 fixed h-[68%] md:min-h-screen md:h-full overflow-y-auto scrollbar-hidden md:overflow-y-visible rounded-t-2xl md:rounded-t-none z-2 bottom-0 md:opacity-100 md:translate-y-0 md:pointer-events-auto transition-all duration-400 ${showFilter ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-20 pointer-events-none"}`}>
        <div className="sticky top-20 space-y-6">
          <h2 className="text-xl font-extrabold w-full flex items-center justify-between">
            Filter <span className='font-normal text-base'> ({filteredProperties.length} results) </span>
          </h2>

          <hr className='md:hidden border-dark/10'/>

          {/* Price Filter - Dual Range */}
          <div className="space-y-2">
            <h4 className="text-md font-semibold"> Price </h4>

            {/* Dual Range Slider Container */}
            <div className="relative">
              {/* Track */}
              <div className="h-1 bg-gray-300 rounded-full absolute top-1/2 left-0 right-0 -translate-y-1/2"></div>
              
              {/* Active Range */}
              <div 
                className="h-1 bg-dark rounded-full absolute top-1/2 -translate-y-1/2"
                style={{
                  left: `${((priceRange.min - 100) / 1000) * 10}%`,
                  right: `${100 - ((priceRange.max - 100) / 1000) * 10}%`
                }}
              ></div>

              {/* Min Price Slider */}
              <input
                type="range"
                min="100"
                max="10000"
                value={priceRange.min}
                onChange={handleMinPriceChange}
                className="absolute top-1/2 left-0 right-0 w-full h-1 -translate-y-1/2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-dark [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
              />

              {/* Max Price Slider */}
              <input
                type="range"
                min="100"
                max="10000"
                value={priceRange.max}
                onChange={handleMaxPriceChange}
                className="absolute top-1/2 left-0 right-0 w-full h-1 -translate-y-1/2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-dark [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
              />
            </div>

            {/* Price Display */}
            <div className="flex justify-between items-center mt-6">
              <div className="text-start px-2 py-1 w-full border border-dark/10">
                {/* <span className="text-sm text-gray-600">Min Price</span> */}
                <div className="font-semibold text-lg">${priceRange.min}</div>
              </div>
              <div className="text-dark/80 mx-3"> - </div>
              <div className="text-start px-2 py-1 w-full border border-dark/10">
                {/* <span className="text-sm text-gray-600">Max Price</span> */}
                <div className="font-semibold text-lg">${priceRange.max}</div>
              </div>
            </div>
          </div>

          {/* Type Filter */}
          <div className="flex flex-col items-start">
            <h4 className="text-md font-semibold mb-1"> Real Estate Type </h4>
            {["House", "Apartment", "Land"].map(type => (
              <label key={type} className="flex items-center space-x-2.5 mb-2 cursor-pointer group text-md">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => handleTypeToggle(type)}
                  className="w-4 h-4 text-dark rounded cursor-pointer"
                />
                <span className="text-gray-700 group-hover:text-dark transition-colors">{type + "s"}</span>
              </label>
            ))}
          </div>


          {/* Cities Filter */}
          <div>
            <h4 className="text-md font-semibold mb-1"> Cities </h4>
            <select 
                className="w-full focus:outline-none cursor-pointer text-md text-dark font-medium p-1.5 py-2.5 rounded border border-dark/10 "
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="all"> All Cities </option>
                <option value="lagos-m"> Lagos - Mainland </option>
                <option value="lagos-i"> lagos - Island </option>
                <option value="london"> London </option>
                <option value="dubai"> Dubai </option>
                <option value="shanghai"> Shanghai </option>
              </select>
          </div>


          {/* Bedrooms Filter */}
          <div>
            <h4 className="text-md font-semibold mb-1"> Bedrooms </h4>
            <div className='flex items-center flex-wrap space-x-4'>

            {["1", "2", "3","4 and more"].map(bedroom => (
              <label key={bedroom} className="flex items-center space-x-1.5 cursor-pointer group text-md">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(bedroom)}
                  onChange={() => handleTypeToggle(bedroom)}
                  className="w-4 h-4 text-dark rounded cursor-pointer"
                  />
                <span className="text-gray-700 group-hover:text-dark transition-colors">{bedroom}</span>
              </label>
            ))}
            </div>
          </div>


          {/* Bathrooms Filter */}
          <div>
            <h4 className="text-md font-semibold mb-1"> Bathrooms </h4>
            <div className='flex items-center flex-wrap space-x-4'>

            {["Any", "Combined", "Separate"].map(bathroom => (
              <label key={bathroom} className="flex items-center space-x-1.5 cursor-pointer group text-md">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(bathroom)}
                  onChange={() => handleTypeToggle(bathroom)}
                  className="w-4 h-4 text-dark rounded cursor-pointer"
                  />
                <span className="text-gray-700 group-hover:text-dark transition-colors">{bathroom}</span>
              </label>
            ))}
            </div>
          </div>


          {/* Filter Buttons */}
          <div className="flex items-center flex-wrap gap-3 mt-8">
            <button 
              className="btn flex-1 text-nowrap" 
              onClick={() => setShowFilter(false)}
            >
              Apply Filters
            </button>
            <button 
              className="btn-tertiary flex-1" 
              onClick={resetFilters}
            >
              Reset
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-full md:w-3/4 h-fit p-4 pb-8 px-0 md:px-6 space-y-4">
        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search */}
          <div className='w-full flex items-center justify-between gap-3'>
            <input type='search' placeholder='Enter Keyword..' className='py-1.5 px-3 border border-dark/10 focus:border-dark w-full rounded placeholder:text-sm' />
            <button type='button' className='btn py-1.5 border-0 px-4 w-fit'> Search </button>
          </div>

          <div className='w-full flex items-center justify-between sm:justify-end gap-2'>
            {/* Sort */}
            <div className="text-dark/80 flex items-center gap-1">
              {/* Sort By */}
              <select 
                className="focus:outline-none cursor-pointer text-sm text-dark/60 font-medium p-1.5 rounded border border-dark/10 "
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="price">Price - Low to High</option>
                <option value="price-desc">Price - High to Low</option>
                <option value="alphabet">Name - A to Z</option>
                <option value="alphabet-desc">Name - Z to A</option>
                <option value="date">Date - Oldest First</option>
                <option value="date-desc">Date - Newest First</option>
              </select>
            </div>

            {/* Layout */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowLayout("grid")}
                title="Grid Layout"
                className={`text-xl text-dark/50 p-1.5 border border-dark/10 hover:bg-dark/5 cursor-pointer rounded ${showLayout === "grid" ? "bg-dark/10 text-dark/100" : ""}`}
              >
                <FiGrid />
              </button>
              <button
                onClick={() => setShowLayout("list")}
                title="List Layout"
                className={`text-xl text-dark/50 p-1.5 border border-dark/10 hover:bg-dark/5 cursor-pointer rounded ${showLayout === "list" ? "bg-dark/10 text-dark/100" : ""}`}
              >
                <HiMiniListBullet />
              </button>
              <button
                onClick={toggleFilter}
                title='Filters'
                className="flex md:hidden items-center gap-2 p-1.5 text-xl text-dark/60 cursor-pointer hover:bg-dark/5 border border-dark/10 rounded"
              >
                {/* Filters  */}
                <MdOutlineFilterList />
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && <div className="text-center py-8">Loading properties...</div>}

        {/* Property Display */}
        {!loading && (
          <div className=''>
            {showLayout === "grid" ? (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-4">
                {filteredProperties.map(property => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {filteredProperties.map(property => (
                  <PropertyList key={property._id} property={property} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* No Results Message */}
        {!loading && filteredProperties.length === 0 && (
          <div className="text-center bg-light rounded-lg py-12">
            <div className="text-gray-500 text-xl mb-2"> No properties found </div>
            <p className="text-gray-400 text-sm"> Adjust your filters to see more results. </p>
            <button 
              onClick={resetFilters}
              className="btn w-fit mx-auto mt-4"
            >
              Reset All Filters
            </button>
          </div>
        )}

         {/* Pagination */}
        <div className='rounded-md text-center flex items-center justify-between'>
          <button className='btn-tertiary w-fit'> Previous </button>
          <span className='bg-light p-2.5 px-4 rounded-md'> Page 1 / 2 </span>
          <button className='btn-tertiary w-fit'> Next </button>
        </div>
      </main>
    </div>
  );
};

export default Explore;