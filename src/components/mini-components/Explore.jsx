import { Link } from 'react-router-dom'

const Explore = () => {
  return (
    <div>
      <section id='explore'>
        <div className='container'>
          <div className='row row__column'>
            <Link to='/media'>
              <button className='btn'>Search All Movies</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
export default Explore
