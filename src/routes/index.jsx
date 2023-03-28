import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import RequiresAuth from "../features/authentication/components/RequiresAuth";
import RequiresUnAuth from "../features/authentication/components/RequiresUnAuth";
import NotFound from "../features/common/pages/NotFound";
import { routes } from "./routes";

const RouteComponent = () => {
  const privateRoutes = routes.filter((r) => r.requiresAuth);
  const unAuthRoutes = routes.filter((r) => r.requiresUnAuth);
  const generalRoutes = routes.filter(
    (r) => !r.requiresAuth && !r.requiresUnAuth
  );

  return (
    <Routes>
      {unAuthRoutes.map((route, idx) => {
        return (
          route.component && (
            <Route
              key={idx}
              path={route.path}
              element={
                <Suspense fallback={<h1>Loading...</h1>}>
                  <RequiresUnAuth>{route.component}</RequiresUnAuth>
                </Suspense>
              }
            />
          )
        );
      })}

      {privateRoutes.map((route, idx) => {
        return (
          route.component && (
            <Route
              key={idx}
              path={route.path}
              element={
                <Suspense fallback={<h1>Loading...</h1>}>
                  <RequiresAuth allowedRoles={route.roles}>
                    {route.component}
                  </RequiresAuth>
                </Suspense>
              }
            />
          )
        );
      })}

      {generalRoutes.map((route, idx) => {
        return (
          route.component && (
            <Route
              key={idx}
              path={route.path}
              element={
                <Suspense fallback={<h1>Loading...</h1>}>
                  {route.component}
                </Suspense>
              }
            />
          )
        );
      })}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RouteComponent;
