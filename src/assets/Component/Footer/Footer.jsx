import React from 'react'
import amazoon from '../../images/amazon-pay.png'
import amircan from '../../images/American-Express-Color.png'
import master from '../../images/mastercard.webp'
import pay from '../../images/paypal.png'
import playStore from '../../images/get-google-play.png'
import appleStore from '../../images/get-apple-store.png'

export default function Footer() {
  return (
    <div className='bg-[#f0f3f2] w-full py-8'>
      <div className='container mx-auto px-4'>

        <div className='mb-4'>
          <h2 className='mb-2 text-lg font-semibold'>Get the FreshCart app</h2>
          <p className='text-xs'>We will send you a link. Open it on your phone to download the app.</p>
        </div>

        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
          <input
            type="email"
            placeholder='Enter your email address'
            className='w-full p-2 rounded-md bg-white focus:outline-none'
          />
          <button
            className='bg-[#0aad0a] text-white font-semibold px-4 py-2 rounded-md text-sm cursor-pointer hover:bg-green-700 transition'
            type='submit'
          >
            Share Link
          </button>
        </div>

        <div className='flex flex-col md:flex-row md:items-center md:justify-between mt-8 gap-6'>

          <div className='flex flex-col md:flex-row md:items-center gap-4'>
            <h3 className='text-sm font-medium'>Payment partners</h3>
            <div className='flex gap-2'>
              <img src={amazoon} alt="Amazon Pay" className='w-[60px]' />
              <img src={amircan} alt="American Express" className='w-[60px]' />
              <img src={master} alt="Mastercard" className='w-[60px]' />
              <img src={pay} alt="PayPal" className='w-[60px]' />
            </div>
          </div>

          <div className='flex flex-col md:flex-row md:items-center gap-4'>
            <h3 className='text-sm font-medium'>Get deliveries with FreshCart</h3>
            <div className='flex gap-2'>
              <img src={playStore} alt="Play Store" className='w-[100px]' />
              <img src={appleStore} alt="Apple Store" className='w-[100px]' />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
