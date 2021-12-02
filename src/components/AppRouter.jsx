import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {routes} from "../router/path";
import {MAIN_ROUTE} from "../router/pathTypes";

const AppRouter = () => {
  return (
    <Switch>
      {routes.map(route =>
        <Route key={route.path} exact={route.exact} path={route.path} component={route.component}/>
      )}
      <Redirect to={MAIN_ROUTE} />
    </Switch>
  );
};

export default AppRouter;
