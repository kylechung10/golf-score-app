import React, { useState } from "react";
import Axios from "axios";

function CreateAccount(props) {
  const [createUsername, setCreateUsername] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const apiURL = process.env.apiURL || "http://localhost:5000";

  const createAccount = async (e) => {
    e.preventDefault();
    const response = await Axios.post(`${apiURL}/api/account/create`, {
      username: createUsername,
    });
    if (response.data) {
      props.appLogin(response.data.username, rememberMe);
    } else {
      alert("Account already exists");
    }
  };

  return (
    <form id="create-account" onSubmit={(e) => createAccount(e)}>
      <input
        type="text"
        value={createUsername}
        onChange={(e) => setCreateUsername(e.target.value)}
      />
      <input
        type="checkbox"
        id="remember-me"
        checked={rememberMe}
        onChange={() => setRememberMe(!rememberMe)}
      />
      <label htmlFor="remember-me">Remember Me</label>

      <button type="submit" disabled={createUsername ? false : true}>
        Create Account
      </button>
    </form>
  );
}

export default CreateAccount;
