import { createContext, useState } from "react";

export const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
    const [toggleSideMenu, setToggleSideMenu] = useState(true)

    const sideMenuToggle = () => {
        setToggleSideMenu(!toggleSideMenu)
    }

  return (
    <NavigationContext.Provider
      value={{
        toggleSideMenu,
        sideMenuToggle
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
