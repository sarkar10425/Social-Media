import React, { Component } from "react";
import { singlePost, update } from "./apiPost";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router";
import defaultPost from "../images/post.jpg";


export default class EditPost extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      title: "",
      body: "",
      redirectToProfile: false,
      error: "",
      fileSize: 0,
      loading: false,
    };
  }

  init = (postId) => {
    singlePost(postId).then((data) => {
      if (data.error) {
        this.setState({ redirectToProfile: true });
      } else {
        this.setState({
          id: data._id,
          title: data.title,
          body: data.body,
          error: ""
        });
      }
    });
  };

  componentDidMount() {
    this.postData = new FormData();
    const postId = this.props.match.params.postId;
    this.init(postId);
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
      const postId = this.state.id;
      const token = isAuthenticated().token;


      update(postId, token, this.postData).then((data) => {
        if (data.error) {
          this.setState({ error: data.error });
        } else {
          this.setState({
            loading: false,
            title: "",
            body: "",
            photo: "",
            redirectToProfile: true,
          });
        }
      });
    }
  };

  editPostForm = (title, body) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Post Photo</label>
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
        Update Post
      </button>
    </form>
  );

  render() {
    const { id, title, body, redirectToProfile, error, loading } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/user/${isAuthenticated().user._id}`} />;
    }

    return (
      <div style={{marginBottom: "20px"}} className="container">
        <h2 className="mt-5 mb-5">{title}</h2>

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

        <img
          className="img-thumbnail"
          style={{ height: "500px", width: "auto", marginBottom: "15px" }}
          src={`${process.env.REACT_APP_API_URL}/post/photo/${id}?${new Date().getTime()}`}
          onError={(i) => (i.target.src = `${defaultPost}`)}
          alt={title}
        />


        {this.editPostForm(title, body)}

      </div>
    );
  }
}
