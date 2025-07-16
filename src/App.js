import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
// import { useSelector } from 'react-redux'
import { loadItems } from './state/itemsSlice'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './css/index.css'
import ScrollToTop from './components/mini-components/ScrollToTop'
import Nav from './components/Nav'
import Home from './pages/Home'
import Search from './pages/Search'
import MovieSpotlight from './pages/MovieSpotlight'
import Footer from './components/Footer'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

function App() {
  const dispatch = useDispatch()
  // const status = useSelector((state) => state.items.status)

  useEffect(() => {
    dispatch(loadItems())
  }, [dispatch])

  // useEffect(() => {
  //   console.log('req status:', status)
  // }, [status])

  return (
    <Router>
      <div className='App'>
        <ScrollToTop />
        <ToastContainer position='top-right' autoClose={3000} />
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/media' element={<Search />} />
          <Route path='/media/:id' element={<MovieSpotlight />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
