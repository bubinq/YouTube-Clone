import { Link } from "react-router-dom";

export const LikeDislikeErros = ({ showErrorsHandler, error }) => {
  return (
    <div
      className={error.type === "like" ? "errorModalLike" : "errorModalDislike"}
      onClick={(ev) => {
        showErrorsHandler(ev, true);
      }}
    >
      <span className="likeIt">
        {error.type === "like" ? "Like this video?" : "Don't like this video?"}
      </span>
      <br></br>
      <span>Sign in to make your opinion count.</span>
      <div className="sidehL"></div>
      <Link to="/login">
        <button className="signInBtn">Sign in</button>
      </Link>
    </div>
  );
};
