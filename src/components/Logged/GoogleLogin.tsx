import { Store } from '@reduxjs/toolkit'
import { GoogleAuthProvider, OAuthCredential, signInWithPopup } from 'firebase/auth'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebaseConfig'
import { logInInReducer } from '../../state/slice/loggedInSlice'

const providerGoogleAuth = new GoogleAuthProvider()

const GoogleLogin: React.FunctionComponent = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const signInGoogle = ()=>{
    
    signInWithPopup(auth, providerGoogleAuth).then((result)=>{

      const credential:OAuthCredential | null = GoogleAuthProvider.credentialFromResult(result)

      const token = credential!.accessToken

      const user = result.user

      dispatch(logInInReducer(user))

      navigate("/stock")
    }).catch((error)=>{
      console.log(error);
      
      const errorCode = error.code
      const errorMessage = error.message
      const email = error.email
      const credential = GoogleAuthProvider.credentialFromError(error)
    })
  }


  return (
    <div>
      <button onClick={signInGoogle}>Google Login</button>
    </div>
  )
}

export default GoogleLogin
