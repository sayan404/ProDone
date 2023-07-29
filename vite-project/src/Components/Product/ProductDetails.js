import React, { useEffect, useState } from 'react'
import './ProductDetails.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import { useSelector, useDispatch } from "react-redux"
import { clearErrors, getProductDetails} from "../../Actions/ProductAction"
import { useParams } from "react-router-dom"
import Loader from '../Layout/Loader/Loader'
import MetaData from "../Layout/MetaData"
import { Rating } from "@mui/lab"
import ReviewCard from './ReviewCard'
import { addItemsToCart } from "../../Actions/CartAction"
import { useAlert } from "react-alert"
const ProductDetails = () => {
    const alert = useAlert()
    const [quantity, setQuantity] = useState(1)
    const [open, setOpen] = useState(false)
    // const [rating, setRating] = useState(0)
    // const [comment, setComment] = useState("")
    const params = useParams()
    const increaseQuantity = () => {
        if (product.Stock <= quantity) return
        const qty = quantity + 1
        setQuantity(qty)
    }


    const decreaseQuantity = () => {
        if (1 >= quantity) return

        const qty = quantity - 1
        setQuantity(qty)
    }

    const addToCartHandler = () => {
        dispatch(addItemsToCart(params.id, quantity))
        alert.success("Item Added To Cart")
    }

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true)
    }

    const dispatch = useDispatch()
   
    const { product, loading, error } = useSelector(state => state.productDetails)
    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    }

    useEffect(() => {
        if (error) {
             alert.error(error)
             dispatch(clearErrors())  // Using this as we want not to return the error rather we are showing the error in ui and clearing the error from the array
        }
        dispatch(getProductDetails(params.id))
        // console.log(product)
        // console.log(params.id)
    }, [params.id, dispatch , error , alert])
    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <MetaData title={`${product.name}`} />
                    <div className="ProductDetails">
                        <div>
                            <Carousel className='CarouselImage' showArrows={true} showThumbs={true} showStatus={false}>
                                {product.images &&
                                    product.images.map((item, i) => (
                                        <div className='productImage'>
                                            <img key={i} src={item.url} alt={`${i} Slide`} />
                                        </div>
                                    ))}
                            </Carousel>
                        </div>
                        <div>
                            <div className="firstSegment">
                                <h2>{product.name}</h2>
                                <p>Product # {product._id}</p>
                            </div>
                            <div className="secondSegment">
                                <Rating {...options} />
                                <span className="secondSegment-span">
                                    ({product.numOfReviews} Reviews)
                                </span>
                            </div>
                            <div className="thirdSegment">
                                <h1>{`₹${product.price}`}</h1>
                                <div className="thirdSegment-1">
                                    <div className="thirdSegment-1-1">
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input readOnly type="number" value={quantity} />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>
                                    <button
                                        disabled={product.Stock < 1 ? true : false}
                                        onClick={addToCartHandler}
                                    >
                                        ADD TO CART
                                    </button>
                                </div>

                                <p>
                                    Status:
                                    <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                        {product.Stock < 1 ? "OutOfStock" : "InStock"}
                                    </b>
                                </p>
                            </div>

                            <div className="fourthSegment-4">
                                Description : <p>{product.description}</p>
                            </div>

                            <button onClick={submitReviewToggle} className="submitReview">
                                Submit Review
                            </button>
                        </div>
                    </div>

                </>
            )
            }
            {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </>
    )
}
export default ProductDetails