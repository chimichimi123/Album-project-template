// components/Reviews.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Reviews.css"

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    album_id: "",
    member_id: "",
    rating: "",
    comment: "",
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const response = await axios.get("/reviews");
    setReviews(response.data);
  };

  const handleChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/reviews", newReview);
    fetchReviews();
  };

  return (
    <div className="reviews-container">
      <h1>Reviews</h1>
      <form onSubmit={handleSubmit} className="review-form">
        <input
          type="text"
          name="album_id"
          placeholder="Album ID"
          value={newReview.album_id}
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="text"
          name="member_id"
          placeholder="Member ID"
          value={newReview.member_id}
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating"
          value={newReview.rating}
          onChange={handleChange}
          className="form-input"
        />
        <textarea
          name="comment"
          placeholder="Comment"
          value={newReview.comment}
          onChange={handleChange}
          className="form-textarea"
        ></textarea>
        <button type="submit" className="form-button">Add Review</button>
      </form>
      <ul className="review-list">
        {reviews.map((review) => (
          <li key={review.id} className="review-item">
            Album {review.album_id} by Member {review.member_id}:{" "}
            {review.comment} (Rating: {review.rating})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Reviews;
