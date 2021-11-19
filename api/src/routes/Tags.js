const { Router } = require("express");
const BulkTags = require("../../Bulk.json")
const router = Router();

const { Tags } = require("../db.js");



function mayuscula(str){
	return str.charAt(0).toUpperCase() + str.slice(1);
}
router.get('/', async (req, res) =>{
	try{
		const tags = (await Tags.findAll({attributes:['label'], raw:true})).map((el)=> {return {...el, value:el.label}})
		console.log(tags.length)
		res.status(200).json(tags)
	}catch(e){
		res.status(404).send(e)
	}
})

router.post('/', async (req, res)=>{
	try{
		let tags = await Tags.findAll({attributes:['label'], raw:true})
		console.log(tags.length, "post")
		if (tags.length === 0) {
			console.log("entre")
			BulkTags.map((el)=>{Tags.findOrCreate({where: {
				'label':mayuscula(el.label)
			}})})
			res.status(200).send('Tags loaded succesfully')
			return
		}
		res.status(200).send("Tags already loaded")

	}catch(e){
		res.status(404).send(e)
	}
})


module.exports = router
