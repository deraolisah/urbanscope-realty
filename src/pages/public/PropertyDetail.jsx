import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FiCheck, FiMail, FiPlay } from 'react-icons/fi';
import { AiOutlinePicture } from "react-icons/ai";
import { HiMiniChevronLeft, HiOutlineHeart, HiMiniShare, HiHeart } from "react-icons/hi2";
import { GrLocation } from "react-icons/gr";
import { PropertyContext } from "../../contexts/PropertyContext";
import { FavoritesContext } from "../../contexts/FavoritesContext";
import "./PropertyDetail.css";

const PropertyDetail = () => {
  const [pricing, setPricing] = useState(false);
  const [agentDetails, setAgentDetails] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoThumbnail, setVideoThumbnail] = useState('');
  
  const { id } = useParams();
  const { properties, loading, getFormattedPrice } = useContext(PropertyContext);
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);
  
  const property = properties.find(p => p._id === id);
  const priceInfo = property ? getFormattedPrice(property) : null;

  const hasVideo = property?.videoUrl && property.videoUrl.trim() !== '';

  // Function to extract YouTube video ID
  const getYouTubeVideoId = (url) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : false;
  };

  // Function to extract Vimeo video ID
  const getVimeoVideoId = (url) => {
    const regExp = /(?:vimeo\.com\/|player\.vimeo\.com\/video\/)([0-9]+)/;
    const match = url.match(regExp);
    return match ? match[1] : false;
  };

  // Function to generate video thumbnail URL
  const generateVideoThumbnail = (videoUrl) => {
    if (!videoUrl) return '';

    // YouTube thumbnails
    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      const videoId = getYouTubeVideoId(videoUrl);
      if (videoId) {
        // Different quality options for YouTube thumbnails:
        // maxresdefault.jpg - Highest quality (might not always be available)
        // sddefault.jpg - Standard quality
        // hqdefault.jpg - High quality
        // mqdefault.jpg - Medium quality
        // default.jpg - Low quality
        
        // Try maxresdefault first, fallback to hqdefault
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      }
    }
    
    // Vimeo thumbnails
    if (videoUrl.includes('vimeo.com')) {
      const videoId = getVimeoVideoId(videoUrl);
      if (videoId) {
        // We'll need to fetch this from Vimeo's API, but for now return a placeholder
        // You can implement Vimeo API call if needed
        return `https://vumbnail.com/${videoId}.jpg`;
      }
    }
    
    // For direct video files or unsupported platforms, return the first property image
    return property?.images[0] || '';
  };

  // Function to check if thumbnail exists
  const checkThumbnailExists = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  };

  // Function to get best available YouTube thumbnail
  const getBestYouTubeThumbnail = async (videoId) => {
    const thumbnailQualities = [
      `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
      `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
      `https://img.youtube.com/vi/${videoId}/default.jpg`
    ];

    for (const thumbnailUrl of thumbnailQualities) {
      const exists = await checkThumbnailExists(thumbnailUrl);
      if (exists) {
        return thumbnailUrl;
      }
    }
    
    return thumbnailQualities[thumbnailQualities.length - 1]; // Return default as fallback
  };

  // Effect to generate and set video thumbnail
  useEffect(() => {
    const generateThumbnail = async () => {
      if (!hasVideo || !property?.videoUrl) {
        setVideoThumbnail(property?.images[0] || '');
        return;
      }

      try {
        const videoUrl = property.videoUrl;
        
        // If property already has a videoThumbnail, use it
        if (property.videoThumbnail) {
          setVideoThumbnail(property.videoThumbnail);
          return;
        }

        // YouTube videos
        if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
          const videoId = getYouTubeVideoId(videoUrl);
          if (videoId) {
            const bestThumbnail = await getBestYouTubeThumbnail(videoId);
            setVideoThumbnail(bestThumbnail);
          } else {
            setVideoThumbnail(property.images[0] || '');
          }
        }
        // Vimeo videos
        else if (videoUrl.includes('vimeo.com')) {
          const videoId = getVimeoVideoId(videoUrl);
          if (videoId) {
            // Using vumbnail.com service for Vimeo thumbnails
            setVideoThumbnail(`https://vumbnail.com/${videoId}.jpg`);
          } else {
            setVideoThumbnail(property.images[0] || '');
          }
        }
        // Direct video files or unsupported platforms
        else {
          setVideoThumbnail(property.images[0] || '');
        }
      } catch (error) {
        console.error('Error generating video thumbnail:', error);
        setVideoThumbnail(property?.images[0] || '');
      }
    };

    generateThumbnail();
  }, [property, hasVideo]);


  if (loading) return <div className="container py-4">Loading...</div>;
  if (!property) return <div className="container py-4">Property not found</div>;


  // Create combined media array (video + images)
  const mediaItems = [];
  if (hasVideo) {
    mediaItems.push({
      type: 'video',
      url: property.videoUrl,
      thumbnail: videoThumbnail
    });
  }

  // Add all images
  property.images.forEach(img => {
    mediaItems.push({
      type: 'image',
      url: img
    });
  });

  const totalMediaItems = mediaItems.length;
  
  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsLightboxOpen(true);
  };
  
  const closeLightbox = () => {
    setIsLightboxOpen(false);
  }
  
  const nextMedia = () => {
    setCurrentIndex((currentIndex + 1) % totalMediaItems);
  }
  
  const prevMedia = () => {
    setCurrentIndex((currentIndex - 1 + totalMediaItems) % totalMediaItems);
  }
  
  const togglePricing = () => {
    setPricing(!pricing);
  }
  
  const toggleAgentDetails = () => {
    setAgentDetails(!agentDetails);
  }
  
  // Handle favorite toggle
  const handleFavoriteToggle = async () => {
    await toggleFavorite(property._id);
  };

  // Function to get embed URL for different video platforms
  const getVideoEmbedUrl = (url) => {
    if (!url) return '';
    
    // YouTube
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = getYouTubeVideoId(url);
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      }
    }
    
    // Vimeo
    if (url.includes('vimeo.com')) {
      const videoId = getVimeoVideoId(url);
      if (videoId) {
        return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
      }
    }
    
    // Direct video URL (mp4, webm, etc.)
    if (url.match(/\.(mp4|webm|ogg)$/i)) {
      return url;
    }
    
    return url;
  }

  // Function to render lightbox content
  const renderLightboxContent = () => {
    const currentMedia = mediaItems[currentIndex];
    
    if (currentMedia.type === 'video') {
      return (
        <div className="relative w-full h-0 pb-[56.25%]"> {/* 16:9 aspect ratio */}
          <iframe
            src={getVideoEmbedUrl(currentMedia.url)}
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Property video tour"
          ></iframe>
        </div>
      );
    } else {
      return (
        <img
          src={currentMedia.url}
          alt={`Slide ${currentIndex + 1}`}
          className="rounded-lg w-full h-full object-cover max-h-[70vh]"
        />
      );
    }
  };

  return (
    <div className="container py-4 space-y-8 relative">
      {/* Back button */}
      <button onClick={() => window.history.back()} className="absolute z-2 ml-2 mt-2 text-sm btn-secondary bg-light/90 hover:bg-light">
        <HiMiniChevronLeft className='text-lg' />
        Go back
      </button>

      {/* Property images with video priority */}
      <div className={`property-images-grid relative rounded-md ${property.images.length < 4 ? "bg-dark/5" : "" }`}>
        {/* Video Thumbnail - Always first if video exists */}
        {hasVideo && (
          <div className="grid-item-1 relative group cursor-pointer" onClick={() => openLightbox(0)}>
            <img 
              src={videoThumbnail || null} 
              alt="Property video tour" 
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback if thumbnail fails to load
                e.target.src = property.images[0] || null;
              }}
            />
            <div className="absolute inset-0 bg-dark/40 flex items-center justify-center group-hover:bg-dark/50 transition-all duration-300">
              <div className="bg-white/90 rounded-full p-4 transform group-hover:scale-110 transition-transform duration-300">
                <FiPlay className="text-2xl text-dark ml-1" />
              </div>
            </div>
            <div className="absolute bottom-3 left-3 bg-dark text-white px-2 py-1 rounded text-sm font-semibold">
              Video Tour
            </div>
          </div>
        )}

        {/* Regular images - adjust starting index based on video presence */}
        {property.images.slice(0, hasVideo ? 3 : 4).map((img, index) => (
          <div 
            key={index} 
            className={`grid-item-${hasVideo ? index + 2 : index + 1}`}
          >
            <img 
              src={img} 
              alt={`Property ${index + 1}`} 
              className="w-full h-full object-cover cursor-pointer" 
              onClick={() => openLightbox(hasVideo ? index + 1 : index)} 
            />
          </div>
        ))}

        {/* Show "More" button if there are more media items than displayed */}
        {totalMediaItems > (hasVideo ? 4 : 4) && (
          <button 
            className='flex items-center gap-1 absolute z-4 bottom-0 md:bottom-2 right-2 btn-tertiary py-1.5 w-fit cursor-pointer pointer-events-none rounded-full text-sm' 
            onClick={() => openLightbox(hasVideo ? 4 : 4)}
          > 
            <AiOutlinePicture />
            More 
          </button>
        )}
      </div>

      {/* Combined Lightbox for Video and Images */}
      {isLightboxOpen && (
        <div className="fixed w-full h-full top-0 left-0 bg-dark/90 backdrop-blur-sm flex flex-col items-center justify-center z-50 p-4">
          <button
            className="absolute top-4 right-4 text-dark text-4xl cursor-pointer z-10 bg-light/70 rounded-full w-10 h-10 flex items-center justify-center hover:bg-light/80 transition-colors"
            onClick={closeLightbox}
          >
            &times;
          </button>

          <div className="relative max-w-4xl mx-auto w-full max-h-[80vh] px-4">
            {renderLightboxContent()}
            
            {/* Navigation arrows */}
            <button
              className="absolute w-10 h-10 top-1/2 left-0 transform -translate-y-1/2 text-dark bg-light rounded-full shadow text-xl flex items-center justify-center cursor-pointer hover:bg-light/90 transition-colors"
              onClick={prevMedia}
            >
              &#10094;
            </button>
            <button
              className="absolute w-10 h-10 top-1/2 right-0 transform -translate-y-1/2 text-dark bg-light rounded-full shadow text-xl flex items-center justify-center cursor-pointer hover:bg-light/90 transition-colors"
              onClick={nextMedia}
            >
              &#10095;
            </button>
          </div>

          {/* Media indicators */}
          <div className="flex items-center justify-center gap-3 mt-4">
            {mediaItems.map((media, index) => (
              <span
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                  currentIndex === index 
                    ? media.type === 'video' ? 'bg-blue-600 scale-125' : 'bg-white scale-125'
                    : 'bg-light/40 hover:bg-light'
                }`}
                title={media.type === 'video' ? 'Video Tour' : `Image ${index}`}
              ></span>
            ))}
          </div>

          {/* Media counter and type indicator */}
          <div className="text-white mt-2 text-center">
            <p className="text-sm">
              {currentIndex + 1} / {totalMediaItems}
            </p>
          </div>
        </div>
      )}

      {/* Property details */}
      <div className='grid md:grid-cols-2 gap-4 space-y-8 pb-4'>
        <div className="flex flex-col items-start gap-1.5">
        {/* Property Header with Transaction Badge */}
        {/* <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className='text-xl font-extrabold uppercase'> {property.title} </h3>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${priceInfo.badge}`}>
              For {priceInfo.transactionType}
            </span>
          </div>
        </div> */}
          <h3 className='text-xl font-extrabold uppercase'> {property.title} </h3>
          <p className="text-lg font-normal flex items-center gap-1"> <GrLocation /> {property.location} </p>
          {/* Updated Price Display */}
          <h3 className="text-4xl font-extrabold mt-4">
            {priceInfo.formatted}
            <span className='text-base font-normal text-dark/80'> 
              {priceInfo.description}
            </span>
          </h3>
          <button onClick={togglePricing} className="cursor-pointer font-semibold underline">Pricing details and terms</button>

          {pricing && (
            <div className='bg-dark/80 w-full h-full fixed z-50 top-0 left-0 flex items-center justify-center px-4'> 
              <div className='bg-light h-68 w-lg mx-auto shadow-md rounded-sm p-6 flex flex-col items-start justify-between'>
                <div className='w-full flex items-center justify-between'>
                  <h4 className='text-lg font-extrabold'> Pricing Details </h4>
                  <button onClick={() => { setPricing(false)}} className="cursor-pointer text-dark text-2xl font-bold bg-dark/5 w-8 h-8 rounded-full shadow flex items-center justify-center">
                    &times;
                  </button>
                </div>
                <hr className='w-full my-2 border-dark/20' />
                <div>
                  <p> <strong> Price: </strong> ₦{property?.price} </p>
                  <p> <strong> Inspection Fee: </strong> ₦{property?.price} </p>
                  <p> <strong> Contract: </strong> ₦{property?.price} </p>
                </div>
                <hr className='w-full my-2 border-dark/20' />
                <p className='text-sm'> ⚠️ Disclaimer: Price mentioned on property is not subject to any changes. </p>
              </div>
            </div>
          )}

          <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-dark/5 border border-dark/5 rounded-sm mt-4">
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
          </div>

          <div className="w-full flex flex-wrap sm:flex-nowrap items-center justify-between gap-1.5">
            <button className='btn-tertiary gap-1 truncate' title={property.agentName} onClick={toggleAgentDetails}>
              <span className="text-gray-600">Agent:</span>
              <span className="font-semibold overflow-hidden truncate"> {property?.agentName || "Realtor"} </span>
            </button>
            {agentDetails && (
              <div className='bg-dark/80 w-full h-full fixed z-50 top-0 left-0 flex items-center justify-center px-4'> 
                <div className='bg-light h-68 w-lg mx-auto shadow-md rounded-sm p-6 flex flex-col items-start justify-between'>
                  <div className='w-full flex items-center justify-between'>
                    <h4 className='text-lg font-extrabold'> Agent Details </h4>
                    <button onClick={() => { setAgentDetails(false)}} className="cursor-pointer text-dark text-2xl font-bold bg-dark/5 w-8 h-8 rounded-full shadow flex items-center justify-center">
                      &times;
                    </button>
                  </div>
                  <hr className='w-full my-2 border-dark/20' />
                  <div>
                    <p> <strong>Name: </strong> {property?.agentName} </p>
                    <p> <strong>Contact: </strong> {property?.agentNumber} </p>
                    <p> <strong>Email: </strong> {property?.agentEmail} </p>
                    <p> <strong>Social: </strong> {property?.social} </p>
                  </div>
                  <hr className='w-full my-2 border-dark/20' />
                  <p className='text-sm'> Trusted by 100's of satisfied clients. </p>
                </div>
              </div>
            )}

            <button className="btn">Send a request</button>
          </div>
        </div>

        <div className="flex flex-col items-start gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-1"> About {property.propertyType} </h2>
            <p className="md:text-lg leading-relaxed mb-2">
              {showFullDescription
                ? property.description
                : property.description.slice(0, 130) + ".."}
            </p>
           {property.description.length > 130 && (
              <button
                onClick={() => setShowFullDescription(prev => !prev)}
                className="font-semibold text-sm text-blue-600 underline cursor-pointer"
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
            <button 
              className={`btn-tertiary flex items-center gap-2 ${isFavorite(property._id) ? 'text-red-500' : ''}`}
              onClick={handleFavoriteToggle}
            >
              {isFavorite(property._id) ? <HiHeart className="text-red-500" /> : <HiOutlineHeart />}
              {isFavorite(property._id) ? 'Saved' : 'Save'}
            </button>
            <button className='btn-tertiary'> <HiMiniShare /> Share </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;