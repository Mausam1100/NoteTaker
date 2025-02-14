import React, { useEffect, useState } from 'react'
import userLogo from '../assets/user.jpg'
import { IdCard, Mail, User, Calendar } from "lucide-react";
import { jwtDecode } from 'jwt-decode'
import moment from 'moment';

function Profile() {
    const [user, setUser] = useState('')
    
    useEffect(() => {
        const token = localStorage.getItem("accessToken")
        
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
        <div className='py-5 min-h-[calc(100vh-65px)] w-full m-auto max-w-[900px] h-full flex flex-col items-center'>
            <h2 className='pt-3 pb-6'>User Details</h2>
            <div className='w-32 overflow-auto rounded-full aspect-square border-[1px]'>
                <img src={userLogo} className='w-full h-full' alt="user" />
            </div>
            <div className='w-[40%] flex flex-col items-center mt-2'>
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
            </div>
        </div>
    </div>
  )
}

export default Profile