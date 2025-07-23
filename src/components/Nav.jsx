import '../css/Nav.css'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { openModal, logoutUser } from '../features/authSlice'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faShoppingCart,
  faSignOut,
  faTimes,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import CloudCityLogo from '../assets/cloud_city.gif'
import { selectCartSummary } from '../features/cartSelectors'

const Nav = () => {
  const dispatch = useDispatch()
  const { totalQuantity } = useSelector(selectCartSummary)
  const user = useSelector((state) => state.auth.user)
  const status = useSelector((state) => state.auth.status)

  const [dropdownOpen, setDropdownOpen] = useState(false)

  const openMenu = () => document.body.classList.add('menu--open')
  const closeMenu = () => document.body.classList.remove('menu--open')

  const handleAccount = () => {
    toast.success('Your account is Free. No problem.')
    setDropdownOpen(false)
  }

  const handleLogout = () => {
    try {
      dispatch(logoutUser()).unwrap()
      toast.success('You are logged out!')
      setDropdownOpen(false)
      closeMenu() // in case logout is clicked in mobile
    } catch (err) {
      toast.error('Something went wrong during logout')
    }
  }

  const renderAuthButtons = () => {
    if (status === 'loading') {
      return (
        <>
          <li className='nav__list skeleton-button'></li>
          <li className='nav__list skeleton-badge'></li>
        </>
      )
    }

    if (!user) {
      return (
        <>
          <li className='nav__list'>
            <button
              className='nav__link auth_btn'
              onClick={() => dispatch(openModal('register'))}
            >
              Register
            </button>
          </li>
          <li className='nav__list'>
            <button
              className='nav__link auth_btn'
              onClick={() => dispatch(openModal('login'))}
            >
              Login
            </button>
          </li>
        </>
      )
    }

    // User is logged in
    const initial = user.email?.charAt(0).toUpperCase()

    return (
      <li className='nav__list user-badge-wrapper'>
        <button
          className='user-badge'
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          {initial}
        </button>
        {dropdownOpen && (
          <ul className='dropdown-menu'>
            <li className='auth_icon_wrapper' onClick={handleAccount}>
              <FontAwesomeIcon className='auth_icon' icon={faUser} /> Account
            </li>
            <li className='auth_icon_wrapper' onClick={handleLogout}>
              <FontAwesomeIcon className='auth_icon' icon={faSignOut} /> Log Out
            </li>
          </ul>
        )}
      </li>
    )
  }

  return (
    <nav>
      <div className='nav__container'>
        <Link to='/' className='logo_wrapper'>
          <img src={CloudCityLogo} alt='Cloud City Logo' className='logo' />
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
          {renderAuthButtons()}
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

        {/* MOBILE MENU */}
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
            {!user ? (
              <>
                <li className='menu__list'>
                  <button
                    className='menu__button'
                    onClick={() => {
                      dispatch(openModal('register'))
                      closeMenu()
                    }}
                  >
                    Register
                  </button>
                </li>
                <li className='menu__list'>
                  <button
                    className='menu__button'
                    onClick={() => {
                      dispatch(openModal('login'))
                      closeMenu()
                    }}
                  >
                    Log In
                  </button>
                </li>
              </>
            ) : (
              <li className='menu__list'>
                <button className='menu__button' onClick={handleLogout}>
                  Log Out
                </button>
              </li>
            )}
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
