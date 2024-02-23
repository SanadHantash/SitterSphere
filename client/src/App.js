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
//import { useAuth } from "./Context/AuthContext";

function App() {
  // const { isLoggedIn } = useAuth();
  return (
    <div className="App">
      <header className="App-header">
      <BrowserRouter>
      <Header />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<LoginPage />} />
            <Route path="/signup" element={<RegisterPage />} />
          <Route path="/sitters" element={<BabySitters />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/babysitterDetails/:id" element={<BabySitterdetail />}/>
          </Routes>
          <Footer />
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
