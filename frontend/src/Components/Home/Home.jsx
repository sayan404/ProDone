import React, { useEffect } from 'react'
import './Home.css'
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { ImageSlider } from '../Layout/ImageSlider/ImageSlider';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import Loader from '../Layout/Loader/Loader';
import { useAlert } from 'react-alert';
import { clearErrors } from '../../Actions/ProductAction';

export const Home = () => {
    const alert = useAlert()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading, error } = useSelector(state => state.products) // to access the data from redux dev tool

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
    }, [error, alert , dispatch])
    const containerStyles = {
        width: "80vw",
        height: "88vh",
        margin: "10vmin auto",
    };

    const clickHandler = (e) => {
        e.preventDefault()
        navigate("/products")
    }

 const slides = [
        {
            "url": "https://res-console.cloudinary.com/ddk2c5zo1/thumbnails/transform/v1/image/upload/Y19saW1pdCxoXzE2MDAsd18xNjAwLGZfanBnLGZsX2xvc3N5LmFueV9mb3JtYXQucHJlc2VydmVfdHJhbnNwYXJlbmN5LnByb2dyZXNzaXZl/v1/b2ZmZXJzL3V5MXlxY3RneXN3ZzJ2aW5xeXlo/template_primary",
            "title": "Image 1 for carousel"
        },
        {
            "url": "https://res-console.cloudinary.com/ddk2c5zo1/thumbnails/transform/v1/image/upload/Y19saW1pdCxoXzE2MDAsd18xNjAwLGZfanBnLGZsX2xvc3N5LmFueV9mb3JtYXQucHJlc2VydmVfdHJhbnNwYXJlbmN5LnByb2dyZXNzaXZl/v1/b2ZmZXJzL3ljeGNqb3ZjcGluc3JlNDNldGJj/template_primary",
            "title": "Image 2 for carousel"
        },
        {
            "url": "https://res-console.cloudinary.com/ddk2c5zo1/thumbnails/transform/v1/image/upload/Y19saW1pdCxoXzE2MDAsd18xNjAwLGZfanBnLGZsX2xvc3N5LmFueV9mb3JtYXQucHJlc2VydmVfdHJhbnNwYXJlbmN5LnByb2dyZXNzaXZl/v1/b2ZmZXJzL3Vhb2VjemZidWtyNXd6em9mMDVs/template_primary",
            "title": "Image 3 for carousel"
        },
        {
            "url": "https://res-console.cloudinary.com/ddk2c5zo1/thumbnails/transform/v1/image/upload/Y19saW1pdCxoXzE2MDAsd18xNjAwLGZfanBnLGZsX2xvc3N5LmFueV9mb3JtYXQucHJlc2VydmVfdHJhbnNwYXJlbmN5LnByb2dyZXNzaXZl/v1/b2ZmZXJzL2hwaHRrY2VqbWkxcWIwc2Y4cWJj/template_primary",
            "title": "Image 4 for carousel"
        },
        {
            "url": "https://res-console.cloudinary.com/ddk2c5zo1/thumbnails/transform/v1/image/upload/Y19saW1pdCxoXzE2MDAsd18xNjAwLGZfanBnLGZsX2xvc3N5LmFueV9mb3JtYXQucHJlc2VydmVfdHJhbnNwYXJlbmN5LnByb2dyZXNzaXZl/v1/b2ZmZXJzL2xzdHpyejd5MWc5eXRzbmRna3Vi/template_primary",
            "title": "Image 5 for carousel"
        },
        {
            "url": "https://res-console.cloudinary.com/ddk2c5zo1/thumbnails/transform/v1/image/upload/Y19saW1pdCxoXzE2MDAsd18xNjAwLGZfanBnLGZsX2xvc3N5LmFueV9mb3JtYXQucHJlc2VydmVfdHJhbnNwYXJlbmN5LnByb2dyZXNzaXZl/v1/b2ZmZXJzL2VraHFlaWxyZ2t3Mnl2c2s4d3Vr/template_primary",
            "title": "Image 6 for carousel"
        }
    ]
    return (
        <>{
            loading ? <Loader /> :
                <div className='bannerMain'>
                    <div className='heading'>
                        <p>Welcome to ProDone</p>
                    </div>
                    <div className='sliderArea' style={containerStyles}>
                        <ImageSlider slides={slides} parentWidth={1300} />
                    </div>
                    <div className='restOfSec' >
                        <p></p>
                        <div className='sliderImagesSection'></div>
                        <h1>FIND AMAZING PRODUCTS BELOW</h1>
                        <div className='scrool' onClick={clickHandler} >
                            <button >
                                <DirectionsRunIcon sx={{ fontSize: 30, color: "#4046de" }} />
                                <p>  Run </p>
                            </button>
                        </div>
                    </div>
                </div>
        }
        </>
    )
}
