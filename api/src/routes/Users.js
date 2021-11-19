const router = require("express").Router();
const { Sequelize, Model } = require("sequelize");
const db = require("../db.js");
const fn = require("./utils.js");
const bcrypt = require("bcrypt");
const path = require("path");
const saltRounds = 10;
const AuthControllers = require("../controllers/AuthControllers.js");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const sanitizeUser = (data) => {
  if (Array.isArray(data)) {
    return data.map((user) => ({
      username: user.username,
      name: user.name,
      lastname: user.lastname,
      gitaccount: user.gitaccount,
      image: {
        imageType: user.imageType,
        imageName: user.imageName,
        imageData: user.imageData ? user.imageData.toString("base64") : null,
      },
      email: user.email,
      about: user.about,
      tags: user.tags,
      posts: user?.posts?.map((post) => ({
        ...post,
        imageData: post.dataValues.imageData
          ? post.dataValues.imageData.toString("base64")
          : null,
      })),
      strike: user.strike,
      dayBan: user.dayBan,
      followers: user.followers.map((user) => ({
        ...user.dataValues,
        imageData: user.dataValues.imageData
          ? user.dataValues.imageData.toString("base64")
          : null,
      })),
      following: user.following.map((user) => ({
        ...user.dataValues,
        imageData: user.dataValues.imageData
          ? user.dataValues.imageData.toString("base64")
          : null,
      })),
      friends: user.Friends,
    }));
  }
  let Laimagenen4 = "";
  if (data.imageData) {
    Laimagenen4 = data.imageData.toString("base64");
  }
  return {
    username: data.username,
    name: data.name,
    lastname: data.lastname,
    gitaccount: data.gitaccount,
    image: {
      imageType: data.imageType,
      imageName: data.imageName,
      imageData: Laimagenen4,
    },
    email: data.email,
    about: data.about,
    tags: data.tags,
    strike: data.strike,
    dayBan: data.dayBan,

    posts: data?.posts?.map((post) => {
      if (post?.user) {
        let image = post?.user?.imageData?.toString("base64");
        post.user["imageData"] = image;
      }
      if (post?.imageData) {
        let image = post?.imageData?.toString("base64");
        post["imageData"] = image;
      }
      if (post?.comments?.length) {
        post.comments = post.comments.map((comment) => {
          let image = comment?.user?.imageData?.toString("base64");
          comment.user["imageData"] = image;
          return comment;
        });
      }
      return post;
    }),
    followers: data?.followers?.map((user) => ({
      ...user.dataValues,
      imageData: user.dataValues.imageData
        ? user.dataValues.imageData.toString("base64")
        : null,
    })),
    following: data?.following?.map((user) => ({
      ...user.dataValues,
      imageData: user.dataValues.imageData
        ? user.dataValues.imageData.toString("base64")
        : null,
    })),
    friends: data.Friends,
  };
};

//PARAMS USER
router.get("/:username", async (req, res, next) => {
  try {
    let findUser = await fn.DB_findUserParams(req.params.username);

    findUser = sanitizeUser(findUser);

    findUser
      ? res.send(findUser)
      : res.send({ errors: "USER not found" }).status(200);
  } catch (e) {
    res.sendStatus(500);
  }
});

//MAIN USER
router.get("/", async (req, res, next) => {
  try {
    if (Object.keys(req.query).length != 0) return next();
    let findUsers = await fn.DB_findUserAll();

    findUsers = sanitizeUser(findUsers);
    res.send(findUsers);
    // return res.send(findUsers);
  } catch (e) {
    res.sendStatus(500);
  }
});

//QUERY USER
router.get("/", async (req, res, next) => {
  try {
    if (req.query.email || req.query.username) {
      let findUser = await fn.DB_findUserQuery(req.query);

      findUser = sanitizeUser(findUser);

      if (findUser != null) return res.send(findUser);
      res.send({ errors: "User not found" }).status(200);
    }
    res.send({});
  } catch (e) {
    res.sendStatus(500);
  }
});

