const router = require('express').Router();
const {User,
	ChallengePost} = require('../db.js');
const database_Utils = require('./utils.js')


router.get('/', async (req,res)=>{
	try{
		console.log('hola')
	}catch(e){
		console.log(e)
	}
})

router.post('/', async (req, res)=>{
	try{
		console.log(req.body)
	}catch(e){
		console.log(e)
	}
})



module.exports = router;