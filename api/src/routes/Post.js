const { Router } = require("express");
const { Sequelize, Model } = require("sequelize");
const { User, Post } = require("../db.js");
const {
  DB_UserID,
  validateUpdatePost,
  DB_Postsearch,
  DB_Postdestroy,
  DB_Postedit,
} = require("./utils.js");
const Op = Sequelize.Op;
const router = Router();

// const ruta = require("archivo")
// router.use("/", ruta)

// router.use("/", );

//Devuelve post de una categoria o si no todos los post
router.get("/", async (req, res) => {
  
  // const posts = await Post.findAll({order: [['createdAt', 'DESC']]})
  // return res.send(posts)

  const { tag, page } = req.query;
  const allPosts = await DB_Postsearch({});

  const postsPerPage = 15;

  if (tag) {
    let postCategoria = allPosts.filter((e) =>
      e.tag
        .map((postTag) => postTag && postTag.toLowerCase())
        .includes(tag.toLowerCase())
    );

    if (!postCategoria.length)
      res.status(404).send("There is no post with that tag");

    // paginate
    const to = page * postsPerPage + postsPerPage;
    const pagePosts = allPosts.slice(
      page * postsPerPage,
      to < allPosts.length ? to : allPosts
    );

    if (!pagePosts.length) res.status(404).send("Page not found");

    res.status(200).send(pagePosts);
  } else {
    const to = page * postsPerPage + postsPerPage;
    const pagePosts = allPosts.slice(
      page * postsPerPage,
      to < allPosts.length ? to : allPosts
    );
    res.status(200).send(pagePosts);
  }
});

//Trae todos los posteos que hizo un usuario
router.get("/", async (req, res, next) => {
  try {
    const { username } = req.body;
    if (!!Number(username)) {
      return next();
    }
    const postName = await DB_Postsearch({ username: username });
    postName ? res.send(postName) : res.send("This user has no Post");
  } catch (e) {
    res.status(404).send("Error with the username");
  }
});

//Filtra por id post
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    // if(Number(id).toString() === 'NaN'){
    //     return next()
    // }
    const postId = await DB_Postsearch({ id: id });
    postId
      ? res.status(200).send(postId.dataValues)
      : res.send("No post with that id");
  } catch (e) {
    res.status(404).send("Error with the id");
  }
});

router.post("/", async (req, res, next) => {
  const { title, content, image, tag, likes, username } = req.body;
  // console.log(req.body)
  try {
    let userDB = await DB_UserID(username);
    // console.log(userDB)
    let createPost = await Post.create({
      image,
      likes,
      content,
      tag,
      title,
      userId: userDB.id,
    });
    await userDB.addPost(createPost);
    res.send("Success in post creation");
  } catch (e) {
    res.status(404).send({ error: "Invalid data for post creation" });
  }
});

//Eliminacion de un Post
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletePost = await DB_Postdestroy(id);
    res.status(200).send("Delete post");
  } catch (e) {
    res.status(404).send("Cant delete post");
  }
});

//Edicion de post
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatePost = await DB_Postedit(id, req.body);
    res.status(200).send(updatePost);
  } catch (e) {
    res.status(404).send("Cant apply changes");
  }
});

module.exports = router;
