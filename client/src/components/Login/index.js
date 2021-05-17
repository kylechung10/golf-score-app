import React, { useState, useEffect } from "react";
import Axios from "axios";
import Modal from "../Modal/Modal.js";

function Login(props) {
  const [inputUsername, setInputUsername] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Login the user based on input field
  const loginUser = async (e) => {
    e.preventDefault();
    const response = await Axios.get(`/api/account/${inputUsername}`);
    if (response.data) {
      props.appLogin(response.data.username, rememberMe);
    } else {
      setModalOpen(true);
    }
  };

  // Check if an account was created and passed in
  useEffect(() => {
    const checkAccount = () => {
      if (props.createdAccount) {
        setInputUsername(props.createdAccount);
      }
    };
    checkAccount();
  }, [inputUsername, props.createdAccount]);

  return (
    <>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        Invalid username
      </Modal>
      <form id="login-form" onSubmit={(e) => loginUser(e)}>
        <h1 className="form-header">Login to Play!</h1>
        <div className="form-input">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter username"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
          />
        </div>
        <div className="form-input checkbox">
          <input
            type="checkbox"
            id="remember-me"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <label htmlFor="remember-me">Remember Me</label>
        </div>
        <div className="form-input">
          <button
            type="submit"
            className="btn-main"
            disabled={inputUsername ? false : true}
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
}

export default Login;
