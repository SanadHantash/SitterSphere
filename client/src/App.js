import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TestPage from './pages/TestPage';
import './App.css';
import './index.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <BrowserRouter>
          <Routes>
          <Route path="/" element={<TestPage />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
