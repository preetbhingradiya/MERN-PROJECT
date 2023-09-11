import React from 'react'
import playstore from '../../../images/playstore.png'
import appstore from '../../../images/Appstore.png'
import './Footer.css'


function Footer() {
  return (
    <footer className='footer'>

      <div className='leftFooter'>
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android And Ios moblie phone</p>
        <img src={playstore} alt="plastore" />
        <img src={appstore} alt="apptore" />
      </div>

      <div className='midFooter'>
        <h1>ECOMMERCE.</h1>
        <p>High Quality is Our first priority</p>

        <p>Copyrights 2021 &copy ECOMMERCE</p>
      </div>

      <div className='rightFooter'>
        <h4>Follow Us</h4>
        <a href='http://instagram.com/preetbhingradiya'>Instagram</a>
        <a href='http://facebook.com/preetbhingradiya'>Facebook</a>
      </div>

    </footer>
  )
}

export default Footer
