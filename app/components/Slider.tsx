import {motion} from 'framer-motion'
const sliderItems:string[] = [
'/PhotoRoom_20230811_171642',
'/PhotoRoom_20230811_171700',
'/PhotoRoom_20230811_172032',
'/PhotoRoom_20230811_172055',
// '/PhotoRoom_20230811_171',
]
const Slider = () => {
  return (
    <motion.div className='carousel'>
      <motion.div className='inner-carousel'>
        {sliderItems.map((img, index)=><motion.div className='min-h-screen w-4/12 p-[40%]'>
                    {<img 
                    className="w-full h-full"
                    src={img} alt={img[index]}/>}
        </motion.div>)}
      </motion.div>
    </motion.div>
  )
}

export default Slider
