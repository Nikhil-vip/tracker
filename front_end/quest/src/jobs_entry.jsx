import { useState } from "react";
import axios from "axios"; // Ensure axios is imported
import { useNavigate } from "react-router-dom"; // For navigation
import Styles from './jobs_entry.module.css';

const Entry = () => {
  const navigate = useNavigate();
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState("");
  // Set default date to today
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState('Pending');

  const handleSubmit = async (e) => {
    try {
      // Retrieve the token you saved during Login/Signup
      const token = localStorage.getItem('token');

      const response = await axios.post('http://localhost:3000/api/jobs/newjob',
        { company, role, date, salary, status },
        { headers: { Authorization: `Bearer ${token}` } } // Send token to backend
      );

      if (response.status === 201) {
        alert("Job saved successfully, sir!");
        navigate("/dash.jsx");
      }
    } catch (error) {
      console.error("Backend Error:", error.response?.data);
      alert(error.response?.data?.message || "Error connecting to server.");
    }
  };

  return (
    <div className={Styles.container}>
      <h1>Enter Job Details</h1>

      <input
        type="text"
        placeholder="Company Name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <input
        type="text"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <input
        type="number"
        placeholder="Salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
      />

      <label htmlFor="status">Status:</label>
      <select
        className={Styles.status}
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Pending">Pending</option>
        <option value="Interviewing">Interviewing</option>
        <option value="Rejected">Rejected</option>
        <option value="Accepted">Accepted</option>
      </select>

      <button onClick={handleSubmit}>Add Job</button>
    </div>
  );
};

export default Entry;