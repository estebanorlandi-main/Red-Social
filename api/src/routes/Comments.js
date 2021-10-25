const { Router } = require('express');
const Comments = require('../db.js')

async function DB_comments (){

	const Comments_data = await Comments.findAll({
		include: {
			attributes: ['userID','title'],
			through: {
				attributes: [],
			}
		}
	})
	const final = Comments_data.map((Comment)=>{
		return Comment.dataValues;
	})
	return final;

}

const router = Router()



router.get('/:username', (req, res)=>{
	res.send('hola, get')
})

router.post('/', (req, res)=>{
	res.send('hola, post')
})

router.put('/:id', (req, res)=>{
	res.send('hola, put')
})

router.delete('/:id', (req, res)=>{
	res.send('hola te borre')
})


module.exports = router;