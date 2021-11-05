const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const {JWT_SECRET, JWT_EXPIRE_TIME, JWT_COOKIE_EXPIRE} = process.env
const { User } = require("../db.js")
 

exports.isAuthenticated = async (req, res, next) =>{
	const {token} = req.cookiesOptions
	if(req.cookiesOptions.jwt){
		try{
			const decodification = await promisify(jwt.verify)(token, JWT_SECRET)
			const user = await User.findOne({where:{'id':decodification.id}})
			if(!user){return next()}
			req.user = user.username
			next()
		}catch(e){
			res.status(500).send('There was a problem with the authentication')
		}
	}
}

exports.logout = (req, res)=>{
	res.clearCookie()
	return res.status(200).send('Logged out succesfully')
}