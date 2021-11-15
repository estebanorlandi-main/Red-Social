const router = require("express").Router();
const Challenge_utils = require("./Challengeutils.js");

router.post("/", async (req, res) => {
  try {
    const { code } = req.body;

    try {
      const tested = eval(code);
      const tested2 = Function("return " + code)();
      res.status(200).send({ tested, tested2 });
    } catch (e) {
      res.status(200).send({ error: "Non iterable function", e });
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: "There's a problem with your code", e });
  }
});

module.exports = router;
