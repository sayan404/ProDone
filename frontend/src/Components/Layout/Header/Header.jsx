import React from 'react'
import logo from '../../../Asset/logo-top.png'
import './Header.css'
import SearchBox from './SearchBox'

export const Header = () => {
    // const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className='nav'>
            <div className='mainnavbarcontainer'>
                <div className='fake'></div>
                <div className='logoImage'>
                    <img src={logo} width={90} height={35} alt='logo' />
                </div>
                <div className='searchbar'>
                    <SearchBox />
                </div>
            </div>
            <div className='hamburger' style={{ transition: " 0.2s ease" }}>
            </div>
        </nav >
    )
}

