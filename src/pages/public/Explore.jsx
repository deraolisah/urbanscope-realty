import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import PropertyCard from '../../components/PropertyCard';
import PropertyList from '../../components/PropertyList';
import { MdOutlineFilterList, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FiGrid } from "react-icons/fi";
import { HiMiniListBullet } from "react-icons/hi2";
import { PropertyContext } from '../../contexts/PropertyContext';

const Explore = () => {
  const [priceRange, setPriceRange] = useState({ min: 200, max: 760 });
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
    setPriceRange({ min: 200, max: 760 });
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
    <div className="flex min-h-screen bg-gray-100 relative container md:!p-0">
      {showFilter && (
        <div
          onClick={() => setShowFilter(false)}
          className="cursor-pointer fixed z-1 inset-0 bg-dark/80 backdrop-blur-xs"
        ></div>
      )}

      {/* Sidebar Filters */}
      <aside className={`md:block w-full md:w-1/4 bg-white p-6 pb-8 shadow-md left-0 md:sticky md:top-16 fixed h-100 md:min-h-screen md:h-full overflow-y-auto md:overflow-y-visible rounded-t-2xl md:rounded-t-none z-2 bottom-0 md:opacity-100 md:translate-y-0 md:pointer-events-auto transition-all duration-400 ${showFilter ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-20 pointer-events-none"}`}>
        <div className="sticky top-20 space-y-8">
          <h2 className="text-xl font-extrabold">
            Filter Properties <span className='font-normal text-base'> ({filteredProperties.length} results) </span>
          </h2>

          {/* Price Filter - Dual Range */}
          <div className="space-y-2">
            <h4 className="font-semiboldbold"> Price </h4>

            {/* Dual Range Slider Container */}
            <div className="relative">
              {/* Track */}
              <div className="h-1 bg-gray-300 rounded-full absolute top-1/2 left-0 right-0 -translate-y-1/2"></div>
              
              {/* Active Range */}
              <div 
                className="h-1 bg-dark rounded-full absolute top-1/2 -translate-y-1/2"
                style={{
                  left: `${((priceRange.min - 100) / 900) * 100}%`,
                  right: `${100 - ((priceRange.max - 100) / 900) * 100}%`
                }}
              ></div>

              {/* Min Price Slider */}
              <input
                type="range"
                min="100"
                max="1000"
                value={priceRange.min}
                onChange={handleMinPriceChange}
                className="absolute top-1/2 left-0 right-0 w-full h-1 -translate-y-1/2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-dark [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
              />

              {/* Max Price Slider */}
              <input
                type="range"
                min="100"
                max="1000"
                value={priceRange.max}
                onChange={handleMaxPriceChange}
                className="absolute top-1/2 left-0 right-0 w-full h-1 -translate-y-1/2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-dark [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
              />
            </div>

            {/* Price Display */}
            <div className="flex justify-between items-center mt-6">
              <div className="text-start px-2 py-1 w-full border border-dark/10" contentEditable={true}>
                {/* <span className="text-sm text-gray-600">Min Price</span> */}
                <div className="font-semibold text-lg">${priceRange.min}</div>
              </div>
              <div className="text-dark/80 mx-3"> - </div>
              <div className="text-start px-2 py-1 w-full border border-dark/10">
                {/* <span className="text-sm text-gray-600">Max Price</span> */}
                <div className="font-semibold text-lg">${priceRange.max}</div>
              </div>
            </div>

            {/* Price Labels */}
            {/* <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>$100</span>
              <span>$1000</span>
            </div> */}
          </div>

          {/* Type Filter */}
          <div className="flex flex-col items-start">
            <h4 className="font-semibold mb-2">Real Estate Type</h4>
            {["House", "Apartment", "Land"].map(type => (
              <label key={type} className="flex items-center space-x-3 mb-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => handleTypeToggle(type)}
                  className="w-4 h-4 text-dark border-gray-300 rounded focus:ring-dark cursor-pointer"
                />
                <span className="text-gray-700 group-hover:text-dark transition-colors">{type}</span>
              </label>
            ))}
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-3 mt-8">
            <button 
              className="btn flex-1" 
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
      <main className="w-full md:w-3/4 h-fit p-4 pb-6 px-0 md:px-6">
        {/* Header Controls */}
        <div className="mb-4 flex items-center justify-between">
          <div className="text-dark/80 flex items-center gap-0">
            Sort by
            <span className="text-dark font-medium inline-flex items-center cursor-pointer">
              <select 
                className="cursor-pointer text-sm focus:outline-none"
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="price">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="alphabet">Name: A to Z</option>
                <option value="alphabet-desc">Name: Z to A</option>
                <option value="date">Date: Oldest First</option>
                <option value="date-desc">Date: Newest First</option>
              </select>
              <MdOutlineKeyboardArrowDown className="flex sm:hidden" />
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowLayout("grid")}
              title="Grid Layout"
              className={`text-xl text-dark/50 p-1 border border-dark/5 hover:bg-dark/5 cursor-pointer rounded ${showLayout === "grid" ? "bg-dark/10 text-dark/100" : ""}`}
            >
              <FiGrid />
            </button>
            <button
              onClick={() => setShowLayout("list")}
              title="List Layout"
              className={`text-xl text-dark/50 p-1 border border-dark/5 hover:bg-dark/5 cursor-pointer rounded ${showLayout === "list" ? "bg-dark/10 text-dark/100" : ""}`}
            >
              <HiMiniListBullet />
            </button>
            <button
              onClick={toggleFilter}
              className="flex md:hidden items-center gap-2 text-sm cursor-pointer hover:bg-dark/5 py-1 px-2 border border-dark/5 rounded"
            >
              Filters <MdOutlineFilterList />
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && <div className="text-center py-8">Loading properties...</div>}

        {/* Property Display */}
        {!loading && (
          showLayout === "grid" ? (
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
          )
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
      </main>
    </div>
  );
};

export default Explore;