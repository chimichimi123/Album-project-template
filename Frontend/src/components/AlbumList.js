import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Albums() {
  const [albums, setAlbums] = useState([]);
  const [newAlbum, setNewAlbum] = useState({
    title: "",
    artist: "",
    genre: "",
    release_date: "",
  });

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    const response = await axios.get("/albums");
    setAlbums(response.data);
  };

  const handleChange = (e) => {
    setNewAlbum({ ...newAlbum, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/albums", newAlbum);
    fetchAlbums();
  };

  return (
    <div>
      <h1>Albums</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
        />
        <input
          type="text"
          name="artist"
          placeholder="Artist"
          onChange={handleChange}
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          onChange={handleChange}
        />
        <input
          type="date"
          name="release_date"
          placeholder="Release Date"
          onChange={handleChange}
        />
        <button type="submit">Add Album</button>
      </form>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
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
            <Link to={`/albums/${album.id}`}>
              <img
                src={album.cover_image}
                alt={`${album.title} cover`}
                style={{ width: "100%" }}
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
              style={{ width: "100%", height: "300px" }}
              allow="encrypted-media"
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Albums;
