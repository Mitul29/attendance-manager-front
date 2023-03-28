import React from "react";
import AddMember from "../features/admin/pages/AddMember";
import Members from "../features/admin/pages/Members";

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
  {
    path: "/admin",
    name: "Admin-Home",
    component: <AdminHome />,
    roles: ["admin"],
    requiresAuth: true,
  },
  {
    path: "/admin/members",
    name: "Members",
    component: <Members />,
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
    path: "/",
    name: "Home",
    component: <Home />,
    roles: ["user"],
    requiresAuth: true,
  },

  /* General Routes */
  {
    path: "/not-authorized",
    name: "NotAuthorized",
    component: <NotAuthorized />,
  },
];
