import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className=" navbar  fixed-top navbar-expand-lg bg-body-tertiary navbar-dark bg-dark navbar-center">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            {" "}
            <i
              className="bi bi-newspaper"
              style={{ fontSize: "1.3rem", color: "#ffffff" }}
            />{" "}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link link-light" to="/general">
                  General
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link link-success" to="/business">
                  Business
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link link-primary" to="/entertainment">
                  Entertainment
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link link-danger" to="/health">
                  Health
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link link-warning" to="/science">
                  Science
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link link-info" to="/sports">
                  Sports
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="/technology">
                  Technology
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
