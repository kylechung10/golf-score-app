import React, { useState, useEffect } from "react";
import Axios from "axios";

function Login(props) {
  const [inputUsername, setInputUsername] = useState("");
  // Use Heroku URL or localhost
  const apiURL = process.env.apiURL || "http://localhost:5000";

  useEffect(() => {
    const localUsername = () => {
      if (localStorage.getItem("username")) {
        setInputUsername(localStorage.getItem("username"));
      }
    };
    localUsername();
  }, []);

  // Login the user based on input field
  const loginUser = async (e) => {
    e.preventDefault();
    const response = await Axios.get(`${apiURL}/api/account/${inputUsername}`);
    if (response.data) {
      props.appLogin(response.data.username);
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
          name="username"
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
        />
      </label>
      {/* <button onClick={loginUser} disabled={inputUsername ? false : true}> */}
      <button type="submit" disabled={inputUsername ? false : true}>
        Login
      </button>
    </form>
  );
}

export default Login;
