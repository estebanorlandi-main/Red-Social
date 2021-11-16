const { Router } = require("express");
const { Sequelize, Model } = require("sequelize");
const { User, Post, Comment, Likes } = require("../db.js");
const {
  DB_UserID,
  validateUpdatePost,
  DB_Postsearch,
  DB_Postdestroy,
  DB_Postedit,
} = require("./utils.js");
const Op = Sequelize.Op;
const router = Router();

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

// router.use("/", );

const modifiedPost = async (idPost) => {
  return await Post.findOne({
    where: { idPost },
    include: [
      { model: User, attributes: ["image", "username"] },
      {
        model: Comment,
        include: [{ model: User, attributes: ["image", "username"] }],
      },
      {
        model: Likes,
        as: "userLikes",
        include: [{ model: User, attributes: ["username"] }],
      },
    ],
  });
};

const paginate = (page = 0, arr) => {
  const postsPerPage = 15;
  const to = page * postsPerPage + postsPerPage;

  let posts = arr
    .slice(page * postsPerPage, to < arr.length ? to : arr.length)
    .map((post) => {
      if (post.imageData) {
        const image = post.imageData.toString("base64");
        post["imageData"] = image;
      }
      return post;
    });

  const totalPages = Math.ceil(arr.length / postsPerPage);

  return {
    posts,
    totalPages,
  };
};

//Devuelve post de una categoria o si no todos los post
router.get("/", async (req, res) => {
  // const posts = await Post.findAll({order: [['createdAt', 'DESC']]})
  // return res.send(posts)

  const { tag, page } = req.query;
  const allPosts = await DB_Postsearch({});

  if (!tag) return res.status(200).send(paginate(page, allPosts));

  let postCategoria = allPosts.filter((e) =>
    e.tag
      .map((postTag) => postTag && postTag.toLowerCase())
      .includes(tag.toLowerCase())
  );

  if (!postCategoria.length)
    res.status(404).send("There is no post with that tag");

  let { posts, totalPages } = paginate(page, postCategoria);
  res.status(200).send({ posts, totalPages });
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

router.post("/", upload.single("image"), async (req, res) => {
  let { title, content, tag, username, type } = req.body;

  try {
    let userDB = await DB_UserID(username);

    if (typeof tag === "string" && tag.length) tag = tag.split(",");

    let image = {};
    if (req.file) {
      image["imageType"] = req.file.mimetype;
      image["imageName"] = req.file.originalname;
      image["imageData"] = req.file.buffer;
    }

    let createPost = await Post.create({
      ...image,
      content,
      tag: tag || [],
      type,
      title,
      userId: userDB.id,
    });

    await userDB.addPost(createPost);

    const allPosts = await DB_Postsearch({});

    res.status(200).send(paginate(0, allPosts));
  } catch (e) {
    console.log(e);
    res.status(404).send({ success: false, error: "Cant create post" });
  }
});

//Eliminacion de un Post
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletePost = await DB_Postdestroy(id);
    const allPosts = await DB_Postsearch({});
    const { posts, totalPages } = paginate(0, allPosts);
    res.status(200).send({ posts, totalPages, success: true });
  } catch (e) {
    res.status(404).send({ success: false, error: "Cant delete post" });
  }
});

//Edicion de post
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await DB_Postedit(id, req.body);

    const post = await modifiedPost(id);
    res.status(200).send({ post, success: true });
  } catch (e) {
    console.log(e);
    res.status(404).send({ success: false, error: "Cant apply changes" });
  }
});

module.exports = router;
