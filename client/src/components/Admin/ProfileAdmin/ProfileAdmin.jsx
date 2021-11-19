import { useEffect, useState } from "react";
import userimg from "../../../images/userCard.svg";
import { useDispatch, useSelector } from "react-redux";
import { removeProfile, getUser } from "../../../Redux/actions/Users";
import { conversation } from "../../../Redux/actions/Session";

import PostAdmin from "../../../components/Admin/PostAdmin/PostAdmin";

import { updateUser } from "../../../Redux/actions/Session";
import validate from "../../../utils/validate";
import styles from "./ProfileAdmin.module.css";
import Select from "react-select";
import { BiCog } from "react-icons/bi";
import { banUserAdmin } from "../../../Redux/actions/Users";
import { useHistory } from "react-router";

import { BsFillPencilFill } from "react-icons/bs";
import { Link } from "react-router-dom";

import { MdMessage } from "react-icons/md";
import { IoBan} from "react-icons/io5";
const selectStyles = {
  control: (styles) => ({ ...styles, width: "100%" }),
};

// cambiar a estado traido de la DB
const options = [
  { value: "js", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "c++", label: "C++" },
  { value: "php", label: "PHP" },
  { value: "java", label: "Java" },
  { value: "c", label: "C" },
  { value: "go", label: "Go" },
  { value: "kotlin", label: "Kotiln" },
  { value: "sql", label: "SQL" },
  { value: "mongodb", label: "MongoDB" },
  { value: "postgresql", label: "PostgreSQL" },
];

export default function ProfileAdmin(props) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [editar, setEditar] = useState(false);

  const session = useSelector((state) => state.sessionReducer);
  const profile = useSelector((state) => state.usersReducer.profile);
  const profileAdmin = useSelector((state) => state);

  const myProfile = session.username === profile.username;

  useEffect(() => {
    dispatch(getUser(props.username));
    return () => dispatch(removeProfile());
  }, [dispatch, props.username]);

  const [inputs, setInputs] = useState({
    name: session.name || "",
    lastname: session.lastname || "",
    about: session.about || "",
    tags: session.tags || [],
  });

  const [errors, setErrors] = useState({
    name: "",
    lastname: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setInputs((old) => ({ ...old, [name]: value }));
    setErrors((old) => ({ ...old, [name]: validate(name, value) }));
  };

  const handleSelect = (e) => {
    setInputs((old) => ({ ...old, tags: e.map((option) => option.value) }));
  };

  const sendMessage = () => {
    // 
    history.push("/messenger")
  };  

  const handleSubmit = () => {
    const errs = validate(inputs);
    if (Object.values(errs).filter((e) => e).length) return setErrors(errs);
    dispatch(updateUser(profile.username, inputs));
    setEditar(false);
  };

  let git = profile.gitaccount && profile.gitaccount.split("/");
  git = git && git[git.length - 1];

  const handleBanUser = (e) => {
    e.preventDefault();
    dispatch(banUserAdmin(e.target.value));
    alert("They have applied successfully");
  };
  
  return profile ? (
    <div>
      {profile.dayBan? (
        <div className={styles.profile}>
        <section className={styles.head}>
        {myProfile && editar ? (
                <button onClick={handleSubmit}>Change</button>
              ) : (
                ""
              )}
              {myProfile ? (
                <Link to="/settings" className={styles.edit} style={ myProfile ? {} : {display:'none'}}>
                  <BsFillPencilFill style={{ color: "#C94F4F", marginRight:'4px' }} />
                  Edit
                </Link>
              ) : (
                ""
              )}

              <div className={styles.importantInfo}> 
                <img
                  className={styles.image}
                  src={profile.image || userimg}
                  alt=""
                  style={{marginRight:"24px"}}
                />
                <div className={styles.profileInfoDisplay}>
                  <div> 
                  {
                    profile.name && profile.lastname ? 
                    <p className={styles.name}>
                      {profile.name} {profile.lastname}
                    </p>
                    :
                    <p>
                    </p>
                  }
                  <p>@{profile.username}</p>
                  </div>

                </div>
              </div>
              <div className={styles.profileActions} style={myProfile ? {display:'none'} : {}}>
              {
                !myProfile?
                <div>
                
                </div>
                :
                <></>
              }
              </div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMDQ5lpVGhTFXgBsVr2DrqEOVJR8dh7imulA&usqp=CAU"
            alt="Not found"
          />
        </section>
        </div>
      ) : (
          <div className={styles.profile}>
          <section className={styles.head}>
              
              {myProfile && editar ? (
                <button onClick={handleSubmit}>Change</button>
              ) : (
                ""
              )}
              {myProfile ? (
                <Link to="/settings" className={styles.edit} style={ myProfile ? {} : {display:'none'}}>
                  <BsFillPencilFill style={{ color: "#C94F4F", marginRight:'4px' }} />
                  Edit
                </Link>
              ) : (
                ""
              )}

              <div className={styles.importantInfo}> 
                <img
                  className={styles.image}
                  src={profile.image || userimg}
                  alt=""
                  style={{marginRight:"24px"}}
                />
                <div className={styles.profileInfoDisplay}>
                  <div> 
                  {
                    profile.name && profile.lastname ? 
                    <p className={styles.name}>
                      {profile.name} {profile.lastname}
                    </p>
                    :
                    <p>
                    </p>
                  }
                  <p>@{profile.username}</p>
                  </div>

                </div>
              </div>
              <div className={styles.profileActions} style={myProfile ? {display:'none'} : {}}>
              {
                !myProfile?
                <div>
                <button onClick={sendMessage} className={styles.messageButton}><MdMessage style={{ color: "#fff", width:'1.2em', height:'1.2em', marginRight:'4px' }}/> Message </button>
                <button value={profile.username} onClick={(e)=>{handleBanUser(e)}} className={styles.banButton}><IoBan style={{ color: "#fff", width:'2.5em', height:'1.2em', marginRight:'4px' }}/> Baneo</button>
                </div>
                :
                <></>
              }
              </div>
              
              

              {myProfile && editar ? (
                <form>
                  <label>
                    <div className="input-group">
                      <input
                        name="name"
                        onChange={handleChange}
                        value={inputs.name}
                        placeholder={session.name}
                      />
                    </div>
                  </label>
                  <span>{errors.name}</span>

                  <label>
                    <div className="input-group">
                      <input
                        name="lastname"
                        onChange={handleChange}
                        value={inputs.lastname}
                        placeholder={session.lasnName}
                      />
                    </div>
                  </label>
                  <span>{errors.lastname}</span>
                </form>
              ) : (
                <p>
                  {/* {profile.name} {profile.lastname} */}
                </p>
              )}  

            </section>
            <section className={styles.posts}>
              {profile.posts
                ? profile.posts.map((post) => (
                    <PostAdmin
                      customClass={styles.post}
                      post={{ ...post, user: profile }}
                    />
                  ))
                : ""}
            </section>
          </div>
      )}
    </div>
  ) : (
    ""
  );
}
