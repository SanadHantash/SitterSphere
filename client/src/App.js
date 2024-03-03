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
import Subscribe from './Pages/Subscribe';
import Subscription from './Pages/Subscription';
import PremiumSubscribe from './Components/CheckoutForm';
import Success from './Pages/Success';
import AboutUs from './Pages/AboutUs';
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
          <Route path="/requestDetail/:id" element={<RequestDetail />}/>
          <Route path="/contactus" element={<Contactus />}/>
          <Route path="/about" element={<AboutUs />} />
          <Route path="/pricing" element={<Subscribe />} />
            <Route path="/subscribe" element={<Subscription />} />
            <Route path="/premium-subscribe" element={<PremiumSubscribe />} />
            <Route path="/successs" element={<Success />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
