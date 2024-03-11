import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "../../dashboard/src/pages/Dashboard";
import Login from "./pages/Login";
import SitterDetail from "./pages/SitterDetail";
import { useAuth } from "./Context/AuthContext";

function App() {
  const { isLoggedIn } = useAuth();
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
        
            <Route path="/" element={<Login />} />
            {isLoggedIn ? (
              <>
                <Route path="/home" element={<Dashboard />} />
              </>
            ) : (
              <Route path="/home" element={<Login />} />
            )}
            {isLoggedIn ? (
              <>
                <Route path="/sitter/:id" element={<SitterDetail />} />
              </>
            ) : (
              <Route path="/sitter/:id" element={<Login />} />
            )}
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
