import styles from "./BlogTile.module.css";
import { authFetch } from "../../utils/authFetch";
import { Pencil, Trash, BookCheck, BookDashed } from "lucide-react";

export function BlogTile({ blog, blogs, setBlogs }) {
  function handlePublishToggle() {
    authFetch(`http://localhost:3000/post/${blog.id}/publish`, {
      method: "PATCH",
      mode: "cors",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Unable to change the published status of the blog.");
        }
      })
      .then((responseData) => {
        let newBlogs = blogs.map((b) => {
          if (b.id === blog.id) {
            return responseData.data.toggledPost;
          }
          return b;
        });
        setBlogs(newBlogs);
      });
  }
  function handleDelete() {
    authFetch(`http://localhost:3000/post/${blog.id}`, {
      method: "DELETE",
      mode: "cors",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Unable to delete the blog.");
        }
      })
      .then(() => {
        let newBlogs = blogs.filter((b) => {
          if (b.id == blog.id) return false;
          return true;
        });
        setBlogs(newBlogs);
      });
  }

  return (
    <>
      <div className={styles["blog-tile"]}>
        <div className={styles["blog-tile--data"]}>
          <p className={styles["blog-tile--data--title"]}>{blog.title}</p>
          <div className={styles["blog-tile--data--lower-container"]}>
            <p className={styles["blog-tile--data--lower"]}>{blog.createdAt}</p>
            <p className={styles["blog-tile--data--lower"]}>
              {blog.published ? "Published" : "Unpublished"}
            </p>
          </div>
        </div>
        <div className={styles["blog-tile--options"]}>
          <button
            className={styles["blog-tile--options-btn"]}
            onClick={handlePublishToggle}
          >
            {blog.published ? (
              <>
                Unpublish <BookDashed />
              </>
            ) : (
              <>
                Publish <BookCheck />
              </>
            )}
          </button>
          <button className={styles["blog-tile--options-btn"]}>
            Edit <Pencil size={20} />
          </button>
          <button
            className={styles["blog-tile--options-btn"]}
            onClick={handleDelete}
          >
            Delete <Trash size={20} />
          </button>
        </div>
      </div>
    </>
  );
}
