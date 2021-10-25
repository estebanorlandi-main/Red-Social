const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      min: 2,
      max: 30,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      min: 2,
      max: 30
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      max: 25,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      max: 16,
      min: 8,
      validate:{
        isAlphanumeric: true
      }
    },
    id: {
      allowNull: false,
      unique: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
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
          if(!account.search(/github.com/)){
            throw new Error("git account invalidate")
          }
        }
      }
    },
    image: {
      type: DataTypes.STRING,
    },
  });
};
