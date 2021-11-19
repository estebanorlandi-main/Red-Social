const router = require("express").Router();
const { Op } = require("sequelize");
const db = require("../db.js");

//Prueba de Conversacion

// get --> traer todas las conversaciones
router.get("/c/all", async (req, res,next) => {
  try {
    const allConvers = await db.Conver.findAll({
      include:[{
        model:db.User,
        attributes:["id","username","name","lastname"],
        through:{attributes:[]}
      },{
        model:db.Msg
      }]
    })
    res.send(allConvers)
  } catch(e) {
    console.log(e);
    res.sendStatus(500)
  }
});

// get --> conversaciones del usuario
router.get("/c/:username/all", async (req, res,next) => {
  try {
    const userConvers = await db.User.findOne({
      where:req.params,
      include:[{
        model:db.Conver,
        attributes:["id","members"],
        include:[{
          model:db.User,
          attributes:["id","username","name","lastname"],
          through:{attributes:[]},
        },{
          model:db.Msg,
          include:{
            model:db.User,
            attributes:["username"]
          }
        }]
      }],
    })
    res.send(userConvers)
  } catch(e) {
    console.log(e);
    res.sendStatus(500)
  }
});
// get -->buscar una conversacion por Users
router.get("/c/find/", async(req,res,next)=>{
  try {
    let {users} = req.body
    users = users.sort()
    const findChat = await db.Conver.findAll({
      where:{
        members:users
      }
    }).catch(e=>{errors:"chat not found"})
    res.send(findChat)
  } catch(e) {
    console.log(e);
    res.sendStatus(500)
  }
})

// post -->crea o busca una conversacion de Users 
router.post("/c/new", async (req, res,next) => {
  try {
    let {users} = req.body
    users = users.sort()
    let allUsers = await db.User.findAll({where:{id:{[Op.or]:users}},attributes:["id"]}).catch(e=>[])
    allUsers = allUsers.map(e=>e.id)
    if(allUsers.length > 1){
      const findChat = await db.Conver.findOne({where:{members:allUsers}}).catch(e=>null)
      if(findChat) return res.send({success:"Chat found"})
      const newChat = await db.Conver.create({members:allUsers})
      await newChat.addUsers(allUsers)
      return res.send({success:"Chat create"})
    }
    else res.send({errors:"debe haber almenos 2 miembros"})
  } catch(e) {
    console.log(e);
    res.sendStatus(500)
  }
});


// post -->crea un mensaje si existe una conversacion y si el usuario pertenece al chat
router.post("/c/m/new", async (req, res,next) => {
  try {
    let {message,userId,converId} = req.body
    if(message && userId && converId && typeof userId == "string" && typeof message == "string"){
      let findUser = await db.User.findOne({where:{username:userId}}).catch(e=>null)
      if(!findUser) return res.send({errors:"Username does not exist"})
      let findConver = await db.Conver.findOne({where:{members:{[Op.contains]:[findUser.id]},id:converId}}).catch(e=>null)
      if(findConver){
        let newMsg = await db.Msg.create({message:message,userId:findUser.id,converId:converId}).catch(e=>console.log(e))
        return res.send({sucess:"Message sent successfully"})
      }
      return res.send({errors:"The user does not belong to the chat"})
    }
    return res.send({errors:"bad request (message,userId,converId)"})
  } catch(e) {
    console.log(e);
    res.sendStatus(500)
  }
});




module.exports = router;
