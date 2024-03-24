import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../App'

const Navbar = () => {
    const {isLoggedIn,loggedInUser,logoutUser} = useContext(GlobalContext);
    
  return (
    <>
    <nav className='flex items-center p-2 bg-blue-500 justify-between text-white'>
        <div className='text-2xl font-semibold'>
            <Link to='/'>Expense tracker</Link>
        </div>
        {isLoggedIn ? <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2'>
                {loggedInUser.useravatar!==null && <img className='h-10 rounded-full' src={loggedInUser.useravatar} alt="" />}
                <p>{loggedInUser.username}</p>
            </div>
            <div>
                <button onClick={logoutUser}>Logout</button>
            </div>
        </div> : <>
        <div className='flex items-center gap-4 text-lg'>
            <Link to='/login'><button>Login</button></Link>
            <Link to='/register'><button>Register</button></Link>
        </div>
        </>}
    </nav>
    </>
  )
}

export default Navbar