import {motion} from 'framer-motion'
const sliderItems:string[] = [
'PhotoRoom_20230811_171642.jpg',
'PhotoRoom_20230811_171700.jpg',
'PhotoRoom_20230811_172032.jpg',
'PhotoRoom_20230811_172055.jpg',
'PhotoRoom_20230811_172118.jpg',
'PhotoRoom_20230811_172356.jpg',
'PhotoRoom_20230811_172423.jpg',
'PhotoRoom_20230811_172447.jpg',
]
// const Slider = () => {
//   return (
//     <motion.div className='carousel'>
//       <motion.div className='inner-carousel'>
//         {sliderItems.map((img, index)=><motion.div className='min-h-screen w-4/12 p-[40%]'>
//                     {<img 
//                     className="w-full h-full"
//                     src={img} alt={img[index]}/>}
//         </motion.div>)}
//       </motion.div>
//     </motion.div>
//   )
// }

const Slider = () => {
  return (
    <div className='w-full h-screen rounded-md flex     '>
      <div 
       className=' h-screen w-full  mx-auto flex space-x-44 overflow-x-scroll overflow-y-hidden scrollbar-track-transparent scrollbar-thin scrollbar-thumb-[#F6EEE6] scrollbar-thumb-rounded-md rounded-md  bg-[#F6EEE6]'>
        {sliderItems.map((img, index)=>
          <div className='  flex-shrink-0 md:pl-[35%] items-center justify-center  w-auto h-screen rounded-md' key={index}
            // whileHover={{ scale: 1.1 }} // Ejemplo: escala al pasar el cursor
          >
            <img 
              className="sm:w-auto w-screen max-w-auto bg-[#fafafa]  transform transition-all duration-200  ease-in-out hover:scale-105 cursor-grab  h-screen object-cover"
              src={`/${img}`} alt={`Image ${index}`}
            />
          </div>
        )}
      </div>
    </div>
  )
}
export default Slider
