import { useState } from "react";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState("");


  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    console.log(`${import.meta.env.VITE_SERVER_LINK}/user/login`);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_LINK}/user/login`,
        {
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      console.log(response);

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        location.href = "/";
      } else {
        const data = await response.json();
        setErrorMessage(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.log("Login error: ", err);
      setErrorMessage("An error occurred. Please try again later");
    }
  };

  return (
    <>
      <div className={styles["login-page"]}>
        <div className={styles["login-form-container"]}>
          <p className="logo">Tellin</p>
          <form onSubmit={handleLogin} className={styles["login-form"]}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter email address"
              name="email"
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              name="password"
            />
            <button type="submit">Login</button>
            {errorMessage && <p className="messages">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </>
  );
}
