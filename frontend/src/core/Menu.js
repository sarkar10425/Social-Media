import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "#ff9900" };
  else return { color: "black" };
};

function Menu({ history }) {
  return (
    <div>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, "/")} to="/">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/users")}
            to="/users"
          >
            Users
          </Link>
        </li>

        <li className="nav-item">
              <span className="nav-link" style={{ cursor: "pointer" }}>
                <Link
                  classname="nav-link"
                  to={`/create/post`}
                  style={isActive(history, `/create/post`)}
                >
                  Create Post
                </Link>
              </span>
            </li>

        {!isAuthenticated() && (
          <React.Fragment>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/signin")}
                to="/signin"
              >
                Sign In
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/signup")}
                to="/signup"
              >
                Sign Up
              </Link>
            </li>
          </React.Fragment>
        )}

        {isAuthenticated() && (
          <React.Fragment>
            

            <li className="nav-item">
              <span className="nav-link" style={{ cursor: "pointer" }}>
                <Link
                  classname="nav-link"
                  to={`/findpeople`}
                  style={isActive(history, `/findpeople`)}
                >
                  Find People
                </Link>
              </span>
            </li>

            

            <li className="nav-item">
              <span className="nav-link" style={{ cursor: "pointer" }}>
                <Link
                  classname="nav-link"
                  to={`/user/${isAuthenticated().user._id}`}
                  style={isActive(
                    history,
                    `/user/${isAuthenticated().user._id}`
                  )}
                >
                  {`${isAuthenticated().user.name}'s profile`}
                </Link>
              </span>
            </li>

            <li className="nav-item">
              <span
                className="nav-link"
                style={{ cursor: "pointer" }}
                onClick={() => signout(() => history.push("/"))}
              >
                Sign Out
              </span>
            </li>

          </React.Fragment>
        )}
      </ul>
    </div>
  );
}

export default withRouter(Menu);
