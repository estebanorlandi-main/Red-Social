import { useState } from "react";
import { BsCardImage } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";

import styles from "./ImageUpload.module.css";

export default function ImageUpload({ onChange, imagedata, component }) {

  if(component === 'EditProfile'){
  
    const [data, setData] = useState(imagedata);
    const handleChange = (e) => {
      setData(e.target.files[0] ? e.target.files[0] : imagedata);
      onChange(e.target.name ? e : imagedata);
    };
  
    const handleRemove = () => {
      setData(imagedata);
      onChange(imagedata);
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
  
        {data.imageData ? (
          <div className={styles.imageContainer}>
            <img
              className={styles.uploadImage}
              src={`data:${data?.imageType};base64, ${data?.imageData}`}
              alt=""
            />
          </div>
        ) : (
          <div className={styles.imageContainer}>
            <img
              className={styles.uploadImage}
              src={URL.createObjectURL(data)}
              alt=""
            />
          </div>
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
  } else {


  const [data, setData] = useState(null);

  const handleChange = (e) => {
    setData(e.target.files[0]);
    onChange(e);
  };

  const handleRemove = () => {
    setData(null);
    onChange(null);
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

      {data ? (
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
  }
}