import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { object, string } from 'yup';

export default function ResetPass() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const passRegx = /^[A-Za-z0-9]{6,}$/;
    const Schema = object({
        email: string().email('Invalid email format').required('Email is required'),
        newPassword: string().required('Password is required').matches(passRegx, 'Password must be at least 6 characters long and contain only letters and numbers')
    })

    const formik = useFormik({
        initialValues: {
            email: '',
            newPassword: ''
        },
        onSubmit: ResetPassword
        , validationSchema: Schema
    })



    async function ResetPassword(values) {
        const Loading = toast.loading('Loading...')
        setLoading(true);
        try {
            const options = {
                url: 'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
                method: 'put',
                data: values
            }
            const { data } = await axios.request(options);
            console.log(data);
            setError(null);
            toast.success('Password reset successfully');
            setTimeout(() => { navigate('/login') }, 1500);
        } catch (error) {
            console.log(error);
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
                <h1 className=' font-bold text-3xl pt-3 text-[#0aad0a] mb-3'>Reset Password</h1>
                {error && <p className='text-red-600'>{error}</p>}
                <form onSubmit={formik.handleSubmit} >
                    <div className='p-2'>
                        <label>Email :</label>
                        <input type="email" placeholder='Enter your email' className='w-full  p-2 rounded-md bg-[#f0f3f2] focus:outline-none'
                            name='email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}

                        />
                        {formik.errors.email && formik.touched.email && <p className='text-red-600 '>{formik.errors.email} </p>}

                    </div>
                    <div className='p-2'>
                        <label>New Password :</label>
                        <input type="text" placeholder='Enter your new Password' className='w-full  p-2 rounded-md bg-[#f0f3f2] focus:outline-none'
                            name='newPassword'
                            value={formik.values.newPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.newPassword && formik.touched.newPassword && <p className='text-red-600 '>{formik.errors.newPassword} </p>}

                    </div>
                    <input type="submit" disabled={loading} value="Reset" className='bg-[#0aad0a] text-[#ffff] font-semibold  p-3 mt-3 mb-3 rounded-md text-sm ml-4 cursor-pointer hover:focus:bg-[green]' />

                </form>

            </div>

        </>
    )
}
