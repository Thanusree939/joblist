import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://joblist-1-4hfb.onrender.com/api/auth/login",
        { email, password }
      );

      // Save token to localStorage
      localStorage.setItem("token", res.data.token);
      setMessage(res.data.message);

      navigate("/home"); // go to home
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div className="container">
        <h2>Login Page</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          /><br /><br />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /><br /><br />

          <button type="submit">Login</button>
        </form>

        <p>{message}</p>

        <p>
          New user? <Link to="/signup">Signup first</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
