const router = require("express").Router();
const { Op } = require("sequelize");
const {
    User,
    Conversation
} = require('../db.js');
//new conv

router.post("/", async (req, res) => {
  let order = [req.body.senderId,req.body.receiverId].sort()
  let findUser1 = await User.findOne({where:{username:req.body.senderId}}).catch(e=> null)
  let findUser2 = await User.findOne({where:{username:req.body.receiverId}}).catch(e=> null)
  if(!findUser1 || !findUser2) return res.send({errors:"Users not founds",success:false})

  let findConversation = await Conversation.findOne({where:{
    members: order
  }}).catch(e=> null)
  if(findConversation) return res.send(findConversation)
  else {
    let newConversation = await Conversation.create({members:order}).catch(e=> console.log(e))
    if(newConversation) return res.send({msg:"Conversation Create", success:true})
      else return res.send({errors:"se ha producido un error", success:false})
  }
  // return res.send(order)
  // // const newConversation = new Conversation({
  // //   members: [req.body.senderId, req.body.receiverId],
  // // });
  // try {
  //   // const savedConversation = await newConversation.save();
  //   // res.status(200).json(savedConversation);
  // } catch (err) {
  //   res.status(500).json(err);
  // }
});

//get conv of a user

router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.findAll({
      where: {  
        members: { [ Op.contains ]: [req.params.userId] } 
      }});
    res.status(200).json(conversation);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
     where: { members: { [ Op.contains ]: [req.params.firstUserId, req.params.secondUserId] } 
    }});
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
