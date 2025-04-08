import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopConxt'
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
      <div className='hogwarts-frame relative bg-[#d2b48c] p-4 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300'>
        <div className='overflow-hidden rounded-lg'>
          <img className='hover:scale-105 transition ease-out duration-300 w-full h-64 object-cover' src={image[0]} alt={name} />
        </div>
        <p className='pt-3 pb-1 text-sm font-bold text-center truncate text-[#5a3e36]'>{name}</p>
        <p className='text-sm font-medium text-center text-[#5a3e36]'>{currency}{price}</p>
        
        {/* Magical Corners */}
        <div className='absolute top-0 left-0 w-6 h-6 bg-[#bfa97a] rounded-br-lg'></div>
        <div className='absolute top-0 right-0 w-6 h-6 bg-[#bfa97a] rounded-bl-lg'></div>
        <div className='absolute bottom-0 left-0 w-6 h-6 bg-[#bfa97a] rounded-tr-lg'></div>
        <div className='absolute bottom-0 right-0 w-6 h-6 bg-[#bfa97a] rounded-tl-lg'></div>
      </div>
    </Link>
  )
}

export default ProductItem
