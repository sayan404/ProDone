import React, { useEffect, useState, useRef } from 'react'
import './Contact.css'
import emailjs from '@emailjs/browser';
import AOS from 'aos'
import 'aos/dist/aos.css'
import SendIcon from '@mui/icons-material/Send';
import newsletter from '../../Asset/newsletter.svg'
import { Button } from '@mui/material';
const Contact = () => {
  const [senderName, setSenderName] = useState('')
  const [senderEmail, setSenderEmail] = useState('')
  const [senderSubject, setSenderSubject] = useState('')
  const [senderMessage, setSenderMessage] = useState('')

  const sendEmail = (e) => {
    e.preventDefault()
    emailjs.sendForm('service_dzma8is', 'template_gx234iq', form.current, 'AEl_9NCLyy5cGSqlA')
      .then((result) => {
        console.log(result.text);
        setSenderName('');
        setSenderEmail('');
        setSenderSubject('');
        setSenderMessage('');
      }, (error) => {
        console.log(error.text);
      });
  };

  const form = useRef();
  useEffect(() => {
    AOS.init()
  }, [])
  return (
    <>
      <div className='contactMainContainer' data-aos="fade-right" data-aos-easing="ease-in-back"
        data-aos-delay="300"
        data-aos-offset="0">
        <div className='leftContact'>
          <form ref={form} onSubmit={sendEmail}>
            <div className='formName'>
              <p>Name</p>
              <input type='text' name='user_name' value={senderName} placeholder='Enter Your Name' onChange={(e) => setSenderName(e.target.value)} />
            </div>
            <div className='formEmail'>
              <p>Email</p>
              <input type='email' name='user_email' value={senderEmail} placeholder='Enter Your Email' onChange={(e) => setSenderEmail(e.target.value)} />
            </div>
            <div className='formSubject'>
              <p>Subject</p>
              <input type='text' name='subject' value={senderSubject} placeholder='Enter Your Subject' onChange={(e) => setSenderSubject(e.target.value)} />
            </div>
            <div className='formSubject'>
              <p>Message</p>
              <input type='text' name='message' contenteditable value={senderMessage} placeholder='Enter Your Message' onChange={(e) => setSenderMessage(e.target.value)} />
            </div>
            <div className='moreEvents'>
              <Button type='submit' endIcon={<SendIcon />} variant='contained' sx={{ width: '10vw', height: '7vh', padding: ' 2vh 10vh', margin: '2vh auto', font: '2.5vh JetBrains Mono' }}>Submit</Button>
            </div>
          </form>
          <img src={newsletter} alt='imageNewsletter' />
        </div>
      </div>
    </>
  )
}

export default Contact