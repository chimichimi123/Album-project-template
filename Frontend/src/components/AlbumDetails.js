import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AlbumDetails = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    fetchAlbumDetails();
  }, [id]);

  const fetchAlbumDetails = async () => {
    try {
      const response = await axios.get(`/albums/${id}`);
      setAlbum(response.data);
    } catch (error) {
      console.error("Error fetching album details:", error);
    }
  };

  if (!album) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", margin: "20px" }}>
      <h1>{album.title}</h1>
      <img
        src={album.cover_image}
        alt={`${album.title} cover`}
        style={{ width: "100%" }}
      />
      <p>
        <strong>Artist:</strong> {album.artist}
      </p>
      <p>
        <strong>Release Date:</strong>{" "}
        {new Date(album.release_date).toLocaleDateString()}
      </p>
      <p>
        <strong>Genres:</strong> {album.genre}
      </p>
      <p>
        <strong>Popularity:</strong> {album.popularity}
      </p>
      <p>
        <strong>Label:</strong> {album.label}
      </p>
      <h2>Tracks:</h2>
      <ul>
        {album.tracks.split(", ").map((track) => (
          <li key={track}>{track}</li>
        ))}
      </ul>
      <iframe
        src={album.embed_link}
        style={{ width: "100%", height: "300px" }}
        allow="encrypted-media"
      ></iframe>
      <h2>Reviews</h2>
      {album && album.reviews && album.reviews.length > 0 ? (
        album.reviews.map(
          (review) =>
            review && (
              <div
                key={review.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              >
                <p>
                  <strong>Member:</strong> {review.member_name}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {review.review_date
                    ? new Date(review.review_date).toLocaleDateString()
                    : "N/A"}
                </p>
                <p>
                  <strong>Rating:</strong> {review.rating}
                </p>
                <p>
                  <strong>Comment:</strong> {review.comment}
                </p>
              </div>
            )
        )
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

export default AlbumDetails;
