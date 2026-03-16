import Styles from './log_in.module.css';
import sword from './assets/sword.svg';
import { FaDragon } from 'react-icons/fa';
const LOGGIN = () => {
  return (
    <>
      <div id="big_cont">
        <div className={Styles.container}>
          <div className={Styles.grag}>
            <FaDragon id="dragon" /> {/* Capitalized */}
          </div>
          <h1 className={Styles.h1}>QUES
            <img src={sword} alt="T" className={Styles.sword} />
          </h1>
          <h3>Log Yourself Into  Your Account</h3>
          <label for="username" >Username:</label><br></br>
          <input type="text" id="username" name="username" /><br></br>
          <label for="password" >Password:</label><br></br>
          <input type="password" id="password" name="password" /><br></br>
          <button >Enter Realm </button>
        </div>
      </div>
      <div className={Styles.spin}></div>
    </>
  )
}
export default LOGGIN;