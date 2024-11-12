import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const navigate = useNavigate();
  const [responseStatus, setResponseStatus] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  function validationRule(field) {
    if (field === "name") {
      if (signState === "Sign Up") {
        return { required: "Name is required" };
      }
      return {};
    } else {
      return {};
    }
  }

  const onSubmit = async (data) => {
    try {
      const url =
        signState === "Sign In"
          ? "http://localhost:3000/signin"
          : "http://localhost:3000/signup";
      const formRes =
        signState === "Sign Up"
          ? { name: data.name, email: data.email, password: data.password }
          : { email: data.email, password: data.password };

      const response = await axios.post(url, formRes);

      if (response.status === 200 || response.status === 201) {
        navigate("/");
      } else {
        setResponseStatus(response.data.message);
      }
    } catch (err) {
      setResponseStatus(err?.response?.data?.message);
      console.log("error found while connecting with backend", err.message);
    }
  };

  return (
    <div className="login">
      <img src={logo} className="login-logo" alt="" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {signState === "Sign Up" && (
            <>
              <input
                type="text"
                {...register("name", validationRule("name"))}
                id="name"
                placeholder="Your name"
              />
              {errors.name && (
                <p className="error-message">{errors.name.message}</p>
              )}
            </>
          )}

          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            placeholder="Your email"
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "password is required",
              minLength: {
                value: 4,
                message: "Password must be minimum of 4 characters",
              },
            })}
            placeholder="Password"
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
          <button type="submit">{signState}</button>
          {responseStatus && (
            <p className="error-message" style={{ marginTop: "10px" }}>
              {responseStatus}
            </p>
          )}
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
              Already have account?{" "}
              <span onClick={() => setSignState("Sign In")}>Sign In Now</span>
            </p>
          ) : (
            <p>
              New to Netflix?{" "}
              <span onClick={() => setSignState("Sign Up")}>Sign Up Now</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
