import React from "react";
import { Route, Switch } from "react-router";
import Header from "./Header";
import AppRouter from "./AppRouter";
import NotFound from "./NotFound";

function Layout() {
  return (
    <div className="container">
      <Header />
      <Switch>
        <Route path="/">
          <AppRouter />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default Layout;
