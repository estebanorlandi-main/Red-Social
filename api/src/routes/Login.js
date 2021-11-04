const { Router } = require("express");
const { DB_UserID, DB_userSearch } = require("./utils.js");
const router = Router();

router.post("/", async (req, res) => {
  const { username, password, email } = req.body;
  try {
    if ((!username && !email) || (username === null && email === null)) {
      res.status(400).send(`Error, you must provide an email or username`);
    }
    var userLogin = await DB_userSearch(username, email, password);
    console.log(userLogin);
    if (userLogin.error) {
      res.status(400).send(`Error, it is not your  ${userLogin.error}`);
    }
    console.log(userLogin.username, userLogin.email);
    res
      .status(200)
      .send({ Username: userLogin.username, Email: userLogin.email });
  } catch (e) {
    res.status(404, e);
  }
});
module.exports = router;
