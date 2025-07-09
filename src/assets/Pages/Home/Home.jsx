import Card from '../../Component/Card/Card'
import axios from 'axios';
import Loading from '../../Component/Loading/Loading';
import imageSlider1 from '../../images/slider-image-1.jpeg'
import imageSlider2 from '../../images/slider-image-2.jpeg'
import imageSlider3 from '../../images/slider-image-3.jpeg'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import CategorySlider from '../../Component/CategorySlider/CategorySlider';
import { useQuery } from '@tanstack/react-query'


export default function Home() {



  async function getProducts() {
    const opations = {
      url: 'https://ecommerce.routemisr.com/api/v1/products',
      method: 'GET',
    }
    const { data } = await axios.request(opations);
    return data
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ['AllProducts'],
    queryFn: getProducts,
    staleTime: 5000,
    refetchOnMount: true,

  })
  if (isLoading) return <Loading />
  if (isError) return <p>Error</p>
  console.log(data);


  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-12 gap-4 pt-3'>
        {/* Left Slider */}
        <div className='md:col-span-8'>
          <Swiper slidesPerView={1} loop={true}>
            <SwiperSlide>
              <img src={imageSlider3} className='w-full h-full object-cover rounded' />
            </SwiperSlide>
            <SwiperSlide>
              <img src={imageSlider2} className='w-full h-full object-cover rounded' />
            </SwiperSlide>
            <SwiperSlide>
              <img src={imageSlider1} className='w-full h-full object-cover rounded' />
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Right Images hidden on mobile */}
        <div className='md:col-span-4 hidden md:flex flex-col gap-4'>
          <img src={imageSlider1} className='w-full rounded' />
          <img src={imageSlider2} className='w-full rounded' />
        </div>
      </div>





      {/* {Caregory} */}
      <div className='container '>
        <h1 className=' text-2xl font-bold text-[#0aad0a] m-4'>Category </h1>
      </div>
      <CategorySlider />















      {/* {Card} */}
      <div className='container '>
        <h1 className=' text-3xl font-bold text-[#0aad0a] m-4'>All Products </h1>
      </div>
      {

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 p-4'>
          {data.data.map((product) => <Card key={product.id} productInfo={product} />)}
        </div>
      }

    </>
  )
}
