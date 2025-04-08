import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
          <Title text1={'About'} text2={'Us'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
       <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
       <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas expedita dolore ipsam. Fugiat cumque dignissimos necessitatibus molestiae minus facere exercitationem!Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae corrupti earum itaque exercitationem reprehenderit, molestiae provident dolorum voluptates velit architecto.</p>
           <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa autem, quidem veniam incidunt illum vero ut corporis quia eveniet fugit!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi accusantium quasi est quidem aperiam. Sequi qui ipsum nam beatae modi assumenda architecto et optio, ad neque.</p>
            <b className='text-gray-800'>Our Mission</b>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem, laudantium.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium provident, voluptatum ut necessitatibus cupiditate obcaecati eos dolore a culpa recusandae!</p>
       </div>
      </div>
      <div className='text-4xl py-4'>
        <Title text1={'Why'} text2={'Choose Us'}/>
      </div>
      <div className='flex flex-col md:flex-row text:sm mb-20'>
       <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Quality Assurance:</b>
        <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam, asperiores eveniet et saepe assumenda veniam magnam ad similique repellat molestiae.</p>
       </div>
       <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Convenience:</b>
        <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam, asperiores eveniet et saepe assumenda veniam magnam ad similique repellat molestiae.</p>
       </div>
       <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Exceptional Customer Service:</b>
        <p className='text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam, asperiores eveniet et saepe assumenda veniam magnam ad similique repellat molestiae.</p>
       </div>
      </div>
      {/* <NewsLetterBox/> */}
    </div>
  )
}

export default About
