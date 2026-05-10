import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const check = async () => {
      try {
        await axios.get("http://localhost:3000/profile", {
          withCredentials: true,
        });
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setChecking(false);
      }
    };
    check();
  }, []);

  return (
    <header
      style={{
        backgroundColor: "#1e293b",
        padding: "15px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      {/* Logo */}
      <h2
        style={{
          color: "white",
          margin: 0,
          fontSize: "24px",
        }}
      >
        Gym Review App
      </h2>

      {/* Navigation */}
      <nav
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          Home
        </Link>

        <Link
          to="/profile"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "16px",
            fontWeight: "500",
            backgroundColor: "#79f63b",
            padding: "8px 12px",
            borderRadius: "8px",
          }}
        >
          Profile
        </Link>

        <Link
          to="/gyms"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "16px",
            fontWeight: "500",
            backgroundColor: "#a3a3db",
            padding: "8px 12px",
            borderRadius: "8px",
          }}
        >
          Gyms
        </Link>

        <Link
          to="/gyms/create"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "16px",
            fontWeight: "500",
            backgroundColor: "#a3a3db",
            padding: "8px 12px",
            borderRadius: "8px",
          }}
        >
          Create Gym
        </Link>

        {/* Auth button */}
        {checking ? null : isAuthenticated ? (
          <a
            href="http://localhost:3000/auth/logout"
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: "500",
              backgroundColor: "#ef4444",
              padding: "8px 12px",
              borderRadius: "8px",
            }}
          >
            Logout
          </a>
        ) : (
          <a
            href="http://localhost:3000/login"
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: "500",
              backgroundColor: "#3b82f6",
              padding: "8px 12px",
              borderRadius: "8px",
            }}
          >
            Login
          </a>
        )}
      </nav>
    </header>
  );
};

export default Header;
