const { Router } = require("express");
const { DB_UserID,BD_createPrivileges,DB_validatePassword,DB_findUserCreated, DB_userSearch,DB_createUser, DB_findUsersUsername } = require("./utils.js");
const router = Router();
const bcrypt = require("bcrypt")
const saltRounds = 10;
const {Privileges} = require("../db.js")


router.get("/", async (req, res) => {
  const { username, password, email, title } = req.body;
  try {
    if ((!username && !email) || (username === null && email === null)) {
      res.status(400).send(`Error, you must provide an email or username`);
    }
    var userLogin = await DB_userSearch(username, email, password);
    if (userLogin.error) {
      return res.status(400).send(`Error, it is not your  ${userLogin.error}`);
    }
    console.log(userLogin)
    if(title){
      const admin = await Privileges.findOne({ where:{userId:userLogin.id}})
      if(admin === null){
          return res.status(400).send('Error your not admin')
      }else{
        res
        .status(200)
        .send( {Username: userLogin.username, Email: userLogin.email, [title]:true })
      }
    }else{
      res
      .status(200)
      .send({ Username: userLogin.username, Email: userLogin.email });
    }
  } catch (e) {
    res.status(404).send('Error in longin', e);
  }
});

router.post("/register/privileges", async (req, res) =>{
  const {username, password,email, title} =req.body
  try {
    let errorsPassword = await DB_validatePassword(password)
    console.log(errorsPassword)
		let errorsUser = await DB_findUserCreated({username:username,email:email})
    let errors = {...errorsPassword,...errorsUser}
		console.log(errors)
    if(errors.email || errors.username || errors.password) return res.send(errors).status(400)

		req.body.password = bcrypt.hashSync(password,saltRounds)
		let validate = await DB_createUser(req.body)
		if(validate.email || validate.name || validate.lastname) return res.send(validate).status(400)
    
    const user = await DB_findUsersUsername(username);
    const privileges = await BD_createPrivileges(user.id, title) 
    res.status(200).send('Admin saccess')
  } catch (e) {
    res.status(404).send('Error in privileges', e);
  }
})

module.exports = router;
