import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Navigation } from "../components/Navigation";
import { VideoLayout } from "../components/VideoLayout";
import { useParams } from "react-router";
import { VideoContext } from "../contexts/videosContext";

export const VideoDisplay = () => {
  const currentVideo = useParams().videoId;
  const [show, setShow] = useState(false);
  const { setDislayedVideo, setDisplayedChannel } = useContext(VideoContext);
  const showDropDownMenu = (ev, value) => {
    ev.stopPropagation();
    if (value) {
      setShow(value);
    } else {
      setShow(!show);
    }
  };

  useEffect(() => {
    const loadVideo = async () => {
      const video = await axios.get(`/video/${currentVideo}`);
      setDislayedVideo(video.data);
      const channel = await axios.get(`/user/users/${video.data.ownerId}`)
      setDisplayedChannel(channel.data)
    };
    const increaseView = async () => {
      await axios.put(`/video/view/${currentVideo}`);
    };
    const increaseTrendinvView = async () => {
      await axios.put(`/video/incrTrend/${currentVideo}`);
    };
    loadVideo();
    increaseView();
    increaseTrendinvView();
    //eslint-disable-next-line
  }, []);
  return (
    <div
      onClick={() => {
        setShow(false);
      }}
    >
      <Navigation showDropDownMenu={showDropDownMenu} show={show}></Navigation>
      <main>
        <VideoLayout></VideoLayout>
      </main>
    </div>
  );
};
