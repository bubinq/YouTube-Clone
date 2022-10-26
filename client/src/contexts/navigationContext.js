import { createContext, useState } from "react";

export const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
    const [toggleSideMenu, setToggleSideMenu] = useState(false)

    const sideMenuToggle = () => {
        setToggleSideMenu(!toggleSideMenu)
        console.log(toggleSideMenu);
        if(window.location.pathname.includes("/watch")) {

            console.log('Watch')
        }
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
