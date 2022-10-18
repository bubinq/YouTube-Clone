import { createContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useLocalStorage("authUser", null);
  const [subbedChannels, setSubbedChannels] = useState([])
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, subbedChannels, setSubbedChannels }}>
      {children}
    </AuthContext.Provider>
  );
};
