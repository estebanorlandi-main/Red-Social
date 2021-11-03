const { Router } = require("express");

const router = Router();


// importar todas las routes
const Users = require("./Users.js")
const Comments = require("./Comments.js")
const Post = require("./Post.js")
const Login = require("./Login.js")
const Likes = require("./Likes.js")
const Tags = require("./Tags.js")



// const ruta = require("archivo")
// router.use("/", ruta)
router.get('/', (req,res)=>{
	res.status(202).send({
		"Post":` GET -> /post - /post?q=username - /post/:id
		POST -> /post
		PUT -> /post/:id
		DELETE -> /post/:id`,
		"Comment": `GET -> /comment/:username
		PUT -> /comment - /comment/:id
		DELETE -> /comment/:id`,
		"Users":`GET -> /user - /user/:username - /user/:username/posts
		POST -> /user/register`,
		"Sesion": "/login - /register - /logout"
	})
})


router.use("/user", Users);
router.use("/comment", Comments);
router.use("/post", Post);
router.use("/login", Login);
router.use("/tags", Tags)
router.use("/likes", Likes);

module.exports = router;
