import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const comments = [
  {"name":"Sofía Gómez","title":"","body":"¡Alma by Tejidos es lo más! Las creaciones de Yuyu Molina son puro talento de la 'sucursal del cielo'."},
  {"name":"Valentina Rodríguez","title":"","body":"Soy fan de Alma by Tejidos desde los tiempos del MIO, pero sería bacano si pensaran en las tallas pa' todas las caleñas."},
  {"name":"Camila Pérez","title":"","body":"OMG, chicas, Alma by Tejidos es literalmente nuestra 'ropa de ir pa'l centro'. 😍"},
  {"name":"Isabella García","title":"","body":"Amigas, sé que todas amamos Alma by Tejidos, pero ¿no sería lo máximo si tuvieran una línea 'sporty'? Algo para nuestras tardes de patineta en el Bulevar del Río o nuestras clases de salsa en Escuela de Baile Cali Swing. Estoy segura de que Yuyu Molina lo haría genial. ¿Qué opinan, amigas?"},
  // Agrega más comentarios aquí
];

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % comments.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex w-full justify-center items-center py-4">
      <article className="md:w-full w-screen px-8 py-12 bg-[#ffdcea] md:px-44 py- flex-shrink-0">
        <div className="flex items-center ">
          <img
            className="w-10 h-10 rounded-full"
            src="/docs/images/people/profile-picture-5.jpg"
            alt=""
          />
        </div>
        <div className="flex items-center mb-1">
          <svg
            className="w-4 h-4 text-yellow-300 mr-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            {/* SVG path */}
          </svg>
          <svg
            className="w-4 h-4 text-yellow-300 mr-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            {/* SVG path */}
          </svg>
          <svg
            className="w-4 h-4 text-yellow-300 mr-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            {/* SVG path */}
          </svg>
          <svg
            className="w-4 h-4 text-yellow-300 mr-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            {/* SVG path */}
          </svg>
          <svg
            className="w-4 h-4 text-gray-300 dark:text-gray-500 mr-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            {/* SVG path */}
          </svg>
          <h3 className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
            {comments[currentIndex].title}
          </h3>
        </div>

        {/* Transition group for comment change animation */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-2 w-full flex flex-col text-gray-500 dark:text-gray-400"
          >
            <h4 className="pb-2">{comments[currentIndex].name}</h4>
            <span className="w-full md:w-auto max-w-64">{comments[currentIndex].body}</span>
          </motion.div>
        </AnimatePresence>
      </article>
    </div>
  );
};

export default Reviews;
