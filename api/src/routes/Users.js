const router = require('express').Router();
const { Sequelize, Model } = require("sequelize");
const {User,Post,Comment,User_Comment,Comment_Post,Post_User} = require('../db.js');
const Op = Sequelize.Op;
const {DB_UserID,validateUpdateUser,DB_AllUser,DB_findUserQuery,DB_findUserParams,DB_findUserAll} = require("./utils.js")


// ok
router.get("/", async (req,res,next)=>{
	if(req.query.q) return next()
	try {
		res.send(await DB_findUserAll())
	} catch(e) {
		res.sendStatus(404)
	}
})
//user query
router.get("/", async (req,res,next)=>{
	const query = req.query.q
	try {
		res.send(await DB_findUserQuery(query))
	} catch(e) {
		res.sendStatus(404)
	}
})
//user params
// ok 
router.get("/:username", async (req,res,next)=>{
	const {username} = req.params
	try {
		const userID = await DB_findUserParams(username)
		userID?res.send(userID):res.sendStatus(404)
	} catch(e) {
		res.sendStatus(404)
	}
})
//user params post
//	ok
router.get("/:username/posts", async (req,res,next)=>{
	const {username} = req.params
	try {
		const userID = await DB_UserID(username)
		userID?res.send(userID.posts):res.sendStatus(404)
	} catch(e) {
		res.sendStatus(404)
	}
})
//user params comments
// ok
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
	const {mail} = req.body
	try {
		const user = await User.findOrCreate({
			where:{
				mail:mail
			},
			defaults: req.body
		})
		res.sendStatus(200)
	} catch(e) {
		res.send(400)
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