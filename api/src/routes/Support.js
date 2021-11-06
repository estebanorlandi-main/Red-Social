const { Router } = require("express");
const { Sequelize, Model, Association } = require("sequelize");
const AuthControllers = require('../controllers/AuthControllers.js')
const {Support} = require('../db.js');
const { DB_findUsersUsername } = require("./utils.js");
const router = Router();


router.post("/", AuthControllers.isAuthenticated, async (req, res) =>{
    try{

        const {username,
        content,
        title,
        postReported,
        commentReported,
        userReported} = req.body

        const user = await DB_findUsersUsername(username)
        var createMessage = await Support.findOrCreate({
            where:{
                content,
                title,
                postReported,
                commentReported,
                userReported,
                userId:user.id
            }
        })

        res.status(200).send("Success in message creation");

    }catch(e){
        console.log(e)
        res.status(404).send({error: 'Invalid data for message creation'})
    }
})

module.exports = router;
