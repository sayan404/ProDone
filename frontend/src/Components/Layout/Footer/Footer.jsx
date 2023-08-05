import React from 'react'
import logo from '../../../Asset/ProDoneLogoTSPcrop.png'
import './Footer.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
export const Footer = () => {
    return (
        <footer id='footer'>
            <div className='leftFooter' >
                <div className='logo'>
                    <img src={logo} width={130} height={80} alt='logo' />
                </div>
                <div className='companyName'>
                    <p>An Ecommarce </p>
                    <p> &nbsp;Website <span role='img' aria-label='spider' >🕸️</span> </p>
                </div>
            </div>
            <div className='midFooter' >
                M A D E W I T H  <span role='img' aria-label='heart' >❤️</span>  & <span role='img' aria-label='tea'>☕</span>
            </div>
            <div className='rightFooter' >
                <p>Follow us On </p>
                <div className='underline'></div>
                <div className='socialHandels'>
                    <a href="http://www.facebook.com"  rel="noopener" >
                        <FacebookIcon sx={{
                            fontSize: 30, padding: "15px 8px", "&:hover": {
                                color: "#3b5998",
                                transition: "0.5s ease",
                                cursor: "pointer"
                            }
                        }} /> </a>
                    <a href="https://twitter.com/SayMa404"  rel="noopener" ><TwitterIcon sx={{
                        fontSize: 30, padding: "15px 8px", "&:hover": {
                            color: "#00B6F1",
                            transition: "0.5s ease",
                            cursor: "pointer"
                        }
                    }} /> </a>
                    <a href="https://www.instagram.com/_sayan404_/"  rel="noopener" ><InstagramIcon sx={{
                        fontSize: 30, padding: "15px 8px", "&:hover": {

                            transition: "0.5s ease",
                            cursor: "pointer",
                            color: "red"
                        }
                    }} /></a>
                    <a href="https://www.linkedin.com/in/sayan404/"  rel="noopener" ><LinkedInIcon sx={{
                        fontSize: 30, padding: "15px 8px", "&:hover": {
                            color: "#04669A",
                            transition: "0.5s ease",
                            cursor: "pointer"
                        }
                    }} /></a>
                    <a href="https://github.com/sayan404"  rel="noopener" ><GitHubIcon sx={{
                        fontSize: 30, padding: "15px 8px", "&:hover": {
                            color: "#030204",
                            transition: "0.5s ease",
                            cursor: "pointer"
                        }
                    }} /></a>
                </div>
            </div>
        </footer>
    )
}
