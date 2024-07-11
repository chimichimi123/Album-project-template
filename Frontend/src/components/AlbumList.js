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
      {albums.map((album) => (
        <div
          key={album.id}
          style={{

            flex: "1 0 calc(25% - 20px)",
            margin: "10px",
            border: "1px solid #ccc",
            padding: "10px",
            minWidth: "150px",
            boxSizing: "border-box",
          }}
        >
          <h2>{album.title}</h2>

          <div
            style={{ height: "150px", overflow: "hidden", marginBottom: "8px" }}
          >
            <Link to={`/albums/${album.id}`}>
              <img
                src={album.cover_image}
                alt={`${album.title} cover`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "scale-down",
                }}
              />
            </Link>
          </div>
          <p>
            <strong>Artist:</strong> {album.artist}
          </p>
          <p>
            <strong>Release Date:</strong>{" "}
            {new Date(album.release_date).toLocaleDateString()}
          </p>
          <iframe
            src={album.embed_link}
            style={{ width: "100%", height: "400px" }}
            allow="encrypted-media"
          ></iframe>
        </div>
      ))}
    </div>
  );
}

export default Albums;
