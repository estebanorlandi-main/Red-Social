const router = require('express').Router();
const {User,Post,Comment,User_Comment,Comment_Post,Post_User} = require('../db.js');

router.get('/:username', (req, res)=>{
	res.send('hola, get')
})

router.post('/', async (req, res)=>{
	try {
		const{title,content} = req.body
		const Comment = await Comments.create({title,content})
		res.send(Comment)
	} catch(e) {
		res.sendStatus(404)
	}
})

router.put('/:id', (req, res)=>{
	res.send('hola, put')
})

router.delete('/:id', (req, res)=>{
	res.send('hola te borre')
})


module.exports = router;