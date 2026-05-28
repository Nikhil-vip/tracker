import { useState } from 'react'; // 1. Added import
import { useNavigate } from 'react-router-dom';
import Styles from './log_in.module.css';
import axios from 'axios';
import sword from './assets/sword.svg';
import { FaDragon, FaExclamationCircle } from 'react-icons/fa';

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
      <div id={Styles.big_cont}>
        <div className={Styles.container}>
          <div className={Styles.grag}><FaDragon id="dragon" /></div>
          <h1 className={Styles.h1}>QUES
            <img src={sword} alt="T" className={Styles.sword} />
          </h1>
          <h3 className={Styles.h3}>Log Yourself Into Your Account</h3>

          {/* 4. Wrap in a Form tag */}

          <label htmlFor="email">Email:</label><br />
          <input
            type="email"
            className={Styles.input}
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="your.email@domain.com"
            required
          /><br />

          <label htmlFor="password">Password:</label><br />
          <input
            type="password"
            className={Styles.input}
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            placeholder="••••••••"
            required
          /><br />

          {/* Added the disclaimer component cleanly right above the button */}
          <div className={Styles.disclaimerBox}>
            <FaExclamationCircle className={Styles.disclaimerIcon} />
            <p className={Styles.disclaimerText}>
              <strong>Note:</strong> We use an independent development stack and free resources. Handshake responses might take slightly longer. Thank you for your patience!
            </p>
          </div>

          <button type="submit" className={Styles.button} onClick={handlesubmit}>Enter Realm</button>

          <h5 className={Styles.h5} onClick={() => navigate("/register.jsx")}>
            New explorer? <span className={Styles.registerHighlight}>Create Your Account</span>
          </h5>

        </div>
      </div>
      <div className={Styles.spin}></div>
    </>
  );
};

export default LOGGIN;