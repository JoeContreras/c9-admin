import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Header = () => {
  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;
  const userLink = () => {
    const handleLogout = async () => {
      try {
        await axios.get("/user/logout");
        localStorage.removeItem("firstLogin");
        window.location.href = "/";
      } catch (e) {
        window.location.href = "/";
      }
    };
    return (
      <li className="drop-nav">
        <Link to="#" className="avatar">
          <img src={user.avatar} alt="avatar" />
          {user.name}
          <i className="fas fa-angle-down"></i>
        </Link>
        <ul className="dropdown">
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/adminClientes">Administrar Clientes</Link>
          </li>
          <li>
            <Link to="/adminCitas">Administrar Citas</Link>
          </li>
          <li>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
      </li>
    );
  };

  const transForm = {
    transform: isLogged ? "translateY(-5)" : 0,
  };
  return (
    <header>
      <div className="logo">
        <Link to="/">Metro Consulting</Link>
      </div>
      <ul style={transForm}>
        <li>
          <Link to="/">
            <i className="fas fa-users-cog"></i>Admin
          </Link>
        </li>
        {isLogged ? (
          userLink()
        ) : (
          <li>
            <Link to="/login">
              <i className="fas fa-sign-in-alt"></i>Sign In
            </Link>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
