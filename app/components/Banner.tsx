import React, { useEffect, useState } from 'react'

const texts = [
'ENVIOS GRATIS POR COMPRAS MAYORES A $80.000.',
'PAGOS CONTRAENTREGA.',
'MODA FEMENINA.',
'ENTREGAS DE 3 A 8 DIAS.'
]
const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className=" sticky bg-[#fafafa]  h-auto w-full">
      <h1 className='text-center font-bold py-2'>{texts[currentIndex]}</h1>
    </div>
  )
}

export default Banner
