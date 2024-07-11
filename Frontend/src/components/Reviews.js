// components/Reviews.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Reviews.css";

const ReviewComponent = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    album_id: "",
    member_id: "",
    rating: "",
  });
  const [editingComments, setEditingComments] = useState({});

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get("/reviews");
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleCommentChange = (reviewId, comment) => {
    setEditingComments({ ...editingComments, [reviewId]: comment });
  };

  const addReview = async () => {
    try {
      const response = await axios.post("/reviews", newReview);
      setReviews([...reviews, response.data]);
      setNewReview({
        album_id: "",
        member_id: "",
        rating: "",
        comment: "",
      });
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const updateReview = async (reviewId, updatedFields) => {
    try {
      const response = await axios.patch(`/reviews/${reviewId}`, updatedFields);
      const updatedReviews = reviews.map((review) =>
        review.id === reviewId ? response.data : review
      );
      setReviews(updatedReviews);
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      await axios.delete(`/reviews/${reviewId}`);
      const updatedReviews = reviews.filter((review) => review.id !== reviewId);
      setReviews(updatedReviews);
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <div>
              <strong>Album ID:</strong> {review.album_id}
            </div>
            <div>
              <strong>Member ID:</strong> {review.member_id}
            </div>
            <div>
              <strong>Rating:</strong> {review.rating}
              <button
                onClick={() =>
                  updateReview(review.id, { rating: review.rating + 1 })
                }
              >
                Increase Rating
              </button>
              <button
                onClick={() =>
                  updateReview(review.id, { rating: review.rating - 1 })
                }
              >
                Decrease Rating
              </button>
            </div>
            <div>
              <strong>Comment:</strong> {review.comment}
            </div>
            <div>
              <textarea
                style={{ width: "600px", height: "100px" }}
                value={editingComments[review.id] || review.comment}
                onChange={(e) => handleCommentChange(review.id, e.target.value)}
              ></textarea>
              <button
                onClick={() =>
                  updateReview(review.id, {
                    comment: editingComments[review.id] || review.comment,
                  })
                }
              >
                Update Comment
              </button>
            </div>
            <button onClick={() => deleteReview(review.id)}>
              Delete Review
            </button>
          </li>
        ))}
      </ul>
      <h3>Add New Review</h3>
      <div>
        <label>
          Album ID:
          <input
            type="text"
            name="album_id"
            value={newReview.album_id}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Member ID:
          <input
            type="text"
            name="member_id"
            value={newReview.member_id}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Rating:
          <input
            type="number"
            name="rating"
            value={newReview.rating}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Comment:
          <input
            type="text"
            name="comment"
            value={newReview.comment}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <button onClick={addReview}>Add Review</button>
    </div>
  );
};

export default ReviewComponent;
