import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const comments = [
  {"img":'PhotoRoom_20230811_172118.png', "name":"Sofía Gómez","title":"","body":"¡Wow, 10/10 en esta experiencia! Como caleña, siempre he apreciado la belleza única de las mujeres de nuestra ciudad, y esta tienda realmente nos representa. Encontré ropa que no solo encaja perfectamente con mi estilo, sino que también me hace sentir poderosa y segura. ¡Gracias por destacar la autenticidad y la versatilidad de las mujeres caleñas a través de la moda!"},
  {"img":'PhotoRoom_20230811_172423.png', "name":"Valentina Rodríguez","title":"","body":"No puedo evitar sonreír cada vez que visito esta tienda. La moda es una forma de empoderamiento para mí, y esta tienda lo comprende completamente. Cada prenda aquí resalta la belleza auténtica de las mujeres caleñas. ¡La confianza y el sentido de pertenencia representados en una prenda!"},
  {"img":'PhotoRoom_20230811_171700.png', "name":"Camila Pérez","title":"","body":" Esta tienda va más allá al ofrecer ropa que no solo refleja nuestro excelente sentido de la moda, sino que también nos empodera. Comodidad en cada prenda, desarrollo social y generacion de empleo. ¡Son un ejemplo a seguir en el mundo empresarial de Cali! 😍"},
  // {"img":'PhotoRoom_20230811_172447.png', "name":"Isabella García","title":"","body":"Amigas, sé que todas amamos Alma by Tejidos, pero ¿no sería lo máximo si tuvieran una línea 'sporty'? Algo para nuestras tardes de patineta en el Bulevar del Río o nuestras clases de salsa en Escuela de Baile Cali Swing. Estoy segura de que Yuyu Molina lo haría genial. ¿Qué opinan, amigas?"},
  // Agrega más comentarios aquí
];


  
  

 
  

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % comments.length);
    }, 12000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex w-full h-auto md:screen pt-12 md:pt-0 md:justify-center md:items-center ">
      <article className="relative md:w-full w-screen px-8 space-y-4 md:items-center md:flex">
        <div className="flex md:items-center md:w-1/2 w-full   md:justify-center ">
          <motion.img
            key={comments[currentIndex].img}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-auto h-full "
            src={`/${comments[currentIndex].img}`}
            alt=""
          />
        </div>
        <div className='md:w-1/2 w-full h-full md:px-12 flex-col s   flex'>
          <h3 className="w-full text-sm font-light tracking-wider">ANDAN DICIENDO...</h3>
        <div className="flex w-full h-auto my-2 space-x-2    ">
            <svg className="w-3 h-3 text-black mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>
            <svg className="w-3 h-3 text-black mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>
            <svg className="w-3 h-3 text-black mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>
            <svg className="w-3 h-3 text-black mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>
        <svg className="w-3 h-3 text-black dark:text-gray-500 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>

          {/* <h3 className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
            {comments[currentIndex].title}
          </h3> */}
        </div>

        {/* Transition group for comment change animation */}
        <AnimatePresence initial={false} mode='wait'>
          <motion.div
            key={comments[currentIndex].body}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-2 w-full h-full flex flex-col text-slate-900 "
          >
            <p className="w-full  text-md font-light tracking-wide text-justify  ">{comments[currentIndex].body}</p>
            <p className="py-8 text-sm font-extralight w-full">- {comments[currentIndex].name}</p>
          </motion.div>
        </AnimatePresence>
            </div>
      </article>
    </div>
  );
};

export default Reviews;
