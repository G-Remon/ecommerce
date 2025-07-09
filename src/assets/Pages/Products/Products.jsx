import axios from 'axios'
import Card from '../../Component/Card/Card'
import Loading from '../../Component/Loading/Loading'
import { useQuery } from '@tanstack/react-query'

export default function Products() {
  async function getProducts() {
    const { data } = await axios.get(
      'https://ecommerce.routemisr.com/api/v1/products'
    )
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

  console.log(data)

  return (
    <>
      <div className="container">
        <h1 className="text-3xl font-bold text-[#0aad0a] m-4">
          All Products
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 p-4">
        {data.data.map((product) => (
          <Card key={product.id} productInfo={product} />
        ))}
      </div>
    </>
  )
}
