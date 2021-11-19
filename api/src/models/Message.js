
const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('message',{
    conversationId: {
        type: DataTypes.STRING,
      },
      sender: {
        type: DataTypes.STRING,
      },
      text: {
        type: DataTypes.STRING,
      },
      unread: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      }  
  },{
    timestamps: true,
  });
};