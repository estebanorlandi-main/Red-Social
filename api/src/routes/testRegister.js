const router = require("express").Router();
const { Sequelize, Model } = require("sequelize");
const fn = require("./utils.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const {send_verification,forgot_validate} = require("../controllers/nodemailer.js")
const jwt = require("jsonwebtoken")
const Op = Sequelize.Op;
const db = require("../db.js");

// NEW REGISTER

router.post("/", async (req, res, next) => {
  try {
    let { email, username, password } = req.body;
    let errorsPassword = await fn.DB_validatePassword(password);
    let errorsUser = await fn.DB_findUserCreated({username,email});
    let errors = { ...errorsPassword, ...errorsUser };

    if (errors.email || errors.username || errors.password) return res.send(errors).status(400);

    password = bcrypt.hashSync(password, saltRounds);

    let findToken = await db.ValidateToken.findOne({where:{email}}).catch(e=>null)
    if(findToken) return res.send({errors: "token already generated, check your email",sucess:false})

    let token = jwt.sign({ email }, 'secret', { expiresIn: "1d" });    
    let generateToken = await db.ValidateToken.create({email, token , username , password}).catch(e=>{return res.send({errors:"se ha producido un error"}).status(400)})

	  await send_verification(generateToken.email,token)

    return res.send({ email: "check your email", success: true });
  } catch (e) {
  	console.log(e)
    res.status(500).send({ errors: e, success: false });
  }
});

// VALIDATE ACCOUT
router.get("/account", async(req,res,next)=>{
  try {
    const {email,token} = req.query
    const validate = await db.ValidateToken.findOne({where:{email,token}}).catch(e=>null)
    if(!validate) return res.send({errors:"no se puede validar este email"})
    let findUser = await db.User.findOne({where:{[Op.or]:[{username:validate.username},{email:validate.email}]}})
    if(findUser) return res.send({errors:"User already validated"})
    if(validate.password && validate.email && validate.username){
      const userCreate = await db.User.create({username:validate.username,email:validate.email,password:validate.password})
      return res.redirect(301, 'http://localhost:3000/')
    }
  } catch(e) {
    console.log(e);
    res.sendStatus(500)
  }
})

// FORGOT PASSSWORD
router.post("/forgot/password",async (req,res,next)=>{
  try {
    const {email, username} = req.body
    let findUser = await db.User.findOne({where:{[Op.or]:[{username},{email}]}}).catch(e=> res.send({errors:"se ha producido un error",sucess:false}))
    if(!findUser) return res.send({errors:"User not found"})
    let findToken = await db.ForgotPassword.findOne({where:{[Op.or]:[{username},{email}]}}).catch(e=>null)
    if(findToken) return res.send({errors: "token already generated, check your email",sucess:false})

    let token = jwt.sign({ username }, 'secret', { expiresIn: "1d" });
    let generateToken = await db.ForgotPassword.create({email:findUser.email, token , username:findUser.username})
    .catch(e=> res.send({errors:"se ha producido un error",sucess:false}))

    await forgot_validate(generateToken.email,token)

    return res.send({ email: "check your email", success: true });
  } catch(e) {
    console.log(e);
    res.sendStatus(500)
  }
})

// http://localhost:3001/validate/password/reset?email=tagelo6093@erpipo.com&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbnRpOTg3IiwiaWF0IjoxNjM2NjM4MDUxLCJleHAiOjE2MzY3MjQ0NTF9.nCWqlUMrXwPaiEM_gl0-oiqRNPYRuSTyKjcCFjxvjdo
router.get("/password/reset",async(req,res,next)=>{
  try {
    const {email,token} = req.query
    const validate = await db.ForgotPassword.findOne({where:{email,token}}).catch(e=>null)
    if(!validate) return res.send({errors:"no se puede validar este email"})
    if(validate.email && validate.username){
      return res.redirect(301, `http://localhost:3000/auth/reset-password?email=${email}&token=${token}`)
    }
    else return res.send({errors:"se ha producido un error"})
  } catch(e) {
    console.log(e);
    res.sendStatus(500)
  }  
})
// update password - delete token
router.post("/password/generated", async(req,res,next)=>{
  const {email,token} = req.query
  let {password} = req.body
  if(!email || !token || !password) return res.send({errors:"Datos invalidos"})
  let findToken = await db.ForgotPassword.findOne({where:{email,token}}).catch(e=>null)
  if(findToken){
    password = bcrypt.hashSync(password, saltRounds);
    findToken.destroy()
    const update = db.User.update({password:password},{where:{email:email}})
    return res.send({success:true,user:"password has been updated"})
  }else return res.send({success:false,user:"Token does not exist"})
  return res.send(findToken)
})

module.exports = router;
