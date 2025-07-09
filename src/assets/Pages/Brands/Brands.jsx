import axios from 'axios';
import Loading from '../../Component/Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function Brands() {
 
  const [activeBrand, setActiveBrand] = useState(null);

  async function getBrands() {
    const options = {
      url: 'https://ecommerce.routemisr.com/api/v1/brands',
      method: 'GET',
    };
    const { data } = await axios.request(options);
    return data
  }
  const { data, isError, isLoading } = useQuery({
    queryKey: ['Brands'],
    queryFn: getBrands,
    staleTime: 5000,
    refetchOnMount: true,

  })
  if (isLoading) return <Loading />
  if (isError) return <p>Error</p>
  console.log(data);

  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-[#0aad0a] mb-6 text-center">
        All Brands
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.data.map((brand) => (
          <div
            key={brand._id}
            onClick={() => setActiveBrand(brand)}
            className="border rounded-md p-4 text-center shadow-sm hover:shadow-[#0aad0a] hover:shadow-md transition cursor-pointer"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="w-full h-40 object-contain mb-4"
            />
            <h2 className="font-medium">{brand.name}</h2>
          </div>
        ))}
      </div>

      {activeBrand && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded p-6 max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-2xl"
              onClick={() => setActiveBrand(null)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-[#0aad0a] mb-4">
              {activeBrand.name.toUpperCase()}
            </h2>
            <img
              src={activeBrand.image}
              alt={activeBrand.name}
              className="w-full h-40 object-contain mb-4"
            />
            <p className="text-gray-700">{activeBrand.slug}</p>
            <button
              onClick={() => setActiveBrand(null)}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
