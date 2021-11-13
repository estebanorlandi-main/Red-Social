import styles from "./Tag.module.css";
function Tag({ arrTags }) {
  return (
    <ul className={styles.tags}>
      {arrTags && arrTags.length ? (
        arrTags.map((tag) => <li className={styles.tag}>{tag}</li>)
      ) : (
        <></>
      )}
    </ul>
  );
}

export default Tag;
