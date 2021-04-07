import React, { Component } from "react";
import { singlePost, remove, like, unlike } from "./apiPost";
import defaultPost from "../images/post.jpg";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { Comment } from "./Comment";

export default class SinglePost extends Component {
  state = {
    post: "",
    redirectToHome: false,
    redirectToLogin: false,
    like: false,
    likes: 0,
    comments: [],
  };

  checkLike = (likes) => {
    const userId = isAuthenticated().user && isAuthenticated().user._id;
    let match = likes.indexOf(userId) !== -1;
    return match;
  };

  componentDidMount = () => {
    const postId = this.props.match.params.postId;
    singlePost(postId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          post: data,
          likes: data.likes.length,
          like: this.checkLike(data.likes),
          comments: data.comments
        });
      }
    });
  };

  updateComments = (comments) => {
    this.setState({ comments });
  };

  likeToggle = () => {
    if (!isAuthenticated()) {
      this.setState({ redirectToLogin: true });
      return;
    }

    let callApi = this.state.like ? unlike : like;
    const userId = isAuthenticated().user._id;
    const postId = this.state.post._id;
    const token = isAuthenticated().token;
    callApi(userId, token, postId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          like: !this.state.like,
          likes: data.likes.length,
        });
      }
    });
  };

  deletePost = () => {
    const postId = this.props.match.params.postId;
    const token = isAuthenticated().token;
    remove(postId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ redirectToHome: true });
      }
    });
  };

  deleteConfirmed = () => {
    let answer = window.confirm("Are you sure you want to delete this post?");
    if (answer) {
      this.deletePost();
    }
  };

  renderPost = (post) => {
    const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
    const posterName = post.postedBy ? post.postedBy.name : " Unknown";

    const { like, likes } = this.state;

    return (
      <div className="card-body">
        <div style={{ height: "400px", width: "auto" }}>
          <img
            src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
            alt={post.title}
            onError={(i) => (i.target.src = `${defaultPost}`)}
            className="img-thumbnail mb-3"
            style={{
              height: "100%",
              width: "100%",
              objectFit: "contain",
              position: "center",
            }}
          />
        </div>

        {like ? (
          <h3 onClick={this.likeToggle}>
            <i
              className="fa fa-thumbs-up text-success bg-dark"
              style={{ padding: "10px", borderRadius: "50%" }}
            />
            {likes} Like
          </h3>
        ) : (
          <h3 onClick={this.likeToggle}>
            <i
              className="fa fa-thumbs-down text-danger bg-dark"
              style={{ padding: "10px", borderRadius: "50%" }}
            />
            {likes} Like
          </h3>
        )}

        <p className="card-text">{post.body}</p>
        <br />
        <p className="font-italic mark">
          Posted by <Link to={`${posterId}`}>{posterName} </Link>
          on {new Date(post.created).toDateString()}
        </p>
        <div className="d-inline-block">
          <Link to={`/`} className="btn btn-raised btn-primary btn-sm mr-5">
            Back to posts
          </Link>

          {isAuthenticated().user &&
            isAuthenticated().user._id === post.postedBy._id && (
              <>
                <Link
                  to={`/edit/post/${post._id}`}
                  className="btn btn-raised btn-warning btn-sm mr-5"
                >
                  Update Post
                </Link>
                <button
                  onClick={this.deleteConfirmed}
                  className="btn btn-raised btn-danger btn-sm mr-5"
                >
                  Delete Post
                </button>
              </>
            )}
        </div>
      </div>
    );
  };

  render() {
    const { post, redirectToHome, redirectToLogin, comments } = this.state;

    if (redirectToHome) {
      return <Redirect to={`/`} />;
    }

    if (redirectToLogin) {
      return <Redirect to={`/signin`} />;
    }

    return (
      <div className="container">
        <h2 className="display-2 mt-5 mb-5">{post.title}</h2>
        {!post ? (
          <div className="jumbotron txt-center">
            <h2>Loading...</h2>
          </div>
        ) : (
          this.renderPost(post)
        )}

        <Comment
          postId={post._id}
          comments={comments}
          updateComments={this.updateComments}
        />
      </div>
    );
  }
}
