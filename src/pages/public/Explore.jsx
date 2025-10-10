import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyCard from '../../components/PropertyCard';
import PropertyList from '../../components/PropertyList';
import { MdOutlineFilterList } from "react-icons/md";
import { FiGrid } from "react-icons/fi";
import { HiMiniListBullet } from "react-icons/hi2";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const Explore = () => {
  const [ loading, setLoading ] = useState(true);
  const [ properties, setProperties ] = useState([]);
  const [ priceFilter, setPriceFilter ] = useState(600);

  const [ showFilter, setShowFilter ] = useState(false);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  }

  const [ showLayout, setShowLayout ] = useState('grid');

  useEffect(() => {
    setLoading(false);
    axios.get('http://localhost:5000/api/properties')
      .then(res => setProperties(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100 relative container md:!p-0">
      {showFilter && <div onClick={() => setShowFilter(false)} className='cursor-pointer fixed z-1 inset-0 bg-dark/80 backdrop-blur-xs'></div>}
      <aside className={`md:block w-full md:w-1/4 bg-white p-6 shadow-md left-0 md:relative fixed z-2 bottom-0 md:opacity-100 md:translate-y-0 md:pointer-events-auto transition-all duration-400 ${showFilter ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-20 pointer-events-none"}`}>
        <div className='sticky top-20'>
          <h2 className="text-xl font-bold mb-4"> Filter Properties ({ properties.length }) </h2>
          <div>
            <label className="block font-semibold mb-2">  Price: ${priceFilter}</label>
            <input
              type="range"
              min="400"
              max="1000"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="w-full"
              />
          </div>
          <div className='flex flex-col items-start'>
            <h4 className='font-semibold mb-2'> Real Estate Type </h4>
            <label htmlFor='houses' className='space-x-2 mb-1'>
              <input
                id='houses'
                type='checkbox'
                className=''
                />
              <span> Houses </span>
            </label>
            <label htmlFor='apartments' className='space-x-2 mb-1'>
              <input
                id='apartments'
                type='checkbox'
                className=''
                />
              <span> Apartments </span>
            </label>
            <label htmlFor='lands' className='space-x-2'>
              <input
                id='lands'
                type='checkbox'
                className=''
                />
              <span> Lands </span>
            </label>
          </div>

          <div className='flex items-center gap-2 mt-4'>
            <button className='btn'> Apply </button>
            <button className='btn-tertiary'> Reset </button>
          </div>
        </div>
      </aside>

      <main className="w-full md:w-3/4 h-fit p-4 px-0 md:px-6">
        <div className='mb-4 flex items-center justify-between'>
          <div className='text-dark/80 flex items-center gap-1'> 
            Sort by 
            <span className='text-dark font-medium inline-flex items-center space-x-1 cursor-pointer'> 
              <select  className='cursor-pointer'>
                <option value="Price"> Price </option>
                <option value="Price"> Alphabet </option>
              </select>
              <MdOutlineKeyboardArrowDown className='flex sm:hidden' />
            </span> 
          </div>

          <div className='flex items-center gap-2'>
            <button onClick={() => setShowLayout("grid")} title='Grid Layout' className={`text-xl p-1 border-1 border-dark/5 hover:bg-dark/5 cursor-pointer ' ${showLayout === "grid" ? "bg-dark/10" : ""}`}>
              <FiGrid /> 
            </button>
            <button onClick={() => setShowLayout("list")} title='List Layout' className={`text-xl p-1 border-1 border-dark/5 hover:bg-dark/5 cursor-pointer ' ${showLayout === "list" ? "bg-dark/10" : ""}`}> 
              <HiMiniListBullet /> 
            </button>
            <button onClick={toggleFilter} className='flex md:hidden items-center gap-1 text-base cursor-pointer hover:bg-dark/5 p-0.5 px-2 border border-dark/5'> 
              Filters <MdOutlineFilterList /> 
            </button>
          </div>
        </div>


        {showLayout === "grid" ? (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-4">
            {properties.filter(p => p.price <= priceFilter).map(property => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {properties.filter(p => p.price <= priceFilter).map(property => (
              <PropertyList key={property._id} property={property} />
            ))}
          </div>
        )}

        {/* {loading ? "Loading.." : showLayout === 'grid' ?
          ( <PropertyGrid property={property} /> ) 
          :
          ( <PropertyList property={property} /> )
        } */}

        {/* <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {properties.filter(p => p.price <= priceFilter).map((property) => (
            <div key={property._id} className="bg-light">
              <PropertyCard property={property} />
            </div>
          ))}
        </div> */}
      </main>
    </div>
  );
};

export default Explore;