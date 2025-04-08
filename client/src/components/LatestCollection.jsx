import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopConxt'
import Title from './Title'
import ProductItem from './ProductItem'

const LatestCollection = () => {
  const { products } = useContext(ShopContext)
  const [latestProduct, setLatestProduct] = useState([]);

  useEffect(() => {
    setLatestProduct(products.slice(0, 8));
  }, [products])

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl font-harryPotter'>
        <Title text1={'Latest'} text2={'Collections'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base font-bold text-center text-[#5a3e36]'>
        Discover the latest magical items straight from the wizarding world!
        </p>
      </div>

      {/* Rendering products */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4'>
        {latestProduct.map((item, index) => (
          <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
        ))}
      </div>
    </div>
  )
}

export default LatestCollection