//POSTS USERs
router.get("/:username/posts", async (req, res, next) => {
  try {
    const findUser = await fn.DB_findUserParams(req.params.username);

    findUser = sanitizeUser(findUser);

    findUser
      ? res.send(findUser.posts)
      : res.send({ errors: "USER not found" }).status(200);
  } catch (e) {
    res.sendStatus(500);
  }
});
//COMMENTS
router.get("/:username/comments", async (req, res, next) => {
  try {
    const findUser = await fn.DB_findUserParams(req.params.username);
    findUser
      ? res.send(findUser.comments)
      : res.send({ errors: "USER not found" }).status(200);
  } catch (e) {
    res.sendStatus(500);
  }
});
//REGISTER
router.post("/register", async (req, res, next) => {
  try {
    let { email, username, password } = req.body;
    let errorsPassword = await fn.DB_validatePassword(password);
    let errorsUser = await fn.DB_findUserCreated({
      username: username,
      email: email,
    });

    let errors = { ...errorsPassword, ...errorsUser };
    if (errors.email || errors.username || errors.password)
      return res.send(errors).status(400);

    req.body.password = bcrypt.hashSync(password, saltRounds);
    let validate = await fn.DB_createUser(req.body);
    if (validate.email || validate.name || validate.lastname)
      return res.send(validate).status(400);

    let userCreated = await fn.DB_findUsersUsername(req.body.username);

    userCreated = sanitizeUser(userCreated);

    return res.send({ user: userCreated, success: true });
  } catch (e) {
    console.log(e);
    res.sendStatus(500).send({ errors: e, success: false });
  }
});
//UPDATE
router.put(
  "/:id",
  upload.single("image"),
  AuthControllers.isAuthenticated,
  async (req, res, next) => {
    try {
      let image = {};
      if (req.file) {
        image["imageType"] = req.file.mimetype;
        image["imageName"] = req.file.originalname;
        image["imageData"] = req.file.buffer;
      }

      if (req.body.password) {
        let errors = await fn.DB_validatePassword(req.body.password);
        if (errors.password) return res.send(errors).status(400);
        else req.body.password = bcrypt.hashSync(req.body.password, saltRounds);
      }

      const UserID = await db.User.findOne({
        where: {
          username: req.params.id,
        },
        include: [db.Post],
      });

      let validate = await fn.DB_updateUser(req.body, UserID.id, image);
      if (Object.keys(validate).length) return res.status(400).send(validate);

      let userUpdated = await fn.DB_findUserParams(req.params.id);

      userUpdated = sanitizeUser(userUpdated);
      res.sendFile;
      return res.send({ user: userUpdated, success: true });
    } catch (e) {
      res.status(403).send({ errors: e, success: false });
    }
  }
);

//VALIDATE EMAIL
router.get("/validate/email/:email", async (req, res, next) => {
  const email = await fn.DB_findUsersEmail(req.params.email);
  if (email) return res.send({ success: false, email: "Email in use" });
  else return res.send({ success: true, email: "Email ok" });
});
// VALIDATE USERNAME
router.get("/validate/username/:username", async (req, res, next) => {
  const username = await fn.DB_findUsersUsername(req.params.username);
  if (username)
    return res.send({ success: false, username: "Username in use" });
  else return res.send({ success: true, username: "Username ok" });
});

router.put("/validate/account", async (req, res, next) => {
  try {
    const findUser = await fn.DB_findUserEmailOrUsername(req.body.account);
    if (findUser) {
      return res.send({ success: true, msg: "Account found" });
    } else
      return res.send({
        success: false,
        msg: "Couldn't find your CodeNet account",
      });
  } catch (e) {
    res.sendStatus(500);
  }
});

// FUNCIONES USADAS
// DB_findUserAll
// DB_findUserQuery
// DB_findUserParams
// DB_findUserCreated
// DB_validatePassword
// DB_createUser
// DB_updateUser

module.exports = router;
