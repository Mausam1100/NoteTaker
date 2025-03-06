import React, { useContext, useEffect, useRef, useState } from 'react'
import userLogo from '../assets/user.jpg'
import { IdCard, Mail, User, Calendar, PencilLine } from "lucide-react";
import { jwtDecode } from 'jwt-decode'
import moment from 'moment';
import api from './api'
import toast from 'react-hot-toast';
import { UserContext } from '../App';

function Profile() {
    const {setProgress} = useContext(UserContext)
    const profileInput = useRef(null)
    const [user, setUser] = useState('')
    const [profile, setProfile] = useState('')
    const [profileUrl, setProfileUrl] = useState('')
    
    function handleFileChange(e) {
        setProfile(e.target.files[0])
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        setProgress(10)
        if(!profile) {
            toast.error("Please select a image first")
            setProgress(100)
            return
        }

        const formData = new FormData()
        formData.append("profilePic", profile)
        setProgress(40)
        try {
            const response = await api.post("/api/v1/user/upload-profile", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            setProgress(70)
            setProfileUrl(response.data.data)
            console.log("File uploaded")
            toast.success(response.data.message)
            localStorage.setItem("savedProfileUrl", response.data.data)
            setProgress(100)
        } catch (error) {
            toast.error(error.response.data.error.message)
            setProgress(100)
            console.log(error);
        }

    }

    function handleImageClick() {
        profileInput.current.click()
    }

    useEffect(() => {
        const token = localStorage.getItem("accessToken")
        const savedProfileUrl = localStorage.getItem("savedProfileUrl")
        
        setProfileUrl(savedProfileUrl)

        if(token) {
            try {
                const decodedUser = jwtDecode(token)
                setUser(decodedUser)
            } catch (error) {
                console.log('Error decoding token', error);
                
            }
        }
    }, [])
    
  return (
    <div>
        <div className='py-3 min-h-[calc(100vh-65px)] w-full m-auto max-w-[900px] h-full flex flex-col items-center'>
            <h2 className='pt-3 pb-4'><span className='underline'>User</span> <span className='underline'>Details</span></h2>
            <div className='w-32 rounded-full aspect-square border-black border-[2px] relative'>
                <img onClick={handleImageClick} src={profileUrl? profileUrl: userLogo} className='w-full rounded-full h-full object-cover' alt="user" />
                <div onClick={handleImageClick} className='cursor-pointer absolute z-10 top-[73%] right-[3%] bg-black rounded-full p-1 border-2 border-white'><PencilLine size={20} strokeWidth={1.5} className='text-white' /></div>
            </div>
            <div className='w-[40%] flex flex-col items-center'>
                <div className='w-full'>
                    <div className='py-2 text-start font-medium'>Full Name </div>
                    <div className='relative'>
                        <input type="text" className='px-3 py-2 w-full border-[1px] mb-3 placeholder:text-gray-800 rounded-xl block border-gray-400' placeholder={user.fullName} name='fullName' id='fullname' disabled/>
                        <IdCard className='absolute top-[50%] search right-3' color="#545454" strokeWidth={1.5}/>
                    </div>
                </div>

                <div className='w-full'>
                    <div className='py-2 text-start font-medium'>Username </div>
                    <div className='relative'>
                        <input type="text" className='px-3 py-2 w-full border-[1px] mb-3 placeholder:text-gray-800 rounded-xl block border-gray-400' placeholder={user.username} name='username' id='username' disabled/>
                        <User color="#545454" strokeWidth={1.5} className='absolute top-[50%] search right-3' />
                    </div>
                </div>

                <div className='w-full'>
                    <div className='py-2 text-start font-medium'>Email Address</div>
                    <div className='relative'>
                        <input type="text" className='px-3 py-2 w-full border-[1px] mb-3 placeholder:text-gray-800 rounded-xl block border-gray-400' placeholder={user.email} name='email' id='email' disabled />
                        <Mail color="#545454" strokeWidth={1.5} className='absolute top-[50%] search right-3' />
                    </div>
                </div>
               
                <div className='w-full'>
                    <div className='py-2 text-start font-medium'>Created At</div>
                    <div className='relative'>
                        <input type="text" className='px-3 py-2 w-full border-[1px] mb-3 placeholder:text-gray-800 rounded-xl block border-gray-400' placeholder={moment(user.createdAt).format("MMM Do YY")} name='email' id='email' disabled />
                        <Calendar color="#545454" strokeWidth={1.5} className='absolute top-[50%] search right-3' />
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <input type="file" onChange={handleFileChange} name='profilePic' ref={profileInput} style={{display: "none"}} />
                    <button type='submit' className='button mt-2 px-7 py-3'>Save</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Profile