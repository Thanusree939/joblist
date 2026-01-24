import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function AddJob() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${API}/api/jobs`,
        { title, company, location, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      navigate("/jobs");
    } catch (err) {
      alert("Job creation failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Job</h2>

      <form onSubmit={handleSubmit}>
        <input placeholder="Title" required onChange={e => setTitle(e.target.value)} /><br /><br />
        <input placeholder="Company" required onChange={e => setCompany(e.target.value)} /><br /><br />
        <input placeholder="Location" required onChange={e => setLocation(e.target.value)} /><br /><br />
        <textarea placeholder="Description" required onChange={e => setDescription(e.target.value)} /><br /><br />

        <button type="submit">Create Job</button>
      </form>
    </div>
  );
}

export default AddJob;
