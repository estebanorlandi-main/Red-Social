import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux' ;
import { Link } from "react-router-dom";
import style from './LandingPage.module.css';
import Login from '../../components/Login/Login';


export default function LandingPage(){

    const dispatch = useDispatch();

    return(
        <div className={style.landing}>
            <div>
                <h1>Clon de Facebook</h1>
            </div>
            <Login />
        </div>
    ) 
}