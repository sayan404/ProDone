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
    }, [error, alert])
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
            "url": "https://picsum.photos/seed/img1/600/400",
            "title": "Image 1 for carousel"
        },
        {
            "url": "https://picsum.photos/seed/img2/600/400",
            "title": "Image 2 for carousel"
        },
        {
            "url": "https://picsum.photos/seed/img3/600/400",
            "title": "Image 3 for carousel"
        },
        {
            "url": "https://picsum.photos/seed/picsum/200/300",
            "title": "Image 4 for carousel"
        },
        {
            "url": "https://picsum.photos/200/300/",
            "title": "Image 5 for carousel"
        },
        {
            "url": "https://picsum.photos/200/300/",
            "title": "Image 5 for carousel"
        },
        {
            "url": "https://picsum.photos/200/300/",
            "title": "Image 5 for carousel"
        },
        {
            "url": "https://picsum.photos/200/300/",
            "title": "Image 5 for carousel"
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
