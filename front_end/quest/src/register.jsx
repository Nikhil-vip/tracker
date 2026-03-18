import { useNavigate } from 'react-router-dom';
import Styles from './register.module.css';
import { FaScroll } from 'react-icons/fa';
import sword from './assets/sword.svg';
import { useState } from 'react';
const REGISTER = (event) => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  console.log(email);
  console.log(username);
  console.log(password);
  const handlesubmit = (event) => {
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
    event.preventDefault();
    console.log("Form submitted");
  }
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
        <label for="Email">Email:</label><br></br>
        <input type="email" id="Email" name="Email" value={email} onChange={(e) => setemail(e.target.value)} /><br></br>
        <label for="username">Username:</label><br></br>
        <input type="text" id="username" name="username" value={username} onChange={(e) => setusername(e.target.value)} /><br></br>
        <label for="password">Password:</label><br></br>
        <input type="password" id="password" name="password" value={password} onChange={(e) => setpassword(e.target.value)} /><br></br>
        <button className={Styles.button} onClick={handlesubmit}>Register</button>
        <h5 className={Styles.h5} onClick={() => navigate("./Log_in.jsx")} >Already have an account?</h5>
      </div>

    </>
  )
}
export default REGISTER;