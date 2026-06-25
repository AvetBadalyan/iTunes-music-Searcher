import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"

export default function Header() {
    return (
      <Link to="/" className="header">
        <i className="fa-brands fa-apple"></i> Music
      </Link>
    );
}
