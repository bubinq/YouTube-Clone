import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import { VideoProvider } from "./contexts/videosContext";
import { UsersProvider } from "./contexts/usersContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <VideoProvider>
        <UsersProvider>
          <App />
        </UsersProvider>
      </VideoProvider>
    </AuthProvider>
  </BrowserRouter>
);
