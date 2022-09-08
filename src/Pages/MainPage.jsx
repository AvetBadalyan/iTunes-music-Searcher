import React from "react";
import Header from "../Components/Header/Header";
import Main from "../Components/Main/Main";
import "./MainPage.css";

export default function MainPage() {
  return (
    <div className="main-page">
      <div className="container">
        <Header />
      </div>
      <div className="container">
        <Main />
      </div>
    </div>
  );
}
