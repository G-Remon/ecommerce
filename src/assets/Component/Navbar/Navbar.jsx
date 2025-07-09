import React, { useContext, useEffect, useState } from 'react'
import HomeLogo from '../../images/freshcart-logo.svg'
import { NavLink } from 'react-router-dom'
import { TokenContext } from '../../context/Token.context'
import { CartContext } from '../../context/Card.Context/Card.context'

export default function Navbar() {
  const { token, logout } = useContext(TokenContext)
  const { CartInfo, addAllProducts } = useContext(CartContext)

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => { addAllProducts() },)

  return (
    <nav className='bg-[#f0f3f2] w-full shadow fixed top-0 left-0 z-50'>
      <div className='container mx-auto flex justify-between items-center p-4'>
        <NavLink to='home'>
          <img src={HomeLogo} alt="Home Logo" className='h-8' />
        </NavLink>

        {/* Hamburger */}
        <button
          className='md:hidden text-2xl focus:outline-none'
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <i className="fa-solid fa-xmark"></i>
          ) : (
            <i className="fa-solid fa-bars"></i>
          )}
        </button>

        {/* Menu */}
        <div
          className={`origin-top transition-transform duration-300 ease-in-out transform md:transform-none 
          ${isOpen ? 'scale-y-100' : 'scale-y-0'} md:scale-y-100 
          overflow-hidden md:overflow-visible 
          flex-col md:flex md:flex-row md:items-center absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-[#f0f3f2] md:bg-transparent z-50`}
        >
          {token && (
            <ul className='flex flex-col md:flex-row md:items-center gap-4 p-4 md:p-0 border-b md:border-0'>
              <li>
                <NavLink
                  to="/home"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    isActive ? 'text-[#0aad0a] font-bold' : 'hover:font-semibold'
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    isActive ? 'text-[#0aad0a] font-bold' : 'hover:font-semibold'
                  }
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/category"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    isActive ? 'text-[#0aad0a] font-bold' : 'hover:font-semibold'
                  }
                >
                  Category
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/brands"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    isActive ? 'text-[#0aad0a] font-bold' : 'hover:font-semibold'
                  }
                >
                  Brands
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/AllOrders"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    isActive ? 'text-[#0aad0a] font-bold' : 'hover:font-semibold'
                  }
                >
                  Orders
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/WishList"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    isActive ? 'text-[#0aad0a] font-bold' : 'hover:font-semibold'
                  }
                >
                  Wish List
                </NavLink>
              </li>
            </ul>
          )}

          <ul className='flex flex-col md:flex-row md:items-center gap-4 p-4 md:p-0'>
            {token && (
              <li>
                <NavLink to='/AddCart' onClick={() => setIsOpen(false)}>
                  <i className="fa-solid fa-cart-shopping relative">
                    <span className='absolute top-[-12px] right-[-12px] w-3 h-3 bg-[#0aad0a] flex justify-center items-center rounded-full p-2 text-[10px] text-white'>
                      {CartInfo == null ? <i className='fa-solid fa-spinner fa-spin'></i> : CartInfo.numOfCartItems}
                    </span>
                  </i>
                </NavLink>
              </li>
            )}
            <li><i className="fa-brands fa-facebook-f"></i></li>
            <li><i className="fa-brands fa-instagram"></i></li>
            <li><i className="fa-brands fa-twitter"></i></li>
            <li><i className="fa-brands fa-linkedin-in"></i></li>
            <li><i className="fa-brands fa-github"></i></li>

            {token ? (
              <li>
                <button onClick={() => { logout(); setIsOpen(false) }}>
                  <i className="fa-solid fa-right-from-bracket text-2xl cursor-pointer"></i>
                </button>
              </li>
            ) : (
              <>
                <li className='hover:font-semibold'>
                  <NavLink
                    to="login"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      isActive ? 'text-[#0aad0a] font-bold' : ''
                    }
                  >
                    Login
                  </NavLink>
                </li>
                <li className='hover:font-semibold'>
                  <NavLink
                    to="register"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      isActive ? 'text-[#0aad0a] font-bold' : ''
                    }
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
