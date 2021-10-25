import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux' ;
import { Link } from "react-router-dom";
import style from './Login.module.css';


export default function Login(){

    const dispatch = useDispatch();

    const [input, setInput] = useState({
        name: '',
        password: ''
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value.replaceAll(/^\s+/g, "")
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        // dispatch();
        setInput({
            name: '',
            password: ''
        })
    }

    function handleClick(e){
        e.preventDefault();
    }

    return(
        <form className={style.container} onSubmit={(e) => handleSubmit(e)}>
            <div className={style.label} >
                <label>Name</label>
                <input 
                    type="text"
                    value={input.name}
                    name="name"
                    onChange={ (e) => handleChange(e) }
                />
            </div>
            <div className={style.label} >
                <label>Password</label>
                <input 
                    type="text"
                    value={input.password}
                    name="password"
                    onChange={ (e) => handleChange(e) }
                />
            </div>
            <button type='submit'>Create</button>
            <hr style={{margin:'4%'}}></hr>
            <button className={style.create} onClick={(e) => handleClick(e)}>Crear una nueva cuenta</button>
        </form>
    ) 
}