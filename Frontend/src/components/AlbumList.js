// components/Albums.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Albums() {
  const [albums, setAlbums] = useState([]);
  const [newAlbum, setNewAlbum] = useState({
    title: "",
    artist: "",
    release_date: "",
    cover_image: "",
    embed_link: "",
  });

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get("/albums");
      setAlbums(response.data);
    } catch (error) {
      console.error("Failed to fetch albums:", error);
    }
  };

  const handleChange = (e) => {
    setNewAlbum({ ...newAlbum, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/albums", newAlbum);
      setAlbums([...albums, response.data]);
      setNewAlbum({
        title: "",
        artist: "",
        genre: "",
        release_date: "",
        cover_image_url: "",
        embed_link: "",
      });
    } catch (error) {
      console.error("Failed to add album:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      {" "}
      {albums.map((album) => (
        <div
          key={album.id}
          style={{
            flex: "1 0 30%",
            margin: "10px",
            border: "1px solid #ccc",
            padding: "10px",
          }}
        >
          <h2>{album.title}</h2>
          <Link to={`/album-details/${album.id}`}>
            <img
              src={album.cover_image}
              alt={`${album.title} cover`}
              style={{ width: "45%" }}
            />
          </Link>
          <p>
            <strong>Artist:</strong> {album.artist}
          </p>
          <p>
            <strong>Release Date:</strong>{" "}
            {new Date(album.release_date).toLocaleDateString()}
          </p>
          <iframe
            src={album.embed_link}
            style={{ width: "45%", height: "300px" }}
            allow="encrypted-media"
          ></iframe>
        </div>
      ))}
    </div>
  );
}

export default Albums;
