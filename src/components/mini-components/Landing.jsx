import React from 'react'
import { Link } from 'react-router-dom'
import MonsterMovie from '../../assets/watching_monster_movie.webp'

const Landing = () => {
  return (
    <section id='landing'>
      <header>
        <div className='header__container'>
          <div className='header__description'>
            <h1>
              <span className='star'>✨</span>{' '}
              <span className='magenta'>Cloud City</span>{' '}
              <span className='star'>✨</span>
            </h1>
            <h2>Amazing Search Engine for Movies</h2>
            <h2>
              <span className='purple'>Check out the </span>
              <span className='magenta monospace'>SICKEST</span>
              <span className='purple'> deals</span>
            </h2>
            <Link to='/media'>
              <button className='btn'>Search Movies</button>
            </Link>
          </div>
          <figure className='header__img--wrapper'>
            <img
              src={MonsterMovie}
              className='faded-edges monster-movie'
              alt=''
            />
          </figure>
        </div>
      </header>
    </section>
  )
}
export default Landing
