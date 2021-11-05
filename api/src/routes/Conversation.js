const router = require("express").Router();
const Sequelize = require('sequelize');
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
    console.log(req.params.userId)
    const conversation = await Conversation.findAll({
        members: { [Sequelize.Op.in]: [req.params.userId] },
    });

    console.log(conversation)

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
      members: { [Sequelize.Op.all]: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
