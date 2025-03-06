import React, { useContext, useState } from 'react';
import logo from '../assets/logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { UserContext } from '../App';

function NavBar() {
  const navigate = useNavigate();
  const { isLogin } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-white border-b-[1px] border-gray-200 shadow-sm">
      <div className="flex items-center justify-between m-auto w-[90%] max-w-[1300px] h-16">
        <div>
          <a
            href="/"
            className="flex gap-x-3 items-center transform transition-all duration-300 hover:scale-105"
          >
            <img src={logo} alt="logo" className="w-7" />
            <h2 className="font-[600] text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              NoteTaker
            </h2>
          </a>
        </div>

        <div className="flex items-center">
          <ul className="flex items-center gap-x-9">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-gray-700 hover:text-blue-600 transition-all duration-200 ${
                    isActive ? 'font-semibold text-blue-600' : ''
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/notes"
                className={({ isActive }) =>
                  `text-gray-700 hover:text-blue-600 transition-all duration-200 ${
                    isActive ? 'font-semibold text-blue-600' : ''
                  }`
                }
              >
                Notes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `text-gray-700 hover:text-blue-600 transition-all duration-200 ${
                    isActive ? 'font-semibold text-blue-600' : ''
                  }`
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `text-gray-700 hover:text-blue-600 transition-all duration-200 ${
                    isActive ? 'font-semibold text-blue-600' : ''
                  }`
                }
              >
                Profile
              </NavLink>
            </li>
          </ul>
          {isLogin ? (
            <button
              onClick={() => setShowModal(true)}
              className="ml-8 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              Log Out
            </button>
          ) : (
            <div className="flex gap-x-4 ml-8">
              <button
                onClick={() => navigate('/login')}
                className="px-7 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
      {showModal && <Modal showModal={showModal} setShowModal={setShowModal} />}
    </div>
  );
}

export default NavBar;