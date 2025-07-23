import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { auth } from '../firebase/init'
import { setUser } from '../features/authSlice'

const useAuthListener = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({ email: user.email, uid: user.uid }))
      } else {
        dispatch(setUser(null))
      }
    })

    return () => unsubscribe()
  }, [dispatch])
}

export default useAuthListener
