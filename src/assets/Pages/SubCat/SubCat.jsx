import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../Component/Loading/Loading';

export default function SubCat() {
  const { _id } = useParams();
  const [subCategories, setSubCategories] = useState(null);

  async function getAllSubCat() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/categories/${_id}/subcategories`,
      method: 'GET',
    };
    const { data } = await axios.request(options);
    setSubCategories(data.data);
  }

  useEffect(() => {
    getAllSubCat();
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-green-600">Sub Categories</h1>
      {subCategories ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {subCategories.map((sub) => (
            <div
              key={sub._id}
              className="border p-4 rounded shadow hover:shadow-green-500 hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold">{sub.name}</h2>
            </div>
          ))}
        </div>
      ) : (
       <Loading/>
      )}
    </div>
  );
}
