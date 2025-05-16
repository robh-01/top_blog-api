import styles from "./DashboardBar.module.css";

export function DashboardBar() {
  return (
    <>
      <div className={styles["dashboard-bar"]}>
        <p className={styles["dashboard-bar--logo"]}>Tellin</p>
        <div className={styles["dashboard-bar--right-container"]}>
          <p className={styles["dashboard-bar--title"]}>Blog List</p>
          <button className={styles["dashboard-bar--btn"]}>Create new blog</button>
        </div>
      </div>
    </>
  );
}
