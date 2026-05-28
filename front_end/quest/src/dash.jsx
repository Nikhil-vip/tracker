import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Styles from './dash.module.css';
import HamburgerMenu from './dash_manu.jsx';
import { FaDragon, FaBriefcase, FaCalendarAlt, FaTrashAlt } from 'react-icons/fa';

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
    <div className={Styles.pageContainer}>
      <HamburgerMenu />

      {/* Navbar Section */}
      <div className={Styles.navbb}>
        <div className={Styles.logoArea}>
          <h1>Quest</h1>
          <div className={Styles.grag}><FaDragon id="dragon" /></div>
        </div>
        <div className={Styles.profile_area}>
          {user && <span className={Styles.userNameDisplay}>Sir {user.username || 'Explorer'}</span>}
        </div>
      </div>

      {/* Main Panel Header Area */}
      <div className={Styles.topp}>
        <h1>Dashboard</h1>
        <button className={Styles.top_buttton} onClick={() => Navigate("/jobs_entry.jsx")}>
          <span>+ New Quest</span>
        </button>
      </div>

      {/* Metric Cards Grid Layout */}
      <div className={Styles.quick_infoo}>
        <div className={Styles.cont_onee}>
          <div className={Styles.cardLabel}>Quests Initiated:</div>
          <div className={Styles.cardValue} style={{ color: "#3b82f6" }}>{jobs.length}</div>
        </div>

        <div className={Styles.cont_twoo}>
          <div className={Styles.cardLabel}>Average Bounty:</div>
          <div className={Styles.cardValue} style={{ color: "#10b981" }}>
            ₹{Math.round(jobs.reduce((acc, job) => acc + job.salary, 0) / jobs.length || 0).toLocaleString()}
          </div>
        </div>

        <div className={Styles.cont_threee}>
          <div className={Styles.cardLabel}>Active This Month:</div>
          <div className={Styles.cardValue} style={{ color: "#6366f1" }}>
            {jobs.filter(job => new Date(job.date).getMonth() === new Date().getMonth()).length}
          </div>
        </div>
      </div>

      {/* Main Content Board List Section */}
      <div className={Styles.main}>
        <div className={Styles.mainHeader}>
          <h3>Active Job Applications</h3>
        </div>

        {/* Outer Data Panel Container Wrapper */}
        <div className={Styles.table_container}>
          {/* Header Legend Layout Row (Hidden safely inside CSS layout metrics for mobile cards) */}
          <div className={Styles.table_heads}>
            <div className={Styles.head_cell}>Company</div>
            <div className={Styles.head_cell}>Role</div>
            <div className={Styles.head_cell}>Status</div>
            <div className={Styles.head_cell}>Salary</div>
            <div className={Styles.head_cell}>Date Applied</div>
            <div className={Styles.head_cell_actions}>Actions</div>
          </div>

          {/* Dynamic Content Grid Data Output Rows */}
          {loading ? (
            <div className={Styles.loadingText}>Fetching active operations data streams...</div>
          ) : jobs.length === 0 ? (
            <div className={Styles.emptyText}>No quest logs created. Deploy a new entry to begin.</div>
          ) : (
            jobs.map((job) => (
              <div key={job._id} className={Styles.table}>
                <div className={Styles.table_cell1}>
                  <FaBriefcase className={Styles.mobileIcon} />
                  <span className={Styles.cellContent}>{job.company}</span>
                </div>
                <div className={Styles.table_cell2}>
                  <span className={Styles.cellContent}>{job.role}</span>
                </div>
                <div className={Styles.table_cell3}>
                  <span className={`${Styles.statusBadge} ${Styles[job.status?.toLowerCase()] || Styles.defaultStatus}`}>
                    {job.status}
                  </span>
                </div>
                <div className={Styles.table_cell4}>
                  <span className={Styles.cellContent}>₹{job.salary?.toLocaleString()}</span>
                </div>
                <div className={Styles.table_cell5}>
                  <FaCalendarAlt className={Styles.mobileIcon} />
                  <span className={Styles.cellContent}>{new Date(job.date).toLocaleDateString()}</span>
                </div>
                <div className={Styles.table_cell_actions}>
                  <button
                    className={Styles.delete_btn}
                    onClick={() => handleDelete(job._id)}
                  >
                    <FaTrashAlt className={Styles.btnIcon} />
                    <span>Abandon</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;