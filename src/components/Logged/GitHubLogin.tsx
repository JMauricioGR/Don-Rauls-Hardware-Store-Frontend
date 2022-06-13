import { GithubAuthProvider, OAuthCredential, signInWithPopup } from 'firebase/auth'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebaseConfig'
import { logInInReducer } from '../../state/slice/loggedInSlice'

const providerGitHubAuth = new GithubAuthProvider()

const GitHubLogin = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const signInWithGitHubButton = () => {

    signInWithPopup(auth, providerGitHubAuth).then((result)=>{

      const credential:OAuthCredential | null = GithubAuthProvider.credentialFromResult(result)

      const token = credential!.accessToken

      const user = result.user

      dispatch(logInInReducer(user))

      navigate('/stock')

    }).catch((error) => {

      const errorCode = error.code
      const errorMessage = error.message
      const email = error.email
      const cedential = GithubAuthProvider.credentialFromError(error)

    })
  }

  

  return (
    <div>
      <button onClick={signInWithGitHubButton} >Github login</button>
    </div>
  )
}

export default GitHubLogin
