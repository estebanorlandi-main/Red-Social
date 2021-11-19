const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = async (sequelize) => {
  // defino el modelo
  sequelize.define('Post_User',{
    user: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
  });
  sequelize.define('Comment_Post',{
    post: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
  });
  sequelize.define('User_Comment',{
    relation:{
      type: DataTypes.STRING,
      defaultValue: Sequelize.UUIDV4
    }
  },{
    timestamps: false,
  });
};