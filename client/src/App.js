import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import './index.css';
import Home from './Pages/Home';
import Header from './Components/Header';
import Footer from './Components/Footer';
import BabySitters from './Pages/BabySitters';
import Requests from './Pages/Requests';
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
          <Route path="/sitters" element={<BabySitters />} />
          <Route path="/requests" element={<Requests />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
