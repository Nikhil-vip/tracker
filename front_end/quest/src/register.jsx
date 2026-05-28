import { useNavigate } from 'react-router-dom';
import Styles from './register.module.css';
import { FaScroll, FaUser, FaEnvelope, FaLock, FaExclamationCircle } from 'react-icons/fa';
import sword from './assets/sword.svg';
import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const REGISTER = () => {
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const handlesubmit = async (event) => {
    event.preventDefault();

    if (email === "" || username === "" || password === "") {
      alert("Please fill all the fields");
      return;
    }
    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      alert("Please enter a valid email");
      return;
    }

    const myPromise = axios.post(`${API_BASE_URL}/api/auth/register`, {
      username,
      email,
      password
    }, { timeout: 30000 });

    toast.promise(myPromise, {
      loading: 'Processing... please wait sir.',
      success: 'Task completed successfully!',
      error: 'Something went wrong.',
    });

    try {
      console.log(`Attempting to send data to: ${API_BASE_URL}`);

      const response = await myPromise;

      if (response.status === 201 || response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        alert("Registration successful, sir!");
        navigate("/Log_in.jsx");
      } else {
        alert("Unexpected response from server.");
      }

    } catch (error) {
      alert("User registration failed.");
      console.error("Registration error:", error);
      navigate("/Log_in.jsx");
    }
  };

  return (
    <div className={Styles.pageWrapper}>
      <div className={Styles.ok}>
        {/* Subtle top decorative border accent */}
        <div className={Styles.topGlowDecor}></div>

        <Toaster />

        {/* Header Branding Section */}
        <div className={Styles.headerSection}>
          <div className={Styles.logoContainer}>
            <span className={Styles.scrollWrapper}>
              <FaScroll className={Styles.scroll} />
            </span>
            <h1 className={Styles.h1}>
              QUES<img src={sword} alt="T" className={Styles.sword} />
            </h1>
          </div>
          <h3 className={Styles.h3}>Begin Your Journey</h3>
          <p className={Styles.subtitle}>Join thousands of explorers tracking their career quests!</p>
        </div>

        {/* Form Container */}
        <form onSubmit={handlesubmit} className={Styles.form}>

          {/* Email Field */}
          <div className={Styles.inputGroup}>
            <label htmlFor="Email" className={Styles.label}>Comms Link (Email)</label>
            <div className={Styles.inputWrapper}>
              <FaEnvelope className={Styles.inputIcon} />
              <input
                type="email"
                className={Styles.input}
                name="Email"
                placeholder="your.email@domain.com"
                value={email}
                onChange={(event) => setemail(event.target.value)}
              />
            </div>
          </div>

          {/* Username Field */}
          <div className={Styles.inputGroup}>
            <label htmlFor="username" className={Styles.label}>Explorer Name</label>
            <div className={Styles.inputWrapper}>
              <FaUser className={Styles.inputIcon} />
              <input
                type="text"
                className={Styles.input}
                id="username"
                name="username"
                placeholder="Your full name"
                value={username}
                onChange={(event) => setusername(event.target.value)}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className={Styles.inputGroup}>
            <label htmlFor="password" className={Styles.label}>Access Key (Password)</label>
            <div className={Styles.inputWrapper}>
              <FaLock className={Styles.inputIcon} />
              <input
                type="password"
                className={Styles.input}
                id="password"
                name="password"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setpassword(event.target.value)}
              />
            </div>
            {/* Visual Password Strength Bars Mock */}
            <div className={Styles.strengthIndicator}>
              <div className={`${Styles.strengthBar} ${Styles.activeBar}`}></div>
              <div className={`${Styles.strengthBar} ${Styles.activeBar}`}></div>
              <div className={`${Styles.strengthBar} ${Styles.activeBar}`}></div>
              <div className={Styles.strengthBar}></div>
              <span className={Styles.strengthText}>Strong</span>
            </div>
          </div>

          {/* Custom Resource Performance Disclaimer Box */}
          <div className={Styles.disclaimerBox}>
            <FaExclamationCircle className={Styles.disclaimerIcon} />
            <p className={Styles.disclaimerText}>
              <strong>Note:</strong> We use an independent development stack and free server instances. Initial profile creation or handshake responses might take slightly longer than typical corporate setups. Thank you for your patience, Explorer!
            </p>
          </div>

          {/* Action Button */}
          <button type="submit" className={Styles.button}>Begin Quest</button>
        </form>

        {/* Footer Link */}
        <h5 className={Styles.h5} onClick={() => navigate("/log_in.jsx")}>
          Already an explorer? <span className={Styles.loginHighlight}>Load Progress (Login)</span>
        </h5>
      </div>
    </div>
  );
};

export default REGISTER;