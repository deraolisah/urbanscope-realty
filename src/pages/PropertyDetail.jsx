// import React from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { FiArrowLeft, FiCheck, FiMail } from 'react-icons/fi';
// import picture1 from "../assets/1.png";
// import picture2 from "../assets/2.png";
// import picture3 from "../assets/3.png";
// import "./PropertyDetail.css";
// import { GrLocation } from "react-icons/gr";

// const PropertyDetail = () => {
//   const { id } = useParams();

//   // Mock property data
//   const property = {
//     id: 1,
//     title: "GRANDVIEW REALTY",
//     location: "Lujiabang Road, No. 1054",
//     price: 512,
//     size: "74",
//     bedrooms: 3,
//     bathrooms: 3,
//     floor: 16,
//     agent: "Maddie Molina",
//     description: "Discover your ideal urban retreat in this stunning 2-bedroom, 2-bathroom apartment, perfectly situated in the vibrant heart of downtown.",
//     amenities: [
//       "Equipped kitchen",
//       "Wi-Fi",
//       "Lake view",
//       "Free parking",
//       "Swimming pool",
//       "Light",
//       "Air conditioning",
//       "Gym"
//     ],
//     images: [
//       picture2,
//       picture1,
//       picture3,
//       picture1, // Add one more image for the 4-grid layout
//     ]
//   };

//   return (
//     <div className="container py-4 space-y-8">
//       {/* Back button */}
//       <Link to="/" className="absolute z-2 ml-2 mt-2 text-sm btn-secondary bg-light/80 hover:bg-light">
//         <FiArrowLeft className="mr-2" />
//         Go back
//       </Link>

//       {/* Property images with custom grid layout */}
//       <div className="property-images-grid">
//         <div className="grid-item-1">
//           <img
//             src={property.images[0]}
//             alt="Property main view"
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <div className="grid-item-2">
//           <img
//             src={property.images[1]}
//             alt="Property bedroom"
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <div className="grid-item-3">
//           <img
//             src={property.images[2]}
//             alt="Property kitchen"
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <div className="grid-item-4">
//           <img
//             src={property.images[3]}
//             alt="Property bathroom"
//             className="w-full h-full object-cover"
//           />
//         </div>
//       </div>
//       <button className='block md:hidden btn-tertiary'> more </button>

//       {/* Rest of your component remains the same */}
//       <div className='grid md:grid-cols-2 gap-4 space-y-4'>
//         <div className="flex flex-col items-start gap-4">
//           {/* <h1 className="text-4xl font-bold mb-2">{property.title}</h1> */}
//           <p className="text-lg flex items-center gap-1"> <GrLocation /> {property.location} </p>
//           <h3 className="text-4xl font-extrabold"> 
//             ${property.price} 
//             <span className='text-base font-normal text-dark/80'> /month </span>
//           </h3>
//           <span className="cursor-pointer font-semibold underline">Pricing details and terms</span>
       

//           {/* Property specs */}
//           <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-dark/5 border border-dark/5 rounded-sm">
//             <div className="text-center">
//               <div className="font-semibold text-2xl"> {property.size}<span className='text-sm'> m² </span></div>
//             </div>
//             <div className="text-center">
//               <div className="font-semibold text-2xl">{property.bedrooms}<span className='text-sm'> beds </span></div>
//             </div>
//             <div className="text-center">
//               <div className="font-semibold text-2xl"> {property.bathrooms}<span className='text-sm'> baths </span></div>
//             </div>
//             <div className="text-center">
//               <div className="font-semibold text-2xl"> {property.floor}<span className='text-sm'> floor </span></div>
//             </div>
//           </div>

//           {/* Agent info */}
//           <div className="w-full flex items-center justify-between gap-3 md:gap-4">
//             <button className='btn-tertiary'>
//               {/* <img src='' className='rounded-full w-5 h-5 bg-dark/80 inline-flex' /> */}
//               <span className="text-gray-600">Agent:</span>
//               <span className="font-semibold"> {property.agent} </span>
//             </button>
//             <button className="btn">
//               {/* <FiMail className="mr-2" /> */}
//               Send a request
//             </button>
//           </div>
//         </div>

