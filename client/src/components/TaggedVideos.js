import axios from "axios";
import dayjs from "dayjs"
import { useState, useEffect } from "react";
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)

export const TaggedVideos = ({ video }) => {
  const [taggedVideos, setTaggedVideos] = useState([]);
  

  useEffect(() => {
    const loadTaggedVideos = async () => {
      const videos = await axios.get(`/video/tags/${video._id}`);
      setTaggedVideos(videos.data);
    };
    loadTaggedVideos();
  }, [video._id]);
  return (
    <div className="tagsWrapper">
      {taggedVideos.map((tagVideo) => (
        <a key={tagVideo._id} href={`/watch/${tagVideo._id}`}>
          <div className="taggedVideo">
            <img
              className="tagThumbnail"
              src={tagVideo.imgUrl}
              alt="Tagged video thumbnail"
            ></img>
            <div className="tagInfo">
              <h4 className="taggedHeading">{tagVideo.title}</h4>
              <span className="taggedCreator">Creator</span>
              <div className="tagViews">
                <span>
                  {tagVideo.views} views • {dayjs(tagVideo.createdAt).fromNow()}
                </span>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};
