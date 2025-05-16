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
  const { loading, error, blogs, setBlogs } = useContext(DashboardContext);

  const publishedBlogs = [];
  const unpublishedBlogs = [];
  if (blogs) {
    blogs.forEach((blog) => {
      if (blog.published) publishedBlogs.push(blog);
      else {
        unpublishedBlogs.push(blog);
      }
    });
  }

  return (
    <>
      <div className={styles["blog-lister"]}>
        {loading ? (
          "Loading....."
        ) : error ? (
          `${error}`
        ) : (
          <>
            {blogs.length > 0 ? (
              <>
                {unpublishedBlogs.length > 0 ? (
                  <>
                    <p className={styles["blog-lister--title"]}>Unpublished</p>{" "}
                    {unpublishedBlogs.map((blog) => (
                      <BlogTile
                        blog={blog}
                        key={blog.id}
                        setBlogs={setBlogs}
                        blogs={blogs}
                      />
                    ))}
                  </>
                ) : null}
                {publishedBlogs.length > 0 ? (
                  <>
                    <p className={styles["blog-lister--title"]}>Published</p>{" "}
                    {publishedBlogs.map((blog) => (
                      <BlogTile
                        blog={blog}
                        key={blog.id}
                        setBlogs={setBlogs}
                        blogs={blogs}
                      />
                    ))}
                  </>
                ) : null}
              </>
            ) : (
              "No blogs written yet."
            )}
          </>
        )}
      </div>
    </>
  );
}
