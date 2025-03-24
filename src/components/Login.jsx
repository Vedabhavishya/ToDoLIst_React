import React, { useState } from "react";

function Login({ setUserEmail }) {
  const [email, setEmail] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email) {
      localStorage.setItem("userEmail", email); // Save email to localStorage
      setUserEmail(email); // Set email in App state
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
