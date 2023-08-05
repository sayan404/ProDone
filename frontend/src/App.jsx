import './App.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import WebFont from 'webfontloader'
import { Header } from './Components/Layout/Header/Header'
// import { Footer } from './Components/Layout/Footer/Footer'
import { Home } from './Components/Home/Home'
import { Route, Routes } from 'react-router-dom'
import Product from './Components/Product/Product'
import ProductDetails from './Components/Product/ProductDetails'
import LoginSignUp from './Components/User/LoginSignup'
import store from './Store'
import { loadUser } from './Actions/userAction'
import UserOptions from './Components/Layout/Header/UserOptions'
import ProtectedRoute from './Components/Route/ProtectedRoute'
import Profile from './Components/User/Profile'
import UpdateProfile from './Components/User/UpdateProfile'
import UpdatePassword from './Components/User/UpdatePassword'
import ForgotPassword from './Components/User/FoegotPassword'
import ResetPassword from './Components/User/ResetPassword'
import Cart from './Components/Cart/Cart'
import ShippingInfo from './Components/Cart/ShippingInfo'
import ConfirmOrder from './Components/Cart/ConfirmOrder'
import Payment from './Components/Cart/Payment'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import MyOrders from './Components/Order/MyOrders'
import OrderDetails from './Components/Order/OrderDetails'
// E:\codes\Prodone\frontend\src\Order\OrderDetails.jsx
import Dashboard from './Components/Admin/Dashboard'
import ProductList from './Components/Admin/ProductList'
import NewProduct from './Components/Admin/NewProduct'
import UpdateProduct from './Components/Admin/UpdateProduct'
import ProcessOrder from './Components/Admin/ProcessOrder'
import OrderList from './Components/Admin/OrderList'
import UserList from './Components/Admin/UserList'
import UpdateUser from './Components/Admin/UpdateUser'
import ProductReviews from './Components/Admin/ProductReviews'
import OrderSuccess from './Components/Cart/OrderScuccess'

function App() {
  // const { isAuthenticated, user } = useSelector((state) => state.user)

  const [stripeApiKey, setStripeApiKey] = useState("")

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey")
    console.log(data)
    setStripeApiKey(data.stripeApiKey)
  }
  const stripePromise = loadStripe(stripeApiKey)


  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
    getStripeApiKey()
    store.dispatch(loadUser()) // to store the cirrent logged in state of user 
  }, [])
  // const { isAuthenticated, user } = useSelector((state) => state.user)
  return (
    <div className='main'>
      <Header />
      <UserOptions />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/products/:keyword' element={<Product />} />
        <Route exact path='/products' element={<Product />} />
        <Route exact path='/product/:id' element={<ProductDetails />} />
        <Route path='/login' element={<LoginSignUp />} />
        <Route element={<ProtectedRoute />} >
          <Route path='/account' element={<Profile />} />
        </Route>
        <Route element={<ProtectedRoute />} >
          <Route path='/me/update' element={<UpdateProfile />} />
        </Route>
        <Route element={<ProtectedRoute />} >
          <Route path='/password/update' element={<UpdatePassword />} />
        </Route>
        <Route element={<ProtectedRoute />} >
          <Route path='/login/shipping' element={<ShippingInfo />} />
        </Route>
        <Route element={<ProtectedRoute />} >
          <Route path='/order/confirm' element={<ConfirmOrder />} />
        </Route>
        <Route element={<ProtectedRoute />} >
          <Route path="/success" element={<OrderSuccess />} />
        </Route>
        <Route >
          <Route path='/password/forgot' element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
        </Route>
        <Route path="/cart" element={<Cart />} />

        <Route element={<ProtectedRoute />} >
          <Route path='/process/payment' element={<Elements stripe={stripePromise}><Payment /></Elements>} />
        </Route>
        <Route element={<ProtectedRoute />} >
          <Route path="/orders" element={<MyOrders />} />
        </Route>
        <Route element={<ProtectedRoute />} >
          <Route path="/order/:id" element={<OrderDetails />} />
        </Route>
        <Route path="/admin/dashboard" element={<ProtectedRoute isAdmin={true}><Dashboard /></ProtectedRoute>} />

        <Route path="/admin/products" element={<ProtectedRoute isAdmin={true} ><ProductList /></ProtectedRoute>} />

        <Route path="/admin/product" element={<ProtectedRoute isAdmin={true}><NewProduct /></ProtectedRoute>} />

        <Route path="/admin/product/:id" element={<ProtectedRoute isAdmin={true}><UpdateProduct /></ProtectedRoute>} />

        <Route path="/admin/order/:id" element={<ProtectedRoute isAdmin={true}><ProcessOrder /></ProtectedRoute>} />

        <Route path="/admin/orders" element={<ProtectedRoute isAdmin={true}><OrderList /></ProtectedRoute>} />

        <Route path="/admin/users" element={<ProtectedRoute isAdmin={true}><UserList /></ProtectedRoute>} />

        <Route path="/admin/user/:id" element={<ProtectedRoute isAdmin={true}><UpdateUser /></ProtectedRoute>} />

        <Route path="/admin/reviews" element={<ProtectedRoute isAdmin={true}><ProductReviews /> </ProtectedRoute>} />

      </Routes>

      {/* <Footer /> */}
    </div>
  )
}

export default App
