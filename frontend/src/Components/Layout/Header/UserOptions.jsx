import './UserOptions.css'
import * as React from 'react'
import Box from '@mui/material/Box'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import DashboardIcon from '@mui/icons-material/Dashboard'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import ListAltIcon from '@mui/icons-material/ListAlt'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { logout } from '../../../Actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import Backdrop from '@mui/material/Backdrop'
import HomeIcon from '@mui/icons-material/Home'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import CallIcon from '@mui/icons-material/Call';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

const UserOptions = () => {
    const { isAuthenticated, user } = useSelector((state) => state.user)
    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const { cartItems } = useSelector((state) => state.cart)
    const actionsForLoogedInUsers = [
        { icon: <VpnKeyIcon />, name: 'Login/Register', func: loginUser },
        { icon: <HomeIcon />, name: 'Home', func: home },
        { icon: <LocalMallIcon />, name: 'Products', func: products },
        { icon: <CallIcon />, name: 'Contact', func: contactUs },
        { icon: <ListAltIcon />, name: 'Orders', func: orders },
        { icon: <EmojiEmotionsIcon />, name: 'Profile', func: account },
        { icon: <ShoppingCartIcon style={{ color: cartItems.length > 0 ? "skyblue" : "unset" }} />, name: `Cart(${cartItems.length})`, func: cart },
        { icon: <ExitToAppIcon />, name: 'Logout', func: logoutUser }

    ]
    
    if (isAuthenticated && user && user.role === "admin") {
        actionsForLoogedInUsers.push({       // unshift inserts elements at the starting of the array
            icon: <DashboardIcon />,
            name: "Dashboard",
            func: dashboard,
        })
        console.log("1");
    }
    function dashboard() {
        navigate('/admin/dashboard')
    }
    function orders() {
        navigate('/orders')
    }
    function account() {
        navigate('/account')
    }
    function cart() {
        navigate('/cart')
    }
    function logoutUser() {
        dispatch(logout())
        navigate('/login')
        alert.success("Logout Successfully")
    }
    
    // for Visitors only
    const actionsForVisitors = [
        { icon: <VpnKeyIcon />, name: 'Login/Register', func: loginUser },
        { icon: <HomeIcon />, name: 'Home', func: home },
        { icon: <LocalMallIcon />, name: 'Products', func: products },
        { icon: <CallIcon />, name: 'Products', func: contactUs }
        
    ]
    
    function home() {
        navigate('/')
    }
    function loginUser() {
        navigate('/login')
    }
    function products() {
        navigate('/products')
    }
    function contactUs() {
        navigate('/contact')
    }
    const showMenuHandler= () => {
       open ?  setOpen(false) : setOpen(true)
    }
   

    return (<>
        {isAuthenticated && user ? (<> <Backdrop open={open} style={{ zIndex: "4" }} />
            <Box sx={{ height: '100%', transform: 'translateZ(0px)', flexGrow: 1 }} className='speedDial'>
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    icon={<img src={user.avatar.url ? user.avatar.url : "/Profile.png"} className='speedDialIcon' alt='Profile' />}
                    onClick={showMenuHandler}
                    open={open}
                    direction='down'
                    // className='speedDialOrg'               
                >
                    {actionsForLoogedInUsers.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={action.func}
                        />
                    ))}
                </SpeedDial>
            </Box>
        </>) : (<> <Backdrop open={open} style={{ zIndex: "4" }} />
            <Box sx={{ height: '100%', transform: 'translateZ(0px)', flexGrow: 1 }} className='speedDial'>
                <SpeedDial              
                    ariaLabel="SpeedDial basic example"
                    icon={<MenuOpenIcon/>}
                    onClick={showMenuHandler}
                    open={open}
                    direction='down'
                    className='speedDialOrg'
                   
                >
                    {actionsForVisitors.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={action.func}
                        />
                    ))}
                </SpeedDial>
            </Box>
        </>)
        }
    </>
    )
}

export default UserOptions