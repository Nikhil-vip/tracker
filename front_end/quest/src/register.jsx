import { useNavigate } from 'react-router-dom';
import Styles from './register.module.css';
import { FaScroll } from 'react-icons/fa';
import sword from './assets/sword.svg';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
const REGISTER = () => {
  const navigate = useNavigate();
  // 1. Define the base URL at the top of your function
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation FIRST
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

    // Pass the actual axios call to toast.promise()
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
      console.error("Registration error:", error);
      navigate("/Log_in.jsx");
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className={Styles.ok}>
        <div className={Styles.scroll}>
          <FaScroll id="scroll" />
        </div>
        <h1 className={Styles.h1}>QUES
          <img src={sword} alt="T" className={Styles.sword} />
        </h1>
        <h3 className={Styles.h3}>Create New Account</h3>

        {/* Wrapping in a form is the most reliable way to trigger handlesubmit */}
        <form onSubmit={handlesubmit}>
          <label htmlFor="Email">Email:</label><br />
          <input type="email" className={Styles.input} name="Email" value={email} onChange={(event) => setemail(event.target.value)} /><br />

          <label htmlFor="username">Username:</label><br />
          <input type="text" className={Styles.input} id="username" name="username" value={username} onChange={(event) => setusername(event.target.value)} /><br />

          <label htmlFor="password">Password:</label><br />
          <input type="password" className={Styles.input} id="password" name="password" value={password} onChange={(event) => setpassword(event.target.value)} /><br />

          <button type="submit" className={Styles.button}>Register</button>
        </form>

        <h5 className={Styles.h5} onClick={() => navigate("/log_in.jsx")} style={{ cursor: 'pointer' }}>
          Already have an account?
        </h5>
      </div>
    </>
  );
};

export default REGISTER;