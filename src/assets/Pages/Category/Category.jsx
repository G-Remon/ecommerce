import axios from 'axios'
import Loading from '../../Component/Loading/Loading'
import { useQuery } from '@tanstack/react-query'

export default function Category() {
  async function getCategories() {
    const options = {
      url: 'https://ecommerce.routemisr.com/api/v1/categories',
      method: 'GET',
    }
    const { data } = await axios.request(options)
    return data
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ['AllCategories'],
    queryFn: getCategories,
    staleTime: 5000,
    refetchOnMount: true,
  })

  if (isLoading) return <Loading />
  if (isError) return <p>Error</p>

  console.log(data)

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 my-6 px-4">
      {data.data.map((cat) => (
        <div
          key={cat._id}
          className="border rounded-md overflow-hidden shadow p-2 text-center cursor-pointer hover:shadow-[#0aad0a] hover:shadow-lg transition-all"
        >
          <img
            src={cat.image}
            alt={cat.name}
            className="w-full h-48 object-cover mb-2"
          />
          <h1 className="text-[#0aad0a] font-semibold">{cat.name}</h1>
        </div>
      ))}
    </div>
  )
}
