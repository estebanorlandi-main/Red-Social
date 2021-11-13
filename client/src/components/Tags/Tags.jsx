import styles from "./Tags.module.css";

function Tags({ tags }) {
  return (
    <ul className={styles.tags}>
      {tags && tags.length ? (
        tags.map((tag) => <li className={styles.tag}>{tag}</li>)
      ) : (
        <></>
      )}
    </ul>
  );
}

export default Tags;
