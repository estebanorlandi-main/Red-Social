const { Router } = require("express");
const router = Router();

//Controladores de sesion

const AuthControllers = require('../controllers/AuthControllers.js')

const Testing = require("./Challenge_Testing.js")
const Comments = require("./Challenge_Comment.js")
const Post = require("./Challenge_Post.js")


router.use('/post', Post);
router.use('/comment', Comments);
router.use('/testing', Testing)

module.exports = router;