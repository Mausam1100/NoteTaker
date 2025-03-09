import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import api from './api';

function Login() {
  const { setIsLogin, setProgress } = useContext(UserContext);
  const [formData, setFormData] = useState({
    emailUsername: '',
    password: '',
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

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
      const response = await api.post('/api/v1/user/login', formData);
      setProgress(50);
      if (response.data.data.accessToken) {
        setIsLogin(true);
        localStorage.setItem('accessToken', JSON.stringify(response.data.data.accessToken));
        localStorage.setItem('savedProfileUrl', response.data.data.user.profilePic);
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
  };

  return (
    <div className="min-h-[calc(100vh-66px)] flex md:items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="md:w-full h-full mt-14 md:mt-0 w-[92%] my-4 max-w-md bg-white rounded-xl shadow-2xl p-6 md:p-8 space-y-6 transform transition-all duration-300 hover:scale-105">
        <div className="text-center space-y-3">
          <h1 className="md:text-3xl text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Welcome To NoteTaker
          </h1>
          <p className="text-gray-600 text-sm md:text-base">The only platform you need for your personal and professional growth.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="emailUsername" className="block text-sm font-medium text-gray-700">
              Email or username
            </label>
            <input
              type="text"
              className="mt-1 block w-full md:px-4 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              onChange={handleChange}
              value={formData.emailUsername}
              name="emailUsername"
              placeholder="Email or username"
              id="emailUsername"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? 'text' : 'password'}
                className="block w-full md:px-4 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                onChange={handleChange}
                value={formData.password}
                name="password"
                placeholder="Password"
                id="password"
                required
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 cursor-pointer" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 cursor-pointer" />
                )}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
          >
            Login
          </button>
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <span
              onClick={() => navigate('/register')}
              className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
            >
              Sign up
            </span>
          </p>
        </form>
        <div>
          <p className="text-center text-xs text-gray-500">
            By logging in, you agree to NoteTaker's{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;