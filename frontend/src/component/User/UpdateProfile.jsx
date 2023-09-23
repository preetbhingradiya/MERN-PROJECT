import React, { Fragment, useEffect, useRef, useState } from "react";
import Loader from "../layout/loading/Loader";
import "./UpdateProfile.css";
import { Link } from "react-router-dom";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, register } from "../../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstans";

function UpdateProfile() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { loading, isUpdated } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [avatar, setAvatar] = useState();
  const [avtarPreview, setAvtarPreview] = useState(
    "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
  );

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvtarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvtarPreview(user.avatar.url);
    }
    if (isUpdated) {
      dispatch(loadUser());
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, isUpdated, user]);

  return <Fragment>
    
  </Fragment>;
}

export default UpdateProfile;
