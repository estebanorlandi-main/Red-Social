require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/redsocial`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);


const { User, 
  Post, 
  Comment, 
  Privileges, 
  Post_User,
  Comment_Post,
  User_Comment } = sequelize.models;

// Aca vendrian las relaciones
//Usuario
// Relacion 1 a M  - User -> Post
User.belongsToMany(Post, {through: Post_User})
Post.belongsTo(User, {through: Post_User})

//Relacion 1 a 1 - User -> Privileges
User.hasOne(Privileges)

//Relacion 1 a M - User -> Comment
User.belongsToMany(Comment, {through: User_Comment})
Comment.belongsTo(User, {through: User_Comment})

//Post
//Relacion M a 1 - Post -> Comment
Post.belongsToMany(Comment, {through: Comment_Post})
Comment.belongsTo(Post, {through: Comment_Post})



module.exports = {
  ...sequelize.models, 
  conn: sequelize,     
};
