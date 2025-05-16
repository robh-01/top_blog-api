import App from "../App";
import Dashboard from "../Components/Dashboard/Dashboard";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
];

export default routes;
