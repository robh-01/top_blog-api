import styles from "./LoginPage.module.css";

export default function LoginPage() {
  return (
    <>
      <div className={styles["login-page"]}>
        <div className={styles["login-form-container"]}>
          <p className="logo">Tellin</p>
          <form
            action="http://localhost:3000/user/login"
            method="POST"
            className={styles["login-form"]}
          >
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Enter email address" name="email"/>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Enter password" name="password"/>
            <button type="submit">Login</button>
            <p className="messages"></p>
          </form>
        </div>
      </div>
    </>
  );
}
