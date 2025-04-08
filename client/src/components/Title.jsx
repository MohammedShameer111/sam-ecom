import React from 'react'

const Title = ({text1,text2}) => {
  return (
    <div className='inline-flex gap-2 items-center mb-3 '>
      <p className='text-yellow-600 font-harryPotter text-6xl'>{text1} <span className='text-yellow-600 text-6xl font-harryPotter '>{text2}</span></p>
      <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] font-bold text-center text-[#5a3e36]'></p>
      
    </div>
  )
}

export default Title
