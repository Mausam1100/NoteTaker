import React, { useContext, useEffect, useRef, useState } from 'react';
import userLogo from '../assets/user.jpg';
import { IdCard, Mail, User, Calendar, PencilLine } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';
import moment from 'moment';
import api from './api';
import toast from 'react-hot-toast';
import { UserContext } from '../App';

function Profile() {
  const { setProgress } = useContext(UserContext);
  const profileInput = useRef(null);
  const [user, setUser] = useState('');
  const [profile, setProfile] = useState('');
  const [profileUrl, setProfileUrl] = useState('');

  function handleFileChange(e) {
    setProfile(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProgress(10);
    if (!profile) {
      toast.error('Please select an image first');
      setProgress(100);
      return;
    }

    const formData = new FormData();
    formData.append('profilePic', profile);
    setProgress(40);
    try {
      const response = await api.post('/api/v1/user/upload-profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setProgress(70);
      setProfileUrl(response.data.data);
      console.log('File uploaded');
      toast.success(response.data.message);
      localStorage.setItem('savedProfileUrl', response.data.data);
      setProgress(100);
    } catch (error) {
      toast.error(error.response.data.error.message);
      setProgress(100);
      console.log(error);
    }
  };

  function handleImageClick() {
    profileInput.current.click();
  }

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const savedProfileUrl = localStorage.getItem('savedProfileUrl');

    setProfileUrl(savedProfileUrl);

    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
      } catch (error) {
        console.log('Error decoding token', error);
      }
    }
  }, []);

  return (
    <div className="min-h-[calc(100vh-66px)] bg-gradient-to-r from-blue-50 to-purple-50 flex md:items-center justify-center py-5 md:py-10">
      <div className="w-[92%] mt-5 md:mt-0 pb-14 h-full md:w-full max-w-[900px] bg-white rounded-xl shadow-2xl p-6 md:p-8 transform transition-all duration-300 hover:scale-105">
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 pb-3 md:pb-6 text-center">
          User Details
        </h2>
        <div className="flex flex-col items-center space-y-6">
          <div className="w-32 h-32 rounded-full border-2 border-gray-300 relative">
            <img
              onClick={handleImageClick}
              src={profileUrl || userLogo}
              className="w-full h-full rounded-full object-cover cursor-pointer"
              alt="user"
            />
            <div
              onClick={handleImageClick}
              className="cursor-pointer absolute z-10 top-[73%] right-[3%] bg-black rounded-full p-1 border-2 border-white"
            >
              <PencilLine size={20} strokeWidth={1.5} className="text-white" />
            </div>
          </div>

          <div className="w-full max-w-[400px] space-y-4">
            <div>
              <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="relative mt-1">
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-500 bg-gray-100"
                  placeholder={user.fullName}
                  disabled
                />
                <IdCard className="absolute top-[50%] right-3 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="relative mt-1">
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-500 bg-gray-100"
                  placeholder={user.username}
                  disabled
                />
                <User className="absolute top-[50%] right-3 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative mt-1">
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-500 bg-gray-100"
                  placeholder={user.email}
                  disabled
                />
                <Mail className="absolute top-[50%] right-3 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>

            {/* <div>
              <label htmlFor="createdAt" className="block text-sm font-medium text-gray-700">
                Created At
              </label>
              <div className="relative mt-1">
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-500 bg-gray-100"
                  placeholder={moment(user.createdAt).format('MMM Do YY')}
                  disabled
                />
                <Calendar className="absolute top-[50%] right-3 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div> */}

            <form onSubmit={handleSubmit} className="w-full">
              <input
                type="file"
                onChange={handleFileChange}
                name="profilePic"
                ref={profileInput}
                style={{ display: 'none' }}
              />
              <button
                type="submit"
                className="mt-3 w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;