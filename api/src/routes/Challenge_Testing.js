const router = require("express").Router();
const Challenge_utils = require("./Challengeutils.js");



router.get('/', async (req, res)=>{

	try{
		const {code} = req.body
	
		const tested = eval(code)
		const tested2 = Function("return "+ code)()
		res.status(200).send(tested, tested2)
	}catch(e){
		console.log(e)
		res.status(400).send("There's a problem with your code", e)
	}
})





module.exports = router;