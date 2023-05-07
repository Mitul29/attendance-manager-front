import React from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logOut, selectCurrentUser } from "../../../redux/modules/authSlice";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);

  const adminLinks = [
    {
      label: "Report",
      onClick: () => navigate("/admin/report"),
      isActive: location.pathname.includes("report"),
    },
    {
      label: "Leaders",
      onClick: () => navigate("/admin/leaders"),
      isActive: location.pathname.includes("leaders"),
    },
    {
      label: "Members",
      onClick: () => navigate("/admin/members"),
      isActive: location.pathname.includes("members"),
    },
  ];

  const userLinks = [
    {
      label: "Report",
      onClick: () => navigate("/report"),
      isActive: location.pathname.includes("report"),
    },
    {
      label: "Attendance",
      onClick: () => navigate("/attendance/add"),
      isActive: location.pathname.includes("attendance"),
    },
    {
      label: "Members",
      onClick: () => navigate("/members"),
      isActive: location.pathname.includes("members"),
    },
  ];

  return (
    <div className="top__fixed__header">
      <div className="inner__wrapper">
        <ul className="navbar">
          {currentUser?.role === "admin"
            ? adminLinks.map((item, idx) => (
                <li className="item" key={idx}>
                  <button
                    onClick={item.onClick}
                    className={classNames("link", { active: item.isActive })}
                  >
                    {item.label}
                  </button>
                </li>
              ))
            : userLinks.map((item, idx) => (
                <li className="item" key={idx}>
                  <button
                    onClick={item.onClick}
                    className={classNames("link", { active: item.isActive })}
                  >
                    {item.label}
                  </button>
                </li>
              ))}

          <li className="item">
            <button onClick={() => dispatch(logOut())} className="link">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
