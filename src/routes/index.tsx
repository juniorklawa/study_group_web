import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import GroupPage from "../pages/GroupPage";
import LoginPage from "../pages/LoginPage";
import NotesPage from "../pages/NotesPage";
import RegisterPage from "../pages/RegisterPage";
import AllGroups from "../pages/AllGroupsPage";

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={LoginPage} />
    <Route path="/register" exact component={RegisterPage} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/group/:groupId+" component={GroupPage} />
    <Route path="/notes/:groupId+" component={NotesPage} />
    <Route path="/all-groups" component={AllGroups} />
  </Switch>
);

export default Routes;
