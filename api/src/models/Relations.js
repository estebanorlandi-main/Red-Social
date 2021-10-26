const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Post_User',{
    userID: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
  });
  sequelize.define('Comment_Post',{
    postID: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
  });
  sequelize.define('User_Comment',{
    username:{
      type: DataTypes.STRING
    }
  },{
    timestamps: false,
  });
};