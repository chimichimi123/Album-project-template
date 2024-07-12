// components/Members.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Members.css";

function Members() {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const response = await axios.get("/members");
    setMembers(response.data);
  };

  const handleChange = (e) => {
    setNewMember({ ...newMember, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/members", newMember);
    fetchMembers();
  };

  return (
    <div className="members-container">
      <h1>Members</h1>
      <form onSubmit={handleSubmit} className="member-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newMember.name}
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newMember.email}
          onChange={handleChange}
          className="form-input"
        />
        <button type="submit" className="form-button">
          Add Member
        </button>
      </form>
      <ul className="member-list">
        {members.map((member) => (
          <li key={member.id} className="member-item">
            {member.name} ({member.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Members;
