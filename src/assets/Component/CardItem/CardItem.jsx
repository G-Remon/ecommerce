import React, { useContext } from 'react'
import { Trash } from 'lucide-react'
import { CartContext } from '../../context/Card.Context/Card.context'

export default function CardItem({ CartInfo }) {
  const { RemoveFromCart, updateCart } = useContext(CartContext)
  const { count, price, product } = CartInfo
  const { imageCover, title, id, category } = product

  return (
    <div className='flex flex-col md:flex-row gap-5 justify-between items-center border-b pb-4'>
      <div className='flex flex-col md:flex-row gap-5 w-full md:w-auto items-center md:items-start'>
        <img src={imageCover} className='w-full md:w-40 rounded' />
        <div className='text-center md:text-left'>
          <h3 className='font-semibold'>{title}</h3>
          <h5 className='text-gray-600'>{category.name}</h5>
          <h4 className='text-[#0aad0a] font-semibold'>Price: {price} EGY</h4>
          <div className='pt-4'>
            <button
              onClick={() => { RemoveFromCart(id) }}
              className='flex items-center gap-2 bg-red-600 px-4 py-2 rounded-md text-white'
            >
              <Trash size={18} /> Remove
            </button>
          </div>
        </div>
      </div>

      <div className='flex gap-4 items-center pt-4 md:pt-0'>
        <button
          onClick={() => { updateCart(id, count + 1) }}
          className='bg-[#0aad0a] px-3 py-1 rounded-md text-white'
        >
          <i className='fa-solid fa-plus'></i>
        </button>
        <h3>{count}</h3>
        <button
          onClick={() => { updateCart(id, count - 1) }}
          className='bg-[#0aad0a] px-3 py-1 rounded-md text-white'
        >
          <i className='fa-solid fa-minus'></i>
        </button>
      </div>
    
    </div>
  )
}
