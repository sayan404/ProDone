import './App.css';
import React, { useEffect , useState } from 'react';
import axios from 'axios';
import WebFont from 'webfontloader'
import { Header } from './Components/Layout/Header/Header';
// import { Footer } from './Components/Layout/Footer/Footer';
import { Home } from './Components/Home/Home';
import { Route, Routes } from 'react-router-dom';
import Product from './Components/Product/Product';
import ProductDetails from './Components/Product/ProductDetails';
import LoginSignUp from './Components/User/LoginSignup';
import store from './Store'
import { loadUser } from './Actions/userAction';
import UserOptions from './Components/Layout/Header/UserOptions'
// import { useSelector } from 'react-redux';
import ProtectedRoute from './Components/Route/ProtectedRoute';
import Profile from './Components/User/Profile';
import UpdateProfile from './Components/User/UpdateProfile';
import UpdatePassword from './Components/User/UpdatePassword';
import ForgotPassword from './Components/User/FoegotPassword';
import ResetPassword from './Components/User/ResetPassword';
import Cart from './Components/Cart/Cart';
import ShippingInfo from './Components/Cart/ShippingInfo';
import ConfirmOrder from './Components/Cart/ConfirmOrder';
import Payment from './Components/Cart/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';



function App() {

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey")
    console.log(data);
    setStripeApiKey(data.stripeApiKey);
  }
  const stripePromise = loadStripe(stripeApiKey)

  
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
    getStripeApiKey()
    console.log(stripeApiKey);
    console.log(stripePromise);
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
        <Route >
          <Route path='/password/forgot' element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
        </Route>
        <Route path="/cart" element={<Cart />} />

        <Route element={<ProtectedRoute />} >
        <Route  path='/process/payment'  element= {<Elements stripe={stripePromise}><Payment /></Elements>} />
        </Route>
      </Routes>
     
      {/* <Footer /> */}
    </div>
  )
}

export default App;
