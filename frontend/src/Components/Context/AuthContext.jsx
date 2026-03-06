import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo"))
  );

  const login = (newToken, userData) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("userInfo", JSON.stringify(userData));

    setToken(newToken);
    setUserInfo(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");

    setToken(null);
    setUserInfo(null);
  };

  const updateUser = (updatedUser) => {
    localStorage.setItem("userInfo", JSON.stringify(updatedUser));
    setUserInfo(updatedUser);
  };

  return (
    <AuthContext.Provider 
      value={{ token, userInfo, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);