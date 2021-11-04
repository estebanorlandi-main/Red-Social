const { Router } = require("express");
const { DB_userSearch } = require("./utils.js");
const router = Router();

router.post("/", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    if ((!username && !email) || (username === null && email === null)) {
      res.status(400).send(`Error, you must provide an email or username`);
    }

    let userLogin = await DB_userSearch(username, email, password);

    if (userLogin.error) throw new Error(userLogin.error);

    let sanitized = {
      username: userLogin.username,
      name: userLogin.name,
      lastname: userLogin.lastname,
      email: userLogin.email,
      gitaccount: userLogin.gitaccount,
      image: userLogin.image,
      about: userLogin.about,
      tags: userLogin.tags,
    };

    res.status(200).send({ user: sanitized, success: true });
  } catch (e) {
    res.status(404).send({ errors: e, success: false });
  }
});
module.exports = router;
