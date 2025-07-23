import React from "react";
import { Route } from "react-router-dom";

export function renderRoutes(routes) {
  return routes.map(({ children, ...route }, i) => {
    if (children) {
      return (
        <Route key={i} {...route}>
          {renderRoutes(children)}
        </Route>
      );
    }
    return <Route key={i} {...route} />;
  });
}
