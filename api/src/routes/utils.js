
const {User,Post,Comment,User_Comment,Comment_Post,Post_User} = require('../db.js');

const DB_UserID = async (username)=>{
	const UserID = await User.findOne({
			where:{
				username
			},
			include: [Post,Comment]
		})
	return UserID;
}

const DB_Allcomments = async (username)=>{

	const Comments_data = await Comments.findAll({
		where : {
			username
		},
		include: {
			attributes: ['userID','content'],
			through: {
				attributes: [],
			}
		}
	})
	const final = Comments_data.map((Comment)=>{
		return Comment.dataValues;
	})
	return final;
}

const DB_Commentedit = async (id, content_data)=> {
	const Comment = await Comments.update({
		content : content_data,
		where : {
			id
		}
	})
	return Comment.dataValues;

}

const DB_Commentdestroy = async (id)=> {
	try{
		const Comment = await Comments.destroy({
			where : {
				id
			}
		})
		return 'Deleted Succesfully'
	}catch(e){
		throw new Error('We had a problem with your Delete')
	} 

}



const validateUpdateUser = (update, userID)=>{
	let obj = {}
	for(prop in update){
		if(userID[prop]){
			if(prop == "name" && update[prop].length >=2 && update[prop].length <=30 && update[prop].search(/\d/) < 0){
				obj[prop] = update[prop]
			}
			if(prop == "lastname" && update[prop].length >=2 && update[prop].length <=30 && update[prop].search(/\d/) < 0){
				obj[prop] = update[prop]
			}
			if(prop == "password" && update[prop].length >=8 && update[prop].length <=16){
				obj[prop] = update[prop]
			}
		}		
	}
	return obj
}
module.exports = {
	DB_UserID,
	DB_Allcomments,
	DB_Commentedit,
	DB_Commentdestroy,
	validateUpdateUser
}