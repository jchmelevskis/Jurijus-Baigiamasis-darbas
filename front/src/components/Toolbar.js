import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { clearStates } from '../features/users'
import logo from '../images/logo.png'

const Toolbar = () => {
  const disp = useDispatch()
  const loggedInUser = useSelector((state) => state.users.loggedInUser)
  const admin = useSelector((state) => state.users.admin)
  console.log(admin)
  const secret = localStorage.getItem('userSecret')
  const signOut = () => {
    localStorage.removeItem('userSecret')
    disp(clearStates())
  }

  return (
    <div className="d-flex space-ard toolbar">
      {secret ? 
      <>
       <div>
          <img src={logo} alt=''/>
        </div>
        <Link to='/'>Home</Link>
        {admin ? <Link to='/admin'>All users</Link> : <Link to='/subscription'>My subscription</Link>}
        <Link to='/' onClick={() => {
          signOut()
      }}>
        Sign out</Link>
        <div className='toolbar-welcome-box'>
          <h5>Hi, {loggedInUser.firstname}</h5>
          <div className='toolbar-welcome-box-shape'></div>
        </div>
      </> 
      :
      <>
        <div>
          <img src={logo} alt=''/>
        </div>
        <Link to='/'>Home</Link>
        <Link to='/register'>Register</Link>
        <Link to='/login'>Login</Link>
      </>
    }
   
    </div>
  )
}

export default Toolbar