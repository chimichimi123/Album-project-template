// components/Members.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CSS/Members.css";

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

  return (
    <div className="members-container">
      <h1>Registered Members</h1>

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
