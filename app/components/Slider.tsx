import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sliderItems = [
  'PhotoRoom_20230811_172356.png',
  'coleccion-1-HD.png',
  'PhotoRoom_20230811_172032.png',
  'PhotoRoom_20230811_172055.png',
  'PhotoRoom_20230811_172118.png',
  'PhotoRoom_20230811_172423.png',
  'PhotoRoom_20230811_171700.png',
  'PhotoRoom_20230811_172447.png',
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
    <div className="w-screen top-0 h-screen md:h-full rounded-md space-x-8 flex flex-col">
      <div
        ref={sliderRef}
        className="h-screen w-screen mx-auto flex rounded-md bg-[#F6EEE6]"
      >
        <AnimatePresence>

        {sliderItems.map((img, index) => (
          <motion.div
            className="flex h-auto justify-center duration-200 transition-all ease-in-out w-auto md:h-screen rounded-md"
            key={index}
            initial={{ opacity: 0 }}
              animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
              exit={{ opacity: 0 }}
          >
            {/* Use conditional rendering to display the current image */}
            <img
              className="w-screen h-auto cursor-pointer max-w-full"
              src={`/${img}`}
              alt={`Image ${index}`}
              style={{ display: index === currentImageIndex ? 'block' : 'none' }}
            />
          </motion.div>
        ))}
        </AnimatePresence>
      </div>
      <div className="my-4 flex justify-center h-20 items-center space-x-2">
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
