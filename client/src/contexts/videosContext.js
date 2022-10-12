import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useLocalStorage("videos", []);
  return (
    <VideoContext.Provider value={{ videos, setVideos }}>
      {children}
    </VideoContext.Provider>
  );
};
