import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Edit from "../pages/Edit";
import List from "../pages/List";
import Login from "../pages/Login";
import Create from "../pages/Create";

const Routes = () => {
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.token) {
      history.replace('/')
    }
  }, [])

  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/list" component={List} />
      <Route path="/edit/:id" component={Edit} />
      <Route path="/create" component={Create} />
    </Switch>
  );
};
export default Routes;
