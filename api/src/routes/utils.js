const axios = require('axios');
const {User,Post,Comment,User_Comment,Comment_Post,Post_User} = require('../db.js');
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const bcrypt = require("bcrypt");
const saltRounds =10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

//fn
const DB_findUsersEmail = async (email)=>{
	if(email == null || email == undefined) {return null}
	const findUserEmail = await User.findOne({where:{email}})
	return findUserEmail
}
const DB_findUsersUsername = async (username)=>{
	if(username == null || username == undefined) {return null;}
	const findUsername = await User.findOne({where:{username}})
	return findUsername
}
const DB_findUserAll = async (query)=>{
		const findUserAll = await User.findAll({
			attributes:["id","name","username","lastname","image","gitaccount","email"],
			include: [Post,Comment]
		})
		return findUserAll
}
const DB_findUserCreated = async (date)=>{
	const {username,email} = date
	let errors = {}
	byEmail = await User.findOne({where:{email}})
	byUsername = await User.findOne({where:{username}})
	if(byEmail) errors={...errors,email:"Is already in use"}
	if(byUsername) errors={...errors,username:"Is already in use"}
	return errors
}
const DB_findUserQuery = async (query)=>{
		const findUser = await User.findOne({
			where:{
				[Op.or]:[
				{
					id: query.id
				},
				{
					username: {[Op.iLike]:query.username}
				},
				{
					email: {[Op.iLike]:query.email}
				}
				]
			},
			attributes:["id","name","username","lastname","image","gitaccount","email"],
			include:[Post,Comment]
		}).catch(e=>{})
		return findUser
}
const DB_findUserParams = async (params)=>{
		const findUser = await User.findOne({
			where:{
				username:params
			},
			attributes:["id","name","username","lastname","image","gitaccount","email"],
			include:[Post,Comment]
		}).catch(e=>{})
		return findUser
}
const DB_UserID = async (username)=>{
	const UserID = await User.findOne({
			where:{
				username
			},
			attributes:["id","name","username","lastname","image","gitaccount","email"],
			include: [Post,Comment]
		})
	return UserID;
}

const DB_Allcomments = async (username)=>{
	user = await DB_UserID(username)
	const final = user.comments.map((comment)=>{
		return comment.dataValues;
	})
	return final;
}

const DB_Commentedit = async (id, content_data)=> {
	const updatedComment = await Comment.findOne({where: {'id':id}})
	updatedComment.content = content_data
	await updatedComment.save()
	return updatedComment;

}

const DB_Commentdestroy = async (id)=> {
	try{
		const eraseComment = await Comment.findOne({where: {'id':id}})
		await eraseComment.destroy()
		return 'Deleted Succesfully'
	}catch(e){
		throw new Error('We had a problem with your Delete')
	} 

}

const DB_Postsearch = async ({username, id}) =>{
	try{
		let findUserPosts;
		if(username === undefined){
			post_search = await Post.findOne({
            	where:{
                 	'idPost':id
            	},
        	});
        	return post_search;
		} else if (id === undefined){
			let userDB = await DB_UserID(username);
			post_search =await Post.findAll({
            	where:{
                	userId:userDB.id
            	},
        	});
        	return post_search
		}else {
			return 'Post not found'
		}
	}catch(e){
		throw new Error('We had a problem with the search')
	}
}

const DB_Postdestroy = async (idPost)=> {
	let errors = {}
	let validateDate = await Post.findOne({where:{idPost}}).catch(e=>{
		errors = {...errors,idPost:"Post not found"}
	})
	console.log(validateDate)
	if(validateDate) {
		validateDate.destroy()
		return undefined
	}
	else return errors

}

const DB_Postedit= async(id, {title, content, tag, image, likes}) =>{
	// console.log(id, title, content, tag, image, likes, 'Entre a utils')
	const updatedPost = await Post.findOne({where: {'idPost':id}})
	
	content ? updatedPost.content = content: null;
	title ? updatedPost.title = title : null;
	tag ? updatedPost.tag = tag : null;
	image ? updatedPost.image = image : null;
	likes ? updatedPost.likes = likes : null;

	await updatedPost.save()
	return updatedPost;

}



const validateUpdateUser = (update, userID)=>{
	let obj = {}
	for(prop in update){

		if(userID[prop] || userID[prop] === null){
			if(prop == "name"){
				obj[prop] = update[prop]
			}
			if(prop == "lastname"){
				obj[prop] = update[prop]
			}
			if(prop == "password"){
				obj[prop] = update[prop]
			}
			if(prop == "image" ){
				obj[prop] = update[prop]
			}
			if(prop == "gitaccount"){
				obj[prop] = update[prop]
			}
			if(prop == "mail"){
				obj[prop] = update[prop]
			}
			if(prop == "username"){
				obj[prop] = update[prop]
			}
			//////////////// verificar lo de abajo
			if(prop == "Avatar"){
				obj[prop] = update[prop]
			}
			if(prop == "About"){
				obj[prop] = update[prop]
			}
			if(prop == "Tags"){
				obj[prop] = update[prop]
			}													
		}		
	}
	return obj
}

const DB_createUser = async(date)=>{
	let errors = {}
	let validateDate = await User.create(date).catch(e=>{
		e.errors.forEach(e=> {
			errors = {...errors,[e.path]:e.message}
		})
	})
	if(Array.isArray(validateDate))return validateDate
	else return errors
}

const DB_createPost = async(date)=>{

	let errors = {}
	let validateDate = await Post.create(date).catch(e=>{
		console.log(e)
		if(e.errors){
			e.errors.forEach(e=> {
				errors = {...errors,[e.path]:e.message}
			})			
		}
		errors = {...errors,userId:"User not found"}
	})
	if(Array.isArray(validateDate))return validateDate
	else return errors
}

const DB_updateUser = async(date,id)=>{
	let errors = {} 
	let validateDate = await User.update(date,{where:{id:id}}).catch(e=>{
		console.log(e)
		e.errors.forEach(e=> {
			errors = {...errors,[e.path]:e.message}
		})
	})
	if(Array.isArray(validateDate))return []
	else return errors
}
const DB_userCreates = async(date)=>{

//DESCOMENTAR LAS SIGUIENTES LINEAS SIII SE QUIERE VER LOS STATUS EN LA TERMINAL Y COMENTAR LA DE ABAJO
	if(typeof date == "object"){
		date.forEach(async e=>{
			await axios.post("http://localhost:3001/user/register",e).catch(e=>e)			
		})

//DESCOMENTAR LAS SIGUIENTES LINEAS NOOO SE QUIERE VER LOS STATUS EN LA TERMINAL Y COMENTAR LA DE ARRIBA
		// date.forEach(async e=>{
		// 	return await User.create(e)
		// })
	}
	
	return
}

const DB_postCreates = async(data) =>{
	if(typeof data == "object"){
		data.forEach(async e =>{
			var obj ={};
			const user = await User.findAll({attributes:['username']})
			var index = Math.floor((Math.random() * 100))
			// console.log(user[index].username)
			obj = {
				title: e.title,
				content: e.text,
				image: e.image,
				tag:e.tags,
				likes: 0,
				username: user[index].username
			  }

			// console.log(obj);
			await axios.post("http://localhost:3001/post",obj).catch(e=>e)			

		})
	}
}

const DB_userSearch= async (username, email, password)=>{
	// const hashPassword =  bcrypt.hashSync(password,saltRounds)
	// console.log(hashPassword)
	
	try{
		if(username && username != null){
			var user = await User.findOne({
				where:{
					username:username
				}
			})
			
			if(user=== null){
				return {error:"username"}
			}
			if(email && user.email !== email){
				return {error:"email"}}
			var validate = await bcrypt.compare(password,user.password)
            if(!validate){
                return {error:"password"}
			}
			return user
		}else{
			var user = await User.findOne({
				where:{
					email:email
				}
			})
			if(user=== null){
				return {error:"email"}
			}
			var validate = await bcrypt.compare(password,user.password)
            if(!validate){
                return {error:"password"}
                }
			return user
	}}catch(e){
		return console.log('Error login',e)
	}
}
const DB_validatePassword = (password)=>{
	const validate = password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
	if(validate == null){
		return ({password: "The password must have a minimum of eight characters, at least one letter and one number."})
	}
	else return ({})
}

const DB_findPostsAll = async ()=>{
	const findPostsAll = await Post.findAll({})
	return findPostsAll	
}

const DB_findPostsQuery = async (query)=>{
	const findPosts = await Post.findAll({
		where:{
			[Op.or]:[
			{
				title: {[Op.iLike]:query.title}
			},{
				title: {[Op.iLike]:query.title+"%"}
			},{
				tag:{
					[Op.contains]:[query.tag]
				}
			},{
				content: {[Op.iLike]:"%"+query.content+"%"}
			}
			]
		}
	})
	return findPosts
}

module.exports = {
	DB_UserID,
	DB_Allcomments,
	DB_Commentedit,
	DB_Commentdestroy,
	DB_Postsearch,
	DB_Postdestroy,
	DB_Postedit,
	validateUpdateUser,
	validateUpdateUser,
	DB_userCreates,
	DB_findUserAll,
	DB_findUserQuery,
	DB_findUserParams,
	DB_postCreates,
	DB_userSearch,
	DB_findUsersEmail,
	DB_findUsersUsername,
	DB_validatePassword,
	DB_findUserCreated,
	DB_createUser,
	DB_updateUser,
	DB_findPostsAll,
	DB_findPostsQuery,
	DB_createPost
}