import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Menu from "./core/Menu";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Profile from "./user/Profile";
import Users from "./user/Users";
import EditProfile from "./user/EditProfile";
import FindPeople from "./user/FindPeople";
import NewPost from "./post/NewPost";
import SinglePost from "./post/SinglePost";
import EditPost from "./post/EditPost";
import PrivateRoute from "./auth/PrivateRoute";
import ForgotPassword from "./user/ForgotPassword";
import ResetPassword from "./user/ResetPassword";

function MainRouter() {
  return (
    <div>
      <Menu />
      <Switch>
        <Route path="/" component={Home} exact></Route>
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route
          exact
          path="/reset-password/:resetPasswordToken"
          component={ResetPassword}
        />
        <Route path="/post/:postId" component={SinglePost} exact></Route>
        <Route path="/users" component={Users} exact></Route>
        <Route path="/signup" component={Signup} exact></Route>
        <Route path="/signin" component={Signin} exact></Route>
        <PrivateRoute
          path="/user/:userId"
          component={Profile}
          exact
        ></PrivateRoute>
        <PrivateRoute
          path="/user/edit/:userId"
          component={EditProfile}
          exact
        ></PrivateRoute>
        <PrivateRoute
          path="/findpeople"
          component={FindPeople}
          exact
        ></PrivateRoute>
        <PrivateRoute
          path="/create/post"
          component={NewPost}
          exact
        ></PrivateRoute>
        <PrivateRoute
          path="/edit/post/:postId"
          component={EditPost}
          exact
        ></PrivateRoute>
      </Switch>
    </div>
  );
}

export default MainRouter;
