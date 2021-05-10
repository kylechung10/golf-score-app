import React, { useState } from "react";
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

  return (
    <form id="login" onSubmit={(e) => loginUser(e)}>
      <label htmlFor="username">
        Username:
        <input
          type="text"
          id="username"
          name="username"
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
        />
      </label>
      <input
        type="checkbox"
        id="remember-me"
        checked={rememberMe}
        onChange={() => setRememberMe(!rememberMe)}
      />
      <label htmlFor="remember-me">Remember Me</label>
      <button type="submit" disabled={inputUsername ? false : true}>
        Login
      </button>
    </form>
  );
}

export default Login;
