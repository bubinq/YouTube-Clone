import { Link } from "react-router-dom";

export const VideoCard = ({ video, users }) => {
  const currUser = users.find((user) => user._id === video.ownerId);
  return (
    <div className="cardWrapper">
      <Link to={`/watch/${video._id}`}>
        <img src={video.imgUrl} alt={video.title}></img>
        <div className="videoDescription">
          <div className="creatorChannel">
            <img src={currUser.img} alt="Display profile"></img>
          </div>
          <div className="videoInfo">
            <h4>{video.title}</h4>
            <div className="channelViews">
              <span>{currUser ? currUser.name : "Nothing, Sorry Mate"}</span>
              <span>{video.views} views</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
