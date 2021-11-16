import styles from "./Tags.module.css";

function Tags({ tags }) {
  return (
    <ul className={styles.tags}>
      {tags && tags.length ? (
        tags.map((tag, i) => (
          <li key={i} className={styles.tag}>
            {tag}
          </li>
        ))
      ) : (
        <></>
      )}
    </ul>
  );
}

export default Tags;
