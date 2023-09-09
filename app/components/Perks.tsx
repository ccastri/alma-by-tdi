import React from 'react'
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShipping';
const Perks = () => {
  return (
    <div className='grid grid-cols-3 space-x-4 py-4 items-center justify-center w-full'>
      <a href='#' className="mx-auto items-center flex flex-col text-[#BB6A72] hover:text-slate-300 "><CardGiftcardIcon className="w-16 "/> Tarjetas de regalo</a>
      <a className=' items-center border-x-2  border-black text-center flex flex-col text-[#BB6A72] hover:text-slate-300'><LoyaltyIcon className="border-2 w-16"/> Lo ultimo</a>
      <a className='items-center text-center flex flex-col text-[#BB6A72] hover:text-slate-300 '><LocalShippingOutlinedIcon className="border-2 w-16 "/> Envio Gratis</a>
      {/* <CardGiftcardIcon/> */}
    </div>
  )
}

export default Perks
