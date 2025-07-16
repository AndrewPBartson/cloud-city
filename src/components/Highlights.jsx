import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faFilm, faTags } from '@fortawesome/free-solid-svg-icons'
import Highlight from './mini-components/Highlight'

const Highlights = () => {
  return (
    <section id='highlights'>
      <div className='highlights_container'>
        <div className='row'>
          <h2 className='section__title'>
            Why choose <span className='purple'>Cloud City</span>?
          </h2>
          <div className='highlight__wrapper'>
            <Highlight
              icon={<FontAwesomeIcon icon={faBolt} />}
              title='Easy and Quick'
              para='Get instant access to the movie you purchase.'
            />
            <Highlight
              icon={<FontAwesomeIcon icon={faFilm} />}
              title='10,000,000+ Movies'
              para='We have movies in all your favorite genres.'
            />
            <Highlight
              icon={<FontAwesomeIcon icon={faTags} />}
              title='Affordable'
              para='New discounts dropping every day!'
            />
          </div>
        </div>
      </div>
    </section>
  )
}
export default Highlights
