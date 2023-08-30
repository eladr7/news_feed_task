import React, { useState } from "react";
import axios from "axios";

const Auth = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth", { phoneNumber });

      if (response.status === 201 || response.status === 200) {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage("Error occurred during signup/login");
    }
  };

  return (
    <div>
      <h1>Signup/Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Phone Number:
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Auth;
