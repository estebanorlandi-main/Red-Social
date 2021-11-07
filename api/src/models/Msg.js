const { DataTypes, Sequelize } = require('sequelize');
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('msg',{
      id: {
        allowNull: false,
        unique: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      message:{
        type:DataTypes.TEXT,
        allowNull:false
      }    
  });
};