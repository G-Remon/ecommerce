import { Eye, Heart, ShoppingCart, Star } from 'lucide-react';
import React, { useContext } from 'react';
import { CartContext } from '../../context/Card.Context/Card.context';
import { WishContext } from '../../context/wishContext/WishContext';
import { Link } from 'react-router-dom';

export default function Card(productInfo) {
    const { id, imageCover, title, category, description, price, ratingsAverage } =
        productInfo.productInfo;

    const { addToCart } = useContext(CartContext);
    const { wishList, addToWishList, removeFromWishList } = useContext(WishContext);

    const isInWishList = wishList.some((item) => item.id === id);

    function toggleWishList() {
        if (isInWishList) {
            removeFromWishList(id);
        } else {
            addToWishList(id);
        }
    }

    return (
        <div className='card bg-white shadow-2xl rounded-md overflow-hidden flex flex-col'>
            <div className='relative group'>
                <img className='w-full object-cover' src={imageCover} alt='Product' />

                {/* overlay desktop only */}
                <div className='hidden md:flex absolute inset-0 bg-gray-800/40 opacity-0 group-hover:opacity-100 items-center justify-center gap-4 transition-opacity'>
                    <Link to={`/productDetails/${id}`}>
                        <Eye className="bg-[#0aad0a] text-white w-10 h-10 cursor-pointer rounded-full hover:bg-white hover:text-[#0aad0a] transition-colors duration-300 p-2" />
                    </Link>

                    <ShoppingCart
                        className='bg-[#0aad0a] text-white w-10 h-10 cursor-pointer rounded-full hover:bg-white hover:text-[#0aad0a] transition-colors duration-300 p-2'
                        onClick={() => addToCart(id)}
                    />

                    <Heart
                        onClick={toggleWishList}
                        className={`w-10 h-10 cursor-pointer rounded-full p-2 ${isInWishList
                            ? 'bg-red-600 text-white'
                            : 'bg-[#0aad0a] text-white hover:bg-white hover:text-[#0aad0a]'
                            } transition-colors duration-300`}
                    />
                </div>
            </div>

            <div className='card-body p-4 flex-1'>
                <h2 className='card-title font-semibold text-xl line-clamp-1'>{title}</h2>
                <h3 className='text-[#0aad0a] font-semibold text-lg'>{category.name}</h3>
                <p className='line-clamp-2'>{description}</p>
            </div>

            <div className='under flex justify-between items-center p-4'>
                <h3>{price} EGY</h3>
                <div className='flex items-center gap-2'>
                    <Star className='text-amber-400' />
                    <h3 className='font-semibold'>{ratingsAverage}</h3>
                </div>
            </div>

            {/* actions for mobile only */}
            <div className='flex md:hidden justify-center items-center gap-4 p-4 border-t'>
                <Link to={`/productDetails/${id}`}>
                    <Eye className="bg-[#0aad0a] text-white w-10 h-10 cursor-pointer rounded-full hover:bg-white hover:text-[#0aad0a] transition-colors duration-300 p-2" />
                </Link>

                <ShoppingCart
                    className='bg-[#0aad0a] text-white w-10 h-10 cursor-pointer rounded-full hover:bg-white hover:text-[#0aad0a] transition-colors duration-300 p-2'
                    onClick={() => addToCart(id)}
                />

                <Heart
                    onClick={toggleWishList}
                    className={`w-10 h-10 cursor-pointer rounded-full p-2 ${isInWishList
                        ? 'bg-red-600 text-white'
                        : 'bg-[#0aad0a] text-white hover:bg-white hover:text-[#0aad0a]'
                        } transition-colors duration-300`}
                />
            </div>
        </div>
    );
}
