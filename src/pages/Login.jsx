import React from "react";
import "../App.css"; // Import your CSS file

const Login = () => {
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>
        <button type="submit" className="btn-login">
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
