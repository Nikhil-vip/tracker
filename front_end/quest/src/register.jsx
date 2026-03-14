import Styles from './register.module.css';
import { FaScroll } from 'react-icons/fa';
const REGISTER = () => {
  return (
    <>

      <div className={Styles.ok}>
        <div id="grag">
          <FaScroll id="scroll" />
        </div>
        <h1 className={Styles.h1}>QUES
        </h1 >
        <h3 className={Styles.h3}>Log Yourself Into  Your Account</h3>
        <label for="Email">Email:</label><br></br>
        <input type="email" id="Email" name="Email" /><br></br>
        <label for="username">Username:</label><br></br>
        <input type="text" id="username" name="username" /><br></br>
        <label for="password">Password:</label><br></br>
        <input type="password" id="password" name="password" /><br></br>
        <button >Register</button>
        <h5 className={Styles.h5} >Already have an account?</h5>
      </div>
    </>
  )
}
export default REGISTER;