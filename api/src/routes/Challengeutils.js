const db = require("../db.js");
const {
  User,
  ChallengePost,
  ChallengeComment} = require("../db.js");
const { Sequelize } = require("sequelize");



const DB_ChallPost = async({title, content, tag, idPost, likes})=>{


}

const DB_Challengecomments = async (username) => {
  const UserID = await User.findOne({
    where: {
      username,
    },
    //attributes:["id","name","username","lastname","image","gitaccount"],
  });
  return UserID;
  const final = user.comments.map((comment) => {
    return comment.dataValues;
  });
  return final;
};


const DB_ChallCommentedit = async (id, content_data) => {
  const updatedComment = await ChallengeComment.findOne({ where: { id: id } });
  updatedComment.content = content_data;
  await updatedComment.save();
  return updatedComment;
};

const DB_ChallCommentdestroy = async (id) => {
  try {
    const eraseComment = await ChallengeComment.findOne({ where: { id: id } });
    await eraseComment.destroy();
    return "Deleted Succesfully";
  } catch (e) {
    throw new Error("We had a problem with your Delete");
  }
};




module.exports = {

}