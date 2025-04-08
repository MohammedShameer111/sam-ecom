import React from 'react'
import {assets} from '../assets/assets'
const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
<h1 className="text-4xl sm:text-6xl font-harryPotter text-yellow-600">
          Ganesh<span className="text-4xl sm:text-6xl font-harryPotter text-black">Hub</span>
        </h1>
    <button onClick={()=>setToken('')} className='bg-gray-600 text-white px-5py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>LOGOUT</button>
    </div>
  )
}

export default Navbar