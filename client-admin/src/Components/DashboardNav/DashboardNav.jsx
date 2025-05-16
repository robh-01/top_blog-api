import styles from "./DashboardNav.module.css";

export function DashboardNav() {
  return (
    <>
      <div className={styles["dashboard-nav"]}>
        <ul className={styles["dashboard-nav--list"]}>
          <li className={styles["dashboard-nav-link"]}>
            <button>List</button>
          </li>
          <li className={styles["dashboard-nav-link"]}>
            <button>Edit</button>
          </li>
        </ul>
      </div>
    </>
  );
}
