import Styles from './dash.module.css';
const Dashboard = () => {
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

        <button className={Styles.top_button}>+ New</button>

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
        fvdfv
      </div>
    </>
  );
};
export default Dashboard;