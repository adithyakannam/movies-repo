import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { userFetch } from "../API/Api";

const Login = () => {
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("userDetails"));
      if (user) {
        alert("Login successful!");
        localStorage.setItem("authenticated", JSON.stringify(true));
        navigate("/"); // Redirect to dashboard
      } else {
        alert("Invalid email or password!");
        localStorage.setItem("authenticated", JSON.stringify(false));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignupNavigation = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <form
        className="bg-slate-200  rounded-lg p-5 shadow-md text-black w-full max-w-xl  h-[50vh] flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <div className="form-group mb-4 w-full">
          <label htmlFor="email" className="block text-gray-700 text-xl">
            Email:
          </label>
          <input
            type="text"
            id="email"
            className="w-full text-xl px-3 py-2 border-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={userEmail}
            placeholder="johndoe@yahoo.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-6 w-full">
          <label htmlFor="password" className="block text-gray-700 text-xl">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 text-xl border-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={userPassword}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="text-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
        <p className="">
          Don't have an Account?{" "}
          <span className="signup-link">
            <NavLink to="/signup">click here</NavLink>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
