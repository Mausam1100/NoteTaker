import React, { useContext } from 'react'
import toast from 'react-hot-toast';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';
import api from './api';

function Modal({setShowModal}) {
    const navigate = useNavigate()
    const {setIsLogin} = useContext(UserContext)
    const token = localStorage.getItem("accessToken")

    const handleLogOut = async() => {
        try {
            const response = await api.post("/api/v1/user/logout", {})
            
            if (response.data.success) {
                setIsLogin(false)
                localStorage.removeItem("accessToken")
                navigate('/login')
                toast.success(response.data.message)
                setShowModal(false)
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                toast.error(error.response.data.error.message);
                console.log(error.response);
            } else {
                toast.error("Something went wrong!");
                console.log(error);
            }
        }
    }
  return (
    <div>
        <div className='fixed z-10 inset-0 bg-black/30 backdrop-blur-xs flex items-center justify-center'>
            <div className='bg-white px-10 py-14 rounded-2xl'>
                <h4>Are You Sure You Want To Log Out?</h4>
                <div className='flex items-center justify-evenly pt-5'>
                    <button onClick={handleLogOut} className='button cursor-pointer h-10 px-[40px]'>Yes</button>
                    <button onClick={() => setShowModal(false)} className='button cursor-pointer h-10 px-[40px]'>No</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Modal