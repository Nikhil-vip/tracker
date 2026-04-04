import { useState } from 'react'; // 1. Added import
import { useNavigate } from 'react-router-dom';
import Styles from './log_in.module.css';
import axios from 'axios';
import sword from './assets/sword.svg';
import { FaDragon } from 'react-icons/fa';

const LOGGIN = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState(''); // Changed to email to match your backend logic
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const [password, setpassword] = useState('');

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace your hardcoded line with this:


      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        // 3. Save user as a string so you can read it later
        localStorage.setItem('user', JSON.stringify(response.data.user));

        alert(`Welcome back to Quest, sir!`);
        navigate("/dash.jsx"); // Use the route path, not the filename
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <div id="big_cont">
        <div className={Styles.container}>
          <div className={Styles.grag}><FaDragon id="dragon" /></div>
          <h1 className={Styles.h1}>QUES
            <img src={sword} alt="T" className={Styles.sword} />
          </h1>
          <h3>Log Yourself Into Your Account</h3>

          {/* 4. Wrap in a Form tag */}

          <label htmlFor="email">Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
          /><br />

          <label htmlFor="password">Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            required
          /><br />

          <button type="submit" className={Styles.button} onClick={handlesubmit}>Enter Realm</button>

        </div>
      </div>
      <div className={Styles.spin}></div>
    </>
  );
};

export default LOGGIN;