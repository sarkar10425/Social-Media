import React from "react";
import Posts from "../post/Posts";
import { isAuthenticated } from "../auth";

function Home() {
  return (
    <div>
      <div className="jumbotron">
        <h2>Home</h2>
        {isAuthenticated() ? (
          <p className="lead">Welcome {isAuthenticated().user.name}</p>
        ) : (
          <p className="lead">Welcome! Please SignIn for better experience</p>
        )}
      </div>
      <div className="container">
        <Posts />
      </div>
    </div>
  );
}

export default Home;
