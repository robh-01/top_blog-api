import { useEffect, useState, createContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { DashboardBar } from "../DashboardBar/DashboardBar";
import { DashboardNav } from "../DashboardNav/DashboardNav";

import styles from "./Dashboard.module.css";

export const DashboardContext = createContext();

export default function Dashboard() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      //for canceling the fetch request in the cleanup function
      const controller1 = new AbortController();
      const controller2 = new AbortController();
      const signal1 = controller1.signal;
      const signal2 = controller2.signal;

      // Validate the token with the server
      fetch("http://localhost:3000/user/validate/author", {
        signal: signal1,
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
          if (err.name === "AbortError") return; //ignore abort errors(errors that arise from cancelling fetch)
          console.error("Token validation error:", err);
        });

      //fetch all the posts from the server(db)
      fetch("http://localhost:3000/post", {
        signal: signal2,
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((responseData) => {
          if (responseData.status === "failure") {
            // failure happens due to user not being logged in(this fetch job is not to check whether
            //user is logged in or not. that is why throwing a generic error)
            throw new Error("Invalid or expired token.");
          } else {
            setBlogs([...responseData.data.posts]);
            setLoading(false);
          }
        })
        .catch((err) => {
          if (err.name === "AbortError") return; //ignore abort errors(errors that arise from cancelling fetch)
          console.error("Error fetching blogs", err);
          setError(
            "Some error occurred while fetching the blogs. Please try again later."
          );
          setLoading(false);
        });

      return () => {
        // Abort the fetch request if the component unmounts
        controller1.abort();
        controller2.abort();
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
            <DashboardContext.Provider value={{ blogs, error, loading }}>
              <Outlet />
            </DashboardContext.Provider>
          </div>
        </div>
      </div>
    </>
  );
}
