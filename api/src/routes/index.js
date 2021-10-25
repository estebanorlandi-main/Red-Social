const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Users = require("./Users.js")
// const Posts = require("./Posts.js")
const Comment = require("./Comment")
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/comment", Comment)
router.use("/user", Users)
// router.use("/", Posts)

module.exports = router;