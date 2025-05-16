import { useContext } from "react";
import { DashboardContext } from "../Dashboard/Dashboard";
import styles from "./BlogLister.module.css";
import { BlogTile } from "../BlogTile/BlogTile";

// const blog = {
//   id: 6,
//   title: "A very Title of the post A very Title of the post ",
//   content:
//     "content of the page content of the page content of the page content of the page content of the page content of the page content of the page content of the page ",
//   createdAt: "2025-05-10T18:40:50.708Z",
//   published: false,
//   publishedAt: null,
//   userId: 14,
// };

export function BlogLister() {
  const { loading, error, blogs } = useContext(DashboardContext);

  return (
    <>
      <div className={styles["blog-lister"]}>
        {loading
          ? "Loading....."
          : error
          ? `${error}`
          : blogs.map((blog) => <BlogTile blog={blog} key={blog.id} />)}
      </div>
    </>
  );
}
