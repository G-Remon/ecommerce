import axios from 'axios'
import { useFormik } from 'formik'
import { Send } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'
import { number, object } from 'yup'

export default function Verify() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const Schema = object({
        resetCode: number().required('Code is required')
    })
    
    const formik = useFormik({
        initialValues: {
            resetCode: ''
        },
        onSubmit: SendCode,
        validationSchema: Schema
    })
    
    
    async function SendCode(values) {
        const Loading = toast.loading('Loading...')
        setLoading(true);
        try {
            setError(null);
            const options = {
                url: 'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
                method: 'post',
                data: values
            }
            const { data } = await axios.request(options)
            console.log(data);
            toast.success('Code verified successfully');
            setTimeout(() => { navigate('/ResetPass') }, 1500);
        } catch (error) {
            console.log(error);
            setError(error.response.data.message);
            toast.error('An error occurred');
        }
        finally {
            toast.dismiss(Loading);
            setLoading(false);
        }
    }
    return (
        <>
            <div className='conatiner'>

                <h1 className=' font-bold text-3xl pt-3 text-[#0aad0a] mb-3'>Verify Code</h1>
                {error && <p className='text-red-600'>{error}</p>}
                <form onSubmit={formik.handleSubmit} >
                    <div className='p-2'>
                        <label>Write Code</label>
                        <input type="text" placeholder='Enter your Code' className='w-full  p-2 rounded-md bg-[#f0f3f2] focus:outline-none'
                            value={formik.values.resetCode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name='resetCode' />
                        {formik.errors.resetCode && formik.touched.resetCode && <p className='text-red-600 '>{formik.errors.resetCode} </p>}
                    </div>
                    <input type="submit" value="submit" disabled={loading} className='bg-[#0aad0a] text-[#ffff] font-semibold  p-3 mt-3 mb-3 rounded-md text-sm ml-4 cursor-pointer hover:focus:bg-[green]' />
                </form>

            </div>

        </>
    )
}
