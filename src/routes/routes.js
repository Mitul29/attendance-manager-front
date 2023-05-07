import React from "react";
import AdminFullReport from "../features/admin/pages/Report/AdminFullReport";

const AddMember = React.lazy(() =>
  import("../features/admin/pages/Member/AddMember")
);
const Members = React.lazy(() =>
  import("../features/admin/pages/Member/Members")
);
const AddAttendance = React.lazy(() =>
  import("../features/user/pages/AddAttendance")
);
const AssignedMembers = React.lazy(() =>
  import("../features/user/pages/AssignedMembers")
);
const AttendanceReport = React.lazy(() =>
  import("../features/user/pages/AttendanceReport")
);
const Leaders = React.lazy(() =>
  import("../features/admin/pages/Leader/Leaders")
);
const LeadersChild = React.lazy(() =>
  import("../features/admin/pages/Leader/LeadersChild")
);
const Login = React.lazy(() =>
  import("../features/authentication/pages/Login")
);

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
    path: "/admin/leaders/:id/child",
    name: "AdminLeadersChild",
    component: <LeadersChild />,
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
  {
    path: "/admin/report",
    name: "AdminReport",
    component: <AdminFullReport />,
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
  {
    path: "/report/:leaderId",
    name: "AttendanceReportChild",
    component: <AttendanceReport />,
    roles: ["admin", "leader"],
    requiresAuth: true,
  },

  /* General Routes */
  {
    path: "/not-authorized",
    name: "NotAuthorized",
    component: <NotAuthorized />,
  },
];
