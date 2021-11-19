const router = require("express").Router();
const { Op } = require("sequelize");
const db = require("../db.js");


router.get('/', async (req,res,next) => {
  const friends = await db.friends.findAll()
  res.send(friends)
})

router.get('/:username/list', async (req,res,next) => {
  const findUser = await db.User.findAll({where:req.params,include:[{model:db.User,as:"Friends"},{model:db.User,as:"send"},{model:db.User,as:"received"}]})
  .catch(e=>({errors:"se ha producido un error"}))
  return res.send(findUser)
})


// Enviar solicitud de amistad
router.put('/:username/friendRequest', async (req,res,next) => {
  try {
    const {Sent_Requests} = req.body
    const user = await db.User.findOne({where:req.params}).catch((e)=>{return res.send({errors:"User not found"}).status(404)})
    const addFriend = await db.User.findOne({where:{username:Sent_Requests}}).catch((e)=>{return res.send({errors:"Friend not found"}).status(404)})
    if(!user || !addFriend) return res.send({errors:"User or Friend not found"})
    if(user.id != addFriend.id){
      await user.addSend(addFriend)
      res.send({success:"Request sent successfully"})
    }
    else return res.send("You can't send the friend request to yourself")
  } catch(e) {
    console.log(e);    
    res.send(500)
  }
});

// Rechazar Solicitud
router.put("/:username/reject", async (req,res,next) => {
  try {
    const {usernameReject}=req.body
    const user = await db.User.findOne({where:req.params}).catch((e)=>{return res.send({errors:"User not found"}).status(404)})
    const reject = await db.User.findOne({where:{username:usernameReject}}).catch((e)=>{return res.send({errors:"Friend not found"}).status(404)})
    if(!user || !reject) return res.send({errors:"User or Friend not found"})
    const findRequest = await db.friendRequests.findOne({where:{sendId:user.id,receivedId:reject.id}})
    if(!findRequest) return res.send({errors:"Friend request not found"})
    await findRequest.destroy()
    return res.send({sucess:"Friend request rejected"})
  } catch(e) {
    console.log(e);
    res.send(500)
  }
})

// Aceptar Solicitud
router.put("/:username/accept", async (req,res,next) => {
  try {
    const {usernameAccept}=req.body

    const user = await db.User.findOne({where:req.params}).catch((e)=>{return res.send({errors:"User not found"}).status(404)})
    const accept = await db.User.findOne({where:{username:usernameAccept}}).catch((e)=>{return res.send({errors:"Friend not found"}).status(404)})
    if(!user || !accept) return res.send({errors:"User or Friend not found"})
    const findRequest = await db.friendRequests.findOne({where:{sendId:user.id,receivedId:accept.id}})
    if(!findRequest) return res.send({errors:"Friend request not found"})
    await findRequest.destroy()
    await user.addFriend(accept)
    await accept.addFriend(user)
    return res.send({sucess:"Friend request accepted"})
  } catch(e) {
    console.log(e);
    res.send(500)
  }

})

// Eliminar a un amigo
router.put("/:username/delete", async (req,res,next) => {
  try {
  const {friendDelete} = req.body
  const user = await db.User.findOne({where:req.params}).catch((e)=>res.send({errors:"User not found"}).status(404))
  const deleteFriend = await db.User.findOne({where:{username:friendDelete}}).catch((e)=>res.send({errors:"Friend not found"}).status(404))
  if(!user || !deleteFriend) return res.send({errors:"User or Friend not found"})
  let userRemove = await db.friends.findOne({where:{userId:user.id,FriendId:deleteFriend.id}})
  let friendRemove = await db.friends.findOne({where:{userId:deleteFriend.id,FriendId:user.id}})
  if(!friendRemove) return res.send({errors:"Friend not found"})
  await userRemove.destroy()
  await friendRemove.destroy()
  res.send({success:"Friend successfully removed"})
  } catch(e) {
    console.log(e);
    res.send(500)
  }
})




module.exports = router;