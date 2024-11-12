import { useContext, createContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [loginSatatus, setLoginStatus] = useState('');

  return (
    <AuthContext.Provider value={{ loginSatatus, setLoginStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
