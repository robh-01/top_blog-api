import { Children } from "react";
import App from "../App";
import Dashboard from "../Components/Dashboard/Dashboard";

import { BlogLister } from "../Components/BlogLister/BlogLister";
import { BlogEditor } from "../Components/BlogEditor/BlogEditor";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <BlogLister />,
      },
      {
        // later see here if the blog to edit should be fetched from the db or the edit btn on
        // blogs on blog lister will give it.
        path: "edit",
        element: <BlogEditor />,
      },
    ],
  },
];

export default routes;
