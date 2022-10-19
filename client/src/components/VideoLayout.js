import axios from "axios";
import { useContext, useState } from "react";
import { VideoContext } from "../contexts/videosContext";
import { LikeDislikeErros } from "./LikeDislikeErrors";

export const VideoLayout = () => {
  const { displayedVideo, displayedChannel, likes, setLikes } =
    useContext(VideoContext);
  const [errors, setErrors] = useState({ message: "", type: "", show: false });
  const [isSubscribed, setSubscribed] = useState(false);

  // useEffect(() => {
  //   const getMe = async () => {

  //   }
  // }, [])

  const likeVideo = async () => {
    try {
      const video = await axios.patch(`/video/like/${displayedVideo._id}`);
      setLikes(video.data.video.likes.length);
      setErrors({ message: "", type: "", show: false });
    } catch (error) {
      setErrors({
        message: error.response.data.message,
        type: "like",
        show: true,
      });
    }
  };

  const dislikeVideo = async () => {
    try {
      const video = await axios.patch(`/video/dislike/${displayedVideo._id}`);
      setLikes(video.data.video.likes.length);
      setErrors({ message: "", type: "", show: false });
    } catch (error) {
      setErrors({
        message: error.response.data.message,
        type: "dislike",
        show: true,
      });
    }
  };

  const subscribeToChannel = async () => {
    try {
      const myUser = await axios.get("/user/me/");
      if (myUser.data.subscribedChannels.includes(displayedChannel._id)) {
        await axios.patch(`/user/unsub/${displayedChannel._id}`);
        await axios.patch(`/user/decSubs/${displayedChannel._id}`);
        setSubscribed(false);
      } else {
        await axios.patch(`/user/sub/${displayedChannel._id}`);
        await axios.patch(`/user/incSubs/${displayedChannel._id}`);
        setSubscribed(true);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const showErrorsHandler = (ev, value) => {
    ev.stopPropagation();
    if (value) {
      setErrors((oldErr) => ({ ...oldErr, show: value }));
    } else {
      setErrors((oldErr) => ({ ...oldErr, show: !errors.show }));
    }
  };

  return (
    <div
      className="watchVideoWrapper"
      onClick={() => {
        setErrors((oldErr) => ({ ...oldErr, show: false }));
      }}
    >
      <div className="displayedVideoWrapper">
        <iframe
          src={`${displayedVideo?.videoUrl}?autoplay=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div className="displayedVideoInfo">
          <div className="heading">
            <h3>{displayedVideo?.title}</h3>
          </div>
          <div className="likeDislike">
            <span>{displayedVideo?.views} views</span>
            <div className="icons">
              <div className="icon" onClick={likeVideo}>
                <img
                  src="https://cdn2.iconfinder.com/data/icons/social-productivity-line-art-2/128/thumbs-up-2-512.png"
                  alt="like btn"
                ></img>
                <h4>{likes === 0 ? displayedVideo?.likes.length : likes}</h4>
              </div>
              {errors.show && (
                <LikeDislikeErros
                  showErrorsHandler={showErrorsHandler}
                  error={errors}
                ></LikeDislikeErros>
              )}
              <div className="icon" onClick={dislikeVideo}>
                <img
                  src="https://cdn1.iconfinder.com/data/icons/jumpicon-basic-ui-line-1/32/-_Thumb-Down-Dislike-Hand-512.png"
                  alt="dislike video"
                ></img>
                <h4>DISLIKE</h4>
              </div>
              {errors.show && (
                <LikeDislikeErros
                  showErrorsHandler={showErrorsHandler}
                  error={errors}
                ></LikeDislikeErros>
              )}
              <div className="icon">
                <img
                  src="https://cdn1.iconfinder.com/data/icons/lucid-arrows-and-directions/24/arrow_right_share_curved_forward-512.png"
                  alt="share video"
                ></img>
                <h4>SHARE</h4>
              </div>
              <div className="icon">
                <img
                  src="https://cdn2.iconfinder.com/data/icons/lightly-icons/30/download-alt-480.png"
                  alt="Download video"
                ></img>
                <h4>DOWNLOAD</h4>
              </div>
              <div className="icon">
                <img
                  src="https://cdn0.iconfinder.com/data/icons/phosphor-thin-vol-4/256/scissors-thin-512.png"
                  alt="Clip video"
                ></img>
                <h4>CLIP</h4>
              </div>
              <div className="icon">
                <h3>...</h3>
              </div>
            </div>
          </div>
          <div className="sidehL"></div>
        </div>
        <div className="displayedVideoChannelInfo">
          <div className="channelWrap">
            <div className="channelPicture">
              <img
                src={displayedChannel?.img}
                alt="Displayed Channel Icon"
              ></img>
            </div>
            <div className="channelInfo">
              <div className="userAndSubs">
                <h5>{displayedChannel?.name}</h5>
                <span>{displayedChannel?.subscribers} subscribers</span>
              </div>
              <div className="channelDescription">
                <span>{displayedVideo?.desc}</span>
              </div>
            </div>
          </div>

          <div className="subscribeToChannel" onClick={subscribeToChannel}>
            <button className={isSubscribed ? "unSubBtn" : "subBtn"}>
              {isSubscribed? "Unsubscribe" : "Subscribe"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
