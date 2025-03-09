import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from './api';
import { UserContext } from '../App';

function ChangePassword() {
    const { setIsLogin, setProgress } = useContext(UserContext);
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setProgress(20);
    try {
      const response = await api.post('/api/v1/user/change-password', formData);
      setProgress(50);
      if (response.data.data) {
        setProgress(70);
        toast.success(response.data.message);
        setProgress(100);
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response.data.error.message);
      setProgress(100);
      console.log(error);
    }
  }   

  return (
    <div className="min-h-[calc(100vh-66px)] flex md:items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="md:w-full h-full mt-14 md:mt-0 w-[92%] my-4 max-w-md bg-white rounded-xl shadow-2xl p-6 md:p-8 space-y-6 transform transition-all duration-300 hover:scale-105">
        <div className="text-center space-y-3">
          <h1 className="md:text-3xl text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Change Password
          </h1>
          <p className="text-gray-600 text-sm md:text-base">Enter a new password below to change your password.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
              Old Password
            </label>
            <div className='relative'>
                <input
                type={showOldPassword? "text": "password"}
                className="mt-1 block w-full md:px-4 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                onChange={handleChange}
                value={formData.oldPassword}
                name="oldPassword"
                placeholder="Old password"
                id="oldPassword"
                required
                />
                <button
                    type="button"
                    onClick={() => setShowOldPassword((prev) => !prev)}
                    className="hover:bg-transparent absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                    {showOldPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 cursor-pointer" />
                    ) : (
                    <Eye className="h-5 w-5 text-gray-400 cursor-pointer" />
                    )}
                </button>
            </div>
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="relative mt-1">
              <input
                type={showNewPassword ? 'text' : 'password'}
                className="block w-full md:px-4 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                onChange={handleChange}
                value={formData.newPassword}
                name="newPassword"
                placeholder="newPassword"
                id="newPassword"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="hover:bg-transparent absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showNewPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 cursor-pointer" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 cursor-pointer" />
                )}
              </button>
            </div>
            </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative mt-1">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className="block w-full md:px-4 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                onChange={handleChange}
                value={formData.confirmPassword}
                name="confirmPassword"
                placeholder="confirmPassword"
                id="confirmPassword"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="hover:bg-transparent absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 cursor-pointer" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 cursor-pointer" />
                )}
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword