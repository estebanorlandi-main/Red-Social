// Modelo del usuario
const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('user', {
    id: {
      allowNull: false,
      unique: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isAlpha: true,
        len: [2,30]
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isAlpha: true,
        len: [2,30]
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        isAlphanumeric:true,
        len: [3,16]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        is: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
      }
    },
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
         isEmail: true
      }
    },
    gitaccount: {
      type: DataTypes.STRING,
      validate:{
        validateGit: function(account){
          if(!account.match(/github.com/)){
            throw new Error("git account invalidate")
          }
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      validate:{
        validateImage: function(image){
          if(!image.match(/\.(gif|jpg|jpeg|tiff|png)$/i)){
            throw new Error("image invalide")
          }
        }
      }
    },
  },{
    timestamps: false,
  });
};
