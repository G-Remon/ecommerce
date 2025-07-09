import React, { useContext, useEffect } from 'react'
import { CartContext } from '../../context/Card.Context/Card.context'
import Loading from '../../Component/Loading/Loading'
import { Trash } from 'lucide-react'
import CardItem from '../../Component/CardItem/CardItem'
import { Link } from 'react-router'
import CheckOut from './../CheckOut/CheckOut';

export default function AddCart() {

    const { addAllProducts, CartInfo, ClearData } = useContext(CartContext)



    useEffect(() => {
        addAllProducts()
    } ,[])

    if (CartInfo?.numOfCartItems == 0) {

        return <section className=" bg-gray-300 p-5 my-6 ">
            <div >
                <h1 className=' font-bold text-2xl '>Shop Cart <i className="fa-solid fa-cart-shopping"></i></h1>
                <h2 className=' text-[#0aad0a] font-semibold'>Total : {CartInfo.data.totalCartPrice} EGY</h2>
            </div>

            <div className='text-center '>
                <h2 className=' font-bold mb-3'>The Card is Emptyy</h2>
                <Link to={"/home"} className=' bg-[#0aad0a] px-4 py-2 text-white rounded-md'> Click to go Home</Link>
            </div>

            <div className=' ms-auto w-fit pt-7'>
                <button className='text-[16px] items-center bg-red-600 px-4 py-2 rounded-md text-white cursor-pointer '>Clear Cart</button>
            </div>
        </section>
    }
    return (
        <>


            {CartInfo ? <section className=" bg-gray-300 p-5 my-6 ">
                <div >
                    <h1 className=' font-bold text-2xl '>Shop Cart <i className="fa-solid fa-cart-shopping"></i></h1>
                    <h2 className=' text-[#0aad0a] font-semibold'>Total : {CartInfo.data.totalCartPrice} EGY</h2>
                </div>
                <div className=" my-4 gap-y-4 flex flex-col">
                    {CartInfo.data.products.map((cart) => <CardItem CartInfo={cart} key={cart._id} />)}
                </div>
                <div className=' ms-auto w-fit'>
                    <button onClick={() => { ClearData() }} className='text-[16px] items-center bg-red-600 px-4 py-2 rounded-md text-white cursor-pointer '>Clear Cart</button>
                </div>

            </section> : <Loading />}
            <div className=' w-fit ms-auto my-3'>
                <Link to={'/CheckOut'}>
                    <button className=' bg-[#0aad0a] px-4 py-2 text-white rounded-md cursor-pointer hover:bg-[#3c8a3c]'>
                        CheckOut
                    </button>
                </Link>
            </div>
        </>
    )
}
