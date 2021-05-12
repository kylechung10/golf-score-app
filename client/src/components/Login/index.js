import React, { useState, useEffect } from "react";
import Axios from "axios";

function Login(props) {
  const [inputUsername, setInputUsername] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  // Use Heroku URL or localhost
  const apiURL = process.env.apiURL || "http://localhost:5000";

  // Login the user based on input field
  const loginUser = async (e) => {
    e.preventDefault();
    const response = await Axios.get(`${apiURL}/api/account/${inputUsername}`);
    if (response.data) {
      props.appLogin(response.data.username, rememberMe);
    } else {
      alert("Not valid username!");
    }
  };

  // Check if an account was created and passed in
  useEffect(() => {
    const checkAccount = () => {
      if (props.createdAccount) {
        setInputUsername(props.createdAccount);
      }
    };
    checkAccount();
  }, [inputUsername, props.createdAccount]);

  return (
    <>
      <form id="login-form" onSubmit={(e) => loginUser(e)}>
        <h1 className="form-header">Login to Play!</h1>
        <div className="form-input">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter username"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
          />
        </div>
        <div className="form-input checkbox">
          <input
            type="checkbox"
            id="remember-me"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <label htmlFor="remember-me">Remember Me</label>
        </div>
        <div className="form-input">
          <button
            type="submit"
            className="btn-main"
            disabled={inputUsername ? false : true}
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
}

export default Login;
