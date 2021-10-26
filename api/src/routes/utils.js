
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

const DB_comments = async ()=>{

	const Comments_data = await Comments.findAll({
		include: {
			attributes: ['userID','title'],
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
	DB_comments,
	validateUpdateUser
}