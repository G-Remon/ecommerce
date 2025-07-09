import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import { object, ref, string } from 'yup';

export default function Register() {

    const passRegx = /^[A-Za-z0-9]{6,}$/;
    const phoneRegx = /^01[0125][0-9]{8}$/;
    const emailRegx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const Schema = object({

        name: string().required('Name is required').min(3, 'Name must be at least 3 characters').max(20, 'Name must be at most 20 characters'),
        email: string().email('Invalid email format').required('Email is required').matches(emailRegx , 'Email must be valid and contain only letters, numbers, and special characters like @, ., -'),
        password: string().required('Password is required').matches(passRegx, 'Password must be at least 6 characters long and contain only letters and numbers'),
        rePassword: string().required('RePassword is required').oneOf([ref('password'), null], 'Passwords must match'),
        phone: string().required('Phone is required').matches(phoneRegx, 'Phone number must be valid and start with 01 and contain 11 digits')

    })

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: ''

        },
        onSubmit: sendData,
        validationSchema: Schema

    })


    async function sendData(values) {

        const Loading = toast.loading('Loading...')
        setLoading(true);
        try {
            setError(null)
            const opteions = {
                url: 'https://ecommerce.routemisr.com/api/v1/auth/signup',
                method: 'post',
                data: values
            }

            const { data } = await axios.request(opteions)
            toast.success('Register Successfully')
            setTimeout(() => { navigate('/login') }, 1500)
            console.log(data);

        } catch (error) {
            setError(error.response.data.message);
            toast.error('An error occurred');
        } finally {
            toast.dismiss(Loading);
            setLoading(false);
        }

    }
    return (
        <>
            <h1 className=' font-bold text-3xl pt-3 text-[#0aad0a] mb-3'>Register Now</h1>
            {error && <p className='text-red-600'>{error}</p>}
            <form onSubmit={formik.handleSubmit}  >
                <div className='p-2'>
                    <label>UserName :</label>
                    <input type="text" placeholder='Enter your username' className='w-full  p-2 rounded-md bg-[#f0f3f2] focus:outline-none'
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name='name'
                    />
                    {formik.errors.name && formik.touched.name && <p className='text-red-600 '>{formik.errors.name} </p>}
                </div>
                <div className='p-2'>
                    <label>Email :</label>
                    <input type="email" placeholder='Enter your email' className='w-full  p-2 rounded-md bg-[#f0f3f2] focus:outline-none'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name='email'
                    />
                    {formik.errors.email && formik.touched.email && <p className='text-red-600 '>{formik.errors.email} </p>}

                </div>
                <div className='p-2'>
                    <label>Password :</label>
                    <input type="text" placeholder='Enter your Password' className='w-full  p-2 rounded-md bg-[#f0f3f2] focus:outline-none'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name='password'
                    />
                    {formik.errors.password && formik.touched.password && <p className='text-red-600 '>{formik.errors.password} </p>}

                </div>
                <div className='p-2'>
                    <label>rePassword :</label>
                    <input type="text" placeholder='rePassword' className='w-full  p-2 rounded-md bg-[#f0f3f2] focus:outline-none'
                        value={formik.values.rePassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name='rePassword'
                    />
                    {formik.errors.rePassword && formik.touched.rePassword && <p className='text-red-600 '>{formik.errors.rePassword} </p>}
                </div>
                <div className='p-2'>
                    <label>Phone :</label>
                    <input type="text" placeholder='Enter your Phone' className='w-full  p-2 rounded-md bg-[#f0f3f2] focus:outline-none'
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name='phone'
                    />
                    {formik.errors.phone && formik.touched.phone && <p className='text-red-600 '>{formik.errors.phone} </p>}
                </div>
                <input type="submit" disabled={loading} value="Register" className='bg-[#0aad0a] text-[#ffff] font-semibold  p-3 mt-3 mb-3 rounded-md text-sm ml-4 cursor-pointer hover:focus:bg-[green]' />

            </form>
        </>
    )
}
