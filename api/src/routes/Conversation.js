const router = require("express").Router();
const { Op } = require("sequelize");
const {
    Conversation
} = require('../db.js');
//new conv

router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
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
