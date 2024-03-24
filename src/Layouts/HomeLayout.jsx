import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const HomeLayout = () => {
  return (
    <>
    <div className='flex items-center m-10 gap-4 text-2xl'>
        <NavLink to='/' className={({isActive}) => isActive ? 'underline underline-offset-2 text-blue-500' : 'text-blue-500'}>Dashboard</NavLink>
        <NavLink to='Expenses' className={({isActive}) => isActive ? 'underline underline-offset-2 text-blue-500' : 'text-blue-500'}>Expenses</NavLink>
        <NavLink to='Income' className={({isActive}) => isActive ? 'underline underline-offset-2 text-blue-500':'text-blue-500'}>Income</NavLink>
    </div>
    <Outlet/>
    </>
  )
}

export default HomeLayout