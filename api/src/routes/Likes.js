const router = require("express").Router();
const { Sequelize, Model } = require("sequelize");
const fn = require("./utils.js");
const db = require("../db.js");
const { Post } = require("../db.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const {
  DB_UserID,
  validateUpdatePost,
  DB_Postsearch,
  DB_Postdestroy,
  DB_Postedit,
} = require("./utils.js");

const modifiedPost = async (idPost) => {
  return await db.Post.findOne({
    where: { idPost },
    include: [
      { model: db.User, attributes: ["image", "username"] },
      {
        model: db.Comment,
        include: [{ model: db.User, attributes: ["image", "username"] }],
      },
      {
        model: db.Likes,
        as: "userLikes",
        include: [{ model: db.User, attributes: ["username"] }],
      },
    ],
  });
};

//MAIN USER
router.get("/", async (req, res, next) => {
  try {
    let findLikes = await db.Likes.findAll({
      include: [
        {
          model: db.User,
          attributes: ["username", "image"],
        },
      ],
      // attributes:[]
    });
    res.send(findLikes);
  } catch (e) {
    res.sendStatus(500);
  }
});
//POSTS Likes/Dislike
router.post("/", async (req, res, next) => {
  const { userId, postIdPost } = req.body;
  let user = await db.User.findOne({ where: { username: userId } });

  if (!user) return res.send({ errors: "el usuario no existe" });
  if (!userId || !postIdPost) return res.send({ errors: "datos falsos" });
  try {
    let findPost = await db.Likes.findOne({
      where: { userId: user.id, postIdPost },
    }).catch((e) => ({ errors: "fatal errors" }));
    if (findPost && findPost.errors) return res.send(findPost);
    if (findPost) {
      await findPost.destroy();
      let post = await modifiedPost(postIdPost);
      return res.send({ like: "se elimino el like", post });
    }
    let likePost = await db.Likes.create({ userId: user.id, postIdPost });
    let post = await modifiedPost(postIdPost);
    if (likePost) return res.send({ like: "se agrego un like", post });
    else return res.send({ errors: "Post not found" }).status(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// //QUERY USER
// router.get("/", async (req,res,next)=>{
// 	try {
// 		if(req.query.email || req.query.username){
// 			let findUser = await fn.DB_findUserQuery(req.query)
// 			if(findUser != null) return res.send(findUser)
// 		}
// 		res.send({errors:"USER not found"}).status(200)
// 	} catch(e) {
// 		res.status(500)
// 	}
// })
// //PARAMS USER
// router.get("/:username", async (req,res,next)=>{
// 	try {
// 		const findUser = await fn.DB_findUserParams(req.params.username)
// 		findUser?res.send(findUser):
// 		res.send({errors:"USER not found"}).status(200)
// 	} catch(e) {
// 		res.sendStatus(500)
// 	}
// })
// //POSTS USERs
// router.get("/:username/posts", async (req,res,next)=>{
// 	try {
// 		const findUser = await fn.DB_findUserParams(req.params.username)
// 		findUser?res.send(findUser.posts):
// 		res.send({errors:"USER not found"}).status(200)
// 	} catch(e) {
// 		res.sendStatus(500)
// 	}
// })
// //COMMENTS
// router.get("/:username/comments", async (req,res,next)=>{
// 	try {
// 		const findUser = await fn.DB_findUserParams(req.params.username)
// 		findUser?res.send(findUser.comments):
// 		res.send({errors:"USER not found"}).status(200)
// 	} catch(e) {
// 		res.sendStatus(500)
// 	}
// })
// //REGISTER
// router.post("/register", async (req,res,next)=>{
// 	try {
// 		let {email,username,password} = req.body
// 		let errorsPassword = await fn.DB_validatePassword(password)
// 		let errorsUser = await fn.DB_findUserCreated({username:username,email:email})

// 		let errors = {...errorsPassword,...errorsUser}
// 		if(errors.email || errors.username || errors.password) return res.send(errors).status(400)

// 		req.body.password = bcrypt.hashSync(password,saltRounds)
// 		let validate = await fn.DB_createUser(req.body)
// 		if(validate.email || validate.name || validate.lastname) return res.send(validate).status(400)
// 		else return res.send({success: "User has been created"})
// 	} catch(e) {
// 		res.sendStatus(500)
// 	}
// })
// //UPDATE
// router.put("/:id", async (req,res,next)=>{
// 	try {
// 		if(req.body.password){
// 			let errors = await fn.DB_validatePassword(req.body.password)
// 			if(errors.password) return res.send(errors).status(400)
// 			else req.body.password =bcrypt.hashSync(req.body.password,saltRounds)
// 		}
// 		let validate = await fn.DB_updateUser(req.body,req.params.id)
// 		if(Object.keys(validate).length) return res.send(validate).status(400)
// 		else {
// 			return res.send({success: "User has been updated"})
// 		}
// 		res.send({errors:"USER not found"}).status(200)
// 	} catch(e) {
// 		res.sendStatus(500)
// 	}
// })

module.exports = router;
