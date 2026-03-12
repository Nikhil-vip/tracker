import './log_in.css';
import sword from './assets/sword.svg';
import loginbg from './assets/login_bg.svg';
const LOGGIN = () => {
  return (
    <>
      <div id="big_cont">
        <div id="container">
          <h1>QUES
            <img src={sword} alt="T" id="sword" />
          </h1>
          <h3>Initialize Your Carrer Journey</h3>
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