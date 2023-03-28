import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logOut } from "../../../redux/modules/authSlice";

const AdminHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="portal__page">
      <img
        className="background__img"
        src="/images/background__img_2.png"
        alt="backgroud"
      />
      <div className="portal__wrapper">
        <div className="portal__box">
          <div
            className="inner__wrapper"
            onClick={() => navigate("/admin/members/new")}
          >
            <div className="icon__wrapper">
              <img className="icon__img" src="/images/add__member.png" alt="" />
            </div>
            <h3 className="title">Add Member</h3>
          </div>
        </div>
        <div className="portal__box">
          <div
            className="inner__wrapper"
            onClick={() => navigate("/admin/members")}
          >
            <div className="icon__wrapper">
              <img
                className="icon__img"
                src="/images/view__member.png"
                alt=""
              />
            </div>
            <h3 className="title">View Member</h3>
          </div>
        </div>
        <div className="portal__box">
          <div className="inner__wrapper" onClick={() => dispatch(logOut())}>
            <div className="icon__wrapper">
              <img className="icon__img" src="/images/profile.png" alt="" />
            </div>
            <h3 className="title">Logout</h3>
          </div>
        </div>
      </div>
      <img className="nagar__img" src="/images/building__img.png" alt="" />
    </div>
  );
};

export default AdminHome;
