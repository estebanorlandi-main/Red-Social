const { Router } = require("express");
const { Sequelize, Model } = require("sequelize");
const {User,Post} = require('../db.js');
const { DB_UserID,validateUpdatePost } = require("./utils.js");
const Op = Sequelize.Op;
const router = Router();

// const ruta = require("archivo")
// router.use("/", ruta)

// router.use("/", );

//Devuelve post de una categoria o si no todos los post
router.get("/", async (req, res) =>{
    const{categoria} = req.query;
    const allPosts = await Post.findAll({});
    if(categoria){
        let postCategoria = await allPost.filter(e => e.categoria.toLowerCase().includes(categoria.toLowerCase()));
        allPosts[0]? res.status(200).send(postCategoria) :
        res.status(404).send("Sorry, no existe post con esa categoria");
    }else{
        res.status(200).send(allPosts);
    };
});

//Trae todos los posteos que hizo un usuario
router.get("/:username", async (req, res) =>{
    try{
        const {username} = req.params;

        let userDB = await User.findOne({
            where: {username: username}
        });

        const postName = await Post.findAll({
            where:{
                userId:userDB.dataValues.id
            }
        }) ;
        console.log(postName);
        postName? res.send(postName) : res.send("Post no encontrado");
    }catch(e){
        console.log("Error en api /post/:name");
        res.sendStatus(404);
    };
});

router.post("/createPost", async (req, res, next) =>{
    const{ 
        idPost,
        title,
        text,
        image,
        tags,
        likes,
        username
    }= req.body;
    
    let userDB = await User.findOne({
        where: {username: username}
    });

    let createPost = await Post.create({
        idPost,
        image,
        likes,
        text,
        tags,
        title,
        userId:userDB.dataValues.id
    });
    res.send("Post creado con exito");
})

//Filtra por id
router.get("/id/:id", async (req, res) =>{
    try{
        const {id} = req.params;
        console.log(id);
        const postId = await Post.findAll({
            where:{
                idPost:id
            }
        }) ;
        console.log(postId)
        postId? res.status(200).send(postId) : res.send("Post no encontrado");
    }catch(e){
        console.log("Error en api /post/:id");
        res.sendStatus(404);
    };
});


router.post("/register", async (req,res,next)=>{
	const {name,lastname,username, password,mail,gitaccount,image} = req.body;
	const user = await User.findOrCreate({
		where:{
			mail:mail
		},
		defaults:{
			name,
			lastname,
			username,
			password,
			mail,
			gitaccount,
			image
		}
	})
	res.status(200).send('Registro con exito');
})

//Eliminacion de un Post
router.delete("/delete/", async (req, res) =>{
    try{
        const {id} = req.body;
        const deletePost = await Post.destroy({
            where:{
                idPost:id
        }});
        res.status(200).send('Post eliminado con exito');
    }catch(e){
        console.log('Error en el delete', e);
        res.status(404).send('Error en el delete');
    };   
});

//Modificacion
router.put("/modificacionPost", async (req, res) =>{
    const {idPost} = req.body;
    var updatePost = await Post.findAll({
		where:{
			idPost:idPost
		}
	}); 
    
    const AllPostId = updatePost[0].dataValues;
    const updateObj =  validateUpdatePost(req.body, AllPostId);

    for(prop in updateObj){
        updatePost[prop] = update[prop];
    };
    console.log(updatePost);
    // await updatePost.save();
    res.status(200).send(updatePost);
})



module.exports = router;