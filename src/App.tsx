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

function App() {
  

  return (
    <div className="App">
      
      <nav className='navigation'>
        <h1 id='store-title'>Don Raul's Hardware Store</h1>
        <div className='user-area'>user area</div>
      </nav>
      <div className='main-container'>
        <BrowserRouter>
          <SideMenu />
          <div className='content-container'>
            <Routes>
              <Route path='/bills' element={<BillForm /> }/>
              <Route path='/recipes' element={<RecipeForm /> }/>
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