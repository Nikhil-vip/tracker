import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Styles from './dash.module.css';
import HamburgerMenu from './dash_manu.jsx';
import { FaDragon } from 'react-icons/fa';
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
  const handlesignout = () => {
    if (window.confirm("Are you sure you want to sign out, sir?")) {
      Navigate("/Log_in.jsx");
    }
  };
  return (
    <>
      <HamburgerMenu></HamburgerMenu>
      <div className={Styles.navbb} >
        <h1>Quest</h1>
        <div className={Styles.grag}><FaDragon id="dragon" /></div>
        <div className={Styles.profile_area}>


        </div>

      </div >

      <div className={Styles.topp}>

        <h1>Dashboard</h1>

        <button className={Styles.top_buttton} onClick={() => Navigate("/jobs_entry.jsx")}>+ New</button>

      </div>

      <div className={Styles.quick_infoo}>

        <div className={Styles.cont_onee}>
          <div>jobs applied:</div>
          <div style={{ color: "green" }}>{jobs.length}</div>
        </div>

        <div className={Styles.cont_twoo}>
          <div>average salary:</div>
          <div style={{ color: "green" }}>{jobs.reduce((acc, job) => acc + job.salary, 0) / jobs.length || 0}</div>
        </div>

        <div className={Styles.cont_threee}>
          <div>applications this month:</div>
          <div style={{ color: "green" }}>{jobs.filter(job => new Date(job.date).getMonth() === new Date().getMonth()).length}</div>
        </div>

      </div>

      <div className={Styles.main}>
        <div>
          <h3>Job Applications</h3>
        </div>

        <table className={Styles.table_container}>
          <thead>
            <tr className={Styles.table_heads}>
              <th>Company</th>
              <th>Role</th>
              <th>Status</th>
              <th>Salary</th>
              <th>Date Applied</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id} className={Styles.table}>
                <td className={Styles.table_cell1}>{job.company}</td>
                <td className={Styles.table_cell2}>{job.role}</td>
                <td className={Styles.table_cell3}>{job.status}</td>
                <td className={Styles.table_cell4}>₹{job.salary}</td>
                <td className={Styles.table_cell5}>{new Date(job.date).toLocaleDateString()}</td>
                <td className={Styles.table_cell_actions}>
                  <button
                    className={Styles.delete_btn}
                    onClick={() => handleDelete(job._id)}
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Dashboard;