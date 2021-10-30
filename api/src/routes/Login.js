const { Router } = require("express");
const { DB_UserID,DB_userSearch} = require("./utils.js");
const router = Router();


router.get("/", async (req, res) => {
    const {username, password, mail} = req.body;
    try{
        var userLogin;
        if(!username && !mail || username=== null && mail === null){
            res.status(400).send(`Error, you must provide an email or username`)
        }
        userLogin = await DB_userSearch (username, mail, password);

        if(userLogin.error){
            res.status(400).send(`Error, it is not your  ${userLogin.error}`)
        }
        res.status(200).send({username, mail, password});
            
    }catch(e){
        res.status(404, e)
    }
})
module.exports = router;
