const router = require('express').Router();
const { Sequelize, Model } = require("sequelize");
const {User,Post} = require('../db.js');
const Op = Sequelize.Op;

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
		const userID = await User.findOne({
			where:{
				username:username
			},
			include: [Post]
		})
		userID?res.send(userID.dataValues):res.send("no encontrado")
	} catch(e) {
		res.sendStatus(404)
	}
})
router.post("/create", async (req,res,next)=>{

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
		console.log("errores");
		res.sendStatus(404)
	}
})
module.exports = router;