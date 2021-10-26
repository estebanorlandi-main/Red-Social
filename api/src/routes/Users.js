const router = require('express').Router();
const { Sequelize, Model } = require("sequelize");
const {User,Post,Comment,User_Comment,Comment_Post,Post_User} = require('../db.js');
const Op = Sequelize.Op;

async function DB_UserID (username){
	const UserID = await User.findOne({
			where:{
				username
			},
			include: [Post]
		})
	return UserID;
}


router.get("/", async (req,res,next)=>{
	try {
		const users = await User.findAll({})
		res.send(users)
	} catch(e) {
		res.sendStatus(404)
	}
})
router.get("/:username", async (req,res,next)=>{
	try {
		const {username} = req.params
		const userID = await DB_UserID(username)
		userID?res.send(userID):res.send(404)
	} catch(e) {
		res.sendStatus(404)
	}
})
router.get("/:username/posts", async (req,res,next)=>{
	try {
		const {username} = req.params
		const userID = await DB_UserID(username)
		userID?res.send(userID.posts):res.send(404)
	} catch(e) {
		res.sendStatus(404)
	}
})
router.post("/register", async (req,res,next)=>{
	try {
		const {name,lastname,username, password,mail,gitaccount,image} = req.body
		const user = await User.findOrCreate({
			where:{
				mail:mail
			},
			defaults:{
				name,
				lastname,
				username,
				password,
				mail,
				gitaccount,
				image
			}
		})
		res.send(200)
	} catch(e) {
		res.sendStatus(400)
	}
})
module.exports = router;