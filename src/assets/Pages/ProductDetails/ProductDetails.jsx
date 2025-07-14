import axios from 'axios'
import { useParams } from 'react-router-dom'
import Loading from '../../Component/Loading/Loading'
import { CartContext } from '../../context/Card.Context/Card.context'
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import Card from '../../Component/Card/Card'
import ReactImageGallery from 'react-image-gallery'

export default function ProductDetails() {
  const { id } = useParams()
  const { addToCart } = useContext(CartContext)

  const {
    data: productDetail,
    isLoading: isLoadingDetail,
    isError: isErrorDetail,
  } = useQuery({
    queryKey: ['productDetail', id],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      )
      return data.data
    },
    enabled: !!id,
  })

  const {
    data: relatedProducts,
    isLoading: isLoadingRelated,
    isError: isErrorRelated,
  } = useQuery({
    queryKey: ['relatedProducts', productDetail?.category?._id],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?category[in]=${productDetail.category._id}`
      )
      return data.data
    },
    enabled: !!productDetail?.category?._id,
  })

  if (isLoadingDetail || isLoadingRelated) return <Loading />
  if (isErrorDetail || isErrorRelated) return <p>Error</p>

  return (
    <>
      <div className="grid grid-cols-12 gap-6 py-10">
        <div className="col-span-12 md:col-span-4">
          <ReactImageGallery
            items={productDetail.images.map(image => ({
              original: image,
              thumbnail: image,
            }))}
          />
        </div>
        <div className="col-span-12 md:col-span-8 py-5 space-y-4 px-5">
          <h2 className="text-xl font-bold">{productDetail.title}</h2>
          <h3 className="text-xl font-semibold text-[#0aad0a]">
            {productDetail.category?.name}
          </h3>
          <p>{productDetail.description}</p>

          <div className="flex items-center justify-between">
            <h4 className="font-bold">{productDetail.price} EGP</h4>
            <h4>
              <i className="fa-solid fa-star text-yellow-500"></i>{' '}
              {productDetail.ratingsAverage}
            </h4>
          </div>
          <button
            onClick={() => addToCart(id)}
            className="w-full bg-[#0aad0a] rounded-md text-white px-4 py-2 cursor-pointer hover:bg-[rgb(58,213,58)] transition-all"
          >
            Add To Cart
          </button>
        </div>
      </div>

      <div className="my-6 px-5">
        <h2 className="text-2xl font-bold mb-4">Related Products</h2>
        <Swiper
          modules={[Autoplay]}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
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
              slidesPerView: 4,
            },
            1280: {
              slidesPerView: 6,
            },
          }}
        >
          {relatedProducts?.map(product => (
            <SwiperSlide key={product.id}>
              <Card productInfo={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  )
}
