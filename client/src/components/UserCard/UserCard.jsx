import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./UserCard.module.css";
import person from '../../images/personWithPC.png'
import { BiLogIn } from 'react-icons/bi'


export default function UserCard(){
    return(
        <div className={styles.container}>
            <img src={person} alt='Person chating in computer'/>
            <span>Find, connect and share with people with the same passion as you!</span>
            <hr></hr>
            <Link to='/signup' style={{textDecoration:'none'}}>
             <button>
                 <span>Create a new acount</span>
             </button>
            </Link>
            <Link to='/login' style={{textDecoration:'none'}}>
             <button style={{marginTop:'8%'}}>
                 <span>Enter to your account</span>
             </button>
            </Link>
            
        </div>
    )
}