import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import { NavLink, useNavigate } from 'react-router-dom'
import Modal from './Modal'
import { UserContext } from '../App'

function NavBar() {
  const navigate = useNavigate()
  const {isLogin} = useContext(UserContext)
  const [showModal, setShowModal] = useState(false)

  return (
    <div className='bg-white border-b-[1px] border-gray-300'>
        <div className='flex items-center justify-between m-auto w-[90%] max-w-[1300px] h-16'>
            <div>
              <a href="/" className='flex gap-x-3 items-center'><img src={logo} alt="logo" className='w-7' /> <h2 className='font-[600]'>NoteTaker</h2></a>
            </div>
            
            <div className='flex'>
              <ul className='flex items-center gap-x-9'>
                <li className='hover:border-b-[1px] border-gray-400'><NavLink className={({isActive}) => isActive? "activeLink": ""} to='/'>Home</NavLink></li>
                <li className='hover:border-b-[1px] border-gray-400'><NavLink className={({isActive}) => isActive? "activeLink": ""} to='/notes'>Notes</NavLink></li>
                <li className='hover:border-b-[1px] border-gray-400'><NavLink className={({isActive}) => isActive? "activeLink": ""} to='/about'>About</NavLink></li>
                <li className='hover:border-b-[1px] border-gray-400'><NavLink className={({isActive}) => isActive? "activeLink": ""} to='/profile'>Profile</NavLink></li>
              </ul>
              {isLogin? 
                <button onClick={() => setShowModal(true)} className='px-6 py-[10px] cursor-pointer button ml-8'>Log Out</button>:
                <div className='flex gap-x-4'>
                  <button onClick={() => navigate('/login')} className='cursor-pointer button px-7 ml-8'>Login</button>
                  <button onClick={() => navigate('/register')} className='cursor-pointer px-5 button'>Register</button>
                </div>
              }
            </div>
        </div>
        {showModal? <Modal showModal={showModal} setShowModal={setShowModal} />: ""}
    </div>
  )
}

export default NavBar