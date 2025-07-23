import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { mapFirebaseAuthError } from '../utils/firebaseErrors'
import { auth } from '../firebase/init'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      return {
        email: userCredential.user.email,
        uid: userCredential.user.uid,
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

// Async thunk for registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      return {
        email: userCredential.user.email,
        uid: userCredential.user.uid,
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  await signOut(auth)
})

const initialState = {
  user: null,
  isModalOpen: false,
  modalMode: 'login', // 'login' or 'register'
  status: 'idle',
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = true
      state.modalMode = action.payload // 'login' or 'register'
    },
    closeModal: (state) => {
      state.isModalOpen = false
      state.error = null
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
    clearAuthError: (state) => {
      state.error = null
    },
    // simulateLoading: (state) => {
    //   state.status = 'loading'
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
        state.isModalOpen = false
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = mapFirebaseAuthError(action.payload)
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
        state.isModalOpen = false
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = mapFirebaseAuthError(action.payload)
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.status = 'idle'
        state.error = null
      })
  },
})

export const { openModal, closeModal, setUser, clearAuthError } =
  authSlice.actions

export default authSlice.reducer
