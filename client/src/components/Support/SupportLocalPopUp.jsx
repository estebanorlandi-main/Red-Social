import React from "react";
import { useState, useEffect } from "react";
import styles from "./PopUp.module.css";
import axios from "axios"

function PopUp(props){
	const [inputs, setInputs] = useState({
		title:"",
		content:"",
		postReported:"",
		commentReported:"",
		userReported:"",
	})
	const [temptrigger, setTemptrigger]=useState(true)

	useEffect(()=>{
		if(props.postReported){
			setInputs((prev) => ({ ...prev, "postReported": props.postReported }));
		}
		if(props.commentReported){
			setInputs((prev) => ({ ...prev, "commentReported": props.commentReported }));
		}
		if(props.userReported){
			setInputs((prev) => ({ ...prev, "userReported": props.userReported }));
		}
		//eslint-disable-next-line
	},[])

	const handleChange = ({ target: { name, value } }) => {
    	setInputs((prev) => ({ ...prev, [name]: value }));
    	
  	};

  	const handleSubmit = (e)=>{
  		e.preventDefault()
  		axios.post("http://localhost:3001/support", inputs)
  		setInputs({
			title:"",
			content:"",
			postReported:"",
			commentReported:"",
			userReported:"",
		})
		setTemptrigger(false)
  	}

	return (temptrigger) ? 

		(<div className={styles["popup"]}> 
			<div className={styles["popup-inner"]}>
				<button className={styles["close-btn"]}
				 onClick={()=>setTemptrigger(false)}> X </button>
				<form className={styles["form-container"]} onSubmit={handleSubmit}>
					<label className={styles["label-container"]}>Reason of report:

					<input
					onChange={ (e) =>handleChange(e)}
					className={styles["input"]}
					value={inputs.title}
					name="title"
					label="Reason..."
					required/>

					</label>

					<label className={styles["label-container"]}>Description:

					<textarea 
					onChange = {(e)=>handleChange(e)}
					className={styles["input"]}
					maxlength="1000"
					name="content"
					value={inputs.content}
					rows="10"
					cols="30"
					label="Description of report...."
					required
					/>

					</label>
					<button type="submit">Report</button>
				</form>
			</div>

		</div>) : <div>
			<button onClick={()=>{setTemptrigger(true)}}>···</button>
		</div>;
}

export default PopUp;