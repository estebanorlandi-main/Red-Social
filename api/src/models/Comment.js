// Modelo de comentarios
const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('comment',{
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postID: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },{
    timestamps: false,
  });
};