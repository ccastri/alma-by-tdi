import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sliderItems = [
  {'imgBg':"aesthetic_col_1.png", "img":'PhotoRoom_20230811_172356_big_no_bg.png'},
  {'imgBg':"aesthetic_col_2.png", "img":'PhotoRoom_20230811_171642_big_no_bg.png'},
  {'imgBg':"", "img":'PhotoRoom_20230811_172032.png'},
  {'imgBg':"", "img":'PhotoRoom_20230811_172055.png'},
  // {'imgBg':"", "img":'PhotoRoom_20230811_172118.png'},
  // {'imgBg':"", "img":'PhotoRoom_20230811_172423.png'},
  // {'imgBg':"", "img":'PhotoRoom_20230811_171700.png'},
  // {'imgBg':"", "img":'PhotoRoom_20230811_172447.png'}
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


  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="w-screen top-0 h-screen md:h-full rounded-md space-x-8 flex flex-col">
      <div
        ref={sliderRef}
        className="h-auto w-screen  flex rounded-md "
      >
        <AnimatePresence>

        {sliderItems.map((slide, index) => (
          <motion.div
            className="relative flex h-auto justify-center duration-200 transition-all ease-in-out w-auto md:h-screen rounded-md"
            key={index}
            initial={{ opacity: 0 }}
              animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
              exit={{ opacity: 0 }}
          //      style={{
          // backgroundImage: `url(${slide.imgBg})`, // Establece el valor de imgBg como fondo
          // backgroundSize: 'cover', // Ajusta el tamaño de fondo según sea necesario
          // backgroundRepeat: 'no-repeat', // Evita la repetición del fondo
          // backgroundColor: '#F6EEE6', // Color de fondo de respaldo
        // }}
      >
            {/* Use conditional rendering to display the current image */}
            <img
              className="relative w-screen h-screen cursor-pointer"
              src={`/${slide.imgBg}`}
              alt={`Image ${index}`}
              style={{ display: index === currentImageIndex ? 'block' : 'none' }}
            />
            <img
              className="w-auto xs:w-screen absolute h-screen cursor-pointer "
              src={`/${slide.img}`}
              alt={`Image ${index}`}
              style={{ display: index === currentImageIndex ? 'block' : 'none' }}
            />
          </motion.div>
        ))}
        </AnimatePresence>
      </div>
      <div className=" absolute  pb-8 w-screen  flex justify-center h-screen items-end space-x-6">
        {sliderItems.map((_, index) => (
          <motion.div
            key={index}
            className={`w-3 h-3 rounded-full bg-gray-400 hover:scale-105 hover:bg-[#fafafa]  duration-200 transition-all hover:ease-in-out cursor-pointer ${
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
