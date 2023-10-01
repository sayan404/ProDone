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
            "url": "https://previews.dropbox.com/p/thumb/ACC6AmKqtYw1tFMEdYRNfr1iX4Fc8Khgz55IXAZN4ItIEJvb5fr-0M4fwpBTAuYwpebCnMVpUzp8b9qP_vdJtPcjhFOcIqDAI2nMmNWqy05QaUtZlTyHiAzYub-X99m3t5NGMCDw3G4z5AUirEXtMteSzBRCxAxVygBLHBlBlgnaLJvOLvcLmnYd-ai2pwT5UD9il5ISpGTctmJA0oEm1ukl-zmhRHCjpP_zvPY6MRXX_VZzTlediYe-mpeDTXPoZlVfXB4c1k0M70qmuvtVACs2NhPqY_7wDmxjajny11xzRpdqGQmVosMOUkiskqxbYlXxZcfBUYIw4pA4AkOVie1I/p.png",
            "title": "Image 1 for carousel"
        },
        {
            "url": "https://previews.dropbox.com/p/thumb/ACCS31rCI9uXWAVLla_8Dd0G76kI_lKptXKgNAPqYvH5stGKWTuN6_iO3uBBXAISeS7pqi4uRTOWi9aU1gSfF5t2lYgcBW7Shc5Lh3cLlGCY9IcwfMpxXslbe6_MZA7NU91G1Wihsx9sDJ1-w2MgIrAKWYlQiS8beecFJyG9k3SFB3GNa1SEftFZ7Yip3l3gtd672bd6BgYezSk8z2TE4P8IsU_0TBKezZxwy-DhPiSOwdmWUXZ71ISGBzX3ENmyVEHRgIvOD8lAP3BKMrWbqd_pAQLzT-2iYdGc2wwZNC9wuvc4SQjN5I16_ligeobFdINPi5bPzndDwvbiWVqN9_ko/p.png",
            "title": "Image 2 for carousel"
        },
        {
            "url": "https://previews.dropbox.com/p/thumb/ACAcjRbDYO0t4-nGadiQRsfjXxhngzH8_2qaXLlkagocOGQQe2PjEiT-SrpKgtXL3T5hYTpsKsHm8_cEU7rRgf6BJhbPyyNJZbDJ2SvgNDZbCKIIStcHmCZXAeZaCM_pCVzkEeLLHmv0qFO-9ge7fyY9NeMNwxBZGZcMKgSiMuCqdtev_mXA5U47lFn2d0rN-YS39A_DiWNT22msUZjrU7ypOl1mEfI9_xm0Gul5-qsWPS_g1tvQttafzugSuLPA2d-U9bGAEORR6UYl1Xm7uh4MhG1_wThb5U4rrVBy94n6pX81V7QM0kgMGUDzVCH8lkT639GvOiHW8RmhLaRMo8Je2pSCpQQsJY7ZQeE7Bg31899s3zUlCRoXSHJEQg7jjunQE9oqTP9_JpR6C8Hgm-iRz7GIKOoD-jbKIb4YwwdRrEuqZPKAl9j9PnG7F5q1b0RT4CEafK9_YBFuNRIEI9H9/p.png",
            "title": "Image 3 for carousel"
        },
        {
            "url": "https://previews.dropbox.com/p/thumb/ACB7kfUSwFUQYfSHc37r0FUjG8SVyHsOXO4gIFaqLsWXJJgf3apGs1duyZaSBC8T6DHLoX_B2ZU8gKvT2BFzfU2lVGIAYtADJwMf7i78eza-mAqbwmszWqgp67jEjMemTJUmgHKJW_cK_so9fT12FkxH9lTFTIvKQ4ARWZDpHz3LQOfNiQ1Qp2hzWIrE34T2nsxd5mWbpXe0UqXzY0oH2RBJLvKzeRI2snZCRBbKG03ZPxScDH_Zz-F9rbaj4FO0p6554G8NhvCN3Xvz1a38K2CvPvc6cQ4JduI7_29T08x_KOenjCiVXmwQIuoWa3gbywHbIUse9L3xvsj4qDf-zmt5/p.png",
            "title": "Image 4 for carousel"
        },
        {
            "url": "https://previews.dropbox.com/p/thumb/ACBpcmKBFi0dYhSZ_KZpe3rj6O66tuqpeSSDC3sSIAt1I059Vz-sYWC8nfHU0XjXgjJVl0BMCXhpsqvbQCVbcNFYdwmvPvqYesC_b49yn1yNeYk-CtML9s0rUx48DuR42cOUTi2QNox8YfwoOZz6qmJYZua87JU8_X6KTSCMdE4BlUgCHpLitfMSCiaroRCjL4rVZiG08r_pOK0FNzQEWggwzV7jjO_Oy-skSsmDVw5zOD_PNiStlm_4-Ay4hIZ-wqV5aHQaVVQiNfAkkvI_1MGhPoCm1A64Z43MH57eTwo0tcZMzM-hVSBoScMECNgNmfzwyiF62BGrkGbrk-yISmYy/p.png",
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
