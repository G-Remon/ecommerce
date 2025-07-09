import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import { object, string } from 'yup'
import { TokenContext } from '../../context/Token.context';

export default function ForegtPass() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setToken } = useContext(TokenContext)

    const Schema = object({
        email: string().email('Invalid email format').required('Email is required'),

    })
    const formik = useFormik({
        initialValues: {
            email: ''
        },
        onSubmit: SendForgetPass,
        validationSchema: Schema
    })


    async function SendForgetPass(values) {
        const Loading = toast.loading('Loading...')
        setLoading(true);
        try {
            setError(null);
            const options = {
                url: 'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
                method: 'post',
                data: values
            }
            const { data } = await axios.request(options)
            console.log(data);
            toast.success('Check your email for the reset link');
            setTimeout(() => { navigate('/verify') }, 1500);
            localStorage.setItem('token', data.token)
            setToken(data.token)
            // Handle success response, e.g., show a success message or redirect

        } catch (error) {
            console.log(error)
            setError(error.response.data.message);
            toast.error('An error occurred');
        } finally {
            toast.dismiss(Loading);
            setLoading(false);
        }
    }
    return (
        <>
            <div className='conatiner'>

                <h1 className=' font-bold text-3xl pt-3 text-[#0aad0a] mb-3'>Forget Password</h1>
                {error && <p className='text-red-600'>{error}</p>}
                <form onSubmit={formik.handleSubmit} >
                    <div className='p-2'>
                        <label>Email :</label>
                        <input type="email" placeholder='Enter your email' className='w-full  p-2 rounded-md bg-[#f0f3f2] focus:outline-none'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name='email' />
                        {formik.errors.email && formik.touched.email && <p className='text-red-600 '>{formik.errors.email} </p>}
                    </div>
                    <input type="submit" disabled={loading} value="submit" className='bg-[#0aad0a] text-[#ffff] font-semibold  p-3 mt-3 mb-3 rounded-md text-sm ml-4 cursor-pointer hover:focus:bg-[green]' />
                </form>
            </div>
        </>
    )
}
