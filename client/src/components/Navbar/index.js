import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { IconContext } from "react-icons";
import "./Navbar.scss";

function Navbar(props) {
  const { username } = props;
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <NavLink to="#" className="menu-bars" onClick={showSidebar}>
            <FaIcons.FaBars />
          </NavLink>
          <h1 className="main-title" onClick={showSidebar}>
            Golf With Friends
          </h1>
        </div>
        <div
          className={sidebar ? "nav-shade active" : "nav-shade"}
          onClick={showSidebar}
        ></div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items">
            <li className="navbar-toggle">
              <NavLink to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </NavLink>
            </li>
            <li className="nav-text" onClick={showSidebar}>
              <NavLink to="/" activeClassName="active" exact={true}>
                <IoIcons.IoGolf />
                <span>Play</span>
              </NavLink>
            </li>
            <li className="nav-text" onClick={showSidebar}>
              <NavLink to="/about" activeClassName="active" exact={true}>
                <IoIcons.IoInformationCircle />
                <span>About</span>
              </NavLink>
            </li>
            {username ? (
              <>
                <li className="nav-text" onClick={showSidebar}>
                  <NavLink to="/history" activeClassName="active" exact={true}>
                    <FaIcons.FaUser />
                    <span>Game History</span>
                  </NavLink>
                </li>
                <li className="nav-text" onClick={showSidebar}>
                  <NavLink to="/account" activeClassName="active" exact={true}>
                    <FaIcons.FaUser />
                    <span>Account</span>
                  </NavLink>
                </li>
              </>
            ) : undefined}
          </ul>
          {username ? (
            <button
              className="logout"
              onClick={() => {
                showSidebar();
                props.appLogin("");
              }}
            >
              LOG OUT
            </button>
          ) : undefined}
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
