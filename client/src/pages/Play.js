import React, { useState } from "react";
import CreateAccount from "../components/CreateAccount";
import GameSetup from "../components/GameSetup";
import Login from "../components/Login";

function Play(props) {
  const { username } = props;
  const { appLogin } = props;
  const [showLogin, setShowLogin] = useState(true);

  return (
    <section className="page-play">
      {username ? (
        <GameSetup username={username} />
      ) : (
        <>
          {showLogin ? (
            <>
              <Login appLogin={appLogin} />
              <p>Don't have an account?</p>
            </>
          ) : (
            <>
              <CreateAccount appLogin={appLogin} />
              <p>Already have an account?</p>
            </>
          )}
          <button onClick={() => setShowLogin(!showLogin)}>
            {showLogin ? "Create Account" : "Log In"}
          </button>
        </>
      )}
    </section>
  );
}

export default Play;
