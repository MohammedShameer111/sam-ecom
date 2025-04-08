import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-10 text-sm'>
        <div>
        <h1 className='text-4xl sm:text-6xl font-harryPotter text-yellow-600 '>Ganesh<span className='text-4xl sm:text-6xl font-harryPotter text-black'>Hub</span></h1>
          <p className='w-full md:w-2/3 text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius culpa nisi eligendi alias facere repudiandae, aut rerum sequi, doloremque ullam reiciendis similique saepe illo accusantium sint ducimus? Dignissimos, at commodi!</p>

        </div>
        <div>
          <p className='text-xl font-medium mb-5'>Company</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className='text-xl font-medium mb-5'>Get In Touch</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+1-2121-456-7890</li>
            <li>contact@GaneshHub.com</li>
          </ul>
        </div>
      </div>
      <div>
          <hr />
          <p className='py-5 text-sm text-center'>Copyright 2025@ Ganesh.com - All Right Reserved</p>
        </div>
    </div>
  )
}

export default Footer
