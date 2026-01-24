import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  // 1️⃣ Get existing job data
  useEffect(() => {
    axios
      .get(`${API}/api/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setTitle(res.data.title);
        setCompany(res.data.company);
        setLocation(res.data.location);
        setDescription(res.data.description);
      })
      .catch(() => alert("Failed to load job"));
  }, [id]);

  // 2️⃣ Update job
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${API}/api/jobs/${id}`,
        { title, company, location, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      navigate("/jobs");
    } catch {
      alert("Update failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Job</h2>

      <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        <br /><br />

        <input value={company} onChange={(e) => setCompany(e.target.value)} required />
        <br /><br />

        <input value={location} onChange={(e) => setLocation(e.target.value)} required />
        <br /><br />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Update Job</button>
      </form>
    </div>
  );
}

export default EditJob;
