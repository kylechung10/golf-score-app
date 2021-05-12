import React, { useState } from "react";
import Axios from "axios";

function CreateAccount(props) {
  const [createUsername, setCreateUsername] = useState("");

  const apiURL = process.env.apiURL || "http://localhost:5000";

  const createAccount = async (e) => {
    e.preventDefault();
    const response = await Axios.post(`${apiURL}/api/account/create`, {
      username: createUsername,
    });
    if (response.data) {
      props.createdAccount(response.data.username);
    } else {
      alert("An error has occurred or account already exists");
    }
  };

  return (
    <div className="create-account">
      <h1>Create New Account</h1>
      <form id="create-account-form" onSubmit={(e) => createAccount(e)}>
        <div className="form-input">
          <label htmlFor="create-user">Username</label>
          <input
            type="text"
            id="create-user"
            value={createUsername}
            onChange={(e) => setCreateUsername(e.target.value)}
          />
        </div>
        <div className="form-input">
          <button type="submit" disabled={createUsername ? false : true}>
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateAccount;
