import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  // data get by api & redux-context & local stroage
  // but now i'm useing static value.
  const [isSignIn, setIsSignIn] = useState(false);
  useEffect(() => {
    const userData = 
    localStorage.getItem("userData") &&
    JSON.parse(localStorage.getItem("userData"));
    setIsSignIn(userData);
  }, []);

  const handleSignOut = () => {
    setIsSignIn(false);
    localStorage.setItem('isSignIn', JSON.stringify(true));
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar_brand">
          <Link to="/">MyApp</Link>
        </div>
        <nav className="navbar_links">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {isSignIn && (
              <>
                <li>
                  <Link to="/signout" onClick={handleSignOut}>
                    SignOut
                  </Link>
                </li>
              </>
            )}
            {!isSignIn && (
              <>
                <li>
                  <Link to="/signin">SignIn</Link>
                </li>
              </>
            )}

            <li>
              <Link to="/products"> Products</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
      </header>
      <ToastContainer />
      <Outlet />
    </>
  );
};

export default Header;
