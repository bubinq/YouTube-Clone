import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useLocalStorage("users", []);
  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      {children}
    </UsersContext.Provider>
  );
};
