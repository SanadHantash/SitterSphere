import { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("authToken"));

  const [headers, setHeaders] = useState([]);

  const login = (Token) => {
    setIsLoggedIn(true);
    setHeaders({ token: Token });
  };

  const logout = () => {
    const removed = Cookies.remove("Token");
    console.log("Token removed:", removed);

    console.log("Before logout, isLoggedIn:", isLoggedIn);
    setIsLoggedIn(false);
    console.log("After logout, isLoggedIn:", isLoggedIn);
  };

  useEffect(() => {
    setIsLoggedIn(!!Cookies.get("Token"));
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, headers }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
