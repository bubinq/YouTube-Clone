import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/authContext";
export const Comments = ({ video }) => {
  const [loadedComments, setLoadedComments] = useState([]);
  const [commentValue, setCommentValue] = useState("");
  const { authUser } = useContext(AuthContext);

  useEffect(() => {
    const loadVideoComments = async () => {
      const comments = await axios.get(`/comment/allcomments/${video._id}`);
      setLoadedComments(comments.data);
    };
    loadVideoComments();
    //eslint-disable-next-line
  }, []);

  const addCommentHandler = async (ev) => {
    ev.preventDefault();
    if (commentValue.trim()) {
      const response = await axios.post(`/comment/video/${video._id}`, {
        message: commentValue,
      });
      console.log(response.data);
    }
  };
  return (
    <div className="commentWrapper">
      <div className="userProfile">
        <img src={authUser.img} alt="User Profile"></img>
        <form onSubmit={addCommentHandler}>
          <input
            type="text"
            className="addComment"
            placeholder="Add a comment..."
            value={commentValue}
            onChange={(ev) => {
              setCommentValue(ev.target.value);
            }}
          ></input>
          <button>Comment</button>
        </form>
      </div>
      {loadedComments.map((comment) => (
        <div key={comment._id}>
          <span>{comment.message}</span>
        </div>
      ))}
    </div>
  );
};
