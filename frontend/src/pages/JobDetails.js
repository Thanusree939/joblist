import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const API = process.env.REACT_APP_API_URL;

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API}/api/jobs/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then(res => setJob(res.data))
    .catch(err => console.log(err));
  }, [id]);

  if (!job) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <div className="container">
        <h2>{job.title}</h2>
        <p><b>Company:</b> {job.company}</p>
        <p><b>Location:</b> {job.location}</p>
        <p><b>Description:</b> {job.description}</p>

        <button onClick={() => navigate("/home")}>
          Back to Jobs
        </button>
      </div>
    </div>
  );
}

export default JobDetails;
