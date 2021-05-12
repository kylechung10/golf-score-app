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
    <>
      <form id="create-account-form" onSubmit={(e) => createAccount(e)}>
        <h1 className="form-header">Create Account</h1>
        <div className="form-input">
          <label htmlFor="create-user">Username</label>
          <input
            type="text"
            id="create-user"
            placeholder="Create username"
            value={createUsername}
            onChange={(e) => setCreateUsername(e.target.value)}
          />
        </div>
        <div className="form-input">
          <button
            type="submit"
            className="btn-main"
            disabled={createUsername ? false : true}
          >
            Create Account
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateAccount;
