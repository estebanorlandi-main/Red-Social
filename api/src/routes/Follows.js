const router = require("express").Router();
const { Sequelize, Model } = require("sequelize");
const fn = require("./utils.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const {send_verification,forgot_validate} = require("../controllers/nodemailer.js")
const jwt = require("jsonwebtoken")
const Op = Sequelize.Op;
const db = require("../db.js");

// Follow/unFollow
router.post("/", async (req, res, next) => {
  try {
    const {user, follow} = req.body
    const findUser = await db.User.findOne({where:{username:follow}}).catch(e=>null)
    const findFollow = await db.User.findOne({where:{username:user}}).catch(e=>null)
    if(findUser && findFollow){
      //eliminar follow
      const deleteFollow = await db.User_Follow.findOne({where:{userId:findUser.id,followerId:findFollow.id}}).catch(e=>null)
      if(deleteFollow){
        await deleteFollow.destroy();

        const userUF = await db.User.findOne({
          where:{ username: follow },
          include: [
            {
              model: db.User,
              as: "followers",
              attributes: ["id", "username", "image", "name", "lastname"],
            }
          ]
        });
        console.log(userUF.followers)

        return res.send({msg:"Unfollow",success:true, followers: userUF.followers, username: userUF.username})
      }else{
        const addFollow = await db.User_Follow.create({userId:findUser.id,followerId:findFollow.id}).catch(e=> null)
        if(addFollow){
          const userF = await db.User.findOne({
            where:{ username: follow },
            include: [
              {
                model: db.User,
                as: "followers",
                attributes: ["id", "username", "image", "name", "lastname"],
              }
            ]
          });
          console.log(userF.followers)

          return res.send({msg:"Follow",success:true, followers: userF.followers, username: userF.username })
        }
        else return res.send({errors:"Se ha producido un error",success:false})
      }
    } else return res.send({errors:"No existe el Usuario",success:false})
  } catch (e) {
  	console.log(e)
    res.status(500).send({ errors: e, success: false });
  }
});


module.exports = router;
