import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "../../dashboard/src/pages/Dashboard";
import Details from "./pages/Details";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Dashboard />} />
            <Route path="/details/:id" element={<Details />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
