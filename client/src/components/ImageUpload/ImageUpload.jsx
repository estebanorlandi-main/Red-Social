import { useState } from "react";
import { BsCardImage } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";

import styles from "./ImageUpload.module.css";

export default function ImageUpload({ onChange, imagedata, edit }) {
  const [data, setData] = useState(edit ? imagedata : null);

  const handleChange = (e) => {
    if (edit) {
      setData(e.target.files[0] ? e.target.files[0] : imagedata);
      onChange(e.target.name ? e : imagedata);
    } else {
      setData(e.target.files[0]);
      onChange(e);
    }
  };

  const handleRemove = () => {
    if (edit) {
      setData(imagedata);
      onChange(imagedata);
    } else {
      setData(null);
      onChange(null);
    }
  };

  return (
    <label className={styles.input__image}>
      {data ? (
        <button type="button" className={styles.remove} onClick={handleRemove}>
          <AiFillCloseCircle
            className={styles.icon}
            style={{ color: "#f55" }}
          />
        </button>
      ) : (
        <></>
      )}

      {data?.imageData ? (
        <div className={styles.imageContainer}>
          <img
            className={styles.uploadImage}
            src={`data:${data?.imageType};base64, ${data?.imageData}`}
            alt=""
          />
        </div>
      ) : (data && Object.values(data).filter((value) => value).length) ||
        data?.name ? (
        <div className={styles.imageContainer}>
          <img
            className={styles.uploadImage}
            src={URL.createObjectURL(data)}
            alt=""
          />
        </div>
      ) : (
        <></>
      )}

      <input
        onChange={handleChange}
        name="image"
        type="file"
        placeholder="Image"
      />

      <div className={`${styles.iconContainer} ${data ? styles.float : ""}`}>
        <BsCardImage className={styles.icon} style={{ color: "#aaa" }} />
      </div>
    </label>
  );
}
