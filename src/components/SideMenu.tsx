import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logOutInReducer } from '../state/slice/loggedInSlice'

const SideMenu = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutAction = ()=>{
    dispatch(logOutInReducer())
    navigate('/')
  }

  return (
    <div className='side-menu'>
      <ul>
        <li>
          <Link to="/" className='menu-item'>Home</Link>
        </li>
        <li>
          <Link to="/bills" className='menu-item'>Bill</Link>
        </li>
        <li>
          <Link to='/receipts' className='menu-item'>Receipt</Link>
        </li>
        <li>
          <Link to="/stock" className='menu-item'>Stock</Link>
        </li>
        <li>
          <Link to="/providers" className='menu-item'>Providers</Link>
        </li>
        <li>
          <Link to="/" className='menu-item' onClick={logoutAction}>Log out</Link>
        </li>
      </ul>
    </div>
  )
}

export default SideMenu
