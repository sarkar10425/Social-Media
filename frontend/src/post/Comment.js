import React, { Component } from "react";
import { comment, uncomment } from "./apiPost";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import defaultProfile from "../images/avatar.jpg";

export class Comment extends Component {
  state = {
    text: "",
    error: "",
  };

  handleChange = (event) => {
    this.setState({ error: "" });
    this.setState({ text: event.target.value });
  };

  isValid = () => {
    const { text } = this.state;
    if (text.length === 0) {
      this.setState({ error: "Comments cannot be left blank!" });
      return false;
    }
    if (text.length > 150) {
      this.setState({ error: "Comments should not exceed 150 characters" });
      return false;
    }
    return true;
  };

  addComment = (e) => {
    e.preventDefault();

    if (!isAuthenticated()) {
      this.setState({ error: "Please SignIn to leave a commnet" });
      return;
    }

    if (this.isValid()) {
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;
      const postId = this.props.postId;

      comment(userId, token, postId, { text: this.state.text }).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          this.setState({ text: "" });
          // dispatch fresh list of comments to parent (SinglePost.js)
          this.props.updateComments(data.comments);
        }
      });
    }
  };

  deleteComment = (comment) => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    const postId = this.props.postId;

    uncomment(userId, token, postId, comment).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.props.updateComments(data.comments);
      }
    });
  };

  deleteConfirmed = (comment) => {
    let answer = window.confirm("Are you sure you want to delete this post?");
    if (answer) {
      this.deleteComment(comment);
    }
  };

  render() {
    let { comments } = this.props;
    comments = comments.reverse();

    const { error } = this.state;

    return (
      <div>
        <h2 className="mt-5 mb-5">Leave a comment</h2>
        <form onSubmit={this.addComment}>
          <div className="form-group">
            <input
              type="text"
              onChange={this.handleChange}
              className="form-control"
              value={this.state.text}
              placeholder={`Leave a comment...`}
            />
            <button className="btn btn-raised btn-success mt-2">Post</button>
          </div>
        </form>

        <div
          className="alert alert-danger mt-5"
          style={{ display: error ? "block" : "none" }}
        >
          {error}
        </div>

        <hr />

        <div className="col-md-12">
          <h3 className="text-primary">{comments.length} Comments</h3>
          <hr />
          
          {comments.map((comment, i) => (
            <div key={i}>
              <div>
                <Link to={`/user/${comment.postedBy._id}`}>
                  <img
                    className="float-left mr-2"
                    height="30px"
                    width="30px"
                    style={{ borderRadius: "50%" }}
                    src={`${process.env.REACT_APP_API_URL}/user/photo/${comment.postedBy._id}`}
                    onError={(i) => (i.target.src = `${defaultProfile}`)}
                    alt={comment.postedBy.name}
                  />
                </Link>
                <div>
                  <p className="lead">{comment.text}</p>
                  <p className="font-italic mark">
                    Posted by{" "}
                    <Link to={`/user/${comment.postedBy._id}`}>
                      {comment.postedBy.name}{" "}
                    </Link>
                    on {new Date(comment.created).toDateString()}{" "}
                    <span>
                      
                      {isAuthenticated().user &&
                        isAuthenticated().user._id === comment.postedBy._id && (
                          
                            <button
                              onClick={() => this.deleteConfirmed(comment)}
                              className="btn btn-raised btn-danger btn-sm mr-5"
                            >
                              Remove
                            </button>
                          
                        )}
                    </span>
                  </p>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
