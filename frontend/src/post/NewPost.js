import React, { Component } from "react";
import { Redirect } from "react-router";
import { isAuthenticated } from "../auth";
import { create } from "./apiPost";
// import defaultProfile from "../images/avatar.jpg";

export default class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      body: "",
      photo: "",
      user: {},
      error: "",
      loading: false,
      fileSize: 0,
      redirectToProfile: false
    };
  }

  componentDidMount() {
    this.postData = new FormData();
    this.setState({ user: isAuthenticated().user });
  }

  isValid = () => {
    const { fileSize, title, body } = this.state;
    if (fileSize > 1000000) {
      this.setState({
        error: "File size should be less than 1MB",
        loading: false,
      });
      return false;
    }
    if (title.length === 0 || body.length === 0) {
      this.setState({ error: "All fields are required", loading: false });
      return false;
    }

    return true;
  };

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    this.postData.set(name, value);
    this.setState({
      [name]: value,
      fileSize,
    });
  };

  clickSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    if (this.isValid()) {
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;

      create(userId, token, this.postData).then(data => {
        if (data.error) {
          this.setState({ error: data.error });
        } else {
          this.setState({
              loading: false,
              title: "",
              body: "",
              photo: "",
              redirectToProfile: true
          })
        }
      });
    }
  };

  newPostForm = (title, body) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Profile Photo</label>
        <input
          onChange={this.handleChange("photo")}
          className="form-control"
          type="file"
          accept="image/*"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Title</label>
        <input
          onChange={this.handleChange("title")}
          value={title}
          className="form-control"
          type="text"
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Body</label>
        <textarea
          onChange={this.handleChange("body")}
          value={body}
          className="form-control"
          type="text"
        />
      </div>
      <br />
      <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
        Create Post
      </button>
    </form>
  );

  render() {
    const { title, body, user, error, loading, redirectToProfile } = this.state;

    if(redirectToProfile){
        return <Redirect to={`/user/${user._id}`} />
    }
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Create a New Post</h2>
        <div
          className="alert alert-danger"
          style={{ display: error ? "block" : "none" }}
        >
          {error}
        </div>

        {loading ? (
          <div className="jumbotron txt-center">
            <h2>Loading...</h2>
          </div>
        ) : (
          ""
        )}

        {/* <img
          className="img-thumbnail"
          style={{ height: "200px", width: "auto" }}
          src={photoUrl}
          onError={(i) => (i.target.src = `${defaultProfile}`)}
          alt={name}
        /> */}

        {this.newPostForm(title, body)}
      </div>
    );
  }
}
