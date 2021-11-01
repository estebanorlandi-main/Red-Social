const { Router } = require("express");
const { DB_UserID,DB_userSearch} = require("./utils.js");
const router = Router();


router.get("/", async (req, res) => {
    const {username, password, email} = req.body;
    try{
        var userLogin;
        if(!username && !email || username=== null && email === null){
            res.status(400).send(`Error, you must provide an email or username`)
        }
        userLogin = await DB_userSearch (username, email, password);

        if(userLogin.error){
            res.status(400).send(`Error, it is not your  ${userLogin.error}`)
        }
        res.status(200).send({username, email});
            
    }catch(e){
        res.status(404, e)
    }
})
module.exports = router;
