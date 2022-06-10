import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import FormProviders from './components/providersComps/FormProviders'
import ListProviders from './components/providersComps/listProviders'

function App() {
  

  return (
    <div className="App">
      <h1>Hello App</h1>
      <FormProviders />
      <ListProviders />
    </div>
  )
}

export default App
