import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/api/jobs`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setJobs(res.data))
      .catch((err) => console.log(err));
  }, []);

  const deleteJob = async (id) => {
    try {
      await axios.delete(`${API}/api/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setJobs(jobs.filter((job) => job._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Jobs List</h2>

      <button onClick={() => navigate("/add-job")}>Add Job</button>

      <ul>
        {jobs.map((job) => (
          <li key={job._id}>
            {job.title} - {job.company}

            <button onClick={() => navigate(`/jobs/${job._id}`)}>
              View
            </button>

            <button onClick={() => navigate(`/edit-job/${job._id}`)}>
              Edit
            </button>

            <button onClick={() => deleteJob(job._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Jobs;
