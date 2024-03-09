import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "../../dashboard/src/pages/Dashboard";
import Login from "./pages/Login";
import SitterDetail from "./pages/SitterDetail";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Dashboard />} />
            <Route path='/sitter/:id' element={<SitterDetail />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
