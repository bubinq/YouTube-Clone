import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { useState } from "react";
import axios from "axios";
import { VideoContext } from "../contexts/videosContext";
export const Navigation = ({ showDropDownMenu, show, showModalHandler }) => {
  const { authUser, setAuthUser } = useContext(AuthContext);
  const { setVideos } = useContext(VideoContext);
  const [searchValue, setSearchValue] = useState("");
  const navigateTo = useNavigate();

  const searchVideoHandler = async (ev) => {
    ev.preventDefault();
    try {
      if (searchValue.trim()) {
        const response = await axios.post(
          "/video/search",
          {
            search: searchValue,
          }
        );
        setVideos(response.data);
        navigateTo("/results");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const logoutHandler = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      setAuthUser(null);
      localStorage.removeItem("authUser");
      document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigateTo("/", { redirect: true });
    }
  };
  return (
    <header>
      <div className="headerWrapper">
        <nav>
          <div className="logoWrapper">
            <div className="menuBtnWrapper">
              <div></div>
              <div></div>
              <div></div>
            </div>
            <Link to="/">
              <div className="logo" title="YouTube Home">
                <img
                  className="logoImg"
                  src="https://cdn.mos.cms.futurecdn.net/8gzcr6RpGStvZFA2qRt4v6-1200-80.jpg"
                  alt="YouTube Logo"
                ></img>
              </div>
            </Link>
          </div>
          <div className="searchBar">
            <form onSubmit={searchVideoHandler}>
              <input
                type="text"
                name="search"
                placeholder="Search"
                value={searchValue}
                onChange={(ev) => {
                  setSearchValue(ev.target.value);
                }}
              ></input>
              <button className="searchBtn">
                <div className="tooltip">
                  <img
                    className="searchIcon"
                    src="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/search-512.png"
                    alt="Searh Button"
                  ></img>
                  <span className="tooltiptext">Search</span>
                </div>
              </button>
            </form>
          </div>
          <div className="profileSection">
            {!authUser ? (
              <Link to="/login" onClick={showModalHandler}>
                <div className="signInBtn">
                  <img
                    src="https://cdn1.iconfinder.com/data/icons/unicons-line-vol-6/24/user-circle-512.png"
                    alt="signInPerson"
                  ></img>
                  <button className="signIn">Sign In</button>
                </div>
              </Link>
            ) : (
              <>
                <Link to="/create">
                  <div className="createVideo">
                    <div className="tooltip">
                      <img
                        className="createVideo"
                        src="https://cdn3.iconfinder.com/data/icons/user-interface-733/32/Video-256.png"
                        alt="Create Video"
                      />
                      <span className="tooltiptext">Create</span>
                    </div>
                  </div>
                </Link>

                <div className="profileCircle" onClick={showDropDownMenu}>
                  <img src={authUser.img} alt="Display profile"></img>
                </div>
                {show && (
                  <div
                    className="dropDownMenu"
                    onClick={(ev) => showDropDownMenu(ev, true)}
                  >
                    <ul>
                      <li className="headerSection">
                        <div className="profileCircle2">
                          <img src={authUser.img} alt="Display profile"></img>
                        </div>
                        <h3>{authUser.name}</h3>
                      </li>
                      <div className="navhL"></div>
                      <li>View Profile(Currently Disabled)</li>
                      <div className="navhL"></div>
                      <li className="signOut" onClick={logoutHandler}>
                        Sign out
                      </li>
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};
