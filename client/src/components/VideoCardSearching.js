export const VideoCardSearching = ({ video, users }) => {
  const currUser = users.find((user) => user._id === video.ownerId);
  return (
    <div className="searchWrapper">
      <img src={video.imgUrl} alt={video.title}></img>
      <div className="searchVideoDescription">
        <div className="searchVideoInfo">
          <h3>{video.title}</h3>
          <span>{video.views} views</span>
          <div className="searchProfileSection">
            <div className="searchCreatorChannel">
              <img src={currUser.img} alt="Display profile"></img>
            </div>
            <div className="searchChannelViews">
              <span>{currUser ? currUser.name : "Nothing, Sorry Mate"}</span>
            </div>
          </div>
          <div className="searchDesc">
            <span>{video.desc}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
