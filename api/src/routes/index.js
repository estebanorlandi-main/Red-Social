const { Router } = require("express");

const router = Router();


// importar todas las routes
const Users = require("./Users.js")
const Comments = require("./Comments.js")

// const ruta = require("archivo")
// router.use("/", ruta)

router.use("/user", Users);
router.use("/comment", Comments);

module.exports = router;
