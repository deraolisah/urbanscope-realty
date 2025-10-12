import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyCard from '../../components/PropertyCard';
import PropertyList from '../../components/PropertyList';
import { MdOutlineFilterList, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FiGrid } from "react-icons/fi";
import { HiMiniListBullet } from "react-icons/hi2";

const Explore = () => {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [priceFilter, setPriceFilter] = useState(600);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [showLayout, setShowLayout] = useState('grid');

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/properties`);
        // console.log(res.data);
        setProperties(res.data);
      } catch (err) {
        console.error("Failed to fetch properties:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const toggleFilter = () => setShowFilter(!showFilter);

  const handleTypeToggle = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const resetFilters = () => {
    setPriceFilter(600);
    setSelectedTypes([]);
  };

  const filteredProperties = properties.filter(p => {
    const matchesPrice = p.price <= priceFilter;
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(p.propertyType);
    return matchesPrice && matchesType;
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
      <aside className={`md:block w-full md:w-1/4 bg-white p-6 shadow-md left-0 md:relative fixed z-2 bottom-0 md:opacity-100 md:translate-y-0 md:pointer-events-auto transition-all duration-400 ${showFilter ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-20 pointer-events-none"}`}>
        <div className="sticky top-20">
          <h2 className="text-xl font-bold mb-4">Filter Properties ({properties.length})</h2>

          {/* Price Filter */}
          <div>
            <label className="block font-semibold mb-2">Price: ${priceFilter}</label>
            <input
              type="range"
              min="400"
              max="1000"
              value={priceFilter}
              onChange={(e) => setPriceFilter(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Type Filter */}
          <div className="flex flex-col items-start mt-4">
            <h4 className="font-semibold mb-2">Real Estate Type</h4>
            {["House", "Apartment", "Land"].map(type => (
              <label key={type} className="space-x-2 mb-1">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => handleTypeToggle(type)}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-2 mt-4">
            <button className="btn" onClick={() => setShowFilter(false)}>Apply</button>
            <button className="btn-tertiary" onClick={resetFilters}>Reset</button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-full md:w-3/4 h-fit p-4 pb-6 px-0 md:px-6">
        {/* Header Controls */}
        <div className="mb-4 flex items-center justify-between">
          <div className="text-dark/80 flex items-center gap-1">
            Sort by
            <span className="text-dark font-medium inline-flex items-center space-x-1 cursor-pointer">
              <select className="cursor-pointer">
                <option value="price">Price</option>
                <option value="alphabet">Alphabet</option>
              </select>
              <MdOutlineKeyboardArrowDown className="flex sm:hidden" />
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowLayout("grid")}
              title="Grid Layout"
              className={`text-xl p-1 border border-dark/5 hover:bg-dark/5 cursor-pointer ${showLayout === "grid" ? "bg-dark/10" : ""}`}
            >
              <FiGrid />
            </button>
            <button
              onClick={() => setShowLayout("list")}
              title="List Layout"
              className={`text-xl p-1 border border-dark/5 hover:bg-dark/5 cursor-pointer ${showLayout === "list" ? "bg-dark/10" : ""}`}
            >
              <HiMiniListBullet />
            </button>
            <button
              onClick={toggleFilter}
              className="flex md:hidden items-center gap-1 text-base cursor-pointer hover:bg-dark/5 p-0.5 px-2 border border-dark/5"
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
      </main>
    </div>
  );
};

export default Explore;