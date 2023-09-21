import React, { Fragment, useRef, useState } from "react";
import Loader from "../layout/loading/Loader";
import "./LoginSign.css";
import { Link } from "react-router-dom";
import { AiOutlineMail,AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";

const LoginSign = () => {
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user,setUser]=useState({
    name:"",
    email:"",
    passweord:""
  })

  const {name,email,passweord}=user

  const [avatar,setAvatar]=useState()
  const [avtarPreview,setAvtarPreview]=useState('https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg')

  const loginSubmit = () => {
    console.log("ok");
  };

  const registerSubmit=(e)=>{
    e.preventDefault();
    const myForm=new FormData()

    myForm.set("name",name)
    myForm.set("eamil",email)
    myForm.set("password",passweord)
    myForm.set("avatar",avatar)
  }

  const registerDataChange=(e)=>{
    if(e.target.name==="avatar"){
        const reader=new FileReader()
        reader.onload=()=>{
            if(reader.readyState===2){
                setAvtarPreview(reader.result)
                setAvatar(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }
    else{
        setUser({...user,[e.target.name]:e.target.value})
    }
  }

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <Fragment>
      <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
          <div>
            <div className="Login_signUp_toggle">
              <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
              <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
            </div>
            <button ref={switcherTab}></button>
          </div>
          <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
            <div className="loginEmail">
              <AiOutlineMail />
              <input
                type="email"
                placeholder="Email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="loginPassword">
              <RiLockPasswordLine />
              <input
                type="password"
                placeholder="Password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <Link to="/password/forgot">Frogot Password ?</Link>
            <input type="submit" value="Login" className="loginBtn" />
          </form>


          {/* REGISTER */}
          <form
            className="signUpForm"
            ref={registerTab}
            encType="multipart/from-data"
            onSubmit={registerSubmit}
          >
            <div className="signUpName">
              <AiOutlineUser />
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpEmail">
              <AiOutlineMail />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpPassword">
              < RiLockPasswordLine/>
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={passweord}
                onChange={registerDataChange}
              />
            </div>
            <div id="registerImage">
              <img src={avtarPreview} alt="avtar preview" />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={registerDataChange}
              />
            </div>
            <input
              type="submit"
              value="Submit"
              className="signUpBtn"
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginSign;
