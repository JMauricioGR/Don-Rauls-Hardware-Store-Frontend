import React from 'react'
import { Link } from 'react-router-dom'

const SideMenu = () => {
  return (
    <div className='side-menu'>
      <ul>
        <li>
          <Link to="/bills" className='menu-item'>Bill</Link>
        </li>
        <li>
          <Link to="/recipes" className='menu-item'>Recipes</Link>
        </li>
        <li>
          <Link to="/stock" className='menu-item'>Stock</Link>
        </li>
        <li>
          <Link to="/" className='menu-item'>Providers</Link>
        </li>
      </ul>
    </div>
  )
}

export default SideMenu
