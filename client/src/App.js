import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import './index.css';
import Home from './Pages/Home';
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import Header from './Components/Header';
import Footer from './Components/Footer';
import BabySitters from './Pages/BabySitters';
import Requests from './Pages/Requests';
import BabySitterdetail from './Pages/BabySitterdetail';
import RequestDetail from './Pages/RequestDetail';
import Contactus from './Pages/Contactus';
import AboutUs from './Pages/AboutUs';
import Profile from './Pages/Profile';
import PasswordForget from './Pages/PasswordForget';
import VerifyCode from "./Pages/VerifyCode";
import ResetPass from "./Pages/ResetPass";
import { useAuth } from "./Context/AuthContext";

function App() {
  const { isLoggedIn } = useAuth();
  return (
    <div className="App">
      <header className="App-header">
      <BrowserRouter>
      <Header />
          <Routes>
          <Route path="/" element={<Home />} />
          {isLoggedIn ? (
              <>
                <Route path="/profile" element={<Profile />} />
              </>
            ) : (
              <Route path="/profile" element={<LoginPage />} />
            )}
          <Route path="/Login" element={<LoginPage />} />
            <Route path="/signup" element={<RegisterPage />} />
          <Route path="/sitters" element={<BabySitters />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/babysitterDetails/:id" element={<BabySitterdetail />}/>
          <Route path="/requestDetail/:id" element={<RequestDetail />}/>
          <Route path="/contactus" element={<Contactus />}/>
          <Route path="/about" element={<AboutUs />} />
            <Route path="/profile" element= {<Profile />} />
            <Route path="/passwordforget" element={<PasswordForget />} />
            <Route path="/verify-code" element={<VerifyCode />} />
            <Route path="/reset-password" element={<ResetPass />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
