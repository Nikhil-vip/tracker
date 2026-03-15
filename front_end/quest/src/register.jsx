import { useNavigate } from 'react-router-dom';
import Styles from './register.module.css';
import { FaScroll } from 'react-icons/fa';
const REGISTER = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={Styles.ok}>
        <div className={Styles.scroll}>
          <FaScroll id="scroll" />
        </div>
        <h1 className={Styles.h1}>QUES
        </h1 >
        <h3 className={Styles.h3}>Register Your Account</h3>
        <label for="Email">Email:</label><br></br>
        <input type="email" id="Email" name="Email" /><br></br>
        <label for="username">Username:</label><br></br>
        <input type="text" id="username" name="username" /><br></br>
        <label for="password">Password:</label><br></br>
        <input type="password" id="password" name="password" /><br></br>
        <button className={Styles.button}>Register</button>
        <h5 className={Styles.h5} onClick={() => navigate("/log_in.jsx")} >Already have an account?</h5>
      </div>

    </>
  )
}
export default REGISTER;