import axios from "axios";
import { createContext, useContext, useState } from "react";
import { TokenContext } from "../Token.context";
import toast from "react-hot-toast";
import Loading from './../../Component/Loading/Loading';


export const CartContext = createContext(null);

export default function CartProvider({ children }) {
    const { token } = useContext(TokenContext);

    const [CartInfo, SetCartInfo] = useState(null)


    // Add to cart

    async function addToCart(id) {
        const loading = toast.loading('Loading..')
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "POST",
                data: {
                    productId: id,
                },
                headers: {
                    token: token,
                },
            }
            const { data } = await axios.request(options);
            addAllProducts()
            if (data.status === "success") {
                console.log(data);
                toast.success(data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error("Error");
        }
        finally {
            toast.dismiss(loading)
        }
    }







    // add to card
    async function addAllProducts() {
        const options = {
            url: 'https://ecommerce.routemisr.com/api/v1/cart',
            method: 'GET',
            headers: {
                token: token
            }

        }
        const { data } = await axios.request(options)
        SetCartInfo(data)
    }



    // Remove button
    async function RemoveFromCart(productID) {
        const loading = toast.loading("Loading..")

        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart/${productID}`,
                method: "DELETE",
                headers: {
                    token: token
                }
            }
            const { data } = await axios.request(options)
            toast.success("Removed Success")
            SetCartInfo(data)
        } catch (error) {
            console.log(error)
            toast.error('Error...')
        } finally {
            toast.dismiss(loading)
        }

    }







    // Clear button
    async function ClearData() {
        const loading = toast.loading("Loading..")


        try {
            const options = {
                url: 'https://ecommerce.routemisr.com/api/v1/cart',
                method: "DELETE",
                headers: {
                    token: token
                }
            }
            const { data } = await axios.request(options);
            console.log(data);
            
            toast.success("Clear All Products")
            addAllProducts({
                numOfCartItems: 0
            })
        } catch (error) {
            console.log(error)
            toast.error('Error...')
        } finally {
            toast.dismiss(loading)
        }
    }




    // Updateeeeee
    async function updateCart(productID, count) {
        const loadingID = toast.loading("Updating cart...");
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart/${productID}`,
                method: "PUT",
                headers: {
                    token: token
                },
                data: {
                    count,
                },
            };
            const { data } = await axios.request(options);
            toast.success("Cart updated");
            SetCartInfo(data);
        } catch (error) {
            console.log(error);
            toast.error("Error updating cart");
        } finally {
            toast.dismiss(loadingID);
        }
    }



    


    return (
        <CartContext.Provider value={{ addToCart, addAllProducts, CartInfo, RemoveFromCart, ClearData, updateCart }}>
            {children}
        </CartContext.Provider>
    );
}
