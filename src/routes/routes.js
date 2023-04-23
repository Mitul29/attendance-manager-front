import React from "react";
import AddMember from "../features/admin/pages/AddMember";
import Members from "../features/admin/pages/Members";
import AddAttendance from "../features/user/pages/AddAttendance";
import AssignedMembers from "../features/user/pages/AssignedMembers";
import AttendanceReport from "../features/user/pages/AttendanceReport";
import Leaders from "../features/admin/pages/Leaders";

const Login = React.lazy(() =>
  import("../features/authentication/pages/Login")
);

const AdminHome = React.lazy(() => import("../features/admin/pages/AdminHome"));
const Home = React.lazy(() => import("../features/user/pages/Home"));

const NotAuthorized = React.lazy(() =>
  import("../features/common/pages/NotAuthorized")
);

export const routes = [
  /* UnAuthenticated Routes */
  {
    path: "/login",
    name: "Login",
    component: <Login />,
    requiresUnAuth: true,
  },

  /* Authenticated Routes */
  // {
  //   path: "/admin",
  //   name: "Admin-Home",
  //   component: <AdminHome />,
  //   roles: ["admin"],
  //   requiresAuth: true,
  // },
  {
    path: "/admin/members",
    name: "AdminMembers",
    component: <Members />,
    roles: ["admin"],
    requiresAuth: true,
  },
  {
    path: "/admin/leaders",
    name: "AdminLeaders",
    component: <Leaders />,
    roles: ["admin"],
    requiresAuth: true,
  },
  {
    path: "/admin/members/:id",
    name: "AddMember",
    component: <AddMember />,
    roles: ["admin"],
    requiresAuth: true,
  },

  // {
  //   path: "/",
  //   name: "Home",
  //   component: <Home />,
  //   roles: ["leader"],
  //   requiresAuth: true,
  // },
  {
    path: "/members",
    name: "Members",
    component: <AssignedMembers />,
    roles: ["leader"],
    requiresAuth: true,
  },
  {
    path: "/attendance/add",
    name: "AddAttendance",
    component: <AddAttendance />,
    roles: ["leader"],
    requiresAuth: true,
  },
  {
    path: "/report",
    name: "AttendanceReport",
    component: <AttendanceReport />,
    roles: ["leader"],
    requiresAuth: true,
  },

  /* General Routes */
  {
    path: "/not-authorized",
    name: "NotAuthorized",
    component: <NotAuthorized />,
  },
];
