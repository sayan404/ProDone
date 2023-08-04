import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productReducer, productDetailReducer, newReviewReducer, newProductReducer, productsReducer, reviewReducer, productReviewsReducer } from "./Reducers/ProductReducer"
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from "./Reducers/UserReducer"
import { cartReducer } from "./Reducers/CartReducer"
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./Reducers/OrderReducer"


const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrder : myOrdersReducer,
    orderDetails : orderDetailsReducer ,
    newReview : newReviewReducer,
    allOrders: allOrdersReducer,
    allUsers: allUsersReducer,
    product: productsReducer, // for admin routes
    newProduct: newProductReducer,
    order : orderReducer,
    userDetails : userDetailsReducer,
    review : reviewReducer,
    productReviews : productReviewsReducer
})

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        shippingInfo : localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {}
    }
}
const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store


// 114 
// 139