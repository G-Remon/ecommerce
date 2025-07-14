import { Eye, Heart, ShoppingCart, Star } from 'lucide-react';
import React, { useContext, useRef } from 'react';
import { CartContext } from '../../context/Card.Context/Card.context';
import { WishContext } from '../../context/wishContext/WishContext';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';

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

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, threshold: 0.2 });

    return (
        <motion.div
            ref={ref}
            className='card bg-white shadow-2xl rounded-md overflow-hidden flex flex-col'
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}

        >
            <div className='relative group'>
                <motion.img
                    className='w-full object-cover'
                    src={imageCover}
                    alt='Product'

                    transition={{ duration: 0.3 }}
                />

                <div className='hidden md:flex absolute inset-0 bg-gray-800/40 opacity-0 group-hover:opacity-100 items-center justify-center gap-4 transition-opacity'>
                    <Link to={`/productDetails/${id}`}>
                        <motion.div>
                            <Eye className="bg-[#0aad0a] text-white w-10 h-10 cursor-pointer rounded-full hover:bg-white hover:text-[#0aad0a] transition-colors duration-300 p-2" />
                        </motion.div>
                    </Link>

                    <motion.div>
                        <ShoppingCart
                            className='bg-[#0aad0a] text-white w-10 h-10 cursor-pointer rounded-full hover:bg-white hover:text-[#0aad0a] transition-colors duration-300 p-2'
                            onClick={() => addToCart(id)}
                        />
                    </motion.div>

                    <motion.div>
                        <Heart
                            onClick={toggleWishList}
                            className={`w-10 h-10 cursor-pointer rounded-full p-2 ${isInWishList
                                ? 'bg-red-600 text-white'
                                : 'bg-[#0aad0a] text-white hover:bg-white hover:text-[#0aad0a]'
                                } transition-colors duration-300`}
                        />
                    </motion.div>
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

            <div className='flex md:hidden justify-center items-center gap-4 p-4 border-t'>
                <Link to={`/productDetails/${id}`}>
                    <motion.div>
                        <Eye className="bg-[#0aad0a] text-white w-8 h-8 cursor-pointer rounded-full hover:bg-white hover:text-[#0aad0a] transition-colors duration-300 p-2" />
                    </motion.div>
                </Link>

                <motion.div>
                    <ShoppingCart
                        className='bg-[#0aad0a] text-white w-8 h-8 cursor-pointer rounded-full hover:bg-white hover:text-[#0aad0a] transition-colors duration-300 p-2'
                        onClick={() => addToCart(id)}
                    />
                </motion.div>

                <motion.div>
                    <Heart
                        onClick={toggleWishList}
                        className={`w-8 h-8 cursor-pointer rounded-full p-2 ${isInWishList
                            ? 'bg-red-600 text-white'
                            : 'bg-[#0aad0a] text-white hover:bg-white hover:text-[#0aad0a]'
                            } transition-colors duration-300`}
                    />
                </motion.div>
            </div>
        </motion.div>
    );
}
