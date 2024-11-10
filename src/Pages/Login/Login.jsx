import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [signState, setSignState] = useState('Sign In'); 
  const navigate = useNavigate();


  return (
    <div className="login">
      <img src={logo} className="login-logo" alt="" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form action="">
          {signState === "Sign Up" && (
            <input type="text" placeholder="Your name" />
          )}
          <input type="email" placeholder="Your email" />
          <input type="password" placeholder="Password" />
          <button onClick={(e) => {
            e.preventDefault();
            navigate("/");
          } }>{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need help ? </p>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign Up" ? (
            <p>
              Already have account? <span onClick={() => setSignState('Sign In')}>Sign In Now</span>
            </p>
          ) : (
            <p>
              New to Netflix? <span onClick={() => setSignState('Sign Up')}>Sign Up Now</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
