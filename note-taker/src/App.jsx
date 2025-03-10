import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Notes from "./components/Notes";
import About from "./components/About";
import Profile from "./components/Profile";
import View from "./components/View";
import TopLoadingBar from "react-top-loading-bar";
import ChangePassword from "./components/ChangePassword";
import isTokenExpired from "./components/isTokenExpired";
import Cookies from 'js-cookie'

const UserContext = createContext();

function App() {
  // Wrap `useNavigate` inside the Router context
  return (
    <Router>
      <AppWithNavigate />
    </Router>
  );
}

// This component will now be inside the Router context, so `useNavigate()` will work
function AppWithNavigate() {
  const navigate = useNavigate();  // Now this will work, because we are inside Router context
  const [isLogin, setIsLogin] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [progress, setProgress] = useState(0);

  // Check if user is already logged or not
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token && !isTokenExpired(token)) {
      setIsLogin(true);
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("savedProfileUrl");
      Cookies.remove('accessToken', {path: '/'})
      Cookies.remove('refreshToken', {path: '/'})
      setIsLogin(false);
      navigate('/login');
    }
  }, []); 

  return (
    <UserContext.Provider value={{ isLogin, setIsLogin, setProgress, showMenu, setShowMenu }}>
      <NavBar setIsLogin={setIsLogin} />
      <TopLoadingBar color="#1877f2" style={{ height: '2.7px' }} progress={progress} onLoaderFinished={() => setProgress(0)} />
      <Routes>
        <Route path="/" element={isLogin ? <Home /> : <Navigate to="/login" />} />
        <Route path="/notes" element={isLogin ? <Notes /> : <Navigate to="/login" />} />
        <Route path="/login" element={isLogin ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={isLogin ? <Navigate to="/" /> : <Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={isLogin ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/view/:id" element={isLogin ? <View /> : <Navigate to="/login" />} />
        <Route path="/change-password" element={isLogin ? <ChangePassword /> : <Navigate to="/login" />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
export { UserContext };