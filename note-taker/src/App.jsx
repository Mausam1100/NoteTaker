import React, { useState, useEffect, createContext, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Notes from "./components/Notes";
import About from "./components/About";
import Profile from "./components/Profile";
import View from "./components/View";
import TopLoadingBar from "react-top-loading-bar";

const UserContext = createContext()
function App() {
  const [isLogin, setIsLogin] = useState(false);

  const loadingBarRef = useRef(null);
  const [progress, setProgress] = useState(0);

  // const startLoading = () => {
  //   setProgress(30);
  //   setTimeout(() => setProgress(100), 1000); // Simulating a loading delay
  // };

  // Check if user is already logged or not
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLogin(true);
    }
  }, []);

  return (
    <Router>
      <UserContext.Provider value={{isLogin, setIsLogin}}>
        <NavBar setIsLogin={setIsLogin} />
        <TopLoadingBar color="#f11946" progress={progress} onLoaderFinished={() => setProgress(0)} ref={loadingBarRef} />
        <Routes>
          <Route path="/" element={isLogin ? <Home loadingBarRef={loadingBarRef} /> : <Navigate to="/login" />} />
          <Route path="/notes" element={isLogin ? <Notes loadingBarRef={loadingBarRef} /> : <Navigate to="/login" />} />
          <Route path="/login" element={isLogin ? <Navigate to="/" /> : <Login loadingBarRef={loadingBarRef} />} />
          <Route path="/register" element={isLogin ? <Navigate to="/" /> : <Register loadingBarRef={loadingBarRef} />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={isLogin? <Profile/>: <Navigate to="/login"/>} />
          <Route path="/view/:id" element={isLogin? <View/>: <Navigate to="/login"/>} />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
export {UserContext}