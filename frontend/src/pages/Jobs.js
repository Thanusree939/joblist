import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("https://joblist-1-4hfb.onrender.com/api/jobs");
        setJobs(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Jobs List</h2>
      {jobs.length === 0 ? (
        <p>No jobs available</p>
      ) : (
        <ul>
          {jobs.map((job) => (
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
