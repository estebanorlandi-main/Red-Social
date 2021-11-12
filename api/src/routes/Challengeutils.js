const db = require("../db.js");
const { User, ChallengePost, ChallengeComment } = require("../db.js");
const { Sequelize } = require("sequelize");

const DB_ChallFindPost = async ({ title, content, tag, idPost, likes }) => {
  var post_search = await Post.findAll({
    include: [
      { model: User, attributes: ["image", "username"] },
      ChallengeComment,
    ],
    order: [["createdAt", "DESC"]],
  });
  return post_search;
};

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

const DB_ChallengePostsearch = async ({ username, id }) => {
  try {
    if (username === undefined && id === undefined) {
      var post_search = await ChallengePost.findAll({
        include: [
          { model: User, attributes: ["image", "username"] },
          Comment,
          {
            model: Likes,
            as: "userLikes",
            include: [{ model: User, attributes: ["username"] }],
          },
        ],
        order: [["createdAt", "DESC"]],
      });
      return post_search;
    }
    if (username === undefined && id) {
      var post_search = await ChallengePost.findOne({
        where: {
          idPost: id,
        },
        include: [{ model: User, attributes: ["image", "username"] }, Comment],
        order: [["createdAt", "DESC"]],
      });
      return post_search;
    } else if (id === undefined && username) {
      let userDB = await DB_UserID(username);
      var post_search = await ChallengePost.findAll({
        where: {
          userId: userDB.id,
        },
        include: [{ model: User, attributes: ["image", "username"] }, Comment],
        order: [["createdAt", "DESC"]],
      });
      return post_search;
    } else {
      return "Post not found";
    }
  } catch (e) {
    throw new Error("We had a problem with the search");
  }
};

module.exports = {};
