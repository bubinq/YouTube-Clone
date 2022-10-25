import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./contexts/authContext";
import { VideoProvider } from "./contexts/videosContext";
import { UsersProvider } from "./contexts/usersContext";
import { CommentProvider } from "./contexts/commentsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <VideoProvider>
      <UsersProvider>
        <CommentProvider>
          <App />
        </CommentProvider>
      </UsersProvider>
    </VideoProvider>
  </AuthProvider>
);
