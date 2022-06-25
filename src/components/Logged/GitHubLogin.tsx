import { GithubAuthProvider, OAuthCredential, signInWithPopup } from 'firebase/auth'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebaseConfig'
import { logInInReducer } from '../../state/slice/loggedInSlice'

const providerGithubAuth = new GithubAuthProvider()

const GitHubLogIn: React.FunctionComponent = () => {


  const dispatch = useDispatch();

  const navigate = useNavigate();

  const signInWithGithubButton = () => {

    signInWithPopup(auth, providerGithubAuth)
    .then((result) => {

      const credential:OAuthCredential | null = GithubAuthProvider.credentialFromResult(result);

      const token = credential!.accessToken;

      const user = result.user;

      dispatch(logInInReducer(user))
      
      navigate('/stock')

    }).catch((error) => {

      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GithubAuthProvider.credentialFromError(error);
    });
  }


  return (
    <div>
      <button onClick={signInWithGithubButton} className='btn-github'>Github login</button>
    </div>
  );
};

export default GitHubLogIn;