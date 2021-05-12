import React, { useState } from "react";
import CreateAccount from "../components/CreateAccount";
import GameSetup from "../components/GameSetup";
import Login from "../components/Login";

function Play(props) {
  const { username } = props;
  const { appLogin } = props;
  const [showLogin, setShowLogin] = useState(true);
  // When user creates account, open login screen
  const [createdAccount, setCreatedAccount] = useState(null);

  return (
    <div className="page-container">
      {username ? (
        <GameSetup username={username} />
      ) : (
        <>
          <img
            src={`${process.env.PUBLIC_URL}/img/gwf_logo.svg`}
            alt="Logo"
            className="home-logo"
          />
          {showLogin || createdAccount ? (
            <>
              <Login appLogin={appLogin} createdAccount={createdAccount} />
              <label htmlFor="login-switch">Don't have an account?</label>
            </>
          ) : (
            <>
              <CreateAccount createdAccount={(e) => setCreatedAccount(e)} />
              <label htmlFor="login-switch">Already have an account?</label>
            </>
          )}
          <button onClick={() => setShowLogin(!showLogin)} id="login-switch">
            {showLogin ? "Create Account" : "Log In"}
          </button>
        </>
      )}
    </div>
  );
}

export default Play;
