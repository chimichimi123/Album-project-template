// Profile.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CSS/Profile.css";

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
    <div className="profile-container">
      {userProfile ? (
        <div className="profile-details">
          <h2>Profile</h2>
          <p>
            <strong>ID:</strong> {userProfile.id}
          </p>
          <p>
            <strong>Name:</strong> {userProfile.name}
          </p>
          <p>
            <strong>Email:</strong> {userProfile.email}
          </p>
          <p>
            <strong>Join Date:</strong>{" "}
            {new Date(userProfile.join_date).toLocaleDateString()}
          </p>
          <h3>Reviews</h3>
          {userProfile.reviews.length > 0 ? (
            <ul>
              {userProfile.reviews.map((review, index) => (
                <li key={index}>
                  <p>
                    <strong>Album:</strong> {review.album.title}
                  </p>
                  <p>
                    <strong>Rating:</strong> {review.rating}
                  </p>
                  <p>
                    <strong>Comment:</strong> {review.comment}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(review.review_date).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews found.</p>
          )}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
