import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const comments = [
  {"img":'blazer-collage.jpg', "name":"Sofía Gómez","title":"","body":"¡Alma by Tejidos es lo más! Las creaciones de Yuyu Molina son puro talento de la 'sucursal del cielo'."},
  {"img":'PhotoRoom_20230811_172356.jpg', "name":"Valentina Rodríguez","title":"","body":"Soy fan de Alma by Tejidos desde los tiempos del MIO, pero sería bacano si pensaran en las tallas pa' todas las caleñas."},
  {"img":'PhotoRoom_20230811_172423.jpg', "name":"Camila Pérez","title":"","body":"OMG, chicas, Alma by Tejidos es literalmente nuestra 'ropa de ir pa'l centro'. 😍"},
  {"img":'PhotoRoom_20230811_172055.jpg', "name":"Isabella García","title":"","body":"Amigas, sé que todas amamos Alma by Tejidos, pero ¿no sería lo máximo si tuvieran una línea 'sporty'? Algo para nuestras tardes de patineta en el Bulevar del Río o nuestras clases de salsa en Escuela de Baile Cali Swing. Estoy segura de que Yuyu Molina lo haría genial. ¿Qué opinan, amigas?"},
  // Agrega más comentarios aquí
];

 
  

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % comments.length);
    }, 8000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex w-full justify-center items-center my-12">
      <article className="relative md:w-full w-screen px-8 my-12 space-y-4 bg-[#ffdcea]  py- flex-shrink-0">
        <div className="flex items-center h-64 w-full   justify-center ">
          <motion.img
            key={comments[currentIndex].img}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-auto h-full rounded pt-8"
            src={`/${comments[currentIndex].img}`}
            alt=""
          />
        </div>
        <div className="flex w-full h-auto justify-center items-center ">
            <svg className="w-4 h-4 text-black mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>
            <svg className="w-4 h-4 text-black mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>
            <svg className="w-4 h-4 text-black mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>
            <svg className="w-4 h-4 text-black mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>
        <svg className="w-4 h-4 text-black dark:text-gray-500 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>

          <h3 className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
            {comments[currentIndex].title}
          </h3>
        </div>

        {/* Transition group for comment change animation */}
        <AnimatePresence initial={false} mode='wait'>
          <motion.div
            key={comments[currentIndex].body}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-2 w-full flex flex-col text-gray-500 dark:text-gray-400"
          >
            <span className="w-full md:w-full text-xl text-center font-bold ">{comments[currentIndex].body}</span>
            <p className="pb-8 text-center w-full border-2">-{comments[currentIndex].name}</p>
          </motion.div>
        </AnimatePresence>
      </article>
    </div>
  );
};

export default Reviews;
