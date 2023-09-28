import React from 'react'

const Contact = () => {
  return (
    <div className='text-center h-auto mx-auto w-[80%] md:w-[60%]  relative pt-4 pb-10'>
      <div className="absolute w-full h-full my-auto mx-auto  flex items-center">
      <img className="m-auto opacity-30" src="/logo-remove.png" alt="" />
      </div>

      <h2 className="text-3xl font-semibold text-slate-700">Misión</h2>
      <br/>
      <br/>
      <p className="text-sm font-light">Resignificar la moda dándole un lugar a la belleza autentica y a la versatilidad de cada mujer
        como una forma de empoderamiento
      </p>
      <br/>
      <p className="text-sm font-light">Convitiendonos en una experiencia memorable a través de la excelencia, el amor y el compromiso puesto en
        el trabajo que hacemos en nuestra empresa, generando influencia positiva, promoviendo los suelos de 
        nuestros colaboradores y el desarrollo social de nuestra region, creando empleo, escalando nuestro negocio
        y fortaleciendo nuestro liderazgo empresarial
        
      </p>
      <br/>
      <br/>
      <br/>
      <h2 className="text-3xl font-semibold text-slate-700">Visión</h2>
      <br/>
      <br/>
       <p className="text-sm font-light">Conquistar un lugar relevante en el mercado nacional e
       internacional de nuestra categoría, destacandonos por:
      </p>
      <br/>
      <p className="text-sm font-light">Ser una marca con proposito <br/>
      Ser una empresa sólida y competitiva <br/>
      Tener una oferta innovadora, versátil y con sentido social
        
      </p>
      {/* <img src="/bg_trial.jpg" alt="" /> */}
    </div>
  )
}

export default Contact
