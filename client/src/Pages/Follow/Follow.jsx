import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUnfollow } from "../../Redux/actions/Users";
import styles from "./Follow.module.css";
// import { Link } from "react-router-dom";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { BsFillPersonXFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { Redirect } from "react-router"
import userimg from "../../images/userCard.svg";

export default function Follow({props}) {

  const [popup,setPopup] = useState(false)
  const [style, setStyle] = useState("none")
  const {user,followers,following, followersOnline, profile,follow} = props

  const handleClick = (e)=>{

    if(followersOnline ? (e.target.id == "Followers" && followersOnline.length) : (e.target.id == "Followers" && followers.length)){
      setPopup(true)
      return setStyle("Followers")
    }else if(e.target.id == "Following" && following.length){
      setPopup(true)
      return setStyle("Following")
    }else if(e.target.className.includes("close")){
      setPopup(false)
    }
  }

  return (
    <div className={styles.container}>
      <span id="Followers" style={followersOnline ? (followersOnline?.length ? {cursor:'pointer'} : {}) : (followers?.length ? {cursor:'pointer'} : {})} onClick={(e)=> handleClick(e)}><strong>{followersOnline ? followersOnline.length : followers?.length}</strong> Followers</span>
      <span>&nbsp;&nbsp;</span>
      <span id="Following" style={following?.length ? {cursor:'pointer'} : {}} onClick={(e)=> handleClick(e)}><strong>{following?.length}</strong> Following</span>
      {  
        !popup?
          <></>:
        popup && style === "Followers"?
          <div className={`close ${styles.popup}`} onClick={(e)=> handleClick(e)} >
            <section className={styles.followDisplay}>
              <div className={styles.titles}> 
                <h3>Followers</h3>
              </div>
              <hr></hr>
              <br/>
              { followersOnline ?
                followersOnline?.map(e=><div className={styles.followers}>
                  <img src={e.image? e.image:userimg} alt="Usuario"/>
                  <div>
                    <Link onClick={()=>setPopup(false)} to={e.username}>{e.username}</Link>
                    <p>{e.name}</p>                  
                  </div>
                </div>)
              :
                followers?.map(e=><div className={styles.followers}>
                  <img src={e.image? e.image:userimg} alt="Usuario"/>
                  <div>
                    <Link onClick={()=>setPopup(false)} to={e.username}>{e.username}</Link>
                    <p>{e.name}</p>                  
                  </div>
                </div>)
              }
            </section>
          </div>:
        popup && style === "Following"?
          <div className={`close ${styles.popup}`} onClick={(e)=> handleClick(e)} >
            <section className={styles.followDisplay}>     
              <div className={styles.titles}> 
                <h3>Following</h3>
              </div>
              <hr></hr>
              <br/>
              {following?.map(e=><div className={styles.followers}>
                <img src={e.image? e.image:userimg} alt="Usuario"/>
                <div>
                  <Link onClick={()=>setPopup(false)} to={e.username}>{e.username}</Link>
                  <p>{e.name}</p>                  
                </div>
              </div>)}
            </section>
          </div>:
        <></>
      }

    </div>
    );
}

export function FollowBtn({props}){
  const {user, follow, userImg, info} = props
  const socket = useSelector((state) => state.usersReducer.socket);
  const $follows = info.some(e => e.username === user)
  const [Follow, SetFollow] = useState($follows)
  const dispatch = useDispatch()

  const handleClick = (e) => {
    if(!user || !follow) return
    dispatch(followUnfollow({user,follow}, socket))

    if(!Follow){
      socket?.emit("sendNotification", {
        senderName: user,
        userImage: userImg,
        receiverName: follow,
        id: follow,
        type: 3,
      });
    }

  
    
    SetFollow(!Follow)
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerBtn}>
        <button onClick={(e)=> handleClick(e)} className={Follow? styles.unfollow: styles.follow}>
          {Follow === true? <span><BsFillPersonXFill style={{ color: "#fff" }}  className={styles.icon}/> Unfollow</span>: <span><BsFillPersonPlusFill style={{ color: "#fff" }} className={styles.icon}/> Follow</span>}
        </button> 
      </div>
    </div>
    );
}


