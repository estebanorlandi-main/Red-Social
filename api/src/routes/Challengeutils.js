const db = require("../db.js");
const { User, ChallengePost, ChallengeComment } = require("../db.js");
const { Sequelize } = require("sequelize");
const { DB_UserID } = require("./utils.js");

const DB_ChallFindPost = async ({ title, content, tag, idPost }) => {
  var post_search = await ChallengePost.findOne({
    where: { id: idPost },
    include: [
      { model: User, attributes: ["image", "username"] },
      ChallengeComment,
    ],
    order: [["createdAt", "DESC"]],
  });
  return post_search;
};

const DB_ChallPostdestroy = async (id) => {
  try {
    const erasePost = await ChallengePost.findOne({ where: { idPost: id } });
    await erasePost.destroy();
    return "Deleted Succesfully";
  } catch (e) {
    throw new Error("We had a problem with your Delete");
  }
};

const DB_ChallPostedit = async (id, { title, content, tag, image }) => {
  // console.log(id, title, content, tag, image, , 'Entre a utils')
  const updatedPost = await ChallengePost.findOne({ where: { idPost: id } });

  content ? (updatedPost.content = content) : null;
  title ? (updatedPost.title = title) : null;
  tag ? (updatedPost.tag = tag) : null;
  //  ? (updatedPost. = ) : null; likes

  await updatedPost.save();
  return updatedPost;
};

const DB_Challengecomments = async (username) => {
  try{
    const UserID = await User.findOne({
      where: {
        username,
      },
    });
    const final = ChallengeComment.findAll({
      attributes: ["code", "description", "id"],
      include: [{model: User, attributes: ["image", "username"]}],
      })
    // UserID.ChallengeComment.map((comment) => {
    //   return comment.dataValues;
    // });
  
    return final;
  }catch(e){
    console.log(e)
    return e
  }
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
          ChallengeComment,
        ],
      });
      return post_search;
    }
    if (username === undefined && id) {
      var post_search = await ChallengePost.findOne({
        where: {
          idPost: id,
        },
        include: [
          { model: User, attributes: ["image", "username"] },
          ChallengeComment,
        ],
      });
      return post_search;
    } else if (id === undefined && username) {
      let userDB = await DB_UserID(username);
      var post_search = await ChallengePost.findAll({
        where: {
          userId: userDB.id,
        },
        include: [
          { model: User, attributes: ["image", "username"] },
          ChallengeComment,
        ],
      });
      return post_search;
    } else {
      return "Post not found";
    }
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  DB_ChallCommentdestroy,
  DB_ChallCommentedit,
  DB_Challengecomments,
  DB_ChallFindPost,
  DB_ChallengePostsearch,
  DB_ChallPostdestroy,
  DB_ChallPostedit,
};
