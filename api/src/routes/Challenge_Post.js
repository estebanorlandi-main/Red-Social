const router = require("express").Router();
const { User, ChallengeComment, ChallengePost } = require("../db.js");
const Challenge_utils = require("./Challengeutils.js");
const database_Utils = require("./utils.js");
const AuthControllers = require('../controllers/AuthControllers.js')

const paginate = (page = 0, arr) => {
  const postsPerPage = 15;
  const to = page * postsPerPage + postsPerPage;

  return {
    posts: arr.slice(page * postsPerPage, to < arr.length ? to : arr),
    totalPages: arr.length,
  };
};

//Devuelve post de una categoria o si no todos los post
router.get("/", async (req, res) => {
  try {
    const { tag, page } = req.query;
    const allPosts = await Challenge_utils.DB_ChallengePostsearch({});

    if (tag) {
      let postCategoria = allPosts.filter((e) =>
        e.tag
          .map((postTag) => postTag && postTag.toLowerCase())
          .includes(tag.toLowerCase())
      );

      if (!postCategoria.length)
        res.status(404).send("There is no post with that tag");

      const { posts, totalPages } = paginate(page, postCategoria);

      res.status(200).send({ posts, totalPages });
    } else {
      const { posts, totalPages } = paginate(page, allPosts);
      res.status(200).send({ posts, totalPages });
    }
  } catch (e) {
    console.log(e);
    let error = JSON.stringify(e);
    res.send(error);
  }
});

router.post("/", AuthControllers.isAuthenticated, async (req, res) => {
  const { title, content, tag, likes, username } = req.body;
  try {
    let userDB = await database_Utils.DB_UserID(username);
    let createPost = await ChallengePost.create({
      likes,
      content,
      tag,
      title,
      userId: userDB.id,
    });
    await userDB.addChallengePost(createPost);

    const allPosts = await Challenge_utils.DB_ChallPostsearch({});
    const { posts, totalPages } = paginate(0, allPosts);
    res.status(200).send({ posts, totalPages });
  } catch (e) {
    res.status(404).send({ success: false, error: e });
  }
});

//Eliminacion de un Post
router.delete("/:id", AuthControllers.isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const deletePost = await Challenge_utils.DB_ChallPostdestroy(id);
    const allPosts = await Challenge_utils.DB_ChallPostsearch({});
    const { posts, totalPages } = paginate(0, allPosts);
    res.status(200).send({ posts, totalPages, success: true });
  } catch (e) {
    res.status(404).send({ success: false, error: "Cant delete post" });
  }
});

//Edicion de post
router.put("/:id", AuthControllers.isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const updatePost = await Challenge_utils.DB_ChallPostedit(id, req.body);

    const allPosts = await Challenge_utils.DB_ChallPostsearch({});
    const { posts, totalPages } = paginate(0, allPosts);
    res.status(200).send({ posts, totalPages, success: true });
  } catch (e) {
    res.status(404).send({ success: false, error: "Cant apply changes" });
  }
});

module.exports = router;
