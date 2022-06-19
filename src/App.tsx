import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import FormProviders from './components/providersComps/FormProviders'
//import ListProviders from './components/providersComps/listProviders'
import SideMenu from './components/SideMenu'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BillForm from './components/billComps/BillForm'
import RecipeForm from './components/recipesComps/ReceiptForm'
import StockForm from './components/stockComps/StockForm'
import SingIn from './components/Logged/SingIn'
import LogIn from './components/Logged/LogIn'
import { useDispatch } from 'react-redux'
import { logOutInReducer } from './state/slice/loggedInSlice'

function App() {
  const dispatch = useDispatch()

  const logoutAction = ()=>{
    dispatch(logOutInReducer())
    
  }

  return (
    <div className="App">
      
      <nav className='navigation'>
        <h1 id='store-title'>Don Raul's Hardware Store</h1>
        <div className='user-area'>
          <button onClick={logoutAction}>Log out</button>
        </div>
      </nav>
      <div className='main-container'>
        <BrowserRouter>
          <SideMenu />
          <div className='content-container'>
            <Routes>
              <Route path='/bills' element={<BillForm /> }/>
              <Route path='/receipts' element={<RecipeForm /> }/>
              <Route path='/stock' element={<StockForm /> }/>
              <Route path='/providers' element={<FormProviders /> }/>           
              <Route path='/signin' element={<SingIn /> }/>           
              <Route path='/' element={<LogIn /> }/>           
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
// 