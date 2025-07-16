import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faShoppingCart,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import LibraryLogo from '../assets/cloud_city.gif'
import { selectCartSummary } from '../state/cartSelectors'

const Nav = () => {
  const { totalQuantity } = useSelector(selectCartSummary)

  const openMenu = () => {
    document.body.classList.add('menu--open')
  }
  const closeMenu = () => {
    document.body.classList.remove('menu--open')
  }
  return (
    <nav>
      <div className='nav__container'>
        <Link to='/' className='logo_wrapper'>
          <img src={LibraryLogo} alt='' className='logo' />
        </Link>
        <ul className='nav__links'>
          <li className='nav__list'>
            <Link to='/' className='nav__link'>
              Home
            </Link>
          </li>
          <li className='nav__list'>
            <Link to='/media' className='nav__link'>
              Search
            </Link>
          </li>
          <button className='btn__menu' onClick={openMenu}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <li className='nav__icon'>
            <Link to='/cart' className='nav__link'>
              <FontAwesomeIcon icon={faShoppingCart} />
            </Link>
            {totalQuantity > 0 && (
              <span className='cart__length'>{totalQuantity}</span>
            )}
          </li>
        </ul>
        <div className='menu__backdrop'>
          <button className='btn__menu btn__menu--close' onClick={closeMenu}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <ul className='menu__links'>
            <li className='menu__list'>
              <Link to='/' className='menu__button' onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li className='menu__list'>
              <Link to='/media' className='menu__button' onClick={closeMenu}>
                Search
              </Link>
            </li>
            <li className='menu__list'>
              <Link to='/cart' className='menu__button' onClick={closeMenu}>
                Cart
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
export default Nav
