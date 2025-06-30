import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/cloud_city.gif'

const Footer = () => {
  return (
    <footer>
      <div className='container'>
        <div className='row row__column'>
          <Link to='/'>
            <figure className='footer__logo'>
              <img src={Logo} alt='' className='footer__logo--img' />
            </figure>
          </Link>
          <div className='footer__list'>
            <Link to='/' className='footer__link'>
              Home
            </Link>
            <span className='footer__link no-cursor'>About</span>
            <Link to='/media' className='footer__link'>
              Browse
            </Link>
            <Link to='/cart' className='footer__link'>
              Cart
            </Link>
          </div>
          .footer__copyright
          <div className='footer__copyright'>
            Copyright &copy; {new Date().getFullYear()} Cloud City
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer
