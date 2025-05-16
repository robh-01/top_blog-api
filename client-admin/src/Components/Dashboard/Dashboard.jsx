import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  return <>dashboard component.</>;
}
