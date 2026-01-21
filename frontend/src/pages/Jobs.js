import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_API_URL;

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API}/api/jobs`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then(res => setJobs(res.data))
    .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Jobs List</h2>

      {jobs.length === 0 ? (
        <p>No jobs available</p>
      ) : (
        <ul>
          {jobs.map(job => (
            <li
              key={job._id}
              style={{ cursor: "pointer", marginBottom: "10px" }}
              onClick={() => navigate(`/jobs/${job._id}`)}
            >
              {job.title} - {job.company} ({job.location})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Jobs;
