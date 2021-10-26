const {Router} = require('express');
const Comments = require('./Comment.js')




const router = Router();


router.use('/comment', Comments)

module.exports = router