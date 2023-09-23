import React, { Fragment } from "react";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import { BiSolidSlideshow, BiExit } from "react-icons/bi";
import { BsPersonFill, BsListUl } from "react-icons/bs";
import { useState } from "react";
import { LogoutUser } from "../../../actions/userAction";
import { useDispatch } from "react-redux";
import {Backdrop} from '@mui/material'
import './Header.css'

const UserOptions = ({ user }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const options = [
    { icon: <BsListUl />, name: "Orber", func: order },
    { icon: <BsPersonFill />, name: "Profile", func: account },
    { icon: <BiExit />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <BiSolidSlideshow />,
      name: "Deshboard",
      func: deshboard,
    });
  }

  function deshboard() {
    window.location.replace("/deshboard");
  }
  function order() {
    window.location.replace("/order");
  }
  function account() {
    window.location.replace("/account");
  }
  function logoutUser() {
    dispatch(LogoutUser());
  }

  return (
    <Fragment>
        <Backdrop open={open} style={{zIndex:"10"}}/>
      <SpeedDial
        ariaLabel="SpeedDial tootlip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        className="speedDial"
        icon={<img className="speedDialIcon" src={user.avatar.url} alt="profile" />}
      >
        {options.map((val) => (
          <SpeedDialAction
            icon={val.icon}
            tooltipTitle={val.name}
            onClick={val.func}
            key={val.name}
          ></SpeedDialAction>
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
