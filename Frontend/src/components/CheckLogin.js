import React, { useEffect, useState } from "react";
import axios from "axios";

const CheckLogin = () => {
  const [loginStatus, setLoginStatus] = useState(null);

  useEffect(() => {
    axios
      .get("/check_login")
      .then((response) => {
        setLoginStatus(response.data);
      })
      .catch((error) => {
        console.error("Error checking login status:", error);
      });
  }, []);

  if (loginStatus === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {loginStatus.logged_in ? (
        <div>Welcome, {loginStatus.user}!</div>
      ) : (
        <div>Please log in.</div>
      )}
    </div>
  );
};

export default CheckLogin;
