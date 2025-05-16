import { BlogTile } from "../BlogTile/BlogTile";

import styles from "./BlogLister.module.css";

const blog = {
  id: 6,
  title: "A very Title of the post A very Title of the post ",
  content:
    "content of the page content of the page content of the page content of the page content of the page content of the page content of the page content of the page ",
  createdAt: "2025-05-10T18:40:50.708Z",
  published: false,
  publishedAt: null,
  userId: 14,
};

export function BlogLister() {
  return (
    <>
      <div className={styles["blog-lister"]}>
        <BlogTile blog={blog} />
        <BlogTile blog={blog} />
        <BlogTile blog={blog} />
        <BlogTile blog={blog} />
        <BlogTile blog={blog} />
        <BlogTile blog={blog} />
        <BlogTile blog={blog} />
        <BlogTile blog={blog} />
        <BlogTile blog={blog} />
        <BlogTile blog={blog} />
        <BlogTile blog={blog} />
        <BlogTile blog={blog} />
        <BlogTile blog={blog} />
        <BlogTile blog={blog} />
      </div>
    </>
  );
}
