import styles from "./BlogTile.module.css";

export function BlogTile({ blog }) {
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
          <button className={styles["blog-tile--options-btn"]}>
            {blog.published ? "Unpublish" : "Publish"}
          </button>
          <button className={styles["blog-tile--options-btn"]}>Edit</button>
          <button className={styles["blog-tile--options-btn"]}>Delete</button>
        </div>
      </div>
    </>
  );
}
