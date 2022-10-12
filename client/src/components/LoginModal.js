import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "../pages/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

export const LoginModal = ({ showModalHandler, toggle }) => {
  const { setAuthUser } = useContext(AuthContext);
  const [isFocused, setFocus] = useState({
    email: false,
    password: false,
  });

  const navigateTo = useNavigate();

  const loginHandler = async (ev) => {
    ev.preventDefault();
    const { email, password } = Object.fromEntries(new FormData(ev.target));

    try {
      const response = await axios.post(
        "http://localhost:3030/api/auth/login",
        {
          email,
          password,
        }
      );
      setAuthUser(response.data);
      console.log(response.data);
      navigateTo("/", { replace: true });
    } catch (error) {
      alert(error);
    }
  };

  const labelHandler = (ev) => {
    let input = ev.target;
    if (input.value.trim()) {
      setFocus((oldFocus) => ({ ...oldFocus, [input.name]: true }));
      return;
    }
    setFocus((oldFocus) => ({
      ...oldFocus,
      [input.name]: !isFocused[`${input.name}`],
    }));
  };

  if (!toggle) {
    return (
      <>
        <div className="overlay" onClick={showModalHandler}></div>
        <div className="modal-content">
          <h3>Welcome back</h3>
          <div className="text-wrapper">
            <span>Don't have an account?</span>
            <Link to="/register">Sign up</Link>
          </div>

          <form onSubmit={loginHandler}>
            <div className="email-wrapper">
              <label
                htmlFor="email"
                className={isFocused.email ? "focused" : "labels"}
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                onBlur={labelHandler}
                onFocus={labelHandler}
                autoComplete="off"
                required
              />
            </div>

            <div className="password-wrapper">
              <label
                htmlFor="password"
                className={isFocused.password ? "focused" : "labels"}
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                onBlur={labelHandler}
                onFocus={labelHandler}
                required
              />
            </div>

            <div className="authBtn">
              <button>Log in</button>
            </div>
          </form>
          <div className="modal-close">
            <button onClick={showModalHandler}>&#x2716;</button>
          </div>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};
