import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Styles from './dash.module.css';

const Dashboard = () => {
  const Navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/api/jobs/getall`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setJobs(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this application, sir?")) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_URL}/api/jobs/delete/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Update the UI immediately by filtering out the deleted job
        setJobs(jobs.filter(job => job._id !== id));
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete the job.");
      }
    }
  };
  return (
    <>
      <div className={Styles.navbar}>
        <input className={Styles.nav_in}></input>

        <div className={Styles.profile}>
          hi
        </div>

      </div>

      <div className={Styles.top}>

        <h1>Dashboard</h1>

        <button className={Styles.top_button} onClick={() => Navigate("/jobs_entry.jsx")}>+ New</button>

      </div>

      <div className={Styles.quick_info}>

        <div className={Styles.cont_one}>
          jobs applied: {jobs.length}
        </div>

        <div className={Styles.cont_two}>
          average salary: {jobs.reduce((acc, job) => acc + job.salary, 0) / jobs.length || 0}
        </div>

        <div className={Styles.cont_three}>
          applications this month: {jobs.filter(job => new Date(job.date).getMonth() === new Date().getMonth()).length}
        </div>

      </div>

      <div className={Styles.main}>
        <div>
          <h3>Job Applications</h3>
        </div>
        <div className={Styles.table_heads} >
          <h4>Company</h4>
          <h4>Role</h4>
          <h4>Status</h4>
          <h4>Salary</h4>
          <h4>Date Applied</h4>
        </div>
        <table className={Styles.table}>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id}>
                <td>{job.company}</td>
                <td>{job.role}</td>
                <td>{job.status}</td>
                <td>{job.salary}</td>
                <td>{new Date(job.date).toLocaleDateString()}</td>
                <button
                  className={Styles.delete_btn}
                  onClick={() => handleDelete(job._id)}
                >
                  Delete
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Dashboard;