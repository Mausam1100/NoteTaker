import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../App';
import api from './api';


function Login() {
  const {setIsLogin, setProgress} = useContext(UserContext)
  const [formData, setFormData] = useState({
    emailUsername: "",
    password: ""
  })

  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)

  const togglePassword = () => {
    setShowPassword((prev) => !prev)
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    setProgress(20)
    try {
      const response = await api.post("/api/v1/user/login", formData)
      setProgress(50)
      if (response.data.data.accessToken) {
        setIsLogin(true)
        localStorage.setItem("accessToken", JSON.stringify(response.data.data.accessToken))
        localStorage.setItem("savedProfileUrl", response.data.data.user.profilePic)
        setProgress(70)
        toast.success(response.data.message)
        setProgress(100)
        loadingBarRef.current.complete()
        // setProgress(0)
        navigate('/')
      }
    } catch (error) {
      toast.error(error.response.data.error.message)
      setProgress(100)
      console.log(error);
    } 
  }

  return (
    <div>
        <div className='w-full m-auto max-w-[1000px] flex flex-col justify-center gap-y-4 pt-14'>
          <div className='text-center space-y-3 mb-2'>
            <h1>Welcome To NoteTaker</h1>
            <p>The only platform you need for your personal and professional growth.</p>
          </div>
          <div className='inline-block p-5 pb-10 w-full max-w-[50%]'>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">
                <div className='py-2'>Email or username </div>
                <input type="text" className='px-3 py-2 w-full border-[1px] mb-3 placeholder:text-gray-400 rounded-xl block border-gray-400' onChange={handleChange} value={formData.emailUsername} name="emailUsername" placeholder='Email or username' id='emailUsername' required />
              </label>
              <label htmlFor="password">
                <div className='py-2'>Password</div>
                <div className='relative'>
                  <input type={showPassword? "text": "password"} className='px-3 py-2 w-full border-[1px] mb-3 placeholder:text-gray-400 rounded-xl block border-gray-400' onChange={handleChange} value={formData.password} name='password' placeholder='Password' id='password' required />
                  
                  {showPassword? <EyeOff onClick={togglePassword} className='absolute top-[50%] search right-3 cursor-pointer'size={20} color='#787878' strokeWidth={1.75} />:
                  <Eye onClick={togglePassword} className='absolute top-[50%] search right-3 cursor-pointer'size={20} color='#787878' strokeWidth={1.75} />}

                </div>
              </label>
              <label htmlFor="remember" className='flex gap-x-2.5'>
                <input  id='remember' type="checkbox" />
                <p>Remember me?</p>
              </label>
              <button type='submit' className='button w-full py-3 mt-6 cursor-pointer'>Login</button>
              <p className='text-center pt-4 text-sm'>Don't have an account? <span onClick={() => navigate('/register')} className='hover:text-[#6164fa] underline text-[#617AFA] cursor-pointer'>Sign up</span></p>
            </form>
          </div>
          <div>
            <p className='text-center text-sm'>By loging in, you agree to NoteTaker's Terms of Service and Privacy Policy</p>
          </div>
        </div>
    </div>
  )
}

export default Login