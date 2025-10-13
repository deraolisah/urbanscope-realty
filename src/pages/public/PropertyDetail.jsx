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
import { AiOutlinePicture } from "react-icons/ai";
import { HiMiniChevronLeft, HiOutlineHeart, HiMiniShare } from "react-icons/hi2";
import { GrLocation } from "react-icons/gr";
import { PropertyContext } from "../../contexts/PropertyContext";
import "./PropertyDetail.css";

const PropertyDetail = () => {
  const [ pricing, setPricing ] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const { id } = useParams();
  const { properties, loading } = useContext(PropertyContext);
  
  const property = properties.find(p => p._id === id);

  if (loading) return <div className="container py-4">Loading...</div>;
  if (!property) return <div className="container py-4">Property not found</div>;




  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => setIsLightboxOpen(false);

  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % property.images.length);
  }

  const prevImage = () => {
    setCurrentImageIndex((currentImageIndex - 1 + property.images.length) % property.images.length);
  }


  const togglePricing = () => {
    setPricing(!pricing);
 }

  return (
    <div className="container py-4 space-y-8 relative">
      {/* Back button */}
      <button onClick={() => window.history.back()} className="absolute z-2 ml-2 mt-2 text-sm btn-secondary bg-light/90 hover:bg-light">
        <HiMiniChevronLeft className='text-lg' />
        Go back
      </button>

      {/* Property images */}
      <div className={`property-images-grid relative rounded-md ${property.images.length < 4 ? "bg-dark/5" : "" }`}>
        {property.images.slice(0, 4).map((img, index) => (
          <div key={index} className={`grid-item-${index + 1}`}>
            {/* <img src={img} alt={`Property ${index}`} className="w-full h-full object-cover" /> */}
            <img src={img} alt={`Property ${index}`} className="w-full h-full object-cover cursor-pointer" onClick={() => openLightbox(index)} />
          </div>
        ))}
        {property.images.length > 3 && (
          <button className='flex items-center gap-1 absolute bottom-0 md:bottom-2 right-2 btn-tertiary py-1.5 w-fit cursor-pointer pointer-events-none rounded-full text-sm' onClick={() => openLightbox(index)}> 
            <AiOutlinePicture />
            More 
          </button>
        )}
      </div>

      {isLightboxOpen && (
        <div className="fixed w-full h-full top-0 left-0 bg-dark/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
          <button
            className="absolute top-4 right-4 text-white text-4xl cursor-pointer"
            onClick={closeLightbox}
          >
            &times;
          </button>

          <div className="relative max-w-3xl mx-auto w-full max-h-[80%] px-4">
            <img
              src={property.images[currentImageIndex]}
              alt={`Slide ${currentImageIndex + 1}`}
              className="rounded-lg w-full h-full object-cover"
            />
            <div
              className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-3xl cursor-pointer"
              onClick={prevImage}
            >
              &#10094;
            </div>
            <div
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-3xl cursor-pointer"
              onClick={nextImage}
            >
              &#10095;
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mt-4">
            {property.images.map((_, index) => (
              <span
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300 ${
                  currentImageIndex === index ? 'bg-white scale-125' : 'bg-light/80 hover:bg-light'
                }`}
              ></span>
            ))}
          </div>
          <p className="text-white mt-2 text-sm">
            {currentImageIndex + 1} / {property.images.length}
          </p>
        </div>
      )}

     

      {/* Property details */}
      <div className='grid md:grid-cols-2 gap-4 space-y-8 pb-4'>
        <div className="flex flex-col items-start gap-1.5">
          <h3 className='text-xl font-extrabold uppercase'> {property.title} </h3>
          <p className="text-lg font-normal flex items-center gap-1"> <GrLocation /> {property.location} </p>
          <h3 className="text-4xl font-extrabold mt-4">
            ${property.price}
            <span className='text-base font-normal text-dark/80'> /month, available for <span className='text-blue-600 lowercase'>{property?.propertyTransaction} </span></span>
          </h3>
          <button onClick={togglePricing} className="cursor-pointer font-semibold underline">Pricing details and terms</button>

          {pricing && (
            <div className='bg-dark/80 w-full h-full fixed z-50 top-0 left-0 flex items-center justify-center px-4'> 
              <div className='bg-light h-68 w-lg mx-auto shadow-md rounded-sm p-6'>
                <div className='flex items-center justify-between'>
                  <h4 className='text-lg font-extrabold'> Pricing details </h4>
                  <button onClick={() => { setPricing(false)}} className='cursor-pointer hover:underline'> close </button>
                </div>
              </div>
            </div>
          )}

          <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-dark/5 border border-dark/5 rounded-sm mt-4">
            <div className="text-center">
              <div className="font-semibold text-2xl">
                {property.propertyType}
                <span className='text-sm font-normal mt-1 block'> Property Type </span>
              </div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-2xl">
                {property.size}m²
                <span className='text-sm font-normal mt-1 block'> Size </span>
              </div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-2xl">
                {property.bedrooms}
                <span className='text-sm font-normal mt-1 block'> Bedrooms </span>
              </div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-2xl">
                {property.bathrooms}
                <span className='text-sm font-normal mt-1 block'> Bathrooms </span>
              </div>
            </div>
            {/* <div className="text-center"><div className="font-semibold text-2xl">{property.size}<span className='text-sm'> m² </span></div></div>
            <div className="text-center"><div className="font-semibold text-2xl">{property.bedrooms}<span className='text-sm'> beds </span></div></div>
            <div className="text-center"><div className="font-semibold text-2xl">{property.bathrooms}<span className='text-sm'> baths </span></div></div>
            <div className="text-center"><div className="font-semibold text-2xl">{property.floor}<span className='text-sm'> floor </span></div></div> */}
          </div>

          <div className="w-full flex items-center justify-between gap-1.5">
            <button className='btn-tertiary gap-1 truncate' title={property.agentName}>
              <span className="text-gray-600">Agent:</span>
              <span className="font-semibold overflow-hidden truncate"> {property?.agentName || "Realtor"} </span>
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