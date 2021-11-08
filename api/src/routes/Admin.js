const { Router } = require("express");
const {Privileges} = require("../db.js");
const { DB_UserID,BD_createPrivileges,DB_validatePassword,DB_findUserCreated, DB_userSearch,DB_createUser, DB_findUsersUsername } = require("./utils.js");
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
        
        console.log(userLogin.id)
        const admin = await Privileges.findOne({ where:{userId:userLogin.id}});
        console.log(admin)
          
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
      const {username, password,email, title} =req.body
 
      let errorsPassword = await DB_validatePassword(password)
      let errorsUser = await DB_findUserCreated({username:username,email:email})
      let errors = {...errorsPassword,...errorsUser}
      if(errors.email || errors.username || errors.password) return res.send(errors).status(400)
      
      req.body.password = bcrypt.hashSync(password,saltRounds)
      let validate = await DB_createUser(req.body)
      if(validate.email || validate.name || validate.lastname) return res.send(validate).status(400)
      
      const user = await DB_findUsersUsername(username)
      const privileges = await BD_createPrivileges(user, title) 
     
      const admin ={
        username:privileges.username,
        checked:privileges.checked,
        title:privileges.title
      }
      res.status(200).send(admin)
    } catch (e) {
      res.status(404).send('Error in privileges', e);
    }
  })
  
  module.exports = router;
  