import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`https://joblist-1-4hfb.onrender.com/api/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchJob();
  }, [id]);

  if (!job) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <div className="container">
      <h2>{job.title}</h2>
      <p><b>Company:</b> {job.company}</p>
      <p><b>Location:</b> {job.location}</p>
      <p><b>Description:</b> {job.description}</p>
      <button onClick={() => navigate("/home")}>Back to Jobs</button>
      </div>
    </div>
  );
}

export default JobDetails;
