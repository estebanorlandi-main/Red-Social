const { Router } = require("express");
const {DB_userSearch} = require("./utils.js");
const router = Router();
const {Privileges} = require("../db.js");


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
  
  // router.post("/register", async (req, res) =>{
  //   try {
  //     const {username, password,email, title} =req.body
  //     let errorsPassword = await DB_validatePassword(password)
  //         let errorsUser = await DB_findUserCreated({username:username,email:email})
  //     let errors = {...errorsPassword,...errorsUser}
  //     if(errors.email || errors.username || errors.password) return res.send(errors).status(400)
  
  //         req.body.password = bcrypt.hashSync(password,saltRounds)
  //         let validate = await DB_createUser(req.body)
  //         if(validate.email || validate.name || validate.lastname) return res.send(validate).status(400)
      
  //     const user = await DB_findUsersUsername(username)
      
  //     const privileges = await BD_createPrivileges(user.id, title) 
  //     res.status(200).send('Admin saccess')
  //   } catch (e) {
  //     res.status(404).send('Error in privileges', e);
  //   }
  // })
  
  module.exports = router;
  