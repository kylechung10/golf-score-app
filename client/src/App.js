import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Play from "./pages/Play";
import Account from "./pages/Account";
import History from "./pages/History";

function App() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const localUsername = () => {
      if (localStorage.getItem("username")) {
        setUsername(localStorage.getItem("username"));
      }
    };
    localUsername();
  }, []);

  const appLogin = (passUsername, rememberMe) => {
    setUsername(passUsername);
    if (passUsername && rememberMe) {
      // Sets username in localStorage if remember me is true
      localStorage.setItem("username", passUsername);
    }
    // If the logout button is pressed, remove the item from localStorage
    if (!passUsername) {
      localStorage.removeItem("username");
      sessionStorage.clear();
    }
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
