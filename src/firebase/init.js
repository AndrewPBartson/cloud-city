// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAp37p2QIKS3LXNkeXQWJtXgLlEqq1wTnM',
  authDomain: 'cloud-city-auth.firebaseapp.com',
  projectId: 'cloud-city-auth',
  storageBucket: 'cloud-city-auth.firebasestorage.app',
  messagingSenderId: '695720551641',
  appId: '1:695720551641:web:9159d0bb861c7afa6bcac8',
}

// Initialize Firebase
initializeApp(firebaseConfig)
export const auth = getAuth()
