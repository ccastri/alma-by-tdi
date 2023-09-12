import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const sliderItems = [
  'PhotoRoom_20230811_171642.jpg',
  'PhotoRoom_20230811_171700.jpg',
  'PhotoRoom_20230811_172032.jpg',
  'PhotoRoom_20230811_172055.jpg',
  'PhotoRoom_20230811_172118.jpg',
  'PhotoRoom_20230811_172356.jpg',
  'PhotoRoom_20230811_172423.jpg',
  'PhotoRoom_20230811_172447.jpg',
];

const Slider = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Update the current image index to the next one, looping back to the start if necessary
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % sliderItems.length);
    }, 5000);

    // Clear the interval when the component unmounts to avoid memory leaks
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Scroll to the center of the current image
    if (sliderRef.current) {
      const scrollOffset = currentImageIndex * (sliderRef.current.offsetWidth + 44);
      sliderRef.current.scrollTo({
        left: scrollOffset,
        behavior: 'smooth', // Optional: Add smooth scrolling effect
      });
    }
  }, [currentImageIndex]);

  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="w-full h-screen rounded-md flex flex-col">
      <div
        ref={sliderRef}
        className="h-screen w-full mx-auto flex justify-center overflow-y-hidden scrollbar-track-transparent scrollbar-thin scrollbar-thumb-[#F6EEE6] scrollbar-thumb-rounded-md rounded-md bg-[#F6EEE6]"
      >
        {sliderItems.map((img, index) => (
          <div
            className="flex  items-center justify-center w-auto h-screen rounded-md"
            key={index}
          >
            {/* Use conditional rendering to display the current image */}
            <img
              className="w-auto   transform transition-all duration-200 ease-in-out hover:scale-105 cursor-grab max-h-screen object-cover"
              src={`/${img}`}
              alt={`Image ${index}`}
              style={{ display: index === currentImageIndex ? 'block' : 'none' }}
            />
          </div>
        ))}
      </div>
      <div className="my-4 flex justify-center space-x-2">
        {sliderItems.map((_, index) => (
          <motion.div
            key={index}
            className={`w-3 h-3 rounded-full bg-gray-400 cursor-pointer ${
              index === currentImageIndex ? 'bg-blue-500' : ''
            }`}
            onClick={() => handleDotClick(index)}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
