const router = require("express").Router();
const { Sequelize, Model } = require("sequelize");
const fn = require("./utils.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const {send_verification,forgot_validate} = require("../controllers/nodemailer.js")
const jwt = require("jsonwebtoken")
const Op = Sequelize.Op;
const db = require("../db.js");

const sanitizeUser = (data) => {
  if (Array.isArray(data)) {
    return data.map((user) => ({

      username: user.username,
      name: user.name,
      lastname: user.lastname,
      gitaccount: user.gitaccount,
      image: {"imageType":user.imageType,
              "imageName":user.imageName,
              "imageData":user.imageData ? user.imageData.toString("base64") : null},
      email: user.email,
      about: user.about,
      tags: user.tags,
      posts: user.posts,
      strike: user.strike,
      dayBan:user.dayBan,
      followers:user.followers,
      following:user.following,
      friends:user.Friends
    }));
  }
  let Laimagenen4 = ""
  if(data.imageData){
    Laimagenen4 = data.imageData.toString("base64")
  }
  return {
    username: data.username,
    name: data.name,
    lastname: data.lastname,
    gitaccount: data.gitaccount,
    image: {"imageType":data.imageType,
              "imageName":data.imageName,
              "imageData":Laimagenen4},
    email: data.email,
    about: data.about,
    tags: data.tags,
    posts: data.posts,
    strike: data.strike,
    dayBan:data.dayBan,
    followers:data.followers,
    following:data.following,
    friends:data.Friends
  };
};

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
              attributes: ["id", "username", "imageData", "imageType", "name", "lastname"],
            }
          ]
        });
        console.log(userUF.followers)

        return res.send({msg:"Unfollow",success:true, followers: sanitizeUser(userUF.followers), username: userUF.username})
      }else{
        const addFollow = await db.User_Follow.create({userId:findUser.id,followerId:findFollow.id}).catch(e=> null)
        if(addFollow){
          const userF = await db.User.findOne({
            where:{ username: follow },
            include: [
              {
                model: db.User,
                as: "followers",
                attributes: ["id", "username", "imageData", "imageType", "name", "lastname"],
              }
            ]
          });
          console.log(userF.followers)

          return res.send({msg:"Follow",success:true, followers: sanitizeUser(userF.followers), username: userF.username })
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
