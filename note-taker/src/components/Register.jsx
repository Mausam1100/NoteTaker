import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import api from './api';
import { UserContext } from '../App';

function Register() {
  const {setProgress} = useContext(UserContext)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: ""
  })
  
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const togglePassword = () => {
    setShowPassword((prev) => !prev)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setProgress(20)

    try {
      const response = await api.post('/api/v1/user/register', formData)
      setProgress(60)
      navigate('/login')
      toast.success(response.data.message)
      setProgress(100)
    } catch (error) {
      toast.error(error.response.data.error.message)
      setProgress(100)
      console.log(error);
    }

  }

  return (
    <div className='min-h-[calc(100vh-65px)]'>
        <div className='w-full m-auto max-w-[1000px] flex flex-col justify-center gap-y-4 pt-10'>
          <div className='text-center'>
            <h1>Create a NoteTaker Account</h1>
          </div>
          <div className='inline-block p-2 pb-5 w-full max-w-[50%]'>
            <form onSubmit={handleSubmit}>
              <label htmlFor="fullname">
                <div className='py-2'>Full Name </div>
                <input type="text" className='px-3 py-2 w-full border-[1px] mb-3 placeholder:text-gray-800 rounded-xl block border-gray-400' placeholder='Full Name' onChange={handleChange} value={formData.fullName} name='fullName' id='fullname' required/>
              </label>

              <label htmlFor="username">
                <div className='py-2'>Username </div>
                <input type="text" className='px-3 py-2 w-full border-[1px] mb-3 placeholder:text-gray-800 rounded-xl block border-gray-400' placeholder='Username' onChange={handleChange} value={formData.username} name='username' id='username' required/>
              </label>

              <label htmlFor="email">
                <div className='py-2'>Email Address</div>
                <input type="text" className='px-3 py-2 w-full border-[1px] mb-3 placeholder:text-gray-800 rounded-xl block border-gray-400' placeholder='Email Address' onChange={handleChange} value={formData.email} name='email' id='email' required/>
              </label>

              <label htmlFor="password">
                <div className='py-2'>Password</div>
                <div className='relative'>
                  <input type={showPassword? "text": "password"} className='px-3 py-2 w-full border-[1px] mb-3 placeholder:text-gray-800 rounded-xl block border-gray-400' placeholder='Password' onChange={handleChange} value={formData.password} name='password' id='password' required/>

                  {showPassword? <EyeOff onClick={togglePassword} className='absolute top-[50%] search right-3 cursor-pointer'size={20} color='#787878' strokeWidth={1.75} />:
                  <Eye onClick={togglePassword} className='absolute top-[50%] search right-3 cursor-pointer'size={20} color='#787878' strokeWidth={1.75} />}

                </div>
              </label>
              <button type='submit' className='button w-full py-3 mt-6 cursor-pointer'>Register</button>
            </form>
          </div>
          <div>
            <p className='text-center text-sm'>By signing in, you agree to NoteTaker's Terms of Service and Privacy Policy</p>
          </div>
        </div>
    </div>
  )
}

export default Register