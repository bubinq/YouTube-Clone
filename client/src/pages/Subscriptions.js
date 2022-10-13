import { Navigation } from "../components/Navigation";
import { SideMenu } from "../components/SideMenu";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { VideoContext } from "../contexts/videosContext";
import { VideoCard } from "../components/VideoCard";
import { UsersContext } from "../contexts/usersContext";

export const Subscriptions = () => {
  const [show, setShow] = useState(false);
  const { videos, setVideos } = useContext(VideoContext);
  const { users } = useContext(UsersContext);

  useEffect(() => {
    const loadSubscribedToChannels = async () => {
      try {
        const response = await axios.get("/video/sub", {
          withCredentials: true,
        });
        console.log(response.data);
        setVideos(response.data);
      } catch (error) {}
    };
    loadSubscribedToChannels();
    // eslint-disable-next-line
  }, []);
  const showDropDownMenu = (ev, value) => {
    ev.stopPropagation();
    if (value) {
      setShow(value);
    } else {
      setShow(!show);
    }
  };
  return (
    <div
      className="homeWrapper"
      onClick={() => {
        setShow(false);
      }}
    >
      <Navigation showDropDownMenu={showDropDownMenu} show={show}></Navigation>
      <div className="sideAndMainWrapper">
        <SideMenu></SideMenu>
        <main>
          <div className="contentWrapper">
            {videos &&
              videos.map((video) => (
                <VideoCard
                  key={video._id}
                  video={video}
                  users={users}
                ></VideoCard>
              ))}
          </div>
        </main>
      </div>
    </div>
  );
};
