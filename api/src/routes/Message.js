const router = require("express").Router();
const { Op } = require("sequelize");
const {
    Message
} = require('../db.js');

//add

router.post("/", async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get

router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.findAll({
        where: { conversationId: req.params.conversationId },
        order: [["createdAt", "ASC"]]
    });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/read/:conversationId/:reader", async (req, res) => {

//   try {
//     const messagesUpdated = await Message.update(
//       { unread: false },
//       {
//         where: { 
//           conversationId: req.params.conversationId,
//           sender: {
//             [ Op.not ]: req.params.reader}
//         }
//       }
//     );

//     console.log(messagesUpdated)

//     res.status(200).json(messagesUpdated);
//   } catch (err) {
//     console.log(err)
//     res.status(500).json(err);
//   }
// });

// router.get("/untrack/:conversationId/:user", async (req, res) => {
//   try {
    
//     const messages = await Message.findAll({
//       where: { 
//         unread: true,
//         conversationId: req.params.conversationId, 
//         sender: req.params.user
//       }
//     });

//     console.log(messages)

//     res.status(200).json(messages);
//   } catch (err) {
//     console.log(err)
//     res.status(500).json(err);
//   }
// });

module.exports = router;