// Profile.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get("/profile");
      setUserProfile(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  return (
    <div>
      {userProfile ? (
        <div>
          <h2>Profile</h2>
          <p>Name: {userProfile.name}</p>
          <p>Email: {userProfile.email}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
