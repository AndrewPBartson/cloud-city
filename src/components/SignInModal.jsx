import '../css/SignInModal.css'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
  closeModal,
  registerUser,
  loginUser,
  clearAuthError,
} from '../features/authSlice'

const SignInModal = ({ onClose }) => {
  const dispatch = useDispatch()
  const error = useSelector((state) => state.auth.error)
  // Use Redux to open in the correct mode, and
  // Still toggle mode locally inside the modal
  const modalMode = useSelector((state) => state.auth.modalMode)
  const [isRegistering, setIsRegistering] = useState(modalMode === 'register')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    setIsRegistering(modalMode === 'register')
  }, [modalMode])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isRegistering) {
      try {
        await dispatch(registerUser({ email, password })).unwrap()
        toast.success('You are registered!')
        // Only login if registration succeeded
        await dispatch(loginUser({ email, password })).unwrap()
        toast.success('You are registered and logged in!')
      } catch (err) {
        // Registration error will be handled via Redux error state
        console.error('Registration failed:', err)
        toast.error('Registration failed. Please try again.')
      }
    } else {
      try {
        await dispatch(loginUser({ email, password })).unwrap()
        toast.success('You are logged in!')
      } catch (err) {
        console.error('Login failed:', err)
        toast.error('Login failed. Please check your credentials.')
      }
    }
  }
  const handleToggleMode = () => {
    setIsRegistering((prev) => !prev)
    dispatch(clearAuthError()) // Clear error when toggling modes
  }

  const handleForgotPassword = () => {
    toast.info(
      "Just create a new account with fake email. We don't need your real email."
    )
  }

  return (
    <div className='modal-overlay' onClick={() => dispatch(closeModal())}>
      <div className='modal-container' onClick={(e) => e.stopPropagation()}>
        <h2>
          {isRegistering ? 'Create an account' : 'Sign into your account'}
        </h2>
        <form className='modal-form' onSubmit={handleSubmit}>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type='submit' className='primary-btn'>
            {isRegistering ? 'Register' : 'Sign in'}
          </button>
        </form>

        {error && <p className='auth-error'>{error}</p>}

        <div className='modal-footer'>
          <span className='forgot-password' onClick={handleForgotPassword}>
            Forgot password?
          </span>
          <div className='register-section'>
            <span>
              {isRegistering ? 'Already have an account?' : 'New here?'}
            </span>
            <button
              type='button'
              className='secondary-btn'
              onClick={handleToggleMode}
            >
              {isRegistering ? 'Sign in' : 'Register'}
            </button>
          </div>
        </div>
        <button className='close-btn' onClick={() => dispatch(closeModal())}>
          ×
        </button>
      </div>
    </div>
  )
}

export default SignInModal
