import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { DashboardBar } from "../DashboardBar/DashboardBar";
import { DashboardNav } from "../DashboardNav/DashboardNav";

import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      //for canceling the fetch request in the cleanup function
      const controller = new AbortController();
      const signal = controller.signal;

      // Validate the token with the server
      fetch("http://localhost:3000/user/validate/author", {
        signal,
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            navigate("/"); // Redirect to dashboard if token is valid
          }
        })
        .catch((err) => {
          console.error("Token validation error:", err);
        });

      return () => {
        // Abort the fetch request if the component unmounts
        controller.abort();
      };
    }
  }, [navigate]);
  return (
    <>
      <div className={styles["dashboard"]}>
        <DashboardBar />
        <div className={styles["dashboard-lower-container"]}>
          <DashboardNav />
          <div className={styles["dashboard-container--main"]}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
