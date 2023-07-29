import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getProduct } from '../../Actions/ProductAction'
import ProductCard from './ProductCard'
import './Product.css'
import { useAlert } from 'react-alert'
import errorpic from '../../Asset/productError.png'
import { useParams } from 'react-router-dom'
import { Pagination } from '@mui/material'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import MetaData from '../Layout/MetaData'
const categories = [
    "T-Shirt",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Watch",
    "SmartPhones",
    "All"
]

const Product = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [ratings, setRatings] = useState(0)
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState([0, 50000])

    const alert = useAlert()
    const dispatch = useDispatch()
    const params = useParams()
    const keyword = params.keyword
    const { error, products, resultPerPage, totalNoOfProducts } = useSelector(state => state.products) // to access the data from redux dev tool
    // productsCountAfterAllFilters
    const setCurrentPageNo = (e, val) => {
        e.preventDefault()
        setCurrentPage(val)
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getProduct(keyword, currentPage, price, category, ratings))
    }, [dispatch, error, alert, keyword, currentPage, price, ratings, category])


    const priceHandler = (event, newPrice) => {
        setPrice(newPrice)
    }
    return (
        <div className='mainContainerProduct'>
            <MetaData title="PRODUCTS" />
            <h2 className="homeHeading">Featured Products</h2>
            <div className='container'>

                <div className='filterContainer'>
                    <Box sx={{ display: 'flex', flexDirection: 'column', padding: '30px 0' }}>
                        <p className='filterText-1'>PRICE</p>
                        <div className='priceSlider'><Slider
                            size="small"
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            min={0}
                            max={50000}
                            disableSwap
                        />
                        </div>

                    </Box> <div className='filterText' >CATEGORIES</div>
                    <ul className="categoryBox">
                        {categories.map((category) => (
                            <li
                                className="category-link"
                                key={category}
                                onClick={() => { category === "All" ? setCategory("") : setCategory(category) }}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>

                    <Box>
                        <div className='filterText'>RATINGS ABOVE</div>
                        <div className='ratingSlider'><Slider
                            size='small'
                            value={ratings}
                            onChange={(e, newRating) => {
                                setRatings(newRating)
                            }}
                            aria-labelledby="continuous-slider"
                            valueLabelDisplay="auto"
                            min={0}
                            max={5}
                        />
                        </div>
                    </Box>
                </div>
                <div className="Productcontainer">
                    {products ?
                        <>
                            {
                                products.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}

                        </> :
                        <div className='midarea'>
                            <img src={errorpic} alt='error' style={{ height: "100%", width: "100%" }} />
                        </div>

                    }
                </div>
            </div>
            {totalNoOfProducts ?
                (<div className='pagination'>
                    <Pagination count={Math.ceil(totalNoOfProducts / resultPerPage)} variant="contained" color="primary" onChange={setCurrentPageNo} page={currentPage} />
                </div>) : (<></>)}
        </div>
    )
}

export default Product

// "proxy": "http://192.168.0.131:8080"
// "proxy": "http://192.168.146.118:8080"