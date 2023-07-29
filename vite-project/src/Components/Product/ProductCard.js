import React from "react"
import { Link } from "react-router-dom"
import { Rating } from "@mui/lab"
import "./ProductCard.css"
import { useSelector } from "react-redux"
import Loader from "../Layout/Loader/Loader"
const ProductCard = ({ product }) => {

  const { loading } = useSelector(state => state.products) // to access the data from redux dev tool

  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  }
  return (
    loading ? <Loader/> :
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <Rating {...options} />{" "}
        <span className="productCardSpan">
          {" "}
          ({product.numOfReviews} Reviews)
        </span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  )
}

export default ProductCard