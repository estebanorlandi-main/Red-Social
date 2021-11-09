const router = require('express').Router();
const {User,
	ChallengeComment,
	ChallengePost} = require('../db.js');
const Challenge_utils = require('./Challengeutils.js')
const database_Utils = require('./utils.js')

router.get('/', async (req,res)=>{
	try{
		console.log('hola')
	}catch(e){
		console.log(e)
	}
})

router.post('/', async (req, res)=>{
	const { title, content, tag, likes, username } = req.body;
	try {
    let userDB = await database_Utils.DB_UserID(username);
    let createPost = await ChallengePost.create({
      likes,
      content,
      tag,
      title,
      userId: userDB.id,
    });
    await userDB.addChallengePost(createPost);

    const allPosts = await database_Utils.DB_Postsearch({});
    const { posts, totalPages } = paginate(0, allPosts);
    res.status(200).send({ posts, totalPages });
  } catch (e) {
    console.log(e);
    res.status(404).send({ success: false, error: "Cant create post" });
  }
})



module.exports = router;