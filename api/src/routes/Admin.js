const { Router } = require("express");
const {Privileges} = require("../db.js");
const { BD_createPrivileges, DB_userSearch, BD_searchAdmin} = require("./utils.js");
const router = Router();
const bcrypt = require("bcrypt")
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRE_TIME, JWT_COOKIE_EXPIRE } = process.env;

router.post('/', async (req, res) => {
    const {email, username, password, title} = req.body;
    try{
      if ((!username && !email) || (username === null && email === null)) {
        res.status(400).send(`Error, you must provide an email or username`);
      }
      
      if(!title) return res.status(400).send({error:'Error missing admin title'})
      
      else{
        
        let userLogin = await DB_userSearch(username, email, password);
        if (userLogin.error) throw new Error(userLogin.error);
        
        const admin = await Privileges.findOne({ where:{userId:userLogin.id}});

          if(admin === null){
              return res.status(400).send('Error your not admin')
          
          }else{
              let sanitized = {
                  username: userLogin.username,
                  name: userLogin.name,
                  lastname: userLogin.lastname,
                  email: userLogin.email,
                  gitaccount: userLogin.gitaccount,
                  image: userLogin.image,
                  about: userLogin.about,
                  tags: userLogin.tags,
              };
                           
              const id = userLogin.id;       
              const token = jwt.sign({ id: id }, JWT_SECRET, {
                expiresIn: JWT_EXPIRE_TIME,
              });
              const cookiesOptions = {
                expires: new Date(Date.now() + JWT_COOKIE_EXPIRE * 3600 * 1000),
                httponly: true,
                Secure: true,
              };
          
              res.cookie("codenet", token, cookiesOptions);
              res.status(200).send({ user: sanitized, success: true , admin:true});
          }
        }
    }catch(e){
        console.log(e);
        res.status(404).send({ errors: e, success: false, admin: false });
    }
})
  
  router.post("/register", async (req, res) =>{
    try {
      const {username, password,email} =req.body;      
      const user = await DB_userSearch(username, email, password);
      if(user.error) return res.send({Error:user.error}).status(400);
      
      const isAdmin = await BD_searchAdmin(user);
      if(isAdmin === null){
        const privileges = await BD_createPrivileges(user);
        const admin ={
          username:privileges.username,
          checked:privileges.checked,
        }
  
        res.status(200).send(admin)
      } 
      else{
        res.send({Error: "Your is admin"}).status(404);
      }
     
    } catch (e) {
      res.status(404).send('Error created Admin', e);
    }
  })
  
  module.exports = router;
  