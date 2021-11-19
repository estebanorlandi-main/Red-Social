import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSupport } from "../../Redux/actions/Support";
import SupportCardMessage from "../Support/SupportCardMessage";
import styles from "../Admin/HomeAdmin/HomeAdmin.module.css";
import { BiChevronUp } from "react-icons/bi";
import SupportUserCard from "../Support/SupportCard";


export default function AdminSupport() {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.supportReducer.messageSupport);
  const [newPosts, setNewPosts] = useState(true);

  const [flags, setFlags] = useState(false);

  useEffect(() => {
    dispatch(getSupport());
  }, [dispatch, flags]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getSupport());
    setFlags(true);
  };
  console.log(message)

  return (
    <div className={styles.home + ` ${styles.noScroll} `}>

      <section className={styles.center}>
        {newPosts && (
          <button className={styles.newPosts} onClick={handleClick}>
            Check new posts <BiChevronUp className={styles.icon} />
          </button>
        )}

        <ul>
        {Array.isArray(message)? message.map((e,i) => (
          <li key={i}>
          <SupportUserCard
            toRight
            showImage
            showName
            message = {e}
          />
          </li>
        ))
        :""}
        </ul>

        {/* {totalPages > page && (
          <div className={styles.cargando}>Cargando...</div>
        )} */}
      </section>
    </div>



  );
}

