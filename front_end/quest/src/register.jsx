import { useNavigate } from 'react-router-dom';
import Styles from './register.module.css';
import { FaScroll } from 'react-icons/fa';
import sword from './assets/sword.svg';
import { useState } from 'react';
import axios from 'axios';

const REGISTER = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const handlesubmit = async (event) => {
    event.preventDefault(); // Stop page reload immediately

    // Validation logic
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

    try {
      console.log("Attempting to send data to backend...");
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        username,
        email,
        password
      });

      if (response.status === 201) {
        alert("Registration successful, sir!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Backend Error:", error.response?.data);
      alert(error.response?.data?.message || "Something went wrong with the server connection.");
    }
  };

  return (
    <>
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
          <input type="email" id="Email" name="Email" value={email} onChange={(e) => setemail(e.target.value)} /><br />

          <label htmlFor="username">Username:</label><br />
          <input type="text" id="username" name="username" value={username} onChange={(e) => setusername(e.target.value)} /><br />

          <label htmlFor="password">Password:</label><br />
          <input type="password" id="password" name="password" value={password} onChange={(e) => setpassword(e.target.value)} /><br />

          <button type="submit" className={Styles.button}>Register</button>
        </form>

        <h5 className={Styles.h5} onClick={() => navigate("/login")} style={{ cursor: 'pointer' }}>
          Already have an account?
        </h5>
      </div>
    </>
  );
};

export default REGISTER;