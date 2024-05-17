import React, { useEffect, useRef, useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { dispatchLogout } from "../Store/Actions/AuthActions";
import { useDispatch, useSelector } from "react-redux";
import { dispatchSearchValue } from "../Store/Actions/MoviesActions";
import { Avatar, Stack } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { IoMdSearch } from "react-icons/io";
import { BiSolidBookmarkPlus } from "react-icons/bi";
import { GrMenu } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef();

  const token =
    useSelector((state) => state.auth.loginData.token) ||
    localStorage.getItem("jwtToken");
  const [isShow, setIsShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const decodeToken = token ? jwtDecode(token) : "";

  const letter = decodeToken.letter ? decodeToken.letter[0] : "";

  function stringToColor(string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: name.toUpperCase(),
    };
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(dispatchLogout());
    navigate("/login");
  };

  const dispatchSearch = () => {
    dispatch(dispatchSearchValue(searchValue));
    navigate(`/results?search=${searchValue}`);
  };

  const searchHandle = (e) => {
    if (e.key === "Enter") {
      dispatchSearch();
      setSearchOpen(false);
      navigate(`/results?search=${searchValue}`);
    }
  };

  return (
    <header>
      <nav className="navbar-container">
        <img
          onClick={() => navigate("/home")}
          alt="cinemate logo"
          className="cinemate-logo"
          src="https://res.cloudinary.com/ganeshmaganti/image/upload/v1710572812/New_Project_2_cqcssp.png"
        />
        {token ? (
          <>
            <div className="dropdown-navbar-button">
              <div className="search-icon-input-container">
                <div className="search-input-card">
                  <input
                    type="text"
                    placeholder="Search here..."
                    className="search-input"
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue}
                    onKeyUp={searchHandle}
                  />
                </div>
                <div
                  className="clear-icon-card"
                  onClick={() => setSearchValue("")}
                >
                  {searchValue && <RxCross2 className="navbar-icon" />}
                </div>
                <div className="search-icon-card" onClick={dispatchSearch}>
                  <IoMdSearch className="search-icon" />
                </div>
              </div>
              <div
                className="watchlist-button-card"
                onClick={() => navigate("/watchlist")}
              >
                <BiSolidBookmarkPlus className="navbar-icon" />
                <span className="watchlist-nav-button">Watchlist</span>
              </div>
              <div className="dropdown" ref={dropdownRef}>
                <Stack
                  className="stack"
                  onClick={() => setIsShow(!isShow)}
                  direction="row"
                  spacing={2}
                >
                  {decodeToken ? (
                    <Avatar
                      {...stringAvatar(letter)}
                      style={{
                        width: "32px",
                        height: "32px",
                        fontSize: 16,
                        fontWeight: 500,
                      }}
                    />
                  ) : (
                    <Avatar />
                  )}
                </Stack>
                <ul className={`dropdown-menu ${isShow && "show"}`}>
                  <li className="dropdown-button">
                    <Link to="/change-password" className="header-link">
                      <span className="dropdown-link-button">
                        Change Password
                      </span>
                    </Link>
                  </li>
                  <li className="dropdown-button">
                    <Link
                      to="/login"
                      className="header-link"
                      onClick={handleLogout}
                    >
                      <span className="dropdown-link-button">Logout</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="navbar-buttons-card">
              <IoMdSearch
                className="navbar-icon"
                onClick={() => {
                  setSearchOpen(!searchOpen);
                  setIsOpen(false);
                }}
              />
              <BiSolidBookmarkPlus
                className="navbar-icon"
                onClick={() => navigate("/watchlist")}
              />
              {isOpen ? (
                <RxCross2
                  onClick={() => setIsOpen(false)}
                  className="navbar-icon"
                />
              ) : (
                <GrMenu
                  className="navbar-icon"
                  onClick={() => {
                    setIsOpen(true);
                    setSearchOpen(false);
                  }}
                />
              )}
            </div>
          </>
        ) : (
          <div className="header-button-container">
            <Link style={{ textDecoration: "none" }} to="/login">
              <span className="header-button">Login</span>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/register">
              <span className="header-button">Register</span>
            </Link>
          </div>
        )}
      </nav>
      <ul
        className="menu-bar-container"
        style={{
          transform: isOpen && "translateY(0)",
        }}
      >
        <li className="menu-item" onClick={() => navigate("/watchlist")}>
          Watchlist
        </li>
        <li className="menu-item" onClick={() => navigate("/change-password")}>
          Change Password
        </li>
        <li className="menu-item" onClick={handleLogout}>
          Logout
        </li>
      </ul>
      <div
        className="search-input-container"
        style={{
          transform: searchOpen && "translateY(0)",
        }}
      >
        <div className="search-input-menu-card">
          <input
            type="text"
            placeholder="Search here..."
            className="search-menu-input"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            onKeyUp={searchHandle}
            autoFocus={searchOpen}
          />
        </div>
        <div className="clear-card" onClick={() => setSearchValue("")}>
          {searchValue && <RxCross2 className="navbar-icon" />}
        </div>
      </div>
    </header>
  );
}

export default Header;
