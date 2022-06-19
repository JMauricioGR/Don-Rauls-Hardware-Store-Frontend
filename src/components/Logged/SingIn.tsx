
import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from "../../firebaseConfig"

const SingIn = () => {

  const navigate = useNavigate()
  const [userName, setUserName] = useState("")
  const [password, setUserPassword] = useState("")

  const singInForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (userName && password) {
      createUserWithEmailAndPassword(auth, userName, password).then((userCredntials) => {
        const userInfo = userCredntials.user
        console.log("---------  ******  User Info  ****** --------");
        console.log(userInfo);
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
    navigate('/')

  }


  return (
    <div>
      <h1>Sing In</h1>
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
        <button onClick={(e) => singInForm(e)} >Sign in</button>
        <h4>Just for watch related information:</h4>
        <p>User name: {userName}</p>
        <p>Password: {password}</p>
      </form>
    </div>
  )
}

export default SingIn

