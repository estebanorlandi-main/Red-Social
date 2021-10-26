
const router = require('express').Router();
const { Sequelize, Model } = require("sequelize");
const {User,Post,Comment,User_Comment,Comment_Post,Post_User} = require('../db.js');
const Op = Sequelize.Op;
const {DB_UserID,validateUpdateUser} = require("./utils.js")

router.get("/", async (req,res,next)=>{
	if(req.query.q) return next()
	try {
		const users = await User.findAll({})
		res.send(users)
	} catch(e) {
		res.sendStatus(404)
	}
})

//user query
router.get("/", async (req,res,next)=>{
	const query = req.query.q
	try {
		const users = await User.findAll({
			where:{
				[Op.or]:{
					name: query				
				},
				[Op.or]:{
					lastname: query	
				},
				[Op.or]:{
					username: query
				}
			}
		})
		res.send(users)
	} catch(e) {
		res.sendStatus(404)
	}
})
//user params
router.get("/:username", async (req,res,next)=>{
	const {username} = req.params
	try {
		const userID = await DB_UserID(username)
		userID?res.send(userID):res.sendStatus(404)
	} catch(e) {
		res.sendStatus(404)
	}
})
//user params post
router.get("/:username/posts", async (req,res,next)=>{
	const {username} = req.params
	try {
		const userID = await DB_UserID(username)
		userID?res.send(userID.posts):res.sendStatus(404)
	} catch(e) {
		res.sendStatus(404)
	}
})
router.get("/:username/comments", async(req,res,next)=>{
	const {username} = req.params
	try {
		const userID = await DB_UserID(username)
		userID?res.send(userID.comments):res.sendStatus(404)
	} catch(e) {
		res.sendStatus(404)
	}
})
router.post("/register", async (req,res,next)=>{
	const {name,lastname,username, password,mail,gitaccount,image} = req.body
	try {
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
		res.sendStatus(200)
	} catch(e) {
		res.sendStatus(400)
	}
})
router.put("/:username", async (req,res,next)=>{
	const {username} = req.params
	try {
		let userID = await DB_UserID(username)
		const updateDates = validateUpdateUser(req.body,userID)
		for(prop in updateDates){
			userID[prop] = updateDates[prop]
		}
		await userID.save()
		res.send(userID)
	} catch(e) {
		res.sendStatus(400)
	}
})

module.exports = router;