//         {/* About apartment */}
//         <div className="flex flex-col items-start gap-4">
//           <div>
//             <h2 className="text-2xl font-bold mb-2">About apartment</h2>
//             <p className="text-lg leading-relaxed mb-2">
//               {property.description}
//             </p>
//             <button className="font-semibold underline cursor-pointer">
//               Full description
//             </button>
//           </div>

//           {/* Amenities */}
//           <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
//             {property.amenities.map((amenity, index) => (
//               <div key={index} className="flex items-center">
//                 <FiCheck className="text-green-500 mr-2" />
//                 <span>{amenity}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertyDetail;


import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { FiArrowLeft, FiCheck, FiMail } from 'react-icons/fi';
import { HiMiniChevronLeft, HiOutlineHeart, HiMiniShare } from "react-icons/hi2";
import { GrLocation } from "react-icons/gr";
import { PropertyContext } from "../contexts/PropertyContext";
import "./PropertyDetail.css";

const PropertyDetail = () => {
  const { id } = useParams();
  const { properties, loading } = useContext(PropertyContext);

  const property = properties.find(p => p._id === id);

  if (loading) return <div className="container py-4">Loading...</div>;
  if (!property) return <div className="container py-4">Property not found</div>;

  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <div className="container py-4 space-y-8">
      {/* Back button */}
      <button onClick={() => window.history.back()} className="absolute z-2 ml-2 mt-2 text-sm btn-secondary bg-light/80 hover:bg-light">
        <HiMiniChevronLeft className='text-lg' />
        Go back
      </button>

      {/* Property images */}
      <div className="property-images-grid">
        {property.images.slice(0, 4).map((img, index) => (
          <div key={index} className={`grid-item-${index + 1}`}>
            <img src={img} alt={`Property ${index}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      <button className='block md:hidden btn-tertiary'> more </button>

      {/* Property details */}
      <div className='grid md:grid-cols-2 gap-4 space-y-4'>
        <div className="flex flex-col items-start gap-1.5">
          <h3 className='text-xl font-extrabold uppercase'> {property.title} </h3>
          <p className="text-lg font-normal flex items-center gap-1"> <GrLocation /> {property.location} </p>
          <h3 className="text-4xl font-extrabold mt-4">
            ${property.price}
            <span className='text-base font-normal text-dark/80'> /month </span>
          </h3>
          <span className="cursor-pointer font-semibold underline">Pricing details and terms</span>

          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-dark/5 border border-dark/5 rounded-sm mt-4">
            <div className="text-center"><div className="font-semibold text-2xl">{property.size}<span className='text-sm'> m² </span></div></div>
            <div className="text-center"><div className="font-semibold text-2xl">{property.bedrooms}<span className='text-sm'> beds </span></div></div>
            <div className="text-center"><div className="font-semibold text-2xl">{property.bathrooms}<span className='text-sm'> baths </span></div></div>
            <div className="text-center"><div className="font-semibold text-2xl">{property.floor}<span className='text-sm'> floor </span></div></div>
          </div>

          <div className="w-full flex items-center justify-between gap-1.5">
            <button className='btn-tertiary truncate' title={property.agent}>
              <span className="text-gray-600">Agent:</span>
              <span className="font-semibold overflow-hidden truncate"> {property.agent} </span>
            </button>
            <button className="btn text-nowrap">Send a request</button>
          </div>
        </div>

        <div className="flex flex-col items-start gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-1"> About {property.propertyType} </h2>
            <p className="text-lg leading-relaxed mb-2">
              {showFullDescription
                ? property.description
                : property.description.slice(0, 130) + ".."}
            </p>
           {property.description.length > 130 && (
              <button
                onClick={() => setShowFullDescription(prev => !prev)}
                className="font-semibold underline cursor-pointer"
              >
                {showFullDescription ? "Show less" : "Full description"}
              </button>
            )}
          </div>

          <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4 mt-2 md:mt-6">
            {property.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center">
                <FiCheck className="text-green-500 mr-2" />
                <span>{amenity}</span>
              </div>
            ))}
          </div>

          <div className='flex gap-1.5 mt-2'>
            <button className='btn-tertiary'> <HiOutlineHeart /> Save </button>
            <button className='btn-tertiary'> <HiMiniShare /> Share </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;