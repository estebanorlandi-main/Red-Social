const { Router } = require("express");
const { Sequelize, Model } = require("sequelize");
const {User,Post} = require('../db.js');
const fn = require("./utils.js");
const Op = Sequelize.Op;
const router = Router();


//MAIN--
router.get("/", async (req, res,next) =>{
    try {
        if(Object.keys(req.query).length != 0) return next()
        let findPosts = await fn.DB_findPostsAll()
        res.send(findPosts)
    } catch(e) {
        res.sendStatus(500)
    }
})
//QUERY title and Tags
router.get("/", async (req,res,next)=>{
    try {
        if(req.query.title || req.query.tag || req.query.content){
            let findPosts = await fn.DB_findPostsQuery(req.query)
            if(findPosts && findPosts.length) return res.send(findPosts)
        }
        res.send({errors:"Posts not found"}).status(200)         
    } catch(e) {
        res.status(500)
    }
})

//PARAMS
router.get("/:username", async (req, res, next) =>{
    try {
        const findUser = await fn.DB_findUserParams(req.params.username)
        findUser?res.send(findUser):
        res.send({errors:"USER not found"}).status(200)
    } catch(e) {
        res.sendStatus(500)
    }
});
//CREATE POST
router.post("/", async (req, res, next) =>{
    const{userId} = req.body;
    if(!userId) return res.send({userId:"User not found"}).status(200)
    try {
        let validate = await fn.DB_createPost(req.body)
        if(validate.userId) return res.send(validate).status(400)
        else return res.send({success: "User has been created"})
    }catch(e){
        res.sendStatus(500)
    }
})

//Eliminacion de un Post
router.delete("/:idPost", async (req, res) =>{
    const {idPost} = req.params;
    try{
        const validate = await fn.DB_Postdestroy(idPost)
        if(validate || validate.idPost) return res.send(validate).status(400)
        else return res.send({success: "Post was removed successfully"}).status(200);
    }catch(e){
        res.status(500)
    };   
});

//Edicion de post
router.put("/:id", async (req, res) =>{
    try{
        const {id} = req.params;
        const updatePost = await DB_Postedit(id, req.body)
        res.status(200).send({success:"Post was modified correctly"});
    }catch(e){
        res.status(500)
    }
})



module.exports = router;