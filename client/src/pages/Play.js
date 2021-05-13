import React, { useState } from "react";
import CreateAccount from "../components/CreateAccount";
import GameSetup from "../components/GameSetup";
import Login from "../components/Login";
import "./Play.scss";

function Play(props) {
  const { username } = props;
  const { appLogin } = props;
  const [showLogin, setShowLogin] = useState(true);
  // When user creates account, open login screen
  const [createdAccount, setCreatedAccount] = useState(null);

  return username ? (
    <GameSetup username={username} />
  ) : (
    <div className="page-container hero">
      <img
        src={`${process.env.PUBLIC_URL}/img/gwf_logo.svg`}
        alt="Logo"
        id="home-logo"
      />
      {showLogin || createdAccount ? (
        <>
          <Login appLogin={appLogin} createdAccount={createdAccount} />
        </>
      ) : (
        <>
          <CreateAccount createdAccount={(e) => setCreatedAccount(e)} />
        </>
      )}
      <div className="screen-switch">
        <label htmlFor="login-switch">
          {showLogin ? "Don't" : "Already"} have an account?
        </label>
        <button onClick={() => setShowLogin(!showLogin)} id="login-switch">
          {showLogin ? "Create Account" : "Login"}
        </button>
      </div>
    </div>
  );
}

export default Play;
