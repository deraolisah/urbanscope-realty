// import React from 'react';
// import { Link } from 'react-router-dom';
// import PropertyCard from './PropertyCard.jsx';
// import propertyImg1 from "../assets/hero-img.png";
// import propertyImg2 from "../assets/hero-img-2.png";
// import propertyImg3 from "../assets/hero-img-3.png";
// import propertyImg4 from "../assets/hero-img.png";

// const FeaturedProperties = () => {
//   const featuredProperties = [
//     {
//       id: 1,
//       title: "GRANDWEST",
//       apartments: "4 apartments",
//       location: "Private Disable Road, No. 108",
//       description: "Square - 1 bedroom - 2 floor",
//       price: 450,
//       image: propertyImg2
//     },
//     {
//       id: 2,
//       title: "SED2",
//       location: "Lightroom General Road, No. 1044",
//       description: "Square - 1 bedroom - 2 floor",
//       price: 380,
//       image: propertyImg1
//     }
//   ];

//   const newProperties = [
//     {
//       id: 3,
//       title: "SAT9",
//       location: "Private Disable Road, No. 108",
//       description: "Square - 1 bedroom - 2 floor",
//       price: 520,
//       image: propertyImg2
//     }
//   ];

//   return (
//     <section className="container py-8 md:py-12">
//       {/* Featured Properties Section */}
//       <div className="mb-12">
//         <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center leading-tight uppercase"> 
//           Featured Properties 
//         </h2>
//         {/* <p className='text-center'> 4 properties </p> */}

//         {featuredProperties.map((property, index) => (
//           <div key={property.id} className="">
//             {/* {property.apartments && (
//               <span className="text-gray-600 text-center">{property.apartments}</span>
//             )} */}
//             {/* <div className="flex justify-between items-center mb-4">
//               {/* <h2 className="font-bold text-2xl">{property.title}</h2> 
//             </div> */}
//             <PropertyCard property={property} />
//           </div>
//         ))}
//       </div>

//       {/* New in your town Section */}
//       <div className="mb-12">
//         <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold  text-center leading-tight uppercase">
//           New in Town
//         </h2>
//         {newProperties.map((property) => (
//           <div key={property.id} className="">
//             <PropertyCard property={property} showMore={true} />
//           </div>
//         ))}
//       </div>

//       {/* About Apartment Section */}
//       <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
//         <h2 className="font-bold text-2xl mb-4">About apartment</h2>
//         <p className="text-gray-700 text-lg leading-relaxed">
//           Discover your ideal urban retreat in this stunning 3 bedroom, 2-bathroom apartment, 
//           perfectly situated in the vibrant heart of downtown. Experience modern living with 
//           luxurious amenities and convenient access to city life.
//         </p>
//       </div>
//     </section>
//   );
// };

// export default FeaturedProperties;


import React, { useContext } from 'react';
import { PropertyContext } from '../contexts/PropertyContext';
import PropertyPreview from './PropertyPreview';

const FeaturedProperties = () => {
  const { properties, loading } = useContext(PropertyContext);

  if (loading) return <div className="container py-8">Loading properties...</div>;

  // You can filter featured or new properties if needed
  const featuredProperties = properties.filter(p => p.featured);
  const newProperties = properties.filter(p => !p.featured);

  return (
    <section className="container py-8 md:py-12">
      {/* Featured Properties Section */}
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center leading-tight uppercase mb-4 md:mb-8">
          Featured Properties
        </h2>
        {featuredProperties.map(property => (
          <div key={property._id}>
            <PropertyPreview property={property} />
            <hr className='my-12 border-dark/20' />
          </div>
        ))}
      </div>


      {/* New in Town Section */}
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center leading-tight uppercase mb-4 md:mb-8">
          New in Town
        </h2>
        {newProperties.map(property => (
          <div key={property._id}>
            <PropertyPreview property={property} showMore={true} />
            <hr className='my-12 border-dark/20' />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProperties;