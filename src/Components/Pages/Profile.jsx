import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "",
    email: "",
  });

  // Get movies from Redux store
  const movies = useSelector((state) => state.movies.movies);

  const logout = () => {
    localStorage.setItem("authenticated", JSON.stringify({data:"false",timestamp:null}));
    // localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
    setUserDetails(storedUser.data);
  }, [movies]); // Call only when movies change

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1 className="profile-title">Profile</h1>
        
        <div className="profile-info">
          <h2 className="profile-subtitle">Personal Information</h2>
          <p className="profile-text"><span className="profile-label">Name:</span> {userDetails.name}</p>
          <p className="profile-text"><span className="profile-label">Email:</span> {userDetails.email}</p>
          <p className="profile-text"><span className="profile-label">Mobile:</span> {userDetails.phone}</p>
        </div>

        <div className="profile-actions">
          <button 
            className="profile-button"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
