import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { CartContext } from './../../context/Card.Context/Card.context'
import { TokenContext } from '../../context/Token.context'
import axios from 'axios'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'

export default function CheckOut() {

    const [cash, setCash] = useState(null)
    const { CartInfo } = useContext(CartContext)
    const { token } = useContext(TokenContext)
    const navigate = useNavigate()

    async function MakeCashOrder(values) {
        console.log('CartInfo:', CartInfo)
        const loading = toast.loading('Loading..')
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/${CartInfo.cartId}`,
                method: 'POST',
                headers: {
                    token: token
                },
                data: {
                    shippingAddress: values
                }
            }
            const { data } = await axios.request(options)
            console.log(data)
            toast.success('Cash order success')
            navigate('/AllOrders')
        } catch (error) {
            console.log(error)
        } finally {
            toast.dismiss(loading)
        }
    }

    async function MakeOnlineOrder(values) {
        console.log('CartInfo:', CartInfo)
        const loading = toast.loading('Loading..')
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartInfo.cartId}?url=http://localhost:5173`,
                method: "POST",
                headers: {
                    token: token
                },
                data: {
                    shippingAddress: values
                }
            }
            const { data } = await axios.request(options)
            console.log(data)
            toast.success('Payment order success')
            setTimeout(() => {
                location.replace(data.session.url)
            }, 1000);
        } catch (error) {
            console.log(error)
        } finally {
            toast.dismiss(loading)
        }
    }

    const formik = useFormik({
        initialValues: {
            city: '',
            phone: '',
            details: '',
        },
        onSubmit: (values) => {
            if (cash === 'Cash') {
                MakeCashOrder(values)
            } else {
                MakeOnlineOrder(values)
            }
        }
    })

    return (
        <>
            <div className='my-4 space-y-4'>
                <h2 className='text-[#0aad0a] text-2xl font-bold'>Fill your details</h2>

                <form onSubmit={formik.handleSubmit}>
                    <div className='my-2'>
                        <label htmlFor="city" className='font-bold'>City</label>
                        <input
                            type="text"
                            className="w-full p-2 rounded-md bg-[#f0f3f2] focus:outline-none"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            name='city'
                        />
                    </div>
                    <div className='my-2 font-bold'>
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="text"
                            className="w-full p-2 rounded-md bg-[#f0f3f2] focus:outline-none"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            name='phone'
                        />
                    </div>
                    <div className='my-2 font-bold'>
                        <label htmlFor="details">Details</label>
                        <input
                            type="text"
                            className="w-full p-2 rounded-md bg-[#f0f3f2] focus:outline-none"
                            value={formik.values.details}
                            onChange={formik.handleChange}
                            name='details'
                        />
                    </div>
                    <button
                        type='submit'
                        onClick={() => { setCash('Cash') }}
                        className='bg-[#0006b9] text-[#ffff] font-semibold p-3 mt-3 mb-3 rounded-md text-sm ml-4 cursor-pointer'
                    >
                        Create Cash Order
                    </button>
                    <button
                        type='submit'
                        onClick={() => { setCash('payment') }}
                        className='bg-[#b9001f] text-[#ffff] font-semibold p-3 mt-3 mb-3 rounded-md text-sm ml-4 cursor-pointer'
                    >
                        Create Online Order
                    </button>
                </form>
            </div>
        </>
    )
}
