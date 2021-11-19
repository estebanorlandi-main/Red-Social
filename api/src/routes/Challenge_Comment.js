const router = require("express").Router();
const { User, ChallengeComment, Challengepost } = require("../db.js");
const Challenge_utils = require("./Challengeutils.js");
const database_Utils = require("./utils.js");
const AuthControllers = require('../controllers/AuthControllers.js')


router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const comments = await Challenge_utils.DB_Challengecomments(username);
    return res.status(202).send(comments);
  } catch (e) {
    return res.status(404).send(e);
  }
});

router.post("/", AuthControllers.isAuthenticated, async (req, res) => {
  try {
    const { code, description, username, postid } = req.body;
    const UserAssociation = await database_Utils.DB_UserID(username);
    const PostAssociation = await Challenge_utils.DB_ChallFindPost({'id' : postid})
    const comment = await ChallengeComment.create({
      description,
      code,
      userId: UserAssociation.id,
      postId: postid,
    });
    UserAssociation.addChallengeComment(comment);
    PostAssociation.addChallengeComment(comment);
    return res.status(202).send(comment);
  } catch (e) {
    return res.status(404).send("Invalid username for request");
  }
});

router.put("/:id", AuthControllers.isAuthenticated, async (req, res) => {
  if (!req.body.contentData) {
    return res.status(404).send("Invalid content for editing");
  }
  try {
    const { id } = req.params;
    const { contentData } = req.body;
    const Comment = await Challenge_utils.DB_ChallCommentedit(id, contentData);
    return res.status(202).send("Edited Succesfully");
  } catch (e) {
    return res.status(404).send("Invalid comment ID");
  }
});

router.delete("/:id", AuthControllers.isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const Comment = await Challenge_utils.DB_ChallCommentdestroy(id);
    return res.status(200).send("Erased Succesfully");
  } catch (e) {
    return res.status(404).send("Invalid Comment ID");
  }
});

module.exports = router;
