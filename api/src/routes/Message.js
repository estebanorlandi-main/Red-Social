const router = require('express').Router();
const fn = require("./utils.js")
const db = require("../db.js")
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

// MAIN

//si se quiere crear una nueva conversacion y mandar un mensaje
//se debe pasar members(array de userId),CreatorId,message

//si se quiere buscar una conversacion y mandar un mensaje
//se debe pasar conversationId,members(array de userId),CreatorId("userId que mandara el mensaje"),message

router.post("/create", async(req,res,next)=>{
	try {
	const {message,creatorId,members,conversationId} = req.body

	// const prueba = await fn.DB_findUserQuery({id:creatorId})
	// if(prueba.length == 1){
	// 	prueba[0].
	// }
	// return res.send(prueba[0].conversations)




	if(!message || !creatorId || !members) return res.send({errors:"debe contener message, creatorId, members"}).status(404);
	// debes mandar un obj {members:[{id},{id}]} con al menos 2 UserId
	if(typeof members != "object" || members.length <= 1){
		return res.send({errors:"la conversacion debe tener almenos 2 participantes"})
	}

	// busca una conversacion por ID
	const FindConvers = await db.Conversation.findOne({
		where:{
			id:conversationId
		},
		include:[db.Message,db.User]
	}).catch(e=> null)

	// busca a todos los miembros por array Id
	const FindsUsers = await fn.findAllUsers(members)

	// deben existir los usuarios
	if(!FindsUsers || FindsUsers.length < 2) return res.send({errors:"verifique que los usuarios existan"});
	

	// debe pertenecer a la conversacion
	if(FindConvers && FindsUsers){
		let validate = FindConvers.members.includes(creatorId)		
		let msg = await db.Message.create({
			message: message,
			userId: creatorId,
			conversationId: conversationId
		}).catch(e=>null)
		if(message && creatorId && validate) return res.send(msg);
		else return res.send({errors:"si se quiere crear una conversacion debe mandar un creatorId valido y message"})
	}

	const CreateConvers = await db.Conversation.create({
		name:req.body.name,
		members:members,
		users:FindsUsers
	}).catch(e=>({errors:"Hubo un error"}))

	let msg = await db.Message.create({
		message: message,
		userId: creatorId,
		conversationId: CreateConvers.id
	}).catch(e=>null)

	CreateConvers.addUsers(FindsUsers)

	return res.send(CreateConvers)
	} catch(e) {
		console.log(e);
		res.sendStatus(500)
	}

})

router.get("/", async (req,res,next)=>{
	const allMessage = await db.Message.findAll()
	res.send(allMessage)
})
router.get("/", async (req,res,next)=>{
	const {userId, receiverId} = req.body
	if(userId == receiverId) return res.send({errors:"message"}).status(404);
	const allMessage = await fn.conversation(req.body)
	res.send(allMessage)
})

router.post("/send", async(req,res,next)=>{
	try {
	const FindUser = await db.User.findOne({
		where:{
			id:req.body.userId
		}
	})
	let FindConvers = await db.Conversation.findOne({
		where:{
			id:req.body.conversationId,
		}
	}).catch(e=>null)
	let validate
	if(FindConvers && FindConvers.members){
		validate = FindConvers.members.includes(req.body.userId)
	}

	if(!FindConvers || !FindUser || !validate) return res.sendStatus(404)
	const messageCreate = await db.Message.create({
		message: req.body.message,
		userId: req.body.userId,
		conversationId: req.body.conversationId
	}).catch(e=>({errors:"Hubo un error"}))

	res.send(messageCreate)
	
	} catch(e) {
		console.log(e);
		res.sendStatus(500)
	}
})
router.get("/conversaciones", async(req,res,next)=>{
	try {
	const allConversation = await db.Conversation.findAll({include:[{model:db.User,attributes:["id","username","image","email"],exclude:["User_Conversation"]},db.Message]})
	return res.send(allConversation)
	} catch(e) {
		console.log(e);
		res.sendStatus(500)
	}
})


module.exports = router;