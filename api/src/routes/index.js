const { Router } = require("express");

const router = Router();


// importar todas las routes
const Users = require("./Users.js")
const Comments = require("./Comments.js")

// const ruta = require("archivo")
// router.use("/", ruta)
router.use('/', (req,res)=>{

	res.status(202).json({
		"Post":` GET -> /post - /post?q=tags - /post/:id
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

module.exports = router;
