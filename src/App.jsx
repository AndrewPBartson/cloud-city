import './css/index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { loadItems } from './features/itemsSlice'
import { closeModal } from './features/authSlice'
import useAuthListener from './features/useAuthListener'
import ScrollToTop from './components/mini-components/ScrollToTop'
import Nav from './components/Nav'
import Home from './pages/Home'
import Search from './pages/Search'
import MovieSpotlight from './pages/MovieSpotlight'
import Footer from './components/Footer'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import SignInModal from './components/SignInModal'

function App() {
  const dispatch = useDispatch()
  useAuthListener() // set user state
  const isModalOpen = useSelector((state) => state.auth.isModalOpen)

  useEffect(() => {
    dispatch(loadItems())
  }, [dispatch])

  return (
    <Router>
      <div className='App'>
        <ScrollToTop />
        <ToastContainer
          position='top-right'
          autoClose={2000}
          style={{ zIndex: 9999 }}
        />
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/media' element={<Search />} />
          <Route path='/media/:id' element={<MovieSpotlight />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
        </Routes>
        <Footer />
        {isModalOpen && <SignInModal onClose={() => dispatch(closeModal())} />}
      </div>
    </Router>
  )
}

export default App
