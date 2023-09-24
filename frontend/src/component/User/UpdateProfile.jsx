import React, { Fragment, useEffect, useState } from "react";
import Loader from "../layout/loading/Loader";
import "./UpdateProfile.css";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, updateProfile } from "../../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstans";
import MetaData from '../layout/MetaData.jsx'

function UpdateProfile() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { loading, isUpdated } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(
    "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
  );

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
    window.location.replace('/account')
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
    if (isUpdated) {
      dispatch(loadUser());
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, isUpdated, user]);

  return (
    <Fragment>
      <MetaData title={`${user.name}'s Update Profile`}/>
      {loading ? (
        <Loader />
      ) : (
        <div className="updateProfileContainer">
          <div className="updateProfileBox">
            <h2 className="updateProfileHeading">Update Profile</h2>
            <form
              className="updateProfileForm"
              encType="multipart/from-data"
              onSubmit={updateProfileSubmit}
            >
              <div className="updateProfileName">
                <AiOutlineUser />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  name="name"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                />
              </div>
              <div className="updateProfileEmail">
                <AiOutlineMail />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </div>
              <div id="updateProfileImage">
                <img src={avatarPreview} alt="avtar preview" />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={(e)=>updateProfileDataChange}
                />
              </div>
              <input type="submit" value="Update" className="updateProfileBtn" />
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default UpdateProfile;
