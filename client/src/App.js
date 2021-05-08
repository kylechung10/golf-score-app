import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Play from "./pages/Play";
import Account from "./pages/Account";
import History from "./pages/History";

function App() {
  const [username, setUsername] = useState("");

  const appLogin = (passUsername) => {
    setUsername(passUsername);
    passUsername
      ? // Sets username in localStorage
        localStorage.setItem("username", passUsername)
      : // If the logout button is pressed, remove the item from localStorage
        localStorage.removeItem("username");
  };

  return (
    <div className="App">
      <Router>
        <Navbar username={username} appLogin={appLogin} />
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <Play {...props} appLogin={appLogin} username={username} />
            )}
          />
          <Route path="/about" exact component={About} />
          <Route
            path="/history"
            exact
            render={(props) => <History {...props} username={username} />}
          />
          <Route path="/account" exact component={Account} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
