import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faBookOpen, faTags } from '@fortawesome/free-solid-svg-icons'
import Highlight from './mini-components/Highlight'

const Highlights = () => {
  return (
    <section id='highlights'>
      <div className='container'>
        <div className='row'>
          <h2 className='section__title'>
            Why choose <span className='purple'>Cloud City</span>?
          </h2>
          <div className='highlight__wrapper'>
            <Highlight
              icon={<FontAwesomeIcon icon={faBolt} />}
              title='Easy and Quick'
              para='Get access to the item you purchased instantly.'
            />
            <Highlight
              icon={<FontAwesomeIcon icon={faBookOpen} />}
              title='10,000+ Products'
              para='Cloud City has media in all your favorite categories.'
            />
            <Highlight
              icon={<FontAwesomeIcon icon={faTags} />}
              title='Affordable'
              para='Grab popular media at steep discounts.'
            />
          </div>
        </div>
      </div>
    </section>
  )
}
export default Highlights
