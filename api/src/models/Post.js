// Modelo del posteo
const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('post',{
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tag:{
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull:true
    },
    idPost:{
      allowNull: false,
      unique: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
     
    },
    image:{
      type: DataTypes.STRING
    },
    likes:{
      type: DataTypes.INTEGER
    }
  });
};