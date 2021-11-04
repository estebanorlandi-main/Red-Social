const router = require("express").Router();
const { Sequelize, Model } = require("sequelize");
const fn = require("./utils.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;

//MAIN USER
router.get("/", async (req, res, next) => {
  try {
    if (Object.keys(req.query).length != 0) return next();
    let findUsers = await fn.DB_findUserAll();

    findUsers = findUsers.map((user) => ({
      username: user.username,
      name: user.name,
      lastname: user.lastname,
      gitaccount: user.gitaccount,
      email: user.email,
      about: user.about,
      tags: user.tags,
    }));

    res.send(findUsers);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

//QUERY USER
router.get("/", async (req, res, next) => {
  try {
    if (req.query.email || req.query.username) {
      let findUser = await fn.DB_findUserQuery(req.query);

      findUser = findUser.map((user) => ({
        username: user.username,
        name: user.name,
        lastname: user.lastname,
        gitaccount: user.gitaccount,
        image: user.image,
        email: user.email,
        about: user.about,
        tags: user.tags,
      }));

      if (findUser != null) return res.send(findUser);
      res.send({ errors: "User not found" }).status(200);
    }
    res.send({});
  } catch (e) {
    res.sendStatus(500);
  }
});
//PARAMS USER
router.get("/:username", async (req, res, next) => {
  try {
    let findUser = await fn.DB_findUserParams(req.params.username);

    findUser = {
      username: findUser.username,
      name: findUser.name,
      lastname: findUser.lastname,
      gitaccount: findUser.gitaccount,
      image: findUser.image,
      email: findUser.email,
      about: findUser.about,
      tags: findUser.tags,
    };

    findUser
      ? res.send(findUser)
      : res.send({ errors: "USER not found" }).status(200);
  } catch (e) {
    res.sendStatus(500);
  }
});
//POSTS USERs
router.get("/:username/posts", async (req, res, next) => {
  try {
    const findUser = await fn.DB_findUserParams(req.params.username);
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

    const userCreated = await fn.DB_findUsersUsername(req.body.username);
    return res.send({ user: userCreated, success: true });
  } catch (e) {
    res.sendStatus(500).send({ errors: e, success: false });
  }
});
//UPDATE
router.put("/:id", async (req, res, next) => {
  try {
    if (req.body.password) {
      let errors = await fn.DB_validatePassword(req.body.password);
      if (errors.password) return res.send(errors).status(400);
      else req.body.password = bcrypt.hashSync(req.body.password, saltRounds);
    }
    let validate = await fn.DB_updateUser(req.body, req.params.id);
    if (Object.keys(validate).length) return res.send(validate).status(400);
    else {
      return res.send({ success: "User has been updated" });
    }
    res.send({ errors: "USER not found" }).status(200);
  } catch (e) {
    res.sendStatus(500);
  }
});
//FOLLOW/UNFOLLOW
router.post("/follow", async (req, res, next) => {
  const validate = await fn.DB_UserFollow(req.body);

  return res.send("ok");
  try {
    const findUser = await fn.DB_findUserParams(req.params.username);
    findUser
      ? res.send(findUser.comments)
      : res.send({ errors: "USER not found" }).status(200);
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
