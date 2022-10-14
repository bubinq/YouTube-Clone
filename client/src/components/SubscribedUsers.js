import { Link } from "react-router-dom";
export const SubscribedUsers = ({ channel }) => {
  return (
    <>
      {channel && (
        <Link to="/">
          <div className="subscriptionCard">
            <div className="subscriptionProfile">
              <img src={channel.img} alt="Dislay Profile"></img>
            </div>
            <span className="subName">{channel.name}</span>
          </div>
        </Link>
      )}
    </>
  );
};
