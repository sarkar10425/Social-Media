import React, { Component } from "react";
import { Redirect } from "react-router";
import { signin, authenticate } from "../auth";
import { Link } from "react-router-dom";
import SocialLogin from "./SocialLogin";

export default class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      redirectToReferer: false,
      loading: false,
    };
  }

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    this.setState({
      [name]: event.target.value,
    });
  };

  clickSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;
    const user = {
      email,
      password,
    };
    // console.log(user)
    signin(user).then((data) => {
      if (data.error) {
        this.setState({ error: data.error, loading: false });
      } else {
        // authenticate
        authenticate(data, () => {
          this.setState({ redirectToReferer: true });
        });
        // redirect
      }
    });
  };

  signinForm = (email, password) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={this.handleChange("email")}
          value={email}
          className="form-control"
          type="email"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={this.handleChange("password")}
          value={password}
          className="form-control"
          type="password"
        />
      </div>
      <br />
      <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
        Submit
      </button>
    </form>
  );

  render() {
    const { email, password, error, redirectToReferer, loading } = this.state;

    if (redirectToReferer) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container">
        <h2 className="mt-5">Signin</h2>

        <hr />
          <SocialLogin />
        <hr />

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

        {this.signinForm(email, password)}
        <p>
          <br />
          <Link to="/forgot-password" className="btn btn-danger">
              Forgot Password
          </Link>
        </p>
      </div>
    );
  }
}
