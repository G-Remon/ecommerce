import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading'
import { useQuery } from '@tanstack/react-query'

export default function CategorySlider() {

  async function getCategories() {
    const options = {
      url: 'https://ecommerce.routemisr.com/api/v1/categories',
      method: 'GET',
    }
    return await axios.request(options)
  }


  const { data, isError, isLoading } = useQuery({
    queryKey: ['CategorySlider'],
    queryFn: getCategories,
    staleTime: 5000,
    refetchOnMount: true,

  })
  if (isLoading) return <Loading />
  if (isError) return <p>Error</p>
  console.log(data);
  return (
    <>

        <Swiper
          loop={true}
          spaceBetween={20}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 6,
            },
          }}
        >
          {data.data.data.map((category) => (
            <SwiperSlide key={category._id}>
              <Link to={`/SubCat/${category._id}`}>
                <div className="border rounded-lg overflow-hidden shadow hover:shadow-green-500 hover:shadow-lg transition p-2 text-center">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover mb-2"
                  />
                  <h2 className="text-green-600 font-semibold">{category.name}</h2>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
    </>
  )
}
