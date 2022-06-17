import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebaseConfig'
import { logInInReducer } from '../../state/slice/loggedInSlice'
import GitHubLogin from './GitHubLogin'
import GoogleLogin from './GoogleLogin'

const LogIn = () => {

  const [userName, setUserName] = useState("")
  const [password, setUserPassword] = useState("")
  const [newAmout, setNewAmmount] = useState("0")

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logInForm = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    e.preventDefault()
    if(userName && password){
      signInWithEmailAndPassword(auth, userName, password).then((userCredntials)=>{
        const userInfo = userCredntials.user
        console.log("---------  ******  User Logged Info  ****** --------");
        console.log(userCredntials);        
        console.log(userInfo); 

        dispatch(logInInReducer(userInfo))

        navigate('/stock')       
      })
      .catch((error) =>{
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode)
        console.log(errorMessage)
      })
    }
    setUserName("")
    setUserPassword("")

    setNewAmmount(password + "kdjsflkjskflddf")

  }

  type prodlist = {
    
      id: String
      productName: String
      productDescription: String
      minimumUnits: String
      maximumUnits: String
      provider: String
      stock: String
      price: String
    
  }
  let productList:prodlist = {
    id: "62a4d1e23bfb5d219afe6173",
    productName: "Screw 1",
    productDescription: "screw long 1 inch",
    minimumUnits: "10",
    maximumUnits: "100",
    provider: "Screw World ",
    stock: newAmout,
    price: "50"
  }


  return (
    <div>
      <h1>Log In</h1>
      <form action="">
        <table>
          <tr>
            <td>
              <label htmlFor="" >User name: </label>
            </td>
            <td>
            <input type="text" 
              onChange={(e)=>setUserName(e.target.value)}
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
                onChange={(e)=>setUserPassword(e.target.value)}
                name="userName"
                value={password}
              />
            </td>
          </tr>
        </table>
        <button onClick={(e)=>logInForm(e)} >Logn in</button>
        
        <h4>Just for watch related information</h4>
        <p>User name: {userName}</p>
        <p>Password: {password}</p>
        <h1>para actualizar los productos del receipt</h1>
        <p>{productList.stock}</p>
      </form>
      <GoogleLogin />
      <GitHubLogin />
    </div>
  )
}

export default LogIn
