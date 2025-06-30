import React from 'react'
import { Link } from 'react-router-dom'
import UndrawBooks from '../../assets/Undraw_Books.svg'

const Landing = () => {
  return (
    <section id='landing'>
      <header>
        <div className='header__container'>
          <div className='header__description'>
            <h1>
              <span className='magenta'>Cloud City</span>{' '}
              <span className='star'>✨</span> Top-rated E&#8209;commerce Site
            </h1>
            <h2>
              Check out our <span className='magenta monospace'>SICKEST</span>{' '}
              deals
            </h2>
            <Link to='/media'>
              <button className='btn'>Sick Deals</button>
            </Link>
          </div>
          <figure className='header__img--wrapper'>
            <img src={UndrawBooks} alt='' />
          </figure>
        </div>
      </header>
    </section>
  )
}
export default Landing
