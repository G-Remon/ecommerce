import React, { useContext } from 'react'
import { TokenContext } from '../../context/Token.context'
import { WishContext } from '../../context/wishContext/WishContext'
import Loading from '../../Component/Loading/Loading'
import { useQuery } from '@tanstack/react-query'

export default function WishList() {
    const { getWishList, removeFromWishList } = useContext(WishContext)
    const { token } = useContext(TokenContext)

    const { data: wishList, isLoading, isError } = useQuery({
        queryKey: ['wishList'],
        queryFn: () => getWishList(token),
        enabled: !!token,
        staleTime: 5000,
        refetchOnMount: true,
    })

    if (isLoading) return <Loading />
    if (isError) return <p>Error</p>

    if (!wishList || wishList.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-96">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/4076/4076500.png"
                    alt="Empty Wishlist"
                    className="w-32 h-32 mb-4 opacity-50"
                />
                <h2 className="text-2xl font-semibold text-gray-600">
                    Wishlist is empty
                </h2>
                <p className="text-gray-500">Add products to see them here</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-5">
            {wishList.map((item) => (
                <div key={item.id} className="border p-4 space-y-2">
                    <img
                        src={item.imageCover}
                        alt={item.title}
                        className="w-full object-cover"
                    />
                    <h2 className="text-[#0aad0a] font-bold">{item.title}</h2>
                    <h3>{item.price} EGP</h3>

                    <button
                        onClick={() => removeFromWishList(item.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-800 transition-colors"
                    >
                        Remove
                    </button>
                </div>
            ))}
        </div>
    )
}
