
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('message',{
    conversationId: {
        type: String,
      },
      sender: {
        type: String,
      },
      text: {
        type: String,
      },  
  },{
    timestamps: true,
  });
};