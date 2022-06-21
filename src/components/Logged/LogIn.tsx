import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../firebaseConfig'
import { logInInReducer } from '../../state/slice/loggedInSlice'
import GitHubLogin from './GitHubLogin'
import GoogleLogin from './GoogleLogin'

const LogIn = () => {

  const [userName, setUserName] = useState("")
  const [password, setUserPassword] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logInForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (userName && password) {
      signInWithEmailAndPassword(auth, userName, password).then((userCredntials) => {
        const userInfo = userCredntials.user
        console.log("---------  ******  User Logged Info  ****** --------");
        console.log(userCredntials);
        console.log(userInfo);

        dispatch(logInInReducer(userInfo))

        navigate('/stock')
      })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log(errorCode)
          console.log(errorMessage)
        })
    }
    setUserName("")
    setUserPassword("")
  }





  return (
    <div className='form-style'>
      <h1>Log In</h1>
      <form action="">
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="" >User name: </label>
              </td>
              <td>
                <input type="text"
                  onChange={(e) => setUserName(e.target.value)}
                  name="userName"
                  value={userName}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="">Password: </label>
              </td>
              <td>
                <input type="password"
                  onChange={(e) => setUserPassword(e.target.value)}
                  name="userName"
                  value={password}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button onClick={(e) => logInForm(e)} className='btn-general'>Login</button>
      </form>
      <GoogleLogin />
      <GitHubLogin />
      <Link to='/signin' className='btn-general'> Sing in</Link>
    </div>
  )
}

export default LogIn
