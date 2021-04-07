import React, { Component } from "react";
import { Link } from "react-router-dom";
import defaultProfile from "../images/avatar.jpg";

export default class ProfileTabs extends Component {
  render() {
    const { followers, following, posts } = this.props;

    return (
      <div>
        <div className="row">
          <div className="col-md-4">
            <h3 className="text-primary">Followers</h3>
            <hr />
            {followers.map((person, i) => (
              <div key={i}>
                <div>
                  <Link to={`/user/${person._id}`}>
                    <img
                      className="float-left mr-2"
                      height="30px"
                      width="30px"
                      style={{borderRadius: "50%"}}
                      src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                      onError={(i) => (i.target.src = `${defaultProfile}`)}
                      alt={person.name}
                    />
                    <div>
                      <p className="lead">{person.name}</p>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="col-md-4">
            <h3 className="text-primary">Following</h3>
            <hr />
            {following.map((person, i) => (
              <div key={i}>
                <div>
                  <Link to={`/user/${person._id}`}>
                    <img
                      className="float-left mr-2"
                      height="30px"
                      width="30px"
                      style={{borderRadius: "50%"}}
                      src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                      onError={(i) => (i.target.src = `${defaultProfile}`)}
                      alt={person.name}
                    />
                    <div>
                      <p className="lead">{person.name}</p>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="col-md-4">
            <h3 className="text-primary">Posts</h3>
            <hr />
            {posts.map((post, i) => (
              <div key={i}>
                <div>
                  <Link to={`/post/${post._id}`}>
                    <div>
                      <p className="lead">{post.title}</p>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
