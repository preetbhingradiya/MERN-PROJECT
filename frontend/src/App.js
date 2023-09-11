import React from "react";
import "./App.css";
import Header from "./component/layout/header/Header.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import webfont from "webfontloader";
import Footer from "./component/layout/footer/Footer";
import Home from "./component/Home/Home.jsx";

function App() {
  React.useEffect(() => {
    webfont.load({
      google: {
        families: ["Roboto", "Droid sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route extact path="/" Component={Home} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
