import { Accessibility, BadgeSwissFranc } from "lucide-react"
import { Navigate, RouterProvider, createHashRouter } from "react-router-dom";
import Layout from "./assets/Component/Layout/Layout"
import Home from './assets/Pages/Home/Home';
import Login from './assets/Pages/Login/Login';
import Register from './assets/Pages/Register/Register';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Toaster } from "react-hot-toast";
import ForgetPass from "./assets/Pages/ForgetPass/ForegtPass";
import Verify from "./assets/Pages/Verify/Verify";
import ResetPass from "./assets/Pages/Reset Pass/ResetPass";
import Protected from "./assets/Component/Protected/Protected";
import GuardRout from "./assets/Component/GuardRout/GuardRout";
import TokenProvider from "./assets/context/Token.context";
import CartProvider from "./assets/context/Card.Context/Card.context";
import AddCart from "./assets/Pages/AddCart/AddCart";
import ProductDetails from "./assets/Pages/ProductDetails/ProductDetails";
import "react-image-gallery/styles/css/image-gallery.css";
import Category from "./assets/Pages/Category/Category";
import SubCat from "./assets/Pages/SubCat/SubCat";
import Products from "./assets/Pages/Products/Products";
import Brands from "./assets/Pages/Brands/Brands";
import CheckOut from "./assets/Pages/CheckOut/CheckOut";
import Orders from "./assets/Pages/Orders/Orders";
import WishList from "./assets/Pages/WishList/WishList";
import WishProvider from "./assets/context/wishContext/WishContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const Routers = createHashRouter([
  {
    path: "/",
    element: <Protected><Layout /></Protected>,
    children: [
      { index: true, element: <Navigate to="home" /> },
      { path: "home", element: <Home /> },
      { path: "AddCart", element: <AddCart /> },
      { path: "productDetails/:id", element: <ProductDetails /> },
      { path: "category", element: <Category /> },
      { path: "SubCat/:_id", element: <SubCat /> },
      { path: "products", element: <Products /> },
      { path: "brands", element: <Brands /> },
      { path: "CheckOut", element: <CheckOut /> },
      { path: "AllOrders", element: <Orders /> },
      { path: "WishList", element: <WishList /> },
    ]
  },
  {
    path: "",
    element: <GuardRout><Layout /></GuardRout>,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "ForgetPass", element: <ForgetPass /> },
      { path: "verify", element: <Verify /> },
      { path: "ResetPass", element: <ResetPass /> },
    ]
  }
])

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TokenProvider>
        <CartProvider>
          <WishProvider>
            <RouterProvider router={Routers} />
            <Toaster />
          </WishProvider>
        </CartProvider>
      </TokenProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
