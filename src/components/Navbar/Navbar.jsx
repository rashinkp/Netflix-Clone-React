import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import profile_icon from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";
import { Link } from "react-router-dom";
import Search from "../Search/Search.jsx";
import { useAuth } from "../../AuthContext.jsx";
const Navbar = () => {
  const { loginSatatus, setLoginStatus } = useAuth();
  const [showSearch, setShowSearch] = useState(false);
  const navRef = useRef();
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add("nav-dark");
      } else {
        navRef.current.classList.remove("nav-dark");
      }

      if (showSearch) {
        document.body.classList.add("blurred-background");
      } else {
        document.body.classList.remove("blurred-background");
      }

      return () => {
        document.body.classList.remove("blurred-background");
      };
    });
  }, []);
  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My list</li>
          <li>Browse by Language</li>
        </ul>
      </div>

      <div className="navbar-right">
        <img
          onClick={() => setShowSearch(true)}
          src={search_icon}
          alt=""
          className="icons"
        />
        {showSearch && <Search />}
        <p>Children</p>
        <img src={bell_icon} alt="" className="icons" />

        <div className="navbar-profile">
          <img src={profile_icon} alt="" className="profile" />
          <p className="user-text">{loginSatatus}</p>
          <img src={caret_icon} alt="" />

          <div className="dropdown">
            {loginSatatus !== "" ? (
              <span onClick={() => setLoginStatus("")}>
                {" "}
                Sign Out of Netflix
              </span>
            ) : (
              <Link to="/login" style={{ color: "white" }}>
                Sign In to Netflix
              </Link>
            )}
          </div>
        </div>
      </div>
      {showSearch && (
        <div className="overlay" onClick={() => setShowSearch(false)} />
      )}
    </div>
  );
};

export default Navbar;
