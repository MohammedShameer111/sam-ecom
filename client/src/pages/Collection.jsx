import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopConxt'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const {products,search,showSearch}=useContext(ShopContext);
  const[showFilter,setShowFilter]=useState(false);
  const[filterProducts,setFilterProducts]=useState([]);
  const [category,setCategory]=useState([]);
  const[subCategory,setSubCategory]=useState([]);
  const[sortType,setSortType]=useState('relavent')

  const toggleCategory=(e)=>{
    if (category.includes(e.target.value)) {
      setCategory(prev=>prev.filter(item=>item!==e.target.value))
    }
    else{
      setCategory(prev=>[...prev,e.target.value])
    }
  }

  const toggleSubcategory=(e)=>{
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev=>prev.filter(item=>item!==e.target.value))
    }
    else{
      setSubCategory(prev=>[...prev,e.target.value])
    }
  }

  const applyFilter=()=>{
    let productsCopy=products.slice();
    if (showSearch && search) {
      productsCopy=productsCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if(category.length>0){
      productsCopy=productsCopy.filter(item=>category.includes(item.category));
    }
    if(subCategory.length>0){
      productsCopy=productsCopy.filter(item=>subCategory.includes(item.subCategory))
    }
    setFilterProducts(productsCopy)
  }

  const sortProduct=()=>{
    let fpCopy=filterProducts.slice();
    switch(sortType){
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b)=>(a.price-b.price)))
        break;
        case 'high-low':
          setFilterProducts(fpCopy.sort((a,b)=>(b.price-a.price)))
          break;
          default:
            applyFilter();
            break;
    }
  }
  useEffect(()=>{
   applyFilter();
  },[category,subCategory,search,showSearch,products])

  useEffect(()=>{
  sortProduct()
  },[sortType])


  return (
    <div className='flex flex-col  sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
    {/* Filter Option */}
<div className='w-fit bg-yellow-50 p-3 rounded-md border-2 border-yellow-800 shadow-lg'>

  <p 
    onClick={() => setShowFilter(!showFilter)} 
    className='my-2 text-2xl flex items-center cursor-pointer gap-2 font-harry text-yellow-900 hover:text-yellow-700 transition-all duration-300'
  >
    FILTERS
    <img 
      className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} 
      src={assets.dropdown_icon} 
      alt="" 
    />
  </p>
  {/* Category Filter */}
  <div className={`border border-yellow-800 bg-yellow-100 rounded-md p-4 mt-4 shadow-inner ${showFilter ? '' : 'hidden'} sm:block`}>
    <p className='mb-3 text-lg font-harry text-yellow-900'>CATEGORIES</p>
    <div className='flex flex-col gap-2 text-base font-light text-yellow-800'>
      <label className='flex items-center gap-2 cursor-pointer hover:text-yellow-600 transition-all duration-300'>
        <input className='w-4 h-4 accent-yellow-800' type="checkbox" value={'Men'} onChange={toggleCategory} />
        Men
      </label>
      <label className='flex items-center gap-2 cursor-pointer hover:text-yellow-600 transition-all duration-300'>
        <input className='w-4 h-4 accent-yellow-800' type="checkbox" value={'Women'} onChange={toggleCategory} />
        Women
      </label>
      <label className='flex items-center gap-2 cursor-pointer hover:text-yellow-600 transition-all duration-300'>
        <input className='w-4 h-4 accent-yellow-800' type="checkbox" value={'Kids'} onChange={toggleCategory} />
        Kids
      </label>
    </div>
  </div>
  {/* Subcategory Filter */}
  <div className={`border border-yellow-800 bg-yellow-100 rounded-md p-4 mt-5 shadow-inner ${showFilter ? '' : 'hidden'} sm:block`}>
    <p className='mb-3 text-lg font-harry text-yellow-900'>TYPE</p>
    <div className='flex flex-col gap-2 text-base font-light text-yellow-800'>
      <label className='flex items-center gap-2 cursor-pointer hover:text-yellow-600 transition-all duration-300'>
        <input className='w-4 h-4 accent-yellow-800' type="checkbox" value={'Topwear'} onChange={toggleSubcategory} />
        Topwear
      </label>
      <label className='flex items-center gap-2 cursor-pointer hover:text-yellow-600 transition-all duration-300'>
        <input className='w-4 h-4 accent-yellow-800' type="checkbox" value={'Bottomwear'} onChange={toggleSubcategory} />
        Bottomwear
      </label>
      <label className='flex items-center gap-2 cursor-pointer hover:text-yellow-600 transition-all duration-300'>
        <input className='w-4 h-4 accent-yellow-800' type="checkbox" value={'Winterwear'} onChange={toggleSubcategory} />
        Winterwear
      </label>
    </div>
  </div>
</div>

      {/* right Side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
        <Title text1={'All'} text2={'Collections'}/>
        {/* product sort */}
        <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
          <option value="relavent">Sort by: Relevent</option>
          <option value="low-high">Sort by:Low to High</option>
          <option value="high-low">Sort by:High to Low</option>
        </select>
        </div>
        {/* Map products */}
        <div className='grid grid-cols md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
        {
          filterProducts.map((item,index)=>(
              <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price}/>
          ))
        }
        </div>
      </div>
    </div>
  )
}

export default Collection
