const { Router } = require("express");
const BulkTags = require("../../Bulk.json")
const router = Router();

const { Tags } = require("../db.js");




router.get('/', async (req, res) =>{
	try{
		const tags = await Tags.findAll({attributes:['name']})
		res.status(200).json(tags)
	}catch(e){
		console.log(e)
		res.status(404).send(e)
	}
})

router.post('/', async (req, res)=>{
	try{
		BulkTags.map((el)=>{Tags.findOrCreate({where: {
			'name':el.name
		}})})
		res.status(200).send('Tags loaded succesfully')
	}catch(e){
		res.status(404).send(e)
	}
})


module.exports = router