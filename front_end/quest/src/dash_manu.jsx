import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Styles from './Slidebar.module.css';
import { FaSignOutAlt } from 'react-icons/fa';

// --- SUB-COMPONENT: Sidebar ---
const HamburgerMenu = ({ user }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handlesignout = () => {
    if (window.confirm("Are you sure you want to sign out, sir?")) {
      localStorage.clear(); // Good practice to clear session
      navigate("/Log_in"); // Usually you navigate to a route, not a filename
    }
  };

  return (
    <>
      <button className={Styles.hamburgerBtn} onClick={toggleMenu}>
        <div className={`${Styles.bar} ${isOpen ? Styles.barOpen1 : ''}`}></div>
        <div className={`${Styles.bar} ${isOpen ? Styles.barOpen2 : ''}`}></div>
        <div className={`${Styles.bar} ${isOpen ? Styles.barOpen3 : ''}`}></div>
      </button>

      <div className={`${Styles.sidebar} ${isOpen ? Styles.sidebarActive : ''}`}>
        <nav>
          <ul className={Styles.menuList}>
            <li onClick={toggleMenu}>
              <div className={Styles.name}>{user?.username || 'Sir'}</div>
            </li>
            <li onClick={toggleMenu}>Profile</li>
            <li className={Styles.Signout} onClick={handlesignout}>
              <FaSignOutAlt /> Sign Out
            </li>
          </ul>
        </nav>
      </div>

      {isOpen && <div className={Styles.backdrop} onClick={toggleMenu} />}
    </>
  );
};

// --- MAIN COMPONENT: Dashboard ---
const Dashboardd = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/api/jobs/getall`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [API_URL]);

  return (
    <div className={Styles.dashboardContainer}>
      {/* Injecting the Sidebar here */}
      <HamburgerMenu user={user} />

      <main style={{ padding: '20px' }}>
        <h1>Dashboard</h1>
        {loading ? (
          <p>Loading jobs...</p>
        ) : (
          <div>
            {jobs.length > 0 ? (
              jobs.map(job => <div key={job._id}>{job.title}</div>)
            ) : (
              <p>No jobs available.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboardd;