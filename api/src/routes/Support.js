const { default: axios } = require("axios");
const { Router } = require("express");
const { Sequelize, Model, Association } = require("sequelize");
const {Support} = require('../db.js');
const { DB_findUsersUsername, BD_searchSupport } = require("./utils.js");
const router = Router();


router.post("/", async (req, res) =>{
    try{
        var {username,
        content,
        title,
        postReported,
        commentReported,
        userReported} = req.body
        
        if(!postReported && !commentReported && !userReported){
            postReported = null;
            commentReported = null;
            userReported = null
        }
        var createMessage = await Support.findOrCreate({
            where:{
                content,
                title,
                postReported,
                commentReported,
                userReported,
                username,
                userId:user.id

            }
        })
        
        res.status(200).send("Success in message creation");

    }catch(e){
        console.log(e)
        res.status(404).send({error: 'Invalid data for message creation'})
    }
})

router.get("/", async (req, res)=>{
    try{
        const allMessage = await BD_searchSupport();
        res.status(200).send(allMessage)
    }catch(e){
        res.status(400).send("Error in suppor message")
    }
})

module.exports = router;