import React from "react";
import "./App.css";
import Header from "./component/layout/header/Header.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import webfont from "webfontloader";
import Footer from "./component/layout/footer/Footer";
import Home from "./component/Home/Home.jsx";
import ProductDetailes from './component/Product/ProductDetailes.jsx'
import Products from './component/Product/Products.jsx'
import Search from './component/Product/Search.jsx'
import LoginSign from "./component/User/LoginSign";
import Profile from './component/User/Profile.jsx'
import store from './store'
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import UserOptions from './component/layout/header/UserOptions.js'
import UpdateProfile from './component/User/UpdateProfile.jsx'
function App() {

  const {isAuthenticated,user}=useSelector((state)=>state.user)

  React.useEffect(() => {
    webfont.load({
      google: {
        families: ["Roboto", "Droid sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser())
  }, []);

  return (
    <BrowserRouter>
      <Header />
        <>{isAuthenticated && <UserOptions user={user}/>}</>
      <Routes>
        <Route extact path="/" Component={Home} />
        <Route extact path="/product/:id" Component={ProductDetailes} />
        <Route extact path="/products" Component={Products} />
        <Route path="/products/:name" Component={Products} />
        <Route extact path="/search" Component={Search} />
        <Route extact path="/login" Component={LoginSign} />
        {isAuthenticated && <Route extact path="/account" Component={Profile} />}
        {isAuthenticated && <Route extact path="/me/update" Component={UpdateProfile} />}
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
