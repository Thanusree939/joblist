import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://joblist-1-4hfb.onrender.com/api/jobs", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then(res => setJobs(res.data))
    .catch(err => console.log(err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={handleLogout}>Logout</button>

      <div className="container">
        <h2>Job List</h2>

        {jobs.map(job => (
          <div
            key={job._id}
            style={{ border: "1px solid black", margin: "10px", padding: "10px" }}
          >
            <h3>{job.title}</h3>
            <p>{job.company}</p>
            <Link to={`/jobs/${job._id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
