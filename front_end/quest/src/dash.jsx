import { useNavigate } from 'react-router-dom';
import Styles from './dash.module.css';
const Dashboard = () => {
  const Navigate = useNavigate();
  return (
    <>
      <div className={Styles.navbar}>
        <input className={Styles.nav_in}></input>

        <div className={Styles.profile}>
          hi
        </div>

      </div>

      <div className={Styles.top}>

        <h1>Dashboard</h1>

        <button className={Styles.top_button} onClick={() => Navigate("/jobs_entry.jsx")}>+ New</button>

      </div>

      <div className={Styles.quick_info}>

        <div className={Styles.cont_one}>
          hi
        </div>

        <div className={Styles.cont_two}>
          hi
        </div>

        <div className={Styles.cont_three}>
          hi
        </div>

      </div>

      <div className={Styles.main}>
        <div>
          <h3>Job Applications</h3>
        </div>
        <div className={Styles.table_heads}>
          <h4>Company</h4>
          <h4>Role</h4>
          <h4>Date Applied</h4>
          <h4>Status</h4>
        </div>
      </div>
    </>
  );
};
export default Dashboard;