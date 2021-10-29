const axios = require('axios');
const {User,Post,Comment,User_Comment,Comment_Post,Post_User} = require('../db.js');
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

const DB_findUserAll = async (query)=>{
		const findUserAll = await User.findAll({
			attributes:["id","name","username","lastname","image","gitaccount"],
			include: [Post,Comment]
		})
		return findUserAll
}
const DB_findUserQuery = async (query)=>{
		const findUserQuery = await User.findAll({
			where:{
				[Op.or]:[
				{
					name: {[Op.iLike]: query + "%"}				
				},
				{
					lastname: {[Op.iLike]:query + "%"}
				},
				{
					username: {[Op.iLike]:query + "%"}
				}
				]
			},
			attributes:["id","name","username","lastname","image","gitaccount"],
			include:[Post,Comment]
		})
		return findUserQuery
}
const DB_findUserParams = async (params)=>{
		const findUserQuery = await User.findAll({
			where:{
				[Op.or]:[
				{
					name: {[Op.iLike]: params + "%"}				
				},
				{
					lastname: {[Op.iLike]:params + "%"}
				},
				{
					username: {[Op.iLike]:params + "%"}
				}
				]
			},
			attributes:["id","name","username","lastname","image","gitaccount"],
			include:[Post,Comment]
		})
		return findUserQuery
}
const DB_UserID = async (username)=>{
	const UserID = await User.findOne({
			where:{
				username
			},
			attributes:["id","name","username","lastname","image","gitaccount"],
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
		let post_search;
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

const DB_Postdestroy = async (id)=> {

	try{
		const erasePost = await Post.findOne({where: {'idPost':id}})
		await erasePost.destroy()
		return 'Deleted Succesfully'
	}catch(e){
		throw new Error('We had a problem with your Delete')
	} 

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

const DB_userSearch= async (username, mail, password)=>{
	try{
		var user;
		if(username && username != null){
			user = await User.findOne({
					where:{
						username:username
					}
				})
			if(user=== null){
				return {error:"username"}
			}
			if(mail && user.mail !== mail){
                return {error:"email"}}
            
            if(user.password !== password){
                return {error:"password"}
			}
			return {user}
		}else{
			console.log('Entra en mail')
			user = await User.findOne({
				where:{
					mail:mail
				}
			})
			if(user=== null){
				return {error:"email"}
			}
            if(user.password !== password){
                return {error:"password"}
                }
			return {user}
	}}catch(e){
		return console.log('Error login',e)
	}
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
	DB_userSearch
}