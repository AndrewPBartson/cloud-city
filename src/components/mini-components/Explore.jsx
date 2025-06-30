import { Link } from 'react-router-dom'

const Explore = () => {
  return (
    <div>
      <section id='explore'>
        <div className='container'>
          <div className='row row__column'>
            <h2 className='section__title'>
              Find exciting <span className='purple'>Media</span>
            </h2>
            <Link to='/media'>
              <button className='btn'>Sick Deals</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
export default Explore
