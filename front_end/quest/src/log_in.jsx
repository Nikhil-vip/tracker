import Styles from './log_in.module.css';
import sword from './assets/sword.svg';
import { FaDragon } from 'react-icons/fa';
const LOGGIN = () => {
  return (
    <>
      <div id="big_cont">
        <div className={Styles.container}>
          <div id="grag">
            <FaDragon id="dragon" /> {/* Capitalized */}
          </div>
          <h1>QUES
            <img src={sword} alt="T" id="sword" />
          </h1>
          <h3>Log Yourself Into  Your Account</h3>
          <label for="username">Username:</label><br></br>
          <input type="text" id="username" name="username" /><br></br>
          <label for="password">Password:</label><br></br>
          <input type="password" id="password" name="password" /><br></br>
          <button >Enter Realm </button>
        </div>
      </div>
      <div id="spin"></div>
    </>
  )
}
export default LOGGIN;