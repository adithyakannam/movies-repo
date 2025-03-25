import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { userFetch } from "./API/Api";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("userDetails", JSON.stringify(formData));
    navigate("/login");
    // try {
    //   const response = await userFetch.post("users", formData);
      // if (response.status === 201) {
      //     navigate("/login");
      // } else {
      //     console.log("Failed to register");
      // }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { email, name, phone, password } = formData;

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <h2 className="signup-title">Register</h2>
        <form onSubmit={handleSubmit} method="post" className="signup-form">
          <div className="signup-input-group">
            <label htmlFor="name" className="signup-label">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              className="signup-input"
              required
            />
          </div>
          <div className="signup-input-group">
            <label htmlFor="email" className="signup-label">
              Email:
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="signup-input"
              required
            />
          </div>
          <div className="signup-input-group">
            <label htmlFor="password" className="signup-label">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="signup-input"
              required
            />
          </div>
          <div className="signup-input-group">
            <label htmlFor="phone" className="signup-label">
              Mobile Number:
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={handleChange}
              className="signup-input"
              required
            />
          </div>
          <button type="submit" className="signup-button">
            Register
          </button>
        </form>
        <p className="signup-footer">
          Already have an Account?{" "}
          <span className="signup-link">
            <NavLink to="/login">click here</NavLink>
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
