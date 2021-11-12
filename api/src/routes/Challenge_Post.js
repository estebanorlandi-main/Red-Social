const router = require("express").Router();
const { User, ChallengeComment, ChallengePost } = require("../db.js");
const Challenge_utils = require("./Challengeutils.js");
const database_Utils = require("./utils.js");

router.get("/", async (req, res) => {
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
});

router.post("/", async (req, res) => {
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

    const allPosts = await database_Utils.DB_Postsearch({});
    const { posts, totalPages } = paginate(0, allPosts);
    res.status(200).send({ posts, totalPages });
  } catch (e) {
    console.log(e);
    res.status(404).send({ success: false, error: "Cant create post" });
  }
});

module.exports = router;